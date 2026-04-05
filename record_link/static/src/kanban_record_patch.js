/** @odoo-module **/

import { KanbanRecord } from "@web/views/kanban/kanban_record";
import { getRecordUrl } from "@record_link/record_url";
import { patch } from "@web/core/utils/patch";

patch(KanbanRecord.prototype, {
    /**
     * Compute the URL for a kanban record to enable "Open in new tab" via right-click.
     * Returns false for records without a resId or when the record can't be opened.
     *
     * @returns {string|false}
     */
    getRecordUrl() {
        const { archInfo, forceGlobalClick, record } = this.props;
        if (!forceGlobalClick && !archInfo.openAction && !archInfo.canOpenRecords) {
            return false;
        }
        const actionId = this.env.config && this.env.config.actionId;
        if (!actionId || !record.resId) {
            return false;
        }
        return getRecordUrl(actionId, record.resId);
    },
});
