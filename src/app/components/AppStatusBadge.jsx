import { APP_STATUS } from "../data/portfolioApps";

function AppStatusBadge({ status }) {
    const statusMeta = APP_STATUS[status] || APP_STATUS.concept;

    return (
        <span className={`app-status-badge app-status-badge--${statusMeta.tone}`}>
            <span className="app-status-badge__dot" aria-hidden="true" />
            {statusMeta.label}
        </span>
    );
}

export default AppStatusBadge;
