export const NEWSROOM_DATE = "Monday, 20 July 2026";

export const newsroomSections = [
    { id: "overview", label: "Overview", icon: "gauge" },
    { id: "queue", label: "Editorial Queue", icon: "layers" },
    { id: "articles", label: "Articles", icon: "newspaper" },
    { id: "schedule", label: "Schedule", icon: "calendar" },
    { id: "analytics", label: "Analytics", icon: "chart" },
    { id: "breaking", label: "Breaking News", icon: "bolt" },
    { id: "team", label: "Team", icon: "users" },
    { id: "activity", label: "Activity", icon: "bell" }
];

export const channels = ["National", "Business", "Technology", "Sports", "International", "Lifestyle"];
export const statuses = ["Idea", "Assigned", "Writing", "Editing", "Review", "Scheduled", "Published", "Needs Revision"];
export const priorities = ["Low", "Normal", "High", "Urgent"];

export const teamMembers = [
    { id: "tm-1", name: "Maya Hartono", initials: "MH", role: "Editor in Chief", assignment: "Election live desk", articles: 3, workload: 78, risk: "Medium", availability: "Available", activity: "8 min ago" },
    { id: "tm-2", name: "Rafi Pratama", initials: "RP", role: "Managing Editor", assignment: "Morning briefing", articles: 4, workload: 86, risk: "High", availability: "Busy", activity: "4 min ago" },
    { id: "tm-3", name: "Nadia Siregar", initials: "NS", role: "Technology Editor", assignment: "AI policy package", articles: 2, workload: 62, risk: "Low", availability: "Available", activity: "16 min ago" },
    { id: "tm-4", name: "Dimas Wicaksono", initials: "DW", role: "Journalist", assignment: "Transport reform follow-up", articles: 2, workload: 58, risk: "Low", availability: "Field report", activity: "25 min ago" },
    { id: "tm-5", name: "Clara Wijaya", initials: "CW", role: "Producer", assignment: "Push and homepage modules", articles: 5, workload: 91, risk: "High", availability: "Busy", activity: "2 min ago" },
    { id: "tm-6", name: "Arman Yusuf", initials: "AY", role: "Audience Editor", assignment: "Referral performance", articles: 1, workload: 46, risk: "Low", availability: "Available", activity: "12 min ago" },
    { id: "tm-7", name: "Sofia Tan", initials: "ST", role: "Business Editor", assignment: "Market close analysis", articles: 3, workload: 74, risk: "Medium", availability: "In review", activity: "20 min ago" },
    { id: "tm-8", name: "Kevin Mahendra", initials: "KM", role: "Sports Editor", assignment: "Tournament desk", articles: 2, workload: 55, risk: "Low", availability: "Available", activity: "31 min ago" }
];

export const initialArticles = [
    { id: "NR-1024", title: "Cabinet reviews coastal resilience funding", summary: "A policy explainer on updated infrastructure priorities for flood-prone cities.", channel: "National", author: "Dimas Wicaksono", editor: "Maya Hartono", status: "Review", priority: "High", deadline: "10:30", scheduled: "11:00", views: 18420, updated: "09:52", wordCount: 980, tags: ["Policy", "Infrastructure"], breaking: false, seo: 88, readability: 82, imageStatus: "Approved" },
    { id: "NR-1025", title: "Markets steady after regional rate signal", summary: "A business desk analysis of market reaction and analyst outlook.", channel: "Business", author: "Sofia Tan", editor: "Rafi Pratama", status: "Editing", priority: "High", deadline: "12:00", scheduled: "13:00", views: 22110, updated: "09:44", wordCount: 760, tags: ["Markets", "Economy"], breaking: false, seo: 84, readability: 79, imageStatus: "Pending" },
    { id: "NR-1026", title: "New AI safety guidance reaches schools", summary: "Technology policy coverage on classroom AI guidance and data privacy.", channel: "Technology", author: "Nadia Siregar", editor: "Nadia Siregar", status: "Writing", priority: "Normal", deadline: "14:00", scheduled: "15:30", views: 15340, updated: "09:31", wordCount: 520, tags: ["AI", "Education"], breaking: false, seo: 91, readability: 86, imageStatus: "Needed" },
    { id: "NR-1027", title: "Severe weather disrupts commuter lines", summary: "Live service updates, safety guidance, and agency response timeline.", channel: "National", author: "Maya Hartono", editor: "Rafi Pratama", status: "Published", priority: "Urgent", deadline: "09:00", scheduled: "09:10", views: 68200, updated: "09:58", wordCount: 1120, tags: ["Transport", "Weather"], breaking: true, seo: 93, readability: 81, imageStatus: "Approved" },
    { id: "NR-1028", title: "National team prepares final training camp", summary: "A sports preview with player availability and tactical notes.", channel: "Sports", author: "Kevin Mahendra", editor: "Kevin Mahendra", status: "Scheduled", priority: "Normal", deadline: "16:00", scheduled: "18:00", views: 9400, updated: "08:45", wordCount: 690, tags: ["Football", "Preview"], breaking: false, seo: 80, readability: 88, imageStatus: "Approved" },
    { id: "NR-1029", title: "Weekend guide: independent cinema openings", summary: "Lifestyle roundup for cultural events and cinema releases.", channel: "Lifestyle", author: "Clara Wijaya", editor: "Maya Hartono", status: "Assigned", priority: "Low", deadline: "17:30", scheduled: "19:00", views: 5200, updated: "08:22", wordCount: 240, tags: ["Culture", "Cinema"], breaking: false, seo: 76, readability: 90, imageStatus: "Pending" },
    { id: "NR-1030", title: "Regional summit draft focuses on supply chains", summary: "International desk context on trade resilience and diplomatic priorities.", channel: "International", author: "Rafi Pratama", editor: "Maya Hartono", status: "Needs Revision", priority: "Normal", deadline: "15:00", scheduled: "17:00", views: 8700, updated: "09:12", wordCount: 840, tags: ["Trade", "Diplomacy"], breaking: false, seo: 79, readability: 75, imageStatus: "Approved" },
    { id: "NR-1031", title: "Startup funding shifts toward practical AI tools", summary: "Technology business report on early-stage funding changes.", channel: "Technology", author: "Nadia Siregar", editor: "Sofia Tan", status: "Idea", priority: "Normal", deadline: "Tomorrow", scheduled: "Tomorrow", views: 4100, updated: "07:58", wordCount: 120, tags: ["Startups", "AI"], breaking: false, seo: 70, readability: 84, imageStatus: "Needed" },
    { id: "NR-1032", title: "Small retailers test faster checkout systems", summary: "Business feature on payment upgrades and customer experience.", channel: "Business", author: "Arman Yusuf", editor: "Sofia Tan", status: "Published", priority: "Normal", deadline: "08:00", scheduled: "08:30", views: 17400, updated: "08:36", wordCount: 890, tags: ["Retail", "Payments"], breaking: false, seo: 86, readability: 83, imageStatus: "Approved" },
    { id: "NR-1033", title: "City parks program adds shaded walking routes", summary: "Public service coverage of neighborhood heat mitigation.", channel: "Lifestyle", author: "Clara Wijaya", editor: "Maya Hartono", status: "Review", priority: "Low", deadline: "13:30", scheduled: "16:00", views: 6700, updated: "09:20", wordCount: 610, tags: ["Health", "Cities"], breaking: false, seo: 82, readability: 87, imageStatus: "Approved" },
    { id: "NR-1034", title: "Championship organizer revises ticket policy", summary: "Sports desk update on venue access and refund rules.", channel: "Sports", author: "Kevin Mahendra", editor: "Rafi Pratama", status: "Editing", priority: "High", deadline: "11:30", scheduled: "12:15", views: 12300, updated: "09:40", wordCount: 430, tags: ["Tickets", "Tournament"], breaking: false, seo: 77, readability: 80, imageStatus: "Pending" },
    { id: "NR-1035", title: "Ports reopen after safety inspection", summary: "International logistics update with agency confirmation.", channel: "International", author: "Dimas Wicaksono", editor: "Rafi Pratama", status: "Assigned", priority: "High", deadline: "12:45", scheduled: "14:00", views: 11100, updated: "09:08", wordCount: 340, tags: ["Logistics", "Safety"], breaking: true, seo: 81, readability: 78, imageStatus: "Needed" }
];

export const trafficByHour = [
    { label: "06", views: 12000, engagement: 38 },
    { label: "08", views: 18500, engagement: 42 },
    { label: "10", views: 24200, engagement: 49 },
    { label: "12", views: 31000, engagement: 51 },
    { label: "14", views: 28700, engagement: 47 },
    { label: "16", views: 35400, engagement: 55 },
    { label: "18", views: 39200, engagement: 58 },
    { label: "20", views: 33800, engagement: 52 }
];

export const referralSources = [
    { source: "Search", value: 42 },
    { source: "Direct", value: 24 },
    { source: "Social", value: 18 },
    { source: "Newsletter", value: 10 },
    { source: "Internal Recommendation", value: 6 }
];

export const devices = [
    { device: "Mobile", value: 61 },
    { device: "Desktop", value: 29 },
    { device: "Tablet", value: 10 }
];

export const initialBreakingStories = [
    { id: "br-1", title: "Commuter disruption live desk", severity: "High", status: "Active", team: "National desk", verified: false, updates: 7, lastUpdate: "4 min ago", checklist: ["Source verified", "Headline approved", "Push notification prepared"] },
    { id: "br-2", title: "Port reopening confirmation", severity: "Medium", status: "Monitoring", team: "International desk", verified: true, updates: 3, lastUpdate: "18 min ago", checklist: ["Source verified", "Homepage placement active"] }
];

export const scheduleEntries = [
    { id: "sch-1", time: "09:10", title: "Severe weather disrupts commuter lines", channel: "National", editor: "Rafi Pratama", status: "Published", conflict: false },
    { id: "sch-2", time: "11:00", title: "Cabinet reviews coastal resilience funding", channel: "National", editor: "Maya Hartono", status: "Review", conflict: false },
    { id: "sch-3", time: "12:15", title: "Championship organizer revises ticket policy", channel: "Sports", editor: "Rafi Pratama", status: "Editing", conflict: true },
    { id: "sch-4", time: "13:00", title: "Markets steady after regional rate signal", channel: "Business", editor: "Sofia Tan", status: "Editing", conflict: true },
    { id: "sch-5", time: "15:30", title: "New AI safety guidance reaches schools", channel: "Technology", editor: "Nadia Siregar", status: "Writing", conflict: false },
    { id: "sch-6", time: "18:00", title: "National team prepares final training camp", channel: "Sports", editor: "Kevin Mahendra", status: "Scheduled", conflict: false }
];

export const initialNotifications = [
    { id: "nt-1", title: "Homepage slot conflict detected", detail: "Sports and Business stories share the same priority window.", type: "Warning", unread: true, time: "3 min ago" },
    { id: "nt-2", title: "Breaking story needs verification", detail: "Commuter disruption desk still has one pending checklist item.", type: "Breaking", unread: true, time: "6 min ago" },
    { id: "nt-3", title: "Article moved to review", detail: "Cabinet resilience story is ready for final editor pass.", type: "Workflow", unread: false, time: "20 min ago" },
    { id: "nt-4", title: "Audience trend rising", detail: "Technology coverage is outperforming the morning baseline.", type: "Analytics", unread: true, time: "32 min ago" }
];

export const activityItems = [
    "Maya Hartono approved headline for NR-1024.",
    "Clara Wijaya updated homepage modules.",
    "Rafi Pratama requested revision on NR-1030.",
    "Nadia Siregar added AI policy source notes.",
    "Audience desk flagged high referral growth from Search.",
    "Sports desk scheduled final training camp preview."
];
