import AppStatusBadge from "./AppStatusBadge";

function AppRoadmap({ apps }) {
    if (apps.length === 0) {
        return null;
    }

    return (
        <section className="app-roadmap" aria-labelledby="app-roadmap-title">
            <div className="app-section-heading">
                <span>In the lab</span>
                <h2 id="app-roadmap-title">Future experiments</h2>
                <p>
                    These concepts are intentionally shown as planned work. They are not linked until a real application
                    exists.
                </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
                {apps.map((app) => (
                    <article className="app-roadmap-card" key={app.id}>
                        <div className="flex flex-wrap items-center gap-2">
                            <AppStatusBadge status={app.status} />
                            <span className="app-roadmap-category">{app.category}</span>
                        </div>
                        <h3>{app.title}</h3>
                        <p>{app.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default AppRoadmap;
