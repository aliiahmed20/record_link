/** @odoo-module **/

import { ListRenderer } from "@web/views/list/list_renderer";
import { getRecordUrl } from "@record_link/record_url";
import { patch } from "@web/core/utils/patch";

patch(ListRenderer.prototype, {
    /**
     * Compute the URL for a record to enable "Open in new tab" via right-click.
     * Returns false for x2many records, records without a resId, or noOpen lists.
     *
     * @param {Object} record
     * @returns {string|false}
     */
    getRecordUrl(record) {
        if (this.isX2Many) {
            return false;
        }
        if (this.props.archInfo.noOpen) {
            return false;
        }
        const actionId = this.env.config && this.env.config.actionId;
        if (!actionId || !record.resId) {
            return false;
        }
        return getRecordUrl(actionId, record.resId);
    },
});
