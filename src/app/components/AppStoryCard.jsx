import AppStatusBadge from "./AppStatusBadge";

function AppStoryCard({ app }) {
    return (
        <article className="app-story-card">
            <div className="app-story-card__mark" aria-hidden="true">In progress</div>
            <div>
                <AppStatusBadge status={app.status} />
                <h3>{app.title}</h3>
                <p>{app.description}</p>
            </div>
        </article>
    );
}

export default AppStoryCard;
