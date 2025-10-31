# Copyright 2025 Tecnativa - Christian Ramos
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import api, fields, models


class PosOrderLine(models.Model):
    _inherit = "pos.order.line"

    course_id = fields.Many2one(
        "restaurant.order.course",
        string="Course Ref",
        ondelete="set null",
        index="btree_not_null",
    )

    @api.model
    def _load_pos_data_fields(self, config):
        result = super()._load_pos_data_fields(config)
        return result + ["course_id"]
