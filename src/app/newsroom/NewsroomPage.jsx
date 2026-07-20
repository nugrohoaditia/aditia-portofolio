import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBell,
    faBolt,
    faCalendarDays,
    faChartLine,
    faCheck,
    faChevronRight,
    faCircleInfo,
    faGaugeHigh,
    faLayerGroup,
    faMagnifyingGlass,
    faNewspaper,
    faRotateLeft,
    faUsers,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "../../components/DarkModeToggle";
import {
    NEWSROOM_DATE,
    activityItems,
    channels,
    devices,
    initialArticles,
    initialBreakingStories,
    initialNotifications,
    newsroomSections,
    priorities,
    referralSources,
    scheduleEntries,
    statuses,
    teamMembers,
    trafficByHour
} from "./data/newsroomData";
import "./newsroom.css";

const sectionIcons = {
    gauge: faGaugeHigh,
    layers: faLayerGroup,
    newspaper: faNewspaper,
    calendar: faCalendarDays,
    chart: faChartLine,
    bolt: faBolt,
    users: faUsers,
    bell: faBell
};

const priorityRank = { Urgent: 4, High: 3, Normal: 2, Low: 1 };

function navigateToApp(event) {
    if (event?.defaultPrevented || event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) {
        return;
    }

    event?.preventDefault();
    window.history.pushState({}, "", "/app");
    window.dispatchEvent(new PopStateEvent("popstate"));
}

function setMetaTag(name, content, attribute = "name") {
    let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
}

function getMetaContent(name, attribute = "name") {
    const tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
    return tag ? tag.getAttribute("content") : null;
}

function formatNumber(value) {
    return new Intl.NumberFormat("en-US").format(value);
}

function calculateMetrics(articles, breakingStories) {
    return [
        { label: "Published today", value: articles.filter((article) => article.status === "Published").length, note: "Live stories" },
        { label: "In review", value: articles.filter((article) => article.status === "Review").length, note: "Awaiting editor" },
        { label: "Scheduled today", value: articles.filter((article) => article.status === "Scheduled").length, note: "Queued slots" },
        { label: "Active breaking", value: breakingStories.filter((story) => story.status !== "Closed").length, note: "Coordinated desks" },
        { label: "Total views", value: formatNumber(articles.reduce((total, article) => total + article.views, 0)), note: "Demo dataset" },
        { label: "On assignment", value: teamMembers.filter((member) => member.availability !== "Available").length, note: "Busy staff" }
    ];
}

function filterArticles(articles, query, filters, sortMode) {
    const normalizedQuery = query.trim().toLowerCase();
    const priorityValue = (article) => priorityRank[article.priority] || 0;

    return articles
        .filter((article) => {
            const matchesQuery = !normalizedQuery || [article.title, article.author, article.channel, article.status, article.id, ...article.tags]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);
            const matchesStatus = filters.status === "All" || article.status === filters.status;
            const matchesChannel = filters.channel === "All" || article.channel === filters.channel;
            const matchesPriority = filters.priority === "All" || article.priority === filters.priority;
            return matchesQuery && matchesStatus && matchesChannel && matchesPriority;
        })
        .sort((first, second) => {
            if (sortMode === "views") return second.views - first.views;
            if (sortMode === "deadline") return first.deadline.localeCompare(second.deadline);
            if (sortMode === "priority") return priorityValue(second) - priorityValue(first);
            if (sortMode === "title") return first.title.localeCompare(second.title);
            return second.updated.localeCompare(first.updated);
        });
}

function NewsroomPage({ theme, onToggleTheme }) {
    const [activeSection, setActiveSection] = useState("overview");
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [articles, setArticles] = useState(initialArticles);
    const [breakingStories, setBreakingStories] = useState(initialBreakingStories);
    const [notifications, setNotifications] = useState(initialNotifications);
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({ status: "All", channel: "All", priority: "All" });
    const [sortMode, setSortMode] = useState("updated");
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [toast, setToast] = useState("");
    const lastTriggerRef = useRef(null);
    const detailCloseRef = useRef(null);

    const metrics = useMemo(() => calculateMetrics(articles, breakingStories), [articles, breakingStories]);
    const filteredArticles = useMemo(() => filterArticles(articles, query, filters, sortMode), [articles, query, filters, sortMode]);
    const unreadCount = notifications.filter((notification) => notification.unread).length;
    const pipelineArticles = statuses.slice(0, 7).map((status) => ({
        status,
        articles: articles.filter((article) => article.status === status).slice(0, 4)
    }));
    const topArticles = [...articles].sort((first, second) => second.views - first.views).slice(0, 5);

    useEffect(() => {
        const previousMeta = {
            title: document.title,
            description: getMetaContent("description"),
            ogTitle: getMetaContent("og:title", "property"),
            ogDescription: getMetaContent("og:description", "property"),
            themeColor: getMetaContent("theme-color")
        };
        const description =
            "An interactive newsroom dashboard simulation for managing editorial workflows, publishing schedules, breaking news, and audience analytics.";

        document.title = "Newsroom OS | Aditia Nugroho";
        setMetaTag("description", description);
        setMetaTag("og:title", "Newsroom OS | Aditia Nugroho", "property");
        setMetaTag("og:description", description, "property");
        setMetaTag("theme-color", "#07111f");

        return () => {
            document.title = previousMeta.title;
            if (previousMeta.description) setMetaTag("description", previousMeta.description);
            if (previousMeta.ogTitle) setMetaTag("og:title", previousMeta.ogTitle, "property");
            if (previousMeta.ogDescription) setMetaTag("og:description", previousMeta.ogDescription, "property");
            if (previousMeta.themeColor) setMetaTag("theme-color", previousMeta.themeColor);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setDrawerOpen(false);
                setSelectedArticle(null);
            }

            if (event.key === "/" && event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") {
                event.preventDefault();
                document.getElementById("newsroom-search")?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (!toast) return undefined;
        const timeout = window.setTimeout(() => setToast(""), 2800);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    useEffect(() => {
        if (selectedArticle) {
            detailCloseRef.current?.focus();
        } else {
            lastTriggerRef.current?.focus();
        }
    }, [selectedArticle]);

    const notify = (message) => setToast(message);
    const selectSection = (sectionId) => {
        setActiveSection(sectionId);
        setDrawerOpen(false);
    };
    const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
    const resetFilters = () => {
        setQuery("");
        setFilters({ status: "All", channel: "All", priority: "All" });
        setSortMode("updated");
        notify("Filters reset.");
    };
    const openArticle = (article, trigger) => {
        lastTriggerRef.current = trigger;
        setSelectedArticle(article);
    };
    const updateArticleStatus = (articleId, nextStatus) => {
        setArticles((current) => current.map((article) => (article.id === articleId ? { ...article, status: nextStatus, updated: "Now" } : article)));
        notify(`Article moved to ${nextStatus}.`);
    };
    const markNotificationRead = (notificationId) => {
        setNotifications((current) => current.map((notification) => notification.id === notificationId ? { ...notification, unread: false } : notification));
        notify("Notification marked as read.");
    };
    const verifyBreakingStory = (storyId) => {
        setBreakingStories((current) => current.map((story) => story.id === storyId ? { ...story, verified: true, status: "Active", lastUpdate: "Now" } : story));
        notify("Breaking story verification updated.");
    };

    return (
        <div className="newsroom-page">
            <aside className="newsroom-sidebar" aria-label="Newsroom sections">
                <div className="newsroom-brand">
                    <span>PD</span>
                    <div>
                        <strong>PulseDesk</strong>
                        <small>Newsroom OS</small>
                    </div>
                </div>
                <nav className="newsroom-nav">
                    {newsroomSections.map((section) => (
                        <button className={activeSection === section.id ? "is-active" : ""} key={section.id} type="button" onClick={() => selectSection(section.id)}>
                            <FontAwesomeIcon icon={sectionIcons[section.icon]} />
                            <span>{section.label}</span>
                        </button>
                    ))}
                </nav>
                <a className="newsroom-back" href="/app" onClick={navigateToApp}>
                    &lt; App Playground
                </a>
            </aside>

            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div className="newsroom-drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="newsroom-mobile-drawer" role="dialog" aria-label="Newsroom mobile navigation">
                            <div className="flex items-center justify-between">
                                <strong>PulseDesk</strong>
                                <button type="button" aria-label="Close navigation" onClick={() => setDrawerOpen(false)}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <nav className="newsroom-nav mt-5">
                                {newsroomSections.map((section) => (
                                    <button className={activeSection === section.id ? "is-active" : ""} key={section.id} type="button" onClick={() => selectSection(section.id)}>
                                        <FontAwesomeIcon icon={sectionIcons[section.icon]} />
                                        <span>{section.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="newsroom-main">
                <header className="newsroom-topbar">
                    <button className="newsroom-icon-button lg:hidden" type="button" aria-label="Open newsroom navigation" onClick={() => setDrawerOpen(true)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div>
                        <p>Interactive frontend simulation using local demo data.</p>
                        <h1>{newsroomSections.find((section) => section.id === activeSection)?.label || "Overview"}</h1>
                    </div>
                    <label className="newsroom-search">
                        <span>Search articles</span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
                        <input id="newsroom-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author, channel, tag" />
                        {query && (
                            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        )}
                    </label>
                    <div className="newsroom-top-actions">
                        <span className="newsroom-live">{NEWSROOM_DATE}</span>
                        <button className="newsroom-icon-button" type="button" aria-label={`${unreadCount} unread notifications`} onClick={() => selectSection("activity")}>
                            <FontAwesomeIcon icon={faBell} />
                            {unreadCount > 0 && <span>{unreadCount}</span>}
                        </button>
                        <DarkModeToggle theme={theme} onToggle={onToggleTheme} />
                    </div>
                </header>

                <main className="newsroom-content">
                    {activeSection === "overview" && (
                        <DashboardOverview metrics={metrics} articles={articles} breakingStories={breakingStories} topArticles={topArticles} />
                    )}
                    {activeSection === "queue" && (
                        <EditorialQueue pipelineArticles={pipelineArticles} onMove={updateArticleStatus} onOpen={openArticle} />
                    )}
                    {activeSection === "articles" && (
                        <ArticlesSection
                            articles={filteredArticles}
                            filters={filters}
                            query={query}
                            sortMode={sortMode}
                            onFilterChange={updateFilter}
                            onReset={resetFilters}
                            onSortChange={setSortMode}
                            onOpen={openArticle}
                            onStatusChange={updateArticleStatus}
                        />
                    )}
                    {activeSection === "schedule" && <ScheduleSection entries={scheduleEntries} onOpen={(entry, trigger) => openArticle(articles.find((article) => article.title === entry.title) || articles[0], trigger)} />}
                    {activeSection === "analytics" && <AnalyticsSection topArticles={topArticles} />}
                    {activeSection === "breaking" && <BreakingSection stories={breakingStories} onVerify={verifyBreakingStory} />}
                    {activeSection === "team" && <TeamSection />}
                    {activeSection === "activity" && <ActivitySection notifications={notifications} onRead={markNotificationRead} />}
                </main>

                <footer className="newsroom-footer">
                    <span><FontAwesomeIcon icon={faCircleInfo} /> Portfolio simulation, not a production CMS.</span>
                    <a href="/app" onClick={navigateToApp}>Back to App Playground</a>
                </footer>
            </div>

            <ArticleDrawer article={selectedArticle} onClose={() => setSelectedArticle(null)} onStatusChange={updateArticleStatus} closeRef={detailCloseRef} />
            <div className="newsroom-toast" role="status" aria-live="polite">
                {toast}
            </div>
        </div>
    );
}

function DashboardOverview({ metrics, articles, breakingStories, topArticles }) {
    const statusCounts = statuses.map((status) => ({ status, count: articles.filter((article) => article.status === status).length }));
    const maxStatus = Math.max(...statusCounts.map((item) => item.count), 1);
    const channelsSummary = channels.map((channel) => {
        const channelArticles = articles.filter((article) => article.channel === channel);
        return {
            channel,
            count: channelArticles.length,
            views: channelArticles.reduce((total, article) => total + article.views, 0),
            lead: channelArticles.sort((first, second) => second.views - first.views)[0]?.title || "No lead story"
        };
    });

    return (
        <section className="newsroom-section" aria-labelledby="overview-title">
            <div className="newsroom-section-heading">
                <span>Overview</span>
                <h2 id="overview-title">Editorial command center</h2>
            </div>
            <div className="newsroom-metrics">
                {metrics.map((metric) => (
                    <article className="newsroom-metric" key={metric.label}>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                        <small>{metric.note}</small>
                    </article>
                ))}
            </div>
            <div className="newsroom-dashboard-grid">
                <TrafficChart />
                <div className="newsroom-panel">
                    <h3>Editorial status</h3>
                    <div className="newsroom-status-list">
                        {statusCounts.map((item) => (
                            <div key={item.status}>
                                <span>{item.status}</span>
                                <strong>{item.count}</strong>
                                <div><i style={{ width: `${(item.count / maxStatus) * 100}%` }} /></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="newsroom-panel newsroom-wide">
                    <h3>Channel performance</h3>
                    <div className="newsroom-channel-grid">
                        {channelsSummary.map((item) => (
                            <article key={item.channel}>
                                <span>{item.channel}</span>
                                <strong>{formatNumber(item.views)} views</strong>
                                <p>{item.count} stories · Lead: {item.lead}</p>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="newsroom-panel">
                    <h3>Breaking coordination</h3>
                    {breakingStories.map((story) => (
                        <p className="newsroom-mini-row" key={story.id}><span>{story.title}</span><strong>{story.status}</strong></p>
                    ))}
                </div>
                <div className="newsroom-panel">
                    <h3>Top story now</h3>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{topArticles[0]?.title}</p>
                    <strong className="mt-3 block text-2xl text-ink dark:text-white">{formatNumber(topArticles[0]?.views || 0)}</strong>
                </div>
            </div>
        </section>
    );
}

function TrafficChart() {
    const width = 640;
    const height = 220;
    const maxViews = Math.max(...trafficByHour.map((point) => point.views));
    const points = trafficByHour.map((point, index) => {
        const x = 32 + (index / (trafficByHour.length - 1)) * (width - 64);
        const y = height - 34 - (point.views / maxViews) * (height - 72);
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="newsroom-panel newsroom-wide">
            <h3>Traffic trend</h3>
            <p className="sr-only">Traffic rises from 12,000 page views at 06:00 to a peak of 39,200 at 18:00.</p>
            <svg className="newsroom-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Hourly page views traffic trend">
                <polyline points={points} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {trafficByHour.map((point, index) => {
                    const x = 32 + (index / (trafficByHour.length - 1)) * (width - 64);
                    const y = height - 34 - (point.views / maxViews) * (height - 72);
                    return <circle key={point.label} cx={x} cy={y} r="5"><title>{point.label}: {formatNumber(point.views)} views</title></circle>;
                })}
                {trafficByHour.map((point, index) => {
                    const x = 32 + (index / (trafficByHour.length - 1)) * (width - 64);
                    return <text key={point.label} x={x} y={height - 8} textAnchor="middle">{point.label}</text>;
                })}
            </svg>
        </div>
    );
}

function EditorialQueue({ pipelineArticles, onMove, onOpen }) {
    return (
        <section className="newsroom-section" aria-labelledby="queue-title">
            <div className="newsroom-section-heading">
                <span>Editorial queue</span>
                <h2 id="queue-title">Pipeline by status</h2>
            </div>
            <div className="newsroom-kanban" aria-label="Editorial workflow columns">
                {pipelineArticles.map((column) => (
                    <div className="newsroom-column" key={column.status}>
                        <h3>{column.status} <span>{column.articles.length}</span></h3>
                        {column.articles.map((article) => (
                            <article className="newsroom-story-card" key={article.id}>
                                <strong>{article.title}</strong>
                                <p>{article.id} · {article.channel} · {article.author}</p>
                                <div className="tag-row">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                                <label>
                                    <span>Move to</span>
                                    <select value={article.status} onChange={(event) => onMove(article.id, event.target.value)}>
                                        {statuses.map((status) => <option key={status}>{status}</option>)}
                                    </select>
                                </label>
                                <button type="button" onClick={(event) => onOpen(article, event.currentTarget)}>Open Article</button>
                            </article>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

function ArticlesSection({ articles, filters, query, sortMode, onFilterChange, onReset, onSortChange, onOpen, onStatusChange }) {
    return (
        <section className="newsroom-section" aria-labelledby="articles-title">
            <div className="newsroom-section-heading">
                <span>Articles</span>
                <h2 id="articles-title">Search, filter, and inspect stories</h2>
                <p>{articles.length} article results{query ? ` for "${query}"` : ""}.</p>
            </div>
            <div className="newsroom-filters">
                <label><span>Status</span><select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value)}><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
                <label><span>Channel</span><select value={filters.channel} onChange={(event) => onFilterChange("channel", event.target.value)}><option>All</option>{channels.map((channel) => <option key={channel}>{channel}</option>)}</select></label>
                <label><span>Priority</span><select value={filters.priority} onChange={(event) => onFilterChange("priority", event.target.value)}><option>All</option>{priorities.map((priority) => <option key={priority}>{priority}</option>)}</select></label>
                <label><span>Sort</span><select value={sortMode} onChange={(event) => onSortChange(event.target.value)}><option value="updated">Recently updated</option><option value="views">Highest views</option><option value="deadline">Deadline soonest</option><option value="priority">Priority</option><option value="title">Title</option></select></label>
                <button type="button" onClick={onReset}><FontAwesomeIcon icon={faRotateLeft} /> Reset</button>
            </div>
            {articles.length === 0 ? (
                <div className="newsroom-empty">No articles match the current search and filters.</div>
            ) : (
                <div className="newsroom-table-wrap">
                    <table className="newsroom-table">
                        <caption>Filtered newsroom articles</caption>
                        <thead><tr><th>Article</th><th>Channel</th><th>Status</th><th>Priority</th><th>Scheduled</th><th>Views</th><th>Actions</th></tr></thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id}>
                                    <td><strong>{article.title}</strong><span>{article.id} · {article.author}</span></td>
                                    <td>{article.channel}</td>
                                    <td><StatusPill value={article.status} /></td>
                                    <td><StatusPill value={article.priority} /></td>
                                    <td>{article.scheduled}</td>
                                    <td>{formatNumber(article.views)}</td>
                                    <td>
                                        <button type="button" onClick={(event) => onOpen(article, event.currentTarget)}>Open Article</button>
                                        <button type="button" onClick={() => onStatusChange(article.id, "Review")}>Move to Review</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="newsroom-mobile-articles">
                        {articles.map((article) => (
                            <article className="newsroom-story-card" key={article.id}>
                                <strong>{article.title}</strong>
                                <p>{article.channel} · {article.author} · {formatNumber(article.views)} views</p>
                                <div className="flex flex-wrap gap-2"><StatusPill value={article.status} /><StatusPill value={article.priority} /></div>
                                <button type="button" onClick={(event) => onOpen(article, event.currentTarget)}>Open Article</button>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

function ScheduleSection({ entries, onOpen }) {
    return (
        <section className="newsroom-section" aria-labelledby="schedule-title">
            <div className="newsroom-section-heading"><span>Publishing schedule</span><h2 id="schedule-title">Today timeline</h2></div>
            <div className="newsroom-timeline">
                {entries.map((entry) => (
                    <article className={entry.conflict ? "has-conflict" : ""} key={entry.id}>
                        <time>{entry.time}</time>
                        <div><strong>{entry.title}</strong><p>{entry.channel} · {entry.editor} · {entry.status}</p>{entry.conflict && <span>Schedule conflict</span>}</div>
                        <button type="button" onClick={(event) => onOpen(entry, event.currentTarget)}>Open</button>
                    </article>
                ))}
            </div>
        </section>
    );
}

function AnalyticsSection({ topArticles }) {
    return (
        <section className="newsroom-section" aria-labelledby="analytics-title">
            <div className="newsroom-section-heading"><span>Analytics</span><h2 id="analytics-title">Audience overview</h2></div>
            <div className="newsroom-dashboard-grid">
                <TrafficChart />
                <DistributionPanel title="Referral sources" items={referralSources} />
                <DistributionPanel title="Device distribution" items={devices.map((item) => ({ source: item.device, value: item.value }))} />
                <div className="newsroom-panel newsroom-wide"><h3>Top articles</h3>{topArticles.map((article, index) => <p className="newsroom-mini-row" key={article.id}><span>{index + 1}. {article.title}</span><strong>{formatNumber(article.views)}</strong></p>)}</div>
            </div>
        </section>
    );
}

function DistributionPanel({ title, items }) {
    return (
        <div className="newsroom-panel">
            <h3>{title}</h3>
            {items.map((item) => (
                <div className="newsroom-distribution" key={item.source}>
                    <span>{item.source}</span><strong>{item.value}%</strong><div><i style={{ width: `${item.value}%` }} /></div>
                </div>
            ))}
        </div>
    );
}

function BreakingSection({ stories, onVerify }) {
    return (
        <section className="newsroom-section" aria-labelledby="breaking-title">
            <div className="newsroom-section-heading"><span>Breaking news</span><h2 id="breaking-title">Coordination center</h2></div>
            <div className="grid gap-4 lg:grid-cols-2">
                {stories.map((story) => (
                    <article className="newsroom-breaking-card" key={story.id}>
                        <div className="flex items-center justify-between gap-3"><StatusPill value={story.severity} /><StatusPill value={story.status} /></div>
                        <h3>{story.title}</h3>
                        <p>{story.team} · {story.updates} live updates · Last update {story.lastUpdate}</p>
                        <ul>{story.checklist.map((item) => <li key={item}><FontAwesomeIcon icon={faCheck} /> {item}</li>)}</ul>
                        <button type="button" onClick={() => onVerify(story.id)}>{story.verified ? "Verification complete" : "Mark verification complete"}</button>
                    </article>
                ))}
            </div>
        </section>
    );
}

function TeamSection() {
    return (
        <section className="newsroom-section" aria-labelledby="team-title">
            <div className="newsroom-section-heading"><span>Team workload</span><h2 id="team-title">Assignments and capacity</h2></div>
            <div className="newsroom-team-grid">
                {teamMembers.map((member) => (
                    <article className="newsroom-team-card" key={member.id}>
                        <div className="newsroom-avatar">{member.initials}</div>
                        <div><h3>{member.name}</h3><p>{member.role}</p></div>
                        <p>{member.assignment}</p>
                        <div className="newsroom-capacity"><span>Workload {member.workload}%</span><div><i style={{ width: `${member.workload}%` }} /></div></div>
                        <small>{member.availability} · Risk {member.risk} · {member.activity}</small>
                    </article>
                ))}
            </div>
        </section>
    );
}

function ActivitySection({ notifications, onRead }) {
    return (
        <section className="newsroom-section" aria-labelledby="activity-title">
            <div className="newsroom-section-heading"><span>Activity</span><h2 id="activity-title">Notifications and newsroom log</h2></div>
            <div className="newsroom-dashboard-grid">
                <div className="newsroom-panel newsroom-wide">
                    <h3>Notifications</h3>
                    {notifications.map((notification) => (
                        <article className={notification.unread ? "newsroom-notification is-unread" : "newsroom-notification"} key={notification.id}>
                            <div><strong>{notification.title}</strong><p>{notification.detail}</p><small>{notification.type} · {notification.time}</small></div>
                            <button type="button" onClick={() => onRead(notification.id)} disabled={!notification.unread}>{notification.unread ? "Mark read" : "Read"}</button>
                        </article>
                    ))}
                </div>
                <div className="newsroom-panel">
                    <h3>Activity feed</h3>
                    {activityItems.map((item) => <p className="newsroom-activity" key={item}><FontAwesomeIcon icon={faChevronRight} /> {item}</p>)}
                </div>
            </div>
        </section>
    );
}

function StatusPill({ value }) {
    return <span className={`newsroom-pill newsroom-pill--${value.toLowerCase().replace(/\s+/g, "-")}`}>{value}</span>;
}

function ArticleDrawer({ article, onClose, onStatusChange, closeRef }) {
    return (
        <AnimatePresence>
            {article && (
                <motion.div className="newsroom-detail-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.aside className="newsroom-detail" role="dialog" aria-modal="true" aria-labelledby="article-detail-title" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}>
                        <button className="newsroom-icon-button" type="button" aria-label="Close article details" onClick={onClose} ref={closeRef}><FontAwesomeIcon icon={faXmark} /></button>
                        <span>{article.id}</span>
                        <h2 id="article-detail-title">{article.title}</h2>
                        <p>{article.summary}</p>
                        <div className="newsroom-detail-grid">
                            <div><span>Channel</span><strong>{article.channel}</strong></div>
                            <div><span>Status</span><strong>{article.status}</strong></div>
                            <div><span>Priority</span><strong>{article.priority}</strong></div>
                            <div><span>Author</span><strong>{article.author}</strong></div>
                            <div><span>Editor</span><strong>{article.editor}</strong></div>
                            <div><span>Updated</span><strong>{article.updated}</strong></div>
                            <div><span>SEO</span><strong>{article.seo}/100</strong></div>
                            <div><span>Readability</span><strong>{article.readability}/100</strong></div>
                        </div>
                        <label className="mt-5 block">
                            <span>Update status</span>
                            <select value={article.status} onChange={(event) => onStatusChange(article.id, event.target.value)}>
                                {statuses.map((status) => <option key={status}>{status}</option>)}
                            </select>
                        </label>
                        <h3>Publishing checklist</h3>
                        <ul>{["Headline approved", `Image ${article.imageStatus.toLowerCase()}`, "SEO reviewed", "Editor assigned"].map((item) => <li key={item}><FontAwesomeIcon icon={faCheck} /> {item}</li>)}</ul>
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default NewsroomPage;
