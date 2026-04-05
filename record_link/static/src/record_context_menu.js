/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";

/**
 * Custom context menu for list rows and kanban cards.
 *
 * When right-clicking on a record that has a data-record-href attribute
 * (set by the ListRenderer/KanbanRecord patches), this module shows a
 * small context menu with "Open in new tab" and "Copy link address".
 *
 * Hold Shift+RightClick to get the browser's native context menu instead.
 */

let _menuEl = null;

function removeMenu() {
    if (_menuEl) {
        _menuEl.remove();
        _menuEl = null;
    }
}

function createMenu(url, x, y) {
    removeMenu();

    const fullUrl = new URL(url, window.location.origin).href;

    const menu = document.createElement("div");
    menu.className = "o_record_context_menu";

    // "Open in new tab" — real <a> so browser opens a proper new tab
    const openLink = document.createElement("a");
    openLink.href = fullUrl;
    openLink.target = "_blank";
    openLink.rel = "noopener noreferrer";
    openLink.className = "o_record_context_menu_item";
    openLink.textContent = _t("Open in new tab");
    openLink.addEventListener("click", () => {
        setTimeout(removeMenu, 100);
    });
    menu.appendChild(openLink);

    // "Copy link address"
    const copyLink = document.createElement("a");
    copyLink.href = "#";
    copyLink.className = "o_record_context_menu_item";
    copyLink.textContent = _t("Copy link address");
    copyLink.addEventListener("click", (ev) => {
        ev.preventDefault();
        navigator.clipboard.writeText(fullUrl).catch(() => {});
        removeMenu();
    });
    menu.appendChild(copyLink);

    // Position the menu at cursor
    menu.style.left = x + "px";
    menu.style.top = y + "px";

    document.body.appendChild(menu);
    _menuEl = menu;

    // Adjust if off-screen
    requestAnimationFrame(() => {
        if (!_menuEl) {
            return;
        }
        const rect = menu.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            menu.style.left = Math.max(0, x - rect.width) + "px";
        }
        if (rect.bottom > window.innerHeight) {
            menu.style.top = Math.max(0, y - rect.height) + "px";
        }
    });
}

// Intercept right-click on records
document.addEventListener("contextmenu", (ev) => {
    // Shift+RightClick => native context menu
    if (ev.shiftKey) {
        return;
    }

    // Find the nearest element with data-record-href
    const recordEl = ev.target.closest("[data-record-href]");
    if (!recordEl) {
        return;
    }

    const url = recordEl.dataset.recordHref;
    if (!url) {
        return;
    }

    ev.preventDefault();
    createMenu(url, ev.clientX, ev.clientY);
});

// Dismiss on click outside the menu
document.addEventListener("mousedown", (ev) => {
    if (_menuEl && !_menuEl.contains(ev.target)) {
        removeMenu();
    }
});

// Dismiss on Escape
document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && _menuEl) {
        removeMenu();
        ev.stopPropagation();
    }
});

// Dismiss on scroll
document.addEventListener("scroll", removeMenu, true);
