function AppPreview({ type, asset, title, variant = "standard" }) {
    const className = `app-preview-visual ${variant === "featured" ? "app-preview-visual--featured" : ""}`.trim();

    if (type === "screenshot" && asset) {
        return (
            <div className={`${className} app-preview-visual--screenshot`}>
                <img
                    src={asset}
                    alt={`${title} website preview`}
                    loading={variant === "featured" ? "eager" : "lazy"}
                    decoding="async"
                />
            </div>
        );
    }

    if (type === "newsroom-dashboard") {
        return (
            <div className={`${className} app-preview-visual--newsroom`} aria-hidden="true">
                <div className="app-newsroom-preview-shell">
                    <div className="app-newsroom-preview-sidebar">
                        <span />
                        <i />
                        <i />
                        <i />
                    </div>
                    <div className="app-newsroom-preview-main">
                        <div className="app-newsroom-preview-header">
                            <span />
                            <strong />
                        </div>
                        <div className="app-newsroom-preview-metrics">
                            <i />
                            <i />
                            <i />
                        </div>
                        <div className="app-newsroom-preview-content">
                            <div className="app-newsroom-preview-chart">
                                <svg viewBox="0 0 160 70" focusable="false">
                                    <polyline points="4,58 32,44 58,49 84,28 116,34 152,12" />
                                    <circle cx="152" cy="12" r="4" />
                                </svg>
                            </div>
                            <div className="app-newsroom-preview-pipeline">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (type !== "cinematic-portfolio") {
        return (
            <div className={`${className} app-preview-visual--empty`} aria-hidden="true">
                <span />
            </div>
        );
    }

    return (
        <div className={className} aria-hidden="true">
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
