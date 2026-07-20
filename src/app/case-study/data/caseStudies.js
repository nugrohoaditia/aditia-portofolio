import { experiences, projects } from "../../../data";

const detikExperience = experiences.find((experience) => experience.company.includes("Detikcom"));
const currentPeriod = detikExperience?.period || "Nov 2021 - Present";
const currentCompany = detikExperience?.company || "PT. Trans Digital Media (Detikcom)";

function findProject(name) {
    return projects.find((project) => project.name === name);
}

function buildSnapshot(project, extra = []) {
    return [
        { label: "Role", value: project.role },
        { label: "Organization", value: currentCompany },
        { label: "Period", value: currentPeriod },
        { label: "Project type", value: "Public media platform" },
        { label: "Platform", value: "Responsive web" },
        { label: "Technology", value: project.technologies.join(", ") },
        ...extra
    ];
}

const sharedProcess = [
    {
        title: "Audit the existing surface",
        body: "Reviewed existing pages, repeated UI patterns, content modules, and production behavior before changing implementation details."
    },
    {
        title: "Clarify the feature shape",
        body: "Aligned implementation with available content data, API behavior, editorial needs, and existing release constraints."
    },
    {
        title: "Build reusable frontend pieces",
        body: "Implemented UI sections as reusable modules so repeated page patterns could be maintained with less duplicate work."
    },
    {
        title: "Integrate and stabilize",
        body: "Connected frontend behavior with PHP-backed platform work, handled production fixes, and supported safer releases with tests where practical."
    }
];

const sharedArchitecture = {
    description:
        "The public case study uses a simplified architecture view. It explains the delivery pattern without exposing private implementation details, API hosts, internal services, or repository structure.",
    nodes: [
        { label: "Visitor", detail: "Reads a responsive content page on mobile, tablet, or desktop." },
        { label: "Frontend UI", detail: "React and JavaScript modules render reusable page sections." },
        { label: "Platform Layer", detail: "PHP-backed application logic supports content delivery and integration." },
        { label: "Content Source", detail: "CMS or API-backed content is transformed into public page experiences." },
        { label: "Quality Loop", detail: "Testing, issue review, and production support improve stability over time." }
    ]
};

const sharedCodeHighlights = [
    {
        title: "Data-driven project rendering",
        language: "React",
        context: "Sanitized portfolio pattern",
        explanation:
            "The important pattern is separating project content from rendering so repeated platform cards or sections can be maintained without duplicating markup.",
        code: `const visibleProjects = projects.filter((project) => project.url);

return visibleProjects.map((project) => (
  <ProjectCard
    key={project.name}
    title={project.name}
    description={project.description}
    technologies={project.technologies}
  />
));`
    },
    {
        title: "Safe optional link handling",
        language: "JavaScript",
        context: "Sanitized UI guard",
        explanation:
            "Public pages should only render links that are intentionally available. Private repositories, internal URLs, and unavailable assets are omitted.",
        code: `function getPublicLinks(project) {
  return [
    project.url && {
      label: "Open live project",
      href: project.url,
      external: true
    }
  ].filter(Boolean);
}`
    }
];

const cnnProject = findProject("cnnindonesia.com");
const cnbcProject = findProject("cnbcindonesia.com");
const detikProject = findProject("Detik Network Platforms");

export const caseStudies = [
    {
        id: "cnn-indonesia",
        title: cnnProject.name,
        shortTitle: "CNN Indonesia",
        category: "News Platform",
        project: cnnProject,
        role: cnnProject.role,
        period: currentPeriod,
        summary: cnnProject.description,
        accent: "cyan",
        confidentialityNote:
            "This public case study generalizes internal implementation details and focuses on safe, portfolio-level engineering decisions.",
        snapshot: buildSnapshot(cnnProject, [
            { label: "Primary users", value: "News readers and editorial platform users" },
            { label: "Status", value: "Public website" }
        ]),
        context: [
            "CNN Indonesia is represented in the portfolio as a news platform project involving frontend feature delivery, reusable modules, production maintenance, and API-backed content pages.",
            "The work sits in a content-heavy environment where readers expect pages to load predictably across devices while editorial teams need maintainable page modules for repeated publishing patterns."
        ],
        problem: {
            body: [
                "Media pages often combine article content, related modules, navigation, ads, tracking scripts, and responsive presentation in the same user journey.",
                "The practical challenge was keeping frontend delivery maintainable while supporting production pages, API-backed content, and repeated feature work without introducing unnecessary duplication."
            ],
            highlights: [
                "Responsive content pages must stay readable across many viewport sizes.",
                "Reusable modules help reduce repeated implementation work.",
                "Production support requires careful changes that respect existing behavior."
            ]
        },
        goals: [
            "Deliver frontend features that fit existing platform behavior.",
            "Use reusable modules for repeated page patterns.",
            "Support responsive and API-backed content presentation.",
            "Improve maintainability without overstating unverified performance numbers."
        ],
        constraints: [
            "Existing public website behavior had to be preserved.",
            "Private API details and internal architecture are not included in this public case study.",
            "The case study uses qualitative outcomes because verified metrics are not stored in the repository."
        ],
        responsibilities: detikExperience?.responsibilities || [],
        process: sharedProcess,
        solutions: [
            {
                title: "Reusable content modules",
                problem: "Repeated media page sections can become difficult to maintain when every page recreates similar UI behavior.",
                approach: "Favor shared frontend modules and clear component boundaries for repeated content patterns.",
                tradeoff: "Reusable modules require discipline around props and states, but reduce repeated page-level work.",
                result: "A more practical structure for ongoing feature delivery and production maintenance."
            },
            {
                title: "Responsive-first page delivery",
                problem: "News readers move between mobile, tablet, and desktop contexts.",
                approach: "Keep layout decisions focused on readable content, predictable spacing, and mobile behavior.",
                tradeoff: "Complex desktop layouts need to collapse cleanly instead of simply shrinking.",
                result: "A steadier reading experience across the devices represented by the portfolio."
            }
        ],
        architecture: sharedArchitecture,
        userFlow: [
            "Reader opens a public news page.",
            "The frontend shell renders navigation, article areas, and supporting modules.",
            "API-backed or CMS-backed content is presented through page sections.",
            "Responsive rules adapt the layout for the current device.",
            "Production feedback and issue review inform follow-up fixes."
        ],
        challenges: [
            {
                title: "Balancing reuse with platform specifics",
                options: "Duplicate sections per page or create shared modules with clear variation points.",
                decision: "Use reusable frontend and backend modules where repeated behavior justified it.",
                tradeoff: "Shared modules need careful testing because one change can affect several surfaces."
            },
            {
                title: "Public storytelling without internal detail",
                options: "Show exact architecture or present a sanitized architecture model.",
                decision: "Use simplified diagrams and qualitative explanations.",
                tradeoff: "The diagram is less specific, but it avoids exposing private implementation details."
            }
        ],
        codeHighlights: sharedCodeHighlights,
        comparisons: [
            { before: "Repeated feature work can become fragmented across pages.", after: "Shared modules make repeated UI behavior easier to adjust." },
            { before: "Device-specific issues may appear late in production support.", after: "Responsive review is treated as part of feature delivery." }
        ],
        results: [
            "Frontend feature delivery and platform maintenance are represented clearly without confidential detail.",
            "Reusable module work is explained as a maintainability improvement rather than an invented metric.",
            "The public story connects product context, implementation decisions, and trade-offs."
        ],
        lessons: [
            "In media platforms, maintainability is a product concern because page modules are used repeatedly.",
            "A public case study can be useful without exposing internal services or precise private architecture.",
            "Qualitative engineering outcomes are better than unsupported numbers."
        ]
    },
    {
        id: "cnbc-indonesia",
        title: cnbcProject.name,
        shortTitle: "CNBC Indonesia",
        category: "Business News Platform",
        project: cnbcProject,
        role: cnbcProject.role,
        period: currentPeriod,
        summary: cnbcProject.description,
        accent: "blue",
        confidentialityNote:
            "This version avoids internal platform details and describes the public engineering shape at a safe level.",
        snapshot: buildSnapshot(cnbcProject, [
            { label: "Primary users", value: "Business and market news readers" },
            { label: "Status", value: "Public website" }
        ]),
        context: [
            "CNBC Indonesia is listed in the portfolio as a business and market news platform involving responsive content pages, frontend delivery, reusable modules, and production support.",
            "Business news pages need a presentation layer that can handle dense content while staying readable and maintainable."
        ],
        problem: {
            body: [
                "Content-heavy business pages can accumulate repeated modules, layout variants, and production edge cases.",
                "The engineering work needed to support practical feature delivery while keeping UI behavior consistent across responsive views."
            ],
            highlights: [
                "Dense content requires clear hierarchy.",
                "Repeated modules need predictable implementation patterns.",
                "Production maintenance benefits from testable, contained changes."
            ]
        },
        goals: [
            "Support responsive content pages for business and market news.",
            "Keep frontend changes compatible with existing platform behavior.",
            "Use maintainable UI patterns for repeated content modules.",
            "Support production fixes without exposing private operational data."
        ],
        constraints: [
            "Existing production pages and public routes had to remain stable.",
            "Internal data flows are generalized for public presentation.",
            "Verified traffic, revenue, or performance metrics are not available in repository data."
        ],
        responsibilities: detikExperience?.responsibilities || [],
        process: sharedProcess,
        solutions: [
            {
                title: "Clear content hierarchy",
                problem: "Business news pages can be dense and difficult to scan if modules compete visually.",
                approach: "Use structured frontend sections with clearer responsibility and spacing decisions.",
                tradeoff: "A restrained UI may feel less decorative, but improves scanability for repeated reading.",
                result: "A more maintainable basis for content-heavy page experiences."
            },
            {
                title: "Production-aware implementation",
                problem: "Small UI changes can affect existing reader journeys and platform behavior.",
                approach: "Implement changes within established platform boundaries and support fixes after release.",
                tradeoff: "This favors careful incremental work over broad rewrites.",
                result: "Frontend delivery stays aligned with production support needs."
            }
        ],
        architecture: sharedArchitecture,
        userFlow: [
            "Reader opens a business news page.",
            "The responsive layout prioritizes content hierarchy and supporting modules.",
            "Frontend sections render content from the platform layer.",
            "Production feedback informs bug fixes or optimization work."
        ],
        challenges: [
            {
                title: "Keeping dense pages readable",
                options: "Add more visual treatment or simplify hierarchy around content needs.",
                decision: "Favor readable structure and restrained UI decisions.",
                tradeoff: "Less decorative UI, stronger repeated-use experience."
            }
        ],
        codeHighlights: sharedCodeHighlights,
        comparisons: [
            { before: "Dense modules risk competing for attention.", after: "Structured hierarchy makes content easier to scan." },
            { before: "Feature changes can be isolated only at page level.", after: "Reusable patterns support safer repeated changes." }
        ],
        results: [
            "The case study explains responsive content delivery without claiming unavailable metrics.",
            "Engineering decisions are framed around maintainability and production stability."
        ],
        lessons: [
            "The best UI decision for a dense content product is often restraint.",
            "Production maintenance work deserves clear explanation because it is part of real engineering value."
        ]
    },
    {
        id: "detik-network",
        title: detikProject.name,
        shortTitle: "Detik Network",
        category: "Cross-platform Media Work",
        project: detikProject,
        role: detikProject.role,
        period: currentPeriod,
        summary: detikProject.description,
        accent: "green",
        confidentialityNote:
            "Brand names and public project names come from the portfolio. Internal systems, repositories, and implementation details are intentionally omitted.",
        snapshot: buildSnapshot(detikProject, [
            { label: "Scope", value: detikProject.description },
            { label: "Status", value: "Selected public portfolio work" }
        ]),
        context: [
            "The Detik Network Platforms entry summarizes cross-platform contributions across several public media products listed in the portfolio.",
            "This case study focuses on the engineering pattern behind that work: repeated frontend delivery, PHP integration, production support, and testing across a network context."
        ],
        problem: {
            body: [
                "A network of platforms increases the value of reusable thinking because similar feature needs can appear across different products.",
                "At the same time, each brand surface may have its own content context and visual expectations, so shared implementation must allow practical variation."
            ],
            highlights: [
                "Cross-platform work benefits from reusable modules.",
                "Brand-specific needs require flexible implementation.",
                "Testing and production support help reduce release risk."
            ]
        },
        goals: [
            "Support cross-platform feature delivery across listed public products.",
            "Create reusable frontend and backend modules for repeated work.",
            "Handle production issues, optimization, and user experience improvements.",
            "Use Jest and PHPUnit where applicable to support safer releases."
        ],
        constraints: [
            "Different public products can have different content and UI expectations.",
            "Internal architecture and operational details are not public.",
            "The repository does not contain verified numeric outcomes, so the case study avoids metric claims."
        ],
        responsibilities: detikExperience?.responsibilities || [],
        process: sharedProcess,
        solutions: [
            {
                title: "Shared engineering patterns",
                problem: "Repeated needs across products can lead to duplicated logic.",
                approach: "Use reusable modules and consistent implementation patterns when the behavior is shared.",
                tradeoff: "Shared code must remain flexible enough for product-specific differences.",
                result: "Future feature work has a clearer starting point."
            },
            {
                title: "Testing and release support",
                problem: "Changes across a platform network need confidence before and after release.",
                approach: "Use Jest and PHPUnit where applicable, then support production issue review and fixes.",
                tradeoff: "Tests cannot replace manual product judgment, but they help catch predictable regressions.",
                result: "A safer delivery habit for ongoing platform work."
            }
        ],
        architecture: sharedArchitecture,
        userFlow: [
            "A product requirement or production issue is reviewed.",
            "Reusable patterns and existing modules are checked before implementation.",
            "Frontend and PHP-backed changes are integrated within platform boundaries.",
            "Testing and review support release confidence.",
            "Production feedback informs follow-up maintenance."
        ],
        challenges: [
            {
                title: "Reusable but not rigid",
                options: "Create one-off implementations or centralize every variation.",
                decision: "Use reusable modules for repeated patterns while leaving room for product differences.",
                tradeoff: "Some duplication can be acceptable when abstraction would hide important product context."
            },
            {
                title: "Explaining network work publicly",
                options: "List every internal detail or summarize the safe public contribution.",
                decision: "Summarize work around public platforms, technologies, responsibilities, and safe diagrams.",
                tradeoff: "Less private detail, but better portfolio clarity and confidentiality."
            }
        ],
        codeHighlights: sharedCodeHighlights,
        comparisons: [
            { before: "Repeated work can be solved differently per product.", after: "Shared patterns create a more consistent delivery model." },
            { before: "Release support can rely mostly on manual checks.", after: "Tests and production review add a safer feedback loop." }
        ],
        results: [
            "The cross-platform work is presented as a real engineering story using public portfolio data.",
            "The page explains maintainability, production support, and testing without exposing confidential details."
        ],
        lessons: [
            "Reuse works best when it respects product differences.",
            "Production support is not separate from engineering quality; it is feedback from real use.",
            "A good case study can state trade-offs plainly instead of sounding inflated."
        ]
    }
].filter((caseStudy) => caseStudy.project);

export const defaultCaseStudyId = caseStudies[0]?.id || null;
