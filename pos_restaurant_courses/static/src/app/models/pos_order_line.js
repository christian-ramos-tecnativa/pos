import { PosOrderLine } from "@point_of_sale/app/models/pos_order_line";
import { patch } from "@web/core/utils/patch";

patch(PosOrderLine.prototype, {
    // Add course_id field support
});
