import { patch } from "@web/core/utils/patch";
import { OrderSummary } from "@point_of_sale/app/screens/product_screen/order_summary/order_summary";

patch(OrderSummary.prototype, {
    async onOrderlineLongPress(ev, orderline) {
        const result = await super.onOrderlineLongPress(ev, orderline);
        if (!result) {
            return false;
        }

        // When moving an orderline, also move its combo lines to the same course
        for (const child of orderline.combo_line_ids || []) {
            child.course_id = orderline.course_id;
        }

        return result;
    },
});
