import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { _t } from "@web/core/l10n/translation";

patch(ControlButtons.prototype, {
    get displayFireCourseBtn() {
        const order = this.pos.get_order();
        if (!order || !order.hasCourses || !order.hasCourses()) {
            return false;
        }
        const course = this.getCourseToFire();
        return course != null;
    },
    get fireCourseBtnText() {
        const selectedCourse = this.getCourseToFire();
        if (selectedCourse) {
            return _t("Fire %s", selectedCourse.name);
        }
        return "";
    },
    getCourseToFire() {
        const order = this.pos.get_order();
        if (!order || !order.getSelectedCourse) {
            return null;
        }
        const course = order.getSelectedCourse();
        if (course?.isReadyToFire && course.isReadyToFire()) {
            return course;
        }
        return null;
    },
    async clickFireCourse() {
        const course = this.getCourseToFire();
        if (!course) {
            return;
        }
        const order = this.pos.get_order();
        if (order.cleanCourses) {
            order.cleanCourses();
        }
        course.fired = true;
        if (order.deselectCourse) {
            order.deselectCourse();
        }
    },
    addCourse() {
        const order = this.pos.get_order();
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
