/** @odoo-module **/

import { router } from "@web/core/browser/router";

/**
 * Compute the URL for opening a record in a new tab.
 *
 * @param {number} actionId - The action ID from env.config
 * @param {number} resId - The record's database ID
 * @returns {string|false} The URL string or false if URL cannot be computed
 */
export function getRecordUrl(actionId, resId) {
    if (!actionId || !resId) {
        return false;
    }
    const state = {
        action: actionId,
        resId: resId,
    };
    return router.stateToUrl(state);
}
