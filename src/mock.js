// Mock data for Orbit Digital University clone (frontend-only, mock)
export const LOGO =
  "https://customer-assets-39nsmqrw.emergentagent.net/job_035253ac-cc47-48ed-9c16-d4b73ebc6a3e/artifacts/xqd1d1dw_image.png";

export const IMG = {
  lecture: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66",
  collab: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  textbooks: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
  video: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
  study: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
  grad1: "https://images.unsplash.com/photo-1685401704618-fd8243812ef7",
  grad2: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
  gradPortrait: "https://images.unsplash.com/photo-1704452607333-f0e189d7e2cc",
  // Smart LMS — bright classroom of students
  lmsClass: "https://images.unsplash.com/photo-1758270704524-596810e891b5",
  // Hero background imagery (subtle) per faculty
  bgManagement: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  bgManagement2: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  bgCommerce: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e",
  bgTech: "https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee",
  bgTech2: "https://images.unsplash.com/photo-1778489769184-45868633c527",
  bgScience: "https://images.unsplash.com/photo-1631556759511-6ce895fbf0ad",
  bgScience2: "https://images.unsplash.com/photo-1707944746058-4da338d0f827",
  bgLibrary: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",
  bgLibrary2: "https://images.unsplash.com/photo-1531259736756-6caccf485f81",
  bgEngg: "https://images.unsplash.com/photo-1581092333322-31d2fd38a35e",
  bgEngg2: "https://images.unsplash.com/photo-1742767069929-0c663150b164",
};

// Global trust badges shown under every hero banner
export const heroBadges = [, ,];

// 12 course-specific hero banners (same design family, different imagery)
export const heroSlides = [
  {
    id: 1, slug: "bba", abbr: "BBA", title: "Bachelor of Business Administration",
    tagline: "Shape your future. Lead with impact.",
    desc: "Industry-integrated 3-year management degree with live projects, internships and 100% placement assistance.",
    chips: ["Marketing", "Finance", "Human Resource", "Business Analytics"],
    image: IMG.bgManagement, accent: "#f26522",
    cards: [
      { name: "BBA", duration: "3 Years", elig: "10+2 in any stream" },
      { name: "BBA (Hons.)", duration: "4 Years", elig: "10+2 with min 50%", hi: true },
      { name: "MBA", duration: "2 Years", elig: "Graduation, min 50%" },
    ],
  },
  {
    id: 2, slug: "mba", abbr: "MBA", title: "Master of Business Administration",
    tagline: "Accelerate into leadership.",
    desc: "A future-ready master's with dual specialisations, capstone projects and mentorship from industry leaders.",
    chips: ["Finance", "Digital Marketing", "Business Analytics", "International Business"],
    image: IMG.bgManagement2, accent: "#f26522",
    cards: [
      { name: "MBA", duration: "2 Years", elig: "Any Graduate" },
      { name: "MBA (Dual)", duration: "2 Years", elig: "Graduate, min 50%", hi: true },
      { name: "Executive MBA", duration: "1 Year", elig: "Graduate + 2 yrs exp" },
    ],
  },
  {
    id: 3, slug: "bcom", abbr: "B.Com", title: "Bachelor of Commerce",
    tagline: "Build a strong financial foundation.",
    desc: "Master accounting, taxation, banking and finance with a modern, application-driven commerce curriculum.",
    chips: ["Accounting & Finance", "Banking & Insurance", "FinTech", "Taxation"],
    image: IMG.bgCommerce, accent: "#f26522",
    cards: [
      { name: "B.Com", duration: "3 Years", elig: "10+2 in any stream" },
      { name: "B.Com (Hons.)", duration: "4 Years", elig: "10+2 with min 45%", hi: true },
      { name: "M.Com", duration: "2 Years", elig: "Graduate in Commerce" },
    ],
  },
  {
    id: 4, slug: "mcom", abbr: "M.Com", title: "Master of Commerce",
    tagline: "Specialise. Advance. Lead finance.",
    desc: "Advanced commerce education in accounting, finance and analytics for research and senior finance roles.",
    chips: ["Accounting & Finance", "Banking & Finance", "FinTech", "Business Analytics"],
    image: IMG.textbooks, accent: "#f26522",
    cards: [
      { name: "M.Com", duration: "2 Years", elig: "B.Com / Graduate" },
      { name: "M.Com (Finance)", duration: "2 Years", elig: "Graduate, min 50%", hi: true },
      { name: "PhD (Commerce)", duration: "3-5 Years", elig: "Post Graduate" },
    ],
  },
  {
    id: 5, slug: "bca", abbr: "BCA", title: "Bachelor of Computer Applications",
    tagline: "Code the future. Build what's next.",
    desc: "Hands-on programming, cloud, AI and full-stack development aligned with in-demand tech careers.",
    chips: ["AI & Machine Learning", "Data Science", "Cyber Security", "Full Stack"],
    image: IMG.bgTech, accent: "#f26522",
    cards: [
      { name: "BCA", duration: "3 Years", elig: "10+2 with Maths" },
      { name: "BCA (AI & ML)", duration: "3 Years", elig: "10+2 in any stream", hi: true },
      { name: "MCA", duration: "2 Years", elig: "BCA / Graduate" },
    ],
  },
  {
    id: 6, slug: "mca", abbr: "MCA", title: "Master of Computer Applications",
    tagline: "Engineer intelligent software.",
    desc: "Deep computing, DevOps and applied AI to build scalable systems and lead engineering teams.",
    chips: ["AI & Machine Learning", "Cloud & DevOps", "Cyber Security", "Blockchain"],
    image: IMG.bgTech2, accent: "#f26522",
    cards: [
      { name: "MCA", duration: "2 Years", elig: "BCA / B.Sc CS" },
      { name: "MCA (Data Sci.)", duration: "2 Years", elig: "Graduate with Maths", hi: true },
      { name: "M.Sc CS", duration: "2 Years", elig: "B.Sc CS / IT" },
    ],
  },
  {
    id: 7, slug: "bsc-cs", abbr: "B.Sc", title: "Bachelor of Science",
    tagline: "Discover. Analyse. Innovate.",
    desc: "Research-oriented science programmes across computing, data and applied sciences, delivered online.",
    chips: ["Computer Science", "Data Science", "Artificial Intelligence", "Analytics"],
    image: IMG.bgScience, accent: "#f26522",
    cards: [
      { name: "B.Sc CS", duration: "3 Years", elig: "10+2 with Science" },
      { name: "B.Sc Data Science", duration: "3 Years", elig: "10+2 with Maths", hi: true },
      { name: "B.Sc AI", duration: "3 Years", elig: "10+2 with Maths" },
    ],
  },
  {
    id: 8, slug: "msc-cs", abbr: "M.Sc", title: "Master of Science",
    tagline: "Research meets real-world impact.",
    desc: "Advanced study in data science, AI and computing with a strong research and project focus.",
    chips: ["Data Science", "Machine Learning", "Cyber Security", "Cloud & DevOps"],
    image: IMG.bgScience2, accent: "#f26522",
    cards: [
      { name: "M.Sc CS/IT", duration: "2 Years", elig: "B.Sc CS / BCA" },
      { name: "M.Sc Data Science", duration: "2 Years", elig: "Graduate with Maths", hi: true },
      { name: "M.Sc AI & ML", duration: "2 Years", elig: "Graduate, min 50%" },
    ],
  },
  {
    id: 9, slug: "ba", abbr: "BA", title: "Bachelor of Arts",
    tagline: "Think deeply. Communicate powerfully.",
    desc: "A flexible liberal-arts degree across languages, economics, psychology and mass communication.",
    chips: ["English", "Economics", "Psychology", "Journalism & Mass Comm."],
    image: IMG.bgLibrary, accent: "#f26522",
    cards: [
      { name: "BA", duration: "3 Years", elig: "10+2 in any stream" },
      { name: "BA (Hons.)", duration: "4 Years", elig: "10+2 with min 45%", hi: true },
      { name: "BA (JMC)", duration: "3 Years", elig: "10+2 in any stream" },
    ],
  },
  {
    id: 10, slug: "ma", abbr: "MA", title: "Master of Arts",
    tagline: "Master your discipline.",
    desc: "Postgraduate specialisations in humanities and social sciences with a research-led curriculum.",
    chips: ["English", "Economics", "Psychology", "Public Administration"],
    image: IMG.bgLibrary2, accent: "#f26522",
    cards: [
      { name: "MA", duration: "2 Years", elig: "Graduate in Arts" },
      { name: "MA (Psychology)", duration: "2 Years", elig: "Graduate, min 50%", hi: true },
      { name: "MA (JMC)", duration: "2 Years", elig: "Any Graduate" },
    ],
  },
  {
    id: 11, slug: "btech", abbr: "B.Tech", title: "Bachelor of Technology",
    tagline: "Engineer tomorrow's world.",
    desc: "Industry-4.0 engineering with labs, projects and specialisations across CSE, AI, ECE and core streams.",
    chips: ["Computer Science", "AI & ML", "Electronics & Comm.", "Mechanical"],
    image: IMG.bgEngg, accent: "#f26522",
    cards: [
      { name: "B.Tech CSE", duration: "4 Years", elig: "10+2 with PCM" },
      { name: "B.Tech AI & ML", duration: "4 Years", elig: "10+2 with PCM", hi: true },
      { name: "B.Tech ECE", duration: "4 Years", elig: "10+2 with PCM" },
    ],
  },
  {
    id: 12, slug: "mtech", abbr: "M.Tech", title: "Master of Technology",
    tagline: "Specialise at the cutting edge.",
    desc: "Advanced engineering with research, innovation labs and high-demand specialisations for tech leaders.",
    chips: ["Computer Science", "AI & ML", "VLSI Design", "Robotics & Automation"],
    image: IMG.bgEngg2, accent: "#f26522",
    cards: [
      { name: "M.Tech CSE", duration: "2 Years", elig: "B.Tech / BE" },
      { name: "M.Tech AI & ML", duration: "2 Years", elig: "B.Tech, min 50%", hi: true },
      { name: "M.Tech VLSI", duration: "2 Years", elig: "B.Tech ECE" },
    ],
  },
];

export const stats = [
  { value: "25,000+", label: "Learners Enrolled" },
  { value: "40+", label: "Programmes Offered" },
  { value: "300+", label: "Expert Faculty" },
  { value: "120+", label: "Hiring Partners" },
];

// Schools & programmes for mega menu + programmes page
export const schools = [
  {
    id: "commerce",
    name: "Faculty of Commerce & Management",
    color: "#2563eb",
    icon: "BarChart3",
    programs: [
      { code: "bcom", title: "B.Com", level: "UG", duration: "3 Years" },
      { code: "mcom", title: "M.Com", level: "PG", duration: "2 Years" },
      { code: "bba", title: "BBA", level: "UG", duration: "3 Years" },
      { code: "mba", title: "MBA", level: "PG", duration: "2 Years" },
    ],
  },
  {
    id: "computer",
    name: "Faculty of Computer Science & IT",
    color: "#7c3aed",
    icon: "Code2",
    programs: [
      { code: "bca", title: "BCA", level: "UG", duration: "3 Years" },
      { code: "mca", title: "MCA", level: "PG", duration: "2 Years" },
      { code: "bscit", title: "B.Sc IT", level: "UG", duration: "3 Years" },
    ],
  },
  {
    id: "humanities",
    name: "Faculty of Humanities & Social Sciences",
    color: "#ea580c",
    icon: "BookOpen",
    programs: [
      { code: "ba", title: "BA", level: "UG", duration: "3 Years" },
      { code: "ma", title: "MA", level: "PG", duration: "2 Years" },
      { code: "blis", title: "BLIS", level: "UG", duration: "1 Year" },
      { code: "mlis", title: "MLIS", level: "PG", duration: "1 Year" },
    ],
  },
  {
    id: "journalism",
    name: "Faculty of Journalism & Media",
    color: "#c62740",
    icon: "Newspaper",
    programs: [
      { code: "bajmc", title: "BA (JMC)", level: "UG", duration: "3 Years" },
      { code: "majmc", title: "MA (JMC)", level: "PG", duration: "2 Years" },
    ],
  },
  {
    id: "sciences",
    name: "Faculty of Basic Sciences",
    color: "#16a34a",
    icon: "FlaskConical",
    programs: [
      { code: "bsc", title: "B.Sc", level: "UG", duration: "3 Years" },
      { code: "msc", title: "M.Sc", level: "PG", duration: "2 Years" },
    ],
  },
];

// Programme cards used on Home + Programmes page
export const programCards = [
  {
    slug: "bcom-mcom",
    school: "Faculty of Commerce & Management",
    title: "B.Com & M.Com",
    icon: "BarChart3",
    color: "#2563eb",
    desc: "Commerce, accounting, taxation and financial management for aspiring finance professionals and business leaders.",
    duration: "3 Yrs (UG) · 2 Yrs (PG)",
    mode: "Online / ODL",
    badge: "UGC Approved",
    category: "UG",
  },
  {
    slug: "bba-mba",
    school: "Faculty of Commerce & Management",
    title: "BBA & MBA",
    icon: "Briefcase",
    color: "#c62740",
    desc: "Industry-aligned management education with specialisations in Marketing, HR, Finance and Business Analytics.",
    duration: "3 Yrs (UG) · 2 Yrs (PG)",
    mode: "Online",
    badge: "Industry Aligned",
    category: "PG",
  },
  {
    slug: "bca-mca",
    school: "Faculty of Computer Science & IT",
    title: "BCA & MCA",
    icon: "Code2",
    color: "#7c3aed",
    desc: "Programming, data science, cloud computing and software systems aligned with future digital careers.",
    duration: "3 Yrs (UG) · 2 Yrs (PG)",
    mode: "Online / ODL",
    badge: "UGC Approved",
    category: "UG",
  },
  {
    slug: "ba-ma-blis",
    school: "Faculty of Humanities & Social Sciences",
    title: "BA, MA, BLIS & MLIS",
    icon: "BookOpen",
    color: "#ea580c",
    desc: "Languages, sociology, political science and library & information sciences through a research-oriented curriculum.",
    duration: "3 Yrs (UG) · 2 Yrs (PG)",
    mode: "ODL Mode",
    badge: "NEP 2020",
    category: "UG",
  },
  {
    slug: "ba-jmc",
    school: "Faculty of Journalism & Media",
    title: "BA (JMC) & MA (JMC)",
    icon: "Newspaper",
    color: "#c62740",
    desc: "Journalism, digital media and content production with mentorship from industry professionals across media houses.",
    duration: "3 Yrs (UG) · 2 Yrs (PG)",
    mode: "Online",
    badge: "Industry Mentors",
    category: "PG",
  },
  {
    slug: "bsc-msc",
    school: "Faculty of Basic Sciences",
    title: "B.Sc & M.Sc",
    icon: "FlaskConical",
    color: "#16a34a",
    desc: "Research-oriented science programmes in mathematics, physics, chemistry and environmental studies delivered fully online.",
    duration: "3 Yrs (UG) · 2 Yrs (PG)",
    mode: "Online / ODL",
    badge: "Research Focus",
    category: "UG",
  },
];

export const whyChoose = [
  {
    icon: "ShieldCheck",
    title: "UGC-DEB Entitled",
    desc: "All online & ODL programmes are recognised as per UGC (ODL & Online) Regulations 2020.",
  },
  {
    icon: "MonitorPlay",
    title: "Learn From Anywhere",
    desc: "Interactive live classes, recorded lectures and a smart LMS accessible on any device.",
  },
  {
    icon: "Users",
    title: "Industry Mentors",
    desc: "Learn from experienced faculty and working professionals from top organisations.",
  },
  {
    icon: "Award",
    title: "Valued Degree",
    desc: "Degrees hold the same recognition as on-campus programmes for jobs & higher studies.",
  },
  {
    icon: "Briefcase",
    title: "Placement Support",
    desc: "Dedicated career cell, resume building, mock interviews and 120+ hiring partners.",
  },
  {
    icon: "Wallet",
    title: "Flexible Fees",
    desc: "Easy no-cost EMI options and scholarships for meritorious and deserving students.",
  },
];

export const approvals = ["UGC", "AICTE", "NAAC", "NIRF", "AIU", "NEP 2020"];

// ---- Faculties → Courses → Specializations ----

export const faculties = [
  {
    id: "ug",
    name: "UG Programmes",
    short: "UG Programmes",
    color: "#2563eb",
  },
  {
    id: "pg",
    name: "PG Programmes",
    short: "PG Programmes",
    color: "#7c3aed",
  },
  {
    id: "diploma",
    name: "Diploma Programmes",
    short: "Diploma",
    color: "#0891b2",
  },
  {
    id: "certificate",
    name: "Certificate Programmes",
    short: "Certificate",
    color: "#ea580c",
  },
];

const MGMT_SPECS = [
  "Marketing",
  "Finance",
  "Human Resource Management",
  "Business Analytics",
  "International Business",
  "Digital Marketing",
  "FinTech",
  "Operations",
  "Entrepreneurship",
  "Retail Management",
  "Supply Chain Management",
  "Healthcare Management",
];

const TECH_SPECS = [
  "Artificial Intelligence & ML",
  "Data Science",
  "Cyber Security",
  "Cloud Computing",
  "Full Stack Development",
  "Blockchain",
  "DevOps",
  "Internet of Things",
  "UI/UX Design",
  "AR/VR",
  "Software Engineering",
  "Business Intelligence",
];

export const courses = [
  // ---- UG Programmes ----

  {
    slug: "bba",
    abbr: "BBA",
    name: "Bachelor of Business Administration",
    faculty: "ug",
    level: "UG",
    duration: "3 Years",
    icon: "Briefcase",
    specializations: MGMT_SPECS,
  },
  {
    slug: "bcom",
    abbr: "B.Com",
    name: "Bachelor of Commerce",
    faculty: "ug",
    level: "UG",
    duration: "3 Years",
    icon: "BarChart3",
    specializations: [
      "Accounting & Finance",
      "Banking & Insurance",
      "FinTech",
      "E-Commerce",
      "Taxation",
      "Business Analytics",
    ],
  },
  {
    slug: "bca",
    abbr: "BCA",
    name: "Bachelor of Computer Applications",
    faculty: "ug",
    level: "UG",
    duration: "3 Years",
    icon: "Code2",
    specializations: TECH_SPECS,
  },
  {
    slug: "bsc-cs",
    abbr: "B.Sc CS",
    name: "B.Sc Computer Science",
    faculty: "ug",
    level: "UG",
    duration: "3 Years",
    icon: "Cpu",
    specializations: [
      "Artificial Intelligence",
      "Data Analytics",
      "Cyber Security",
      "Cloud Computing",
      "Full Stack Development",
      "Internet of Things",
    ],
  },
  {
    slug: "btech",
    abbr: "B.Tech",
    name: "Bachelor of Technology",
    faculty: "ug",
    level: "UG",
    duration: "4 Years",
    icon: "Cog",
    specializations: [
      "Computer Science & Engineering",
      "AI & Machine Learning",
      "Data Science",
      "Cyber Security",
      "Electronics & Communication",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "IoT",
      "Robotics",
      "Cloud Computing",
      "Automotive Engineering",
    ],
  },
  {
    slug: "ba",
    abbr: "BA",
    name: "Bachelor of Arts",
    faculty: "ug",
    level: "UG",
    duration: "3 Years",
    icon: "BookOpen",
    specializations: [
      "English",
      "Economics",
      "Psychology",
      "Journalism & Mass Communication",
      "Political Science",
      "Sociology",
    ],
  },
  {
    slug: "bsc-ds",
    abbr: "B.Sc DS",
    name: "B.Sc Data Science",
    faculty: "ug",
    level: "UG",
    duration: "3 Years",
    icon: "LineChart",
    specializations: [
      "Data Analytics",
      "Business Intelligence",
      "Machine Learning",
      "Big Data",
      "Applied Statistics",
    ],
  },
  {
    slug: "bsc-ai",
    abbr: "B.Sc AI",
    name: "B.Sc Artificial Intelligence",
    faculty: "ug",
    level: "UG",
    duration: "3 Years",
    icon: "Bot",
    specializations: [
      "AI & Machine Learning",
      "Generative AI",
      "Intelligent Systems",
      "Computer Vision",
      "Natural Language Processing",
    ],
  },

  // ---- PG Programmes ----

  {
    slug: "mba",
    abbr: "MBA",
    name: "Master of Business Administration",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "TrendingUp",
    specializations: MGMT_SPECS,
  },
  {
    slug: "mcom",
    abbr: "M.Com",
    name: "Master of Commerce",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "Landmark",
    specializations: [
      "Accounting & Finance",
      "Banking & Finance",
      "FinTech",
      "Business Analytics",
      "International Finance",
    ],
  },
  {
    slug: "mca",
    abbr: "MCA",
    name: "Master of Computer Applications",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "Terminal",
    specializations: TECH_SPECS,
  },
  {
    slug: "msc-cs",
    abbr: "M.Sc CS",
    name: "M.Sc Computer Science / IT",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "MonitorPlay",
    specializations: [
      "Artificial Intelligence",
      "Data Science",
      "Cyber Security",
      "Cloud & DevOps",
      "Software Engineering",
    ],
  },
  {
    slug: "mtech",
    abbr: "M.Tech",
    name: "Master of Technology",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "Wrench",
    specializations: [
      "Computer Science & Engineering",
      "AI & Machine Learning",
      "Data Science",
      "Cyber Security",
      "VLSI Design",
      "Structural Engineering",
      "Power Systems",
      "Robotics & Automation",
    ],
  },
  {
    slug: "ma",
    abbr: "MA",
    name: "Master of Arts",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "GraduationCap",
    specializations: [
      "English",
      "Economics",
      "Psychology",
      "Journalism & Mass Communication",
      "Public Administration",
      "History",
    ],
  },
  {
    slug: "msc-ds",
    abbr: "M.Sc DS",
    name: "M.Sc Data Science",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "Database",
    specializations: [
      "Data Analytics",
      "Machine Learning",
      "Business Analytics",
      "Big Data Engineering",
      "Deep Learning",
    ],
  },
  {
    slug: "msc-ai",
    abbr: "M.Sc AI",
    name: "M.Sc Artificial Intelligence & ML",
    faculty: "pg",
    level: "PG",
    duration: "2 Years",
    icon: "BrainCircuit",
    specializations: [
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "Natural Language Processing",
      "Computer Vision",
      "Reinforcement Learning",
    ],
  },
  // ---- Orbit Digital University: Diploma Programmes ----

  {
    slug: "dca",
    abbr: "DCA",
    name: "Diploma in Computer Applications",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "Monitor",
    specializations: [
      "Computer Fundamentals",
      "Office Automation",
      "Web Designing",
      "Programming Fundamentals",
      "Database Management",
      "Internet Applications",
    ],
  },
  {
    slug: "diploma-digital-business-management",
    abbr: "DDBM",
    name: "Diploma in Digital Business Management",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "BriefcaseBusiness",
    specializations: [
      "Digital Business Strategy",
      "Marketing Management",
      "Financial Management",
      "Human Resource Management",
      "E-Commerce Management",
      "Entrepreneurship",
    ],
  },
  {
    slug: "diploma-digital-marketing",
    abbr: "DDM",
    name: "Diploma in Digital Marketing",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "Megaphone",
    specializations: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Google Ads",
      "Marketing Analytics",
    ],
  },
  {
    slug: "diploma-data-science",
    abbr: "DDS",
    name: "Diploma in Data Science",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "Database",
    specializations: [
      "Data Analytics",
      "Python Programming",
      "Machine Learning",
      "Data Visualization",
      "Applied Statistics",
      "Business Intelligence",
    ],
  },
  {
    slug: "diploma-ai-machine-learning",
    abbr: "DAIML",
    name: "Diploma in Artificial Intelligence & Machine Learning",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "BrainCircuit",
    specializations: [
      "Artificial Intelligence",
      "Machine Learning",
      "Python Programming",
      "Deep Learning",
      "Generative AI",
      "Natural Language Processing",
    ],
  },
  {
    slug: "diploma-cyber-security",
    abbr: "DCS",
    name: "Diploma in Cyber Security",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "ShieldCheck",
    specializations: [
      "Network Security",
      "Ethical Hacking",
      "Cyber Forensics",
      "Cloud Security",
      "Information Security",
      "Security Operations",
    ],
  },
  {
    slug: "diploma-full-stack-development",
    abbr: "DFSD",
    name: "Diploma in Full Stack Development",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "Code2",
    specializations: [
      "HTML & CSS",
      "JavaScript",
      "React Development",
      "Backend Development",
      "Database Management",
      "Cloud Deployment",
    ],
  },
  {
    slug: "diploma-cloud-devops",
    abbr: "DCD",
    name: "Diploma in Cloud Computing & DevOps",
    faculty: "diploma",
    level: "Diploma",
    duration: "1 Year",
    icon: "CloudCog",
    specializations: [
      "Cloud Fundamentals",
      "AWS",
      "Microsoft Azure",
      "Linux Administration",
      "Docker & Kubernetes",
      "DevOps Automation",
    ],
  },

  // ---- Orbit Digital University: Certificate Programmes ----

  {
    slug: "certificate-computer-applications",
    abbr: "CCA",
    name: "Certificate in Computer Applications",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "Laptop",
    specializations: [
      "Computer Fundamentals",
      "MS Office",
      "Internet Applications",
      "Digital Documentation",
      "Basic Programming",
      "Database Fundamentals",
    ],
  },
  {
    slug: "certificate-digital-marketing",
    abbr: "CDM",
    name: "Certificate in Digital Marketing",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "Megaphone",
    specializations: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Content Marketing",
      "Google Ads",
      "Email Marketing",
      "Web Analytics",
    ],
  },
  {
    slug: "certificate-data-analytics",
    abbr: "CDA",
    name: "Certificate in Data Analytics",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "BarChart3",
    specializations: [
      "Excel Analytics",
      "SQL Fundamentals",
      "Power BI",
      "Data Visualization",
      "Python Fundamentals",
      "Business Analytics",
    ],
  },
  {
    slug: "certificate-ai-generative-ai",
    abbr: "CAI",
    name: "Certificate in Artificial Intelligence & Generative AI",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "Bot",
    specializations: [
      "Artificial Intelligence Fundamentals",
      "Generative AI Tools",
      "Prompt Engineering",
      "Machine Learning Basics",
      "AI Content Creation",
      "Responsible AI",
    ],
  },
  {
    slug: "certificate-web-development",
    abbr: "CWD",
    name: "Certificate in Web Development",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "Code2",
    specializations: [
      "HTML & CSS",
      "JavaScript",
      "Responsive Web Design",
      "React Fundamentals",
      "Backend Fundamentals",
      "Website Deployment",
    ],
  },
  {
    slug: "certificate-cyber-security",
    abbr: "CCS",
    name: "Certificate in Cyber Security",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "ShieldCheck",
    specializations: [
      "Cyber Security Fundamentals",
      "Network Security",
      "Ethical Hacking Basics",
      "Data Protection",
      "Cyber Threat Management",
      "Security Best Practices",
    ],
  },
  {
    slug: "certificate-ui-ux-design",
    abbr: "CUIUX",
    name: "Certificate in UI/UX Design",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "Palette",
    specializations: [
      "User Interface Design",
      "User Experience Research",
      "Wireframing",
      "Prototyping",
      "Figma",
      "Design Systems",
    ],
  },
  {
    slug: "certificate-cloud-computing",
    abbr: "CCC",
    name: "Certificate in Cloud Computing",
    faculty: "certificate",
    level: "Certificate",
    duration: "6 Months",
    icon: "Cloud",
    specializations: [
      "Cloud Fundamentals",
      "AWS Fundamentals",
      "Microsoft Azure",
      "Cloud Storage",
      "Cloud Security",
      "Cloud Deployment",
    ],
  },


];

export const steps = [
  { n: "01", title: "Choose Programme", desc: "Explore schools and pick a UG/PG programme that fits your goals." },
  { n: "02", title: "Fill Application", desc: "Complete the simple online application form and upload documents." },
  { n: "03", title: "Confirm & Pay", desc: "Pay the admission fee securely with flexible EMI options available." },
  { n: "04", title: "Start Learning", desc: "Get LMS access, join live classes and begin your digital journey." },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    role: "MBA · Marketing",
    img: IMG.gradPortrait,
    quote:
      "The flexibility of online classes let me study while working full time. The mentors were incredibly supportive throughout.",
  },
  {
    name: "Arjun Verma",
    role: "MCA · Data Science",
    img: IMG.grad2,
    quote:
      "Orbit's LMS and live doubt sessions made complex topics simple. I landed a developer role even before graduating.",
  },
  {
    name: "Sneha Iyer",
    role: "B.Com · Finance",
    img: IMG.study,
    quote:
      "Affordable fees, recognised degree and great placement support. Easily the best decision for my career.",
  },
];

export const news = [
  {
    date: "12 Jul 2025",
    tag: "Admissions",
    title: "July 2025 admission cycle now open across all schools",
    img: IMG.lecture,
  },
  {
    date: "28 Jun 2025",
    tag: "Achievement",
    title: "Orbit learners record 92% placement in Batch of 2025",
    img: IMG.grad1,
  },
  {
    date: "10 Jun 2025",
    tag: "Event",
    title: "National webinar on AI & the future of digital education",
    img: IMG.video,
  },
];

export const faqs = [
  {
    q: "Are the degrees UGC recognised?",
    a: "Yes. All our online and ODL programmes are offered in line with UGC (ODL & Online Programmes) Regulations 2020 and are recognised for jobs, promotions and higher education.",
  },
  {
    q: "How are classes conducted?",
    a: "Through a smart Learning Management System with live interactive sessions, recorded lectures, e-content and regular assessments accessible on any device.",
  },
  {
    q: "Is there placement assistance?",
    a: "Yes, our dedicated career cell provides resume building, mock interviews, soft-skill training and connects you with 120+ hiring partners.",
  },
  {
    q: "Can I pay fees in instalments?",
    a: "Absolutely. We offer flexible no-cost EMI options and merit/need-based scholarships to make education accessible.",
  },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programmes", to: "/programmes", mega: true },
  { label: "Admissions", to: "/admissions" },
  { label: "Placements", to: "/placements" },
  { label: "Contact", to: "/contact" },
];

// Reference-style multi-item nav with dropdowns
export const navMenu = [
  {
    label: "About Us",
    to: "/about",
    children: [
      {
        label: "About Orbit",
        to: "/about",
      },
      {
        label: "About Punjab",
        to: "/about-punjab",
      },
      {
        label: "Institutional Development Plan",
        to: "/institutional-development-plan",
      },
      {
        label: "Our Inspiration",
        to: "/our-inspiration",
      },
      {
        label: "Why Orbit",
        to: "/why-orbit",
      },
      {
        label: "Chancellor’s Message",
        to: "/chancellor",
      },
      {
        label: "Vice-Chancellor’s Message",
        to: "/vice-chancellor",
      },
      {
        label: "Registrar’s Message",
        to: "/registrar",
      },
    ],
  },
  { label: "Academics", to: "/programmes", mega: true },
  {
    label: "Online Learning",
    to: "/programmes",
    children: [
      { label: "Smart LMS", to: "/p/smart-lms" },
      { label: "Live Interactive Lectures", to: "/p/live-lectures" },
      { label: "Digital Academic Library", to: "/p/digital-library" },
      { label: "24/7 Cloud Access", to: "/p/cloud-access" },
    ],
  },
  {
    label: "Admissions",
    to: "/admissions",
    children: [
      { label: "How to Apply", to: "/admissions" },
      { label: "Eligibility", to: "/p/eligibility" },
      { label: "Scholarships", to: "/p/scholarships" },
      { label: "Important Dates", to: "/p/important-dates" },
    ],
  },
  {
    label: "Student Life",
    to: "/about",
    children: [
      { label: "Learner Community", to: "/p/learner-community" },
      { label: "Clubs & Events", to: "/p/clubs-events" },
      { label: "Support Services", to: "/p/support-services" },
    ],
  },
  {
    label: "Digital Campus",
    to: "/about",
    children: [
      { label: "Smart Classrooms", to: "/p/smart-classrooms" },
      { label: "Tech Suite", to: "/p/tech-suite" },
      { label: "Mobile App", to: "/p/mobile-app" },
    ],
  },
  // {
  //   label: "Industry Connect",
  //   to: "/placements",
  //   children: [
  //     { label: "Placements", to: "/placements" },
  //     { label: "Hiring Partners", to: "/p/hiring-partners" },
  //     { label: "Career Support", to: "/p/career-support" },
  //   ],
  // },
  { label: "Contact", to: "/contact" },
];

export const megaLevels = [
  { label: "Undergraduate Programmes", to: "/programmes?level=UG" },
  { label: "Postgraduate Programmes", to: "/programmes?level=PG" },
  { label: "Diploma & Certificate", to: "/programmes?level=Diploma" },
];

export const topBarLinks = [
  { label: "Student Login", to: "/student-login" },
  { label: "Exam Portal", to: "/exam-portal" },
  { label: "Online Class", to: "/online-class" },
  { label: "Contact Us", to: "/contact" },
];

// Feature cards row under hero
export const heroFeatures = [
  { tag: "Outcome-Based", title: "Industry-Aligned Curriculum", desc: "Contemporary coursework mapped to modern workforce skills.", icon: "GraduationCap" },
  { tag: "Faculty-Led", title: "Live Interactive Lectures", desc: "Scheduled faculty classes, doubt resolution & masterclasses.", icon: "Video" },
  { tag: "E-Resources", title: "Digital Academic Library", desc: "Curated e-textbooks, lecture archives & study repositories.", icon: "BookOpen" },
  { tag: "Always Open", title: "24/7 Cloud LMS Access", desc: "Study anytime with instant access to recorded lectures.", icon: "Clock" },
];

// From Pre-Registration to Enrolment (6 steps)
export const preRegSteps = [
  { step: "01", title: "Explore & Choose", icon: "Search", desc: "Explore our programmes and pick the one that fits your goals." },
  { step: "02", title: "Apply Online", icon: "FileText", desc: "Fill the online application form and create your learner profile." },
  { step: "03", title: "Submit Documents", icon: "UploadCloud", desc: "Upload the required academic documents and identity proof." },
  { step: "04", title: "Application Review", icon: "ClipboardCheck", desc: "Our admissions team reviews your application and eligibility." },
  { step: "05", title: "Interaction", icon: "MessagesSquare", desc: "A short counselling interaction to map your pathway." },
  { step: "06", title: "Offer & Enrolment", icon: "GraduationCap", desc: "Accept your offer, pay fees and get instant LMS access." },
];

// Tabbed FAQ
export const faqTabs = ["All", "About & Programs", "LMS & Support", "Admissions & Approvals"];
export const faqList = [
  { cat: "About & Programs", q: "What is Orbit Digital University?", a: "Orbit Digital University is a future-ready digital institution offering flexible, technology-enabled and career-focused higher education for learners everywhere." },
  { cat: "About & Programs", q: "What type of programmes does the university offer?", a: "Undergraduate, postgraduate, diploma and skill-based programmes across multiple academic disciplines, delivered fully online and through ODL." },
  { cat: "About & Programs", q: "Is the university suitable for online learners?", a: "Yes. Our learning model is designed for students and working professionals who need flexible, accessible online education." },
  { cat: "About & Programs", q: "What makes Orbit Digital University different?", a: "It combines digital learning, dedicated academic support, a smart LMS and career-oriented education in one connected platform." },
  { cat: "Admissions & Approvals", q: "How can students apply for admission?", a: "Students apply through our official online admission portal by filling the form, uploading documents and completing a short counselling interaction." },
  { cat: "About & Programs", q: "Are the programmes career-focused?", a: "Absolutely. Every programme is designed with practical learning, industry-relevant skills and measurable career outcomes in mind." },
  { cat: "LMS & Support", q: "Does the university provide learning support?", a: "Yes. Learners receive academic guidance, online resources, live doubt-clearing sessions and dedicated support channels." },
  { cat: "About & Programs", q: "Will students get certificates or degrees?", a: "Eligible students receive the applicable UGC-recognised certificate, diploma or degree after completing all academic requirements." },
  { cat: "Admissions & Approvals", q: "How can I get updates about admissions?", a: "Follow the official website, social channels and admission notification updates for the latest news and deadlines." },
  { cat: "LMS & Support", q: "What digital facilities will students get?", a: "A smart LMS, digital study materials, recorded lectures, performance analytics, learner support and 24/7 online academic resources." },
  { cat: "LMS & Support", q: "Does the university provide placement support?", a: "Yes. We offer career counselling, resume building, mock interviews and connect learners with 120+ hiring partners." },
  { cat: "Admissions & Approvals", q: "Can I pay my fees in instalments?", a: "Yes. We offer flexible no-cost EMI options and merit/need-based scholarships to make education accessible." },
];

// Footer columns
export const footerCols = {
  quickLinks: [
    {
      label: "About the University",
      to: "/about",
    },
    {
      label: "Vision & Mission",
      to: "/about#vision-mission",
    },
    {
      label: "Chancellor’s Message",
      to: "/chancellor",
    },
    {
      label: "Registrar’s Message",
      to: "/registrar",
    },
    {
      label: "Director’s Message",
      to: "/director",
    },
    {
      label: "Vice-Chancellor’s Message",
      to: "/vice-chancellor",
    },
    {
      label: "Governance",
      to: "/about#governance",
    },
    {
      label: "Faculty & Staff",
      to: "/about#faculty-staff",
    },
    {
      label: "Industry Connect",
      to: "/placements",
    },
    {
      label: "Contact Us",
      to: "/contact",
    },
  ],
  programmes: [
    { label: "Commerce & Management", to: "/programmes?school=commerce" },
    { label: "Computer Science & IT", to: "/programmes?school=computer" },
    { label: "Humanities & Social Sciences", to: "/programmes?school=humanities" },
    { label: "Journalism & Digital Media", to: "/programmes?school=journalism" },
    { label: "Basic Sciences", to: "/programmes?school=sciences" },
    { label: "Research & Innovation", to: "/programmes" },
  ],
  studentZone: [
    { label: "Student LMS Login", to: "/login" },
    { label: "Apply for Admission", to: "/apply" },
    { label: "Fee Payment", to: "/admissions" },
    { label: "Exam & Results", to: "/admissions" },
    { label: "Academic Calendar", to: "/admissions" },
    { label: "Grievance Portal", to: "/contact" },
  ],
};

// About section cards (Building a Smarter Future)
export const aboutCards = [
  { n: "01", title: "Who We Are", icon: "Building2", desc: "A future-ready digital institution delivering innovative, technology-driven and industry-integrated education that equips learners with real digital skills." },
  { n: "02", title: "Our Vision", icon: "Eye", desc: "To become a globally recognised digital university that makes quality higher education accessible, flexible and future-ready for learners worldwide." },
  { n: "03", title: "Our Mission", icon: "Target", desc: "Deliver quality digital education, promote lifelong learning, foster innovation & entrepreneurship and build industry-ready professionals." },
  { n: "04", title: "Chancellor's Message", icon: "Quote", desc: "A future-focused institution dedicated to innovation, excellence and digital transformation — empowering learners to thrive in a rapidly evolving world." },
];

// Smart LMS — 6 compact feature tiles
export const lmsFeatures = [
  { title: "Live & Recorded Classes", icon: "Video", desc: "Attend live faculty sessions or replay recorded lectures anytime." },
  { title: "Digital Study Resources", icon: "BookOpenText", desc: "E-books, notes and curated content for every subject." },
  { title: "Assessments", icon: "ClipboardCheck", desc: "Quizzes, assignments and exams with instant feedback." },
  { title: "Progress Tracking", icon: "LineChart", desc: "Real-time dashboards to monitor your learning journey." },
  { title: "Mentor Support", icon: "MessagesSquare", desc: "Doubt-clearing and guidance from expert mentors." },
  { title: "Learn on Any Device", icon: "Smartphone", desc: "Seamless access on mobile, tablet and desktop." },
];

// Recognised & Accredited By — content mirrors fusion.navizindagi.com (6 bodies)
export const accreditations = [
  { category: "Govt of India", title: "UGC Recognized", name: "University Grants Commission", tag: "Sec 2(f) Approved", logo: "https://customer-assets-lqy194kg.emergentagent.net/job_edu-portal-pro-28/artifacts/43fynj15_ugc.webp" },
  // { category: "Technical Body", title: "AICTE Approved", name: "All India Council for Technical Education", tag: "Engineering & Management", logo: "https://customer-assets-lqy194kg.emergentagent.net/job_edu-portal-pro-28/artifacts/g9w4p0rv_aicte.webp" },
  {
    category: "Technical Body",
    title: "AICTE",
    name: "All India Council for Technical Education",
    tag: "Technical Education",
    logo: "https://internship.aicte-india.org/images/aicte-logo.webp",
  },
  {
    category: "National Ranking",
    title: "NIRF Ranking 2025",
    name: "National Institutional Ranking Framework",
    tag: "Education Ranking Framework",
    logo: "https://assets.lpuonline.com/recognitions/nirf-left.png",
  },
  { category: "International", title: "WES Evaluated", name: "World Education Services", tag: "Global Credit Equivalence", logo: "https://customer-assets-lqy194kg.emergentagent.net/job_edu-portal-pro-28/artifacts/htgo9e7d_wes.webp" },
  { category: "National Body", title: "AIU Member", name: "Association of Indian Universities", tag: "Equivalence & Recognition", logo: "https://aiu.edu.in/lib/image/approval/ASSOCIATION%20OF%20INDIAN%20UNIVERSITY.png" },
];

// Your Admission Journey, Simplified — 5 connected steps
export const admissionJourney = [
  { step: "01", title: "Explore Programme", icon: "Search", desc: "Browse faculties and pick the programme that fits your goals." },
  { step: "02", title: "Pre-Register", icon: "UserPlus", desc: "Register your interest online in under two minutes." },
  { step: "03", title: "Complete Application", icon: "FileText", desc: "Fill the form and upload your academic documents." },
  { step: "04", title: "Verification & Offer", icon: "BadgeCheck", desc: "We verify eligibility and send your admission offer." },
  { step: "05", title: "Enrol & Start Learning", icon: "GraduationCap", desc: "Pay fees, get LMS access and begin your journey." },
];

// Tech Suite tools
export const techSuite = [
  { name: "LMS", tagline: "Digital classroom", icon: "MonitorPlay" },
  { name: "Orbit UMS", tagline: "Knowledge repository", icon: "Database" },
  { name: "AI Guru", tagline: "Student guidance", icon: "Bot" },
  { name: "VSync", tagline: "Exam assistance", icon: "FileCheck2" },
  { name: "Dialon", tagline: "Lead & communication CRM", icon: "Headphones" },
  { name: "Mobile App", tagline: "Access on the move", icon: "Smartphone" },
];

// Announcements (two categories)
export const announcements = {
  "Application Notifications": [
    { day: "25", mon: "JUN", title: "Pre-Registration for all 2025-26 programmes has started", sub: "Students can submit their interest online." },
    { day: "28", mon: "MAY", title: "Merit-based scholarship application portal now open", sub: "Up to 50% tuition fee waivers for eligible applicants." },
    { day: "20", mon: "MAY", title: "International learner orientation & support schedule", sub: "Live webinars for students across 40+ countries." },
  ],
  "Academic Updates": [
    { day: "15", mon: "JUN", title: "Proposed academic calendar released", sub: "Counselling and orientation schedule announced." },
    { day: "02", mon: "JUN", title: "Digital library access pass activation open", sub: "Over 100,000+ digital textbooks and journals." },
    { day: "10", mon: "MAY", title: "Credit transfer & lateral entry guidelines published", sub: "Simplified evaluation for diploma and transfer students." },
  ],
};

// Why choose (reference style) + counters
export const whyOrbit = [
  { title: "Innovation", icon: "Lightbulb", desc: "Modern, technology-first learning platform." },
  { title: "Career Focus", icon: "Target", desc: "Skill-based, outcome-driven academic approach." },
  { title: "Academic Support", icon: "LifeBuoy", desc: "Guided, always-available learner assistance." },
  { title: "Smart LMS", icon: "MonitorPlay", desc: "Anytime, anywhere digital access." },
];
export const whyCounters = [
  { value: "50+", label: "LMS Modules" },
  { value: "40+", label: "Programmes" },
  { value: "10", label: "Faculties & Departments" },
  { value: "24/7", label: "Support Channels" },
];

// CTA checklist
export const ctaPoints = [
  "Industry-Mapped Curriculum",
  "Live Faculty Masterclasses",
  "24/7 Digital Learning Portal",
  "Career & Placement Guidance",
];


