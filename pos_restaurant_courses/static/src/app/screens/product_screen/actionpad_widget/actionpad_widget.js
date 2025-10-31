import { patch } from "@web/core/utils/patch";
import { ActionpadWidget } from "@point_of_sale/app/screens/product_screen/action_pad/action_pad";
import { _t } from "@web/core/l10n/translation";

patch(ActionpadWidget.prototype, {
    get highlightPay() {
        const result = super.highlightPay;
        return result && !this.getCourseToFire();
    },
    get displayFireCourseBtn() {
        const order = this.currentOrder;
        if (!order || order.isDirectSale || !order.hasCourses()) {
            return false;
        }
        return this.getCourseToFire() != null;
    },
    get fireCourseBtnText() {
        const selectedCourse = this.getCourseToFire();
        if (selectedCourse) {
            return _t("Fire %s", selectedCourse.name);
        }
        return "";
    },
    getCourseToFire() {
        const course = this.currentOrder?.getSelectedCourse();
        if (course?.isReadyToFire()) {
            return course;
        }
    },
    async clickFireCourse() {
        const course = this.getCourseToFire();
        if (!course) {
            return;
        }
        this.currentOrder.cleanCourses();
        course.fired = true;
        this.currentOrder.deselectCourse();
        // Trigger a re-render
        this.render();
    },
    addCourse() {
        const order = this.currentOrder;
        if (!order) {
            return;
        }

        const course = this.pos.data.models["restaurant.order.course"].create({
            order_id: order,
            index: order.getNextCourseIndex(),
        });
        let selectedCourse = course;
        if (order.course_ids.length === 1 && order.lines.length > 0) {
            // Assign order lines to the first course
            order.lines.forEach((line) => (line.course_id = course));
            // Create a second empty course
            selectedCourse = this.pos.data.models["restaurant.order.course"].create({
                order_id: order,
                index: order.getNextCourseIndex(),
            });
        }
        order.selectCourse(selectedCourse);
        return course;
    },
});
