# Copyright 2025 Tecnativa - Christian Ramos
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import fields, models


class PosOrder(models.Model):
    _inherit = "pos.order"

    course_ids = fields.One2many(
        "restaurant.order.course",
        "order_id",
        string="Courses",
    )

