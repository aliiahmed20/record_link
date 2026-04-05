{
    "name": "Record Open in New Tab",
    "version": "1.0",
    "category": "Web",
    "summary": "Adds right-click 'Open link in new tab' support for list and kanban records",
    "description": """
        By default, Odoo records in list and kanban views are rendered as plain
        HTML elements (<tr> / <article>) without anchor (<a>) tags. This means
        the browser's native right-click context menu does not offer
        "Open link in new tab".

        This module patches the List Renderer and Kanban Record components to
        add a data-record-href attribute on each record element, and shows a
        custom context menu on right-click with "Open in new tab" and
        "Copy link address" options.

        Hold Shift+RightClick to access the browser's native context menu.
    """,
    "author": "Ali Mohamed",
    "support": "aaegdev@gmail.com",
    "website": "https://github.com/aliiahmed20",
    "depends": ["web"],
    "assets": {
        "web.assets_backend": [
            "record_link/static/src/**/*",
        ],
    },
    "installable": True,
    "auto_install": False,
    "license": "LGPL-3",
    "images": ["static/description/banner.png"]

}
