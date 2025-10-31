# Copyright 2025 Tecnativa - Christian Ramos
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

{
    "name": "POS Restaurant Courses",
    "summary": "Restaurant courses functionality for Point of Sale",
    "version": "18.0.1.0.0",
    "development_status": "Beta",
    "category": "Point Of Sale",
    "website": "https://github.com/OCA/pos",
    "author": "Tecnativa, Odoo Community Association (OCA)",
    "maintainers": ["christian-ramos-tecnativa"],
    "license": "AGPL-3",
    "application": False,
    "installable": True,
    "depends": ["pos_restaurant"],
    "data": [
        "security/ir.model.access.csv",
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_restaurant_courses/static/src/app/models/restaurant_order_course.js",
            "pos_restaurant_courses/static/src/app/models/pos_order.js",
            "pos_restaurant_courses/static/src/app/models/pos_order_line.js",
            "pos_restaurant_courses/static/src/app/components/order_course/**/*",
            "pos_restaurant_courses/static/src/app/components/order_display/**/*",
            "pos_restaurant_courses/static/src/app/screens/product_screen/actionpad_widget/**/*",
            "pos_restaurant_courses/static/src/app/screens/product_screen/order_summary/**/*",
        ],
        "web.assets_tests": [
            "pos_restaurant_courses/static/tests/tours/**/*",
        ],
    },
}
