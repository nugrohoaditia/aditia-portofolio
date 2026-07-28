export const profile = {
    name: "Aditia Nugroho",
    subtitle: "Senior Software Engineer | React & PHP | High-Traffic Web Platforms",
    summary:
        "Senior Software Engineer with 8+ years of experience building, maintaining, and scaling high-traffic web platforms using React, PHP, and JavaScript. I focus on reliable product delivery, clean code, system reliability, API integration, and practical frontend architecture.",
    email: "nugrohoaditia46@gmail.com",
    phone: "+62-812-9172-3823",
    whatsapp: "6281291723823",
    linkedin: "https://linkedin.com/in/aditianugroho23",
    resumeUrl: "/assets/CV_Aditia_Nugroho_Senior_Software_Engineer_EN.pdf",
    resumeUrls: {
        EN: "/assets/CV_Aditia_Nugroho_Senior_Software_Engineer_EN.pdf",
        ID: "/assets/CV_Aditia_Nugroho_Senior_Software_Engineer_ID.pdf"
    },
    image: "/assets/images/aditia-nugroho-casual.jpg",
    logo: "/assets/images/logo_trans.png",
    darkLogo: "/assets/images/logo.png",
    binusLogo: "/assets/images/binus-university-logo.svg"
};

export function getResumeUrl(language) {
    return profile.resumeUrls[language];
}

export const experiences = [
    {
        period: "Nov 2021 - Present",
        company: "PT. Trans Digital Media (Detikcom)",
        title: "Software Engineer (Frontend Web)",
        location: "Jakarta, Indonesia",
        description:
            "Frontend development and maintenance for 8+ high-traffic news and lifestyle platforms across the Detik network.",
        responsibilities: [
            "Completed 460+ development tickets across CNN Indonesia, CNBC Indonesia, Rekomendit, FYB, Beautynesia, Haibunda, and other Detik network platforms.",
            "Managed the end-to-end UI redesign for InsertLive and helped deliver the modernization within a tight 1-month timeline with zero operational disruption.",
            "Built a reusable Vertical Video component adopted across multiple media portals to reduce repeated development work for future rollouts.",
            "Resolved 45+ critical production issues through Kibana monitoring and completed 20+ SonarQube optimization tasks to keep the codebase clean and maintainable.",
            "Guided pre-merge code reviews, kept functions modular, and helped distribute team workloads so the team could meet collective KPIs."
        ],
        technologies: ["PHP", "ReactJS", "JavaScript", "Git", "AMP", "Jest", "PHPUnit", "Phalcon", "Kibana", "SonarQube"]
    },
    {
        period: "Jan 2019 - Nov 2021",
        company: "PT. Sigma Cipta Caraka (Telkomsigma)",
        title: "Technical ERP Consultant",
        location: "Jakarta, Indonesia",
        description:
            "Built custom web solutions and Oracle E-Business Suite integrations for enterprise digital transformation.",
        responsibilities: [
            "Developed custom web solutions to modernize Supply Chain and E-Invoice processes for enterprise clients.",
            "Built integration pipelines between frontend web applications and Oracle databases for real-time data synchronization.",
            "Managed and optimized Oracle E-Business Suite databases to maintain data integrity and reliable system performance.",
            "Generated complex business reports using Oracle SaaS and RTF Report to support data-driven management decisions."
        ],
        technologies: ["PHP", "PL/SQL", "Oracle EBS", "RTF Report", "TOAD", "E-Invoice", "Supply Chain"]
    },
    {
        period: "Nov 2017 - Dec 2018",
        company: "PT. Label Inovasi Indonesia (Label Ideas & Co)",
        title: "Web Developer (Frontend)",
        location: "Jakarta, Indonesia",
        description:
            "Created responsive client websites with CMS and database integrations.",
        responsibilities: [
            "Built responsive, cross-browser compatible frontend platforms for various clients using HTML, SCSS, and JavaScript.",
            "Integrated custom user interfaces with CMS and MySQL using CodeIgniter to support dynamic content updates.",
            "Collaborated with cross-functional teams to implement CMS solutions and database integrations."
        ],
        technologies: ["HTML5", "CSS3", "SCSS", "JavaScript", "PHP", "MySQL", "CMS", "CodeIgniter"]
    },
    {
        period: "May 2017 - Nov 2017",
        company: "PT. IBM Indonesia",
        title: "Application Developer Intern",
        location: "Jakarta, Indonesia",
        description:
            "Supported frontend and backend development while applying IBM Design Thinking to user-centered solutions.",
        responsibilities: [
            "Assisted in developing cross-platform mobile applications using React Native and Ionic.",
            "Applied IBM Design Thinking methods to map user journeys and build features aligned with client requirements.",
            "Supported frontend and backend development using HTML, CSS, NodeJS, PHP, and Laravel."
        ],
        technologies: ["HTML5", "CSS3", "NodeJS", "PHP", "Laravel", "React Native", "Ionic"]
    }
];

export const skillGroups = [
    {
        title: "Frontend Delivery",
        summary: "Daily work delivering reliable UI for high-traffic, content-heavy media platforms.",
        skills: [
            "ReactJS",
            "JavaScript",
            "HTML5",
            "CSS3",
            "SCSS",
            "AMP",
            "Responsive UI",
            "React Native",
            "Ionic"
        ]
    },
    {
        title: "Backend & Integration",
        summary: "Experience connecting web platforms with APIs, CMS workflows, and enterprise systems.",
        skills: [
            "PHP",
            "Laravel",
            "Phalcon",
            "CodeIgniter",
            "Node.js",
            "MySQL",
            "SQL",
            "PL/SQL",
            "REST API Integration",
            "Oracle EBS",
            "E-Invoicing",
            "Supply Chain Integrations"
        ]
    },
    {
        title: "Quality & Workflow",
        summary: "Tools used for testing, production monitoring, clean code maintenance, and team delivery.",
        skills: [
            "Git",
            "Jest",
            "PHPUnit",
            "JIRA",
            "SonarQube",
            "Kibana",
            "Redmine",
            "TOAD",
            "CMS",
            "IBM Design Thinking"
        ]
    }
];

export const projects = [
    {
        name: "cnnindonesia.com",
        badge: "CNN",
        image: "/assets/images/projects/cnnindonesia.png",
        url: "https://www.cnnindonesia.com",
        description:
            "High-traffic news platform work covering frontend feature delivery, reusable components, production maintenance, and API-backed content pages.",
        technologies: ["React", "PHP", "JavaScript", "AMP"],
        role: "Frontend feature delivery and platform maintenance"
    },
    {
        name: "cnbcindonesia.com",
        badge: "CNBC",
        image: "/assets/images/projects/cnbcindonesia.png",
        url: "https://www.cnbcindonesia.com",
        description:
            "Business and market news platform work across responsive content pages, reusable modules, frontend delivery, and production support.",
        technologies: ["React", "PHP", "JavaScript", "AMP"],
        role: "Frontend implementation and platform maintenance"
    },
    {
        name: "haibunda.com",
        badge: "HB",
        image: "/assets/images/projects/haibunda.webp",
        url: "https://www.haibunda.com",
        description:
            "Parenting and family media platform work focused on mobile-first content pages, reusable UI patterns, and CMS-backed delivery.",
        technologies: ["React", "PHP", "JavaScript", "AMP"],
        role: "Frontend feature delivery and platform maintenance"
    },
    {
        name: "insertlive.com",
        badge: "IN",
        image: "/assets/images/projects/insertlive.webp",
        url: "https://www.insertlive.com",
        description:
            "Entertainment media platform work including UI modernization, responsive interfaces, reusable frontend components, CMS-integrated pages, and production support.",
        technologies: ["React", "PHP", "JavaScript", "AMP"],
        role: "Frontend feature delivery, UI redesign support, and platform maintenance"
    },
    {
        name: "beautynesia.id",
        badge: "BN",
        image: "/assets/images/projects/beautynesia.png",
        url: "https://www.beautynesia.id",
        description:
            "Lifestyle platform work focused on clean UI patterns, mobile-first pages, content modules, and maintainable frontend behavior.",
        technologies: ["React", "PHP", "JavaScript", "AMP"],
        role: "Frontend feature delivery and platform maintenance"
    },
    {
        name: "Detik Network Platforms",
        badge: "Detikcom",
        image: "/assets/images/projects/detikcom.png",
        url: "https://www.detik.com",
        description:
            "Contributions across 8+ Detik network platforms, including cnbcindonesia.com, haibunda.com, cxomedia.id, fyb.detik.com, rekomendit.detik.com, and reusable media components.",
        technologies: ["PHP", "ReactJS", "JavaScript", "AMP", "Jest", "PHPUnit", "Kibana", "SonarQube"],
        role: "Cross-platform feature delivery and platform maintenance"
    }
];

export const education = [
    {
        degree: "Master of Management Information Systems",
        institution: "Bina Nusantara University",
        period: "2024 - 2025",
        gpa: "4.00",
        focus: "Digital Transformation, System Integration, and Business Strategy",
        logo: "/assets/images/Logo_Binus_University.jpg"
    },
    {
        degree: "Bachelor of Computer Science",
        institution: "Bina Nusantara University",
        period: "2013 - 2017",
        gpa: "2.84",
        focus: "Computer Science and software development foundations",
        logo: "/assets/images/Logo_Binus_University.jpg"
    }
];

export const localizedPortfolioContent = {
    EN: {
        experiences,
        skillGroups,
        projects,
        education
    },
    ID: {
        experiences: [
            {
                period: "Nov 2021 - Sekarang",
                company: "PT. Trans Digital Media (Detikcom)",
                title: "Software Engineer (Frontend Web)",
                location: "Jakarta, Indonesia",
                description:
                    "Frontend development dan maintenance untuk 8+ platform berita dan lifestyle bertrafik tinggi di jaringan Detik.",
                responsibilities: [
                    "Merampungkan 460+ tiket development untuk CNN Indonesia, CNBC Indonesia, Rekomendit, FYB, Beautynesia, Haibunda, dan platform Detik network lainnya.",
                    "Mengelola end-to-end UI redesign untuk InsertLive dan membantu proses modernisasi selesai dalam timeline ketat 1 bulan dengan zero operational disruption.",
                    "Membangun komponen Vertical Video yang reusable dan diadopsi di berbagai portal media untuk mengurangi development berulang pada rollout berikutnya.",
                    "Menyelesaikan 45+ critical production issues melalui monitoring Kibana dan 20+ SonarQube optimization tasks agar codebase tetap bersih dan maintainable.",
                    "Memandu pre-merge code review, menjaga fungsi tetap modular, dan membantu distribusi workload agar tim mencapai KPI kolektif."
                ],
                technologies: ["PHP", "ReactJS", "JavaScript", "Git", "AMP", "Jest", "PHPUnit", "Phalcon", "Kibana", "SonarQube"]
            },
            {
                period: "Jan 2019 - Nov 2021",
                company: "PT. Sigma Cipta Caraka (Telkomsigma)",
                title: "Technical ERP Consultant",
                location: "Jakarta, Indonesia",
                description:
                    "Membangun solusi web kustom dan integrasi Oracle E-Business Suite untuk transformasi digital enterprise.",
                responsibilities: [
                    "Mengembangkan solusi web kustom untuk memodernisasi proses Supply Chain dan E-Invoice pada klien enterprise.",
                    "Membangun integration pipeline antara aplikasi web frontend dan database Oracle untuk sinkronisasi data secara real-time.",
                    "Mengelola dan mengoptimalkan database Oracle E-Business Suite untuk menjaga integritas data dan performa sistem yang andal.",
                    "Membuat laporan bisnis kompleks menggunakan Oracle SaaS dan RTF Report untuk mendukung keputusan manajemen berbasis data."
                ],
                technologies: ["PHP", "PL/SQL", "Oracle EBS", "RTF Report", "TOAD", "E-Invoice", "Supply Chain"]
            },
            {
                period: "Nov 2017 - Des 2018",
                company: "PT. Label Inovasi Indonesia (Label Ideas & Co)",
                title: "Web Developer (Frontend)",
                location: "Jakarta, Indonesia",
                description:
                    "Membangun website klien yang responsif dengan integrasi CMS dan database.",
                responsibilities: [
                    "Membangun platform frontend yang responsif dan cross-browser compatible untuk berbagai klien menggunakan HTML, SCSS, dan JavaScript.",
                    "Mengintegrasikan user interface kustom dengan CMS dan MySQL menggunakan CodeIgniter untuk mendukung pembaruan konten dinamis.",
                    "Berkolaborasi dengan tim lintas fungsi untuk mengimplementasikan solusi CMS dan integrasi database."
                ],
                technologies: ["HTML5", "CSS3", "SCSS", "JavaScript", "PHP", "MySQL", "CMS", "CodeIgniter"]
            },
            {
                period: "Mei 2017 - Nov 2017",
                company: "PT. IBM Indonesia",
                title: "Application Developer Intern",
                location: "Jakarta, Indonesia",
                description:
                    "Mendukung frontend dan backend development sambil menerapkan IBM Design Thinking untuk solusi yang berpusat pada pengguna.",
                responsibilities: [
                    "Membantu development aplikasi mobile cross-platform menggunakan React Native dan Ionic.",
                    "Menerapkan IBM Design Thinking untuk memetakan user journey dan membangun fitur sesuai kebutuhan klien.",
                    "Mendukung frontend dan backend development menggunakan HTML, CSS, NodeJS, PHP, dan Laravel."
                ],
                technologies: ["HTML5", "CSS3", "NodeJS", "PHP", "Laravel", "React Native", "Ionic"]
            }
        ],
        skillGroups: [
            {
                title: "Frontend Delivery",
                summary: "Pekerjaan harian dalam merilis UI yang andal untuk platform media bertrafik tinggi dan kaya konten.",
                skills: skillGroups[0].skills
            },
            {
                title: "Backend & Integrasi",
                summary: "Pengalaman menghubungkan platform web dengan API, workflow CMS, dan sistem enterprise.",
                skills: skillGroups[1].skills
            },
            {
                title: "Quality & Workflow",
                summary: "Tools untuk testing, production monitoring, clean code maintenance, dan delivery tim.",
                skills: skillGroups[2].skills
            }
        ],
        projects: [
            {
                ...projects[0],
                description:
                    "Pekerjaan pada platform berita bertrafik tinggi, mencakup frontend feature delivery, reusable component, production maintenance, dan halaman konten berbasis API.",
                role: "Frontend feature delivery dan platform maintenance"
            },
            {
                ...projects[1],
                description:
                    "Pekerjaan pada platform berita bisnis dan market, mencakup halaman responsif, reusable module, frontend delivery, dan production support.",
                role: "Frontend implementation dan platform maintenance"
            },
            {
                ...projects[2],
                description:
                    "Pekerjaan pada platform parenting dan family media, berfokus pada halaman mobile-first, pola UI reusable, dan delivery berbasis CMS.",
                role: "Frontend feature delivery dan platform maintenance"
            },
            {
                ...projects[3],
                description:
                    "Pekerjaan pada platform entertainment media, termasuk UI modernization, responsive interface, reusable frontend component, halaman terintegrasi CMS, dan production support.",
                role: "Frontend feature delivery, dukungan UI redesign, dan platform maintenance"
            },
            {
                ...projects[4],
                description:
                    "Pekerjaan pada platform lifestyle, berfokus pada pola UI yang bersih, halaman mobile-first, modul konten, dan behavior frontend yang maintainable.",
                role: "Frontend feature delivery dan platform maintenance"
            },
            {
                ...projects[5],
                description:
                    "Kontribusi di 8+ platform Detik network, termasuk cnbcindonesia.com, haibunda.com, cxomedia.id, fyb.detik.com, rekomendit.detik.com, dan reusable media components.",
                role: "Cross-platform feature delivery dan platform maintenance"
            }
        ],
        education: [
            {
                ...education[0],
                degree: "Magister Sistem Informasi Manajemen",
                focus: "Transformasi Digital, Integrasi Sistem, dan Strategi Bisnis"
            },
            {
                ...education[1],
                degree: "Sarjana Teknik Informatika",
                focus: "Dasar ilmu komputer dan pengembangan perangkat lunak"
            }
        ]
    }
};
