function AppPreview({ type }) {
    if (type !== "cinematic-portfolio") {
        return (
            <div className="app-preview-visual app-preview-visual--empty" aria-hidden="true">
                <span />
            </div>
        );
    }

    return (
        <div className="app-preview-visual" aria-hidden="true">
            <div className="app-preview-topbar">
                <span />
                <span />
                <span />
            </div>
            <div className="app-preview-hero">
                <div>
                    <span className="app-preview-kicker" />
                    <span className="app-preview-title" />
                    <span className="app-preview-title short" />
                    <span className="app-preview-subtitle" />
                    <span className="app-preview-button" />
                </div>
                <div className="app-preview-photo">
                    <span />
                </div>
            </div>
        </div>
    );
}

export default AppPreview;
