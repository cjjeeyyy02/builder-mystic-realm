interface ScreeningCandidate {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  totalExperience: string;
  relevantExperience: string;
  status: "approved" | "reject" | "pending";
  // Optional rejection reason stored when candidate is rejected
  rejectionReason?: string;
  // Enhanced resume data
  resumeUrl?: string;
  summary?: string;
  education?: string;
  workHistory?: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  skills?: string[];
  certifications?: string[];
  location?: string;
  salaryExpectation?: string;
  availability?: string;
  rating?: number;
}

export const screeningCandidates: ScreeningCandidate[] = [
  {
    id: "1",
    name: "Emily Rodriguez",
    position: "UX Designer",
    email: "emily.rodriguez@gmail.com",
    phone: "123-456-791",
    totalExperience: "5 years",
    relevantExperience: "5 years",
    status: "pending",
    resumeUrl: "/documents/emily-rodriguez-resume.pdf",
    summary: "Creative UX Designer with 5+ years of experience in designing user-centered digital experiences. Proficient in design thinking, user research, and prototyping.",
    education: "Master's in Human-Computer Interaction, Stanford University",
    workHistory: [
      {
        company: "TechCorp Solutions",
        position: "Senior UX Designer",
        duration: "2022 - Present",
        description: "Led design for mobile banking app used by 2M+ users. Improved user satisfaction by 40% through redesign initiative."
      },
      {
        company: "Design Studio Inc",
        position: "UX Designer",
        duration: "2020 - 2022",
        description: "Designed web applications for e-commerce clients. Conducted user research and usability testing."
      }
    ],
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    certifications: ["Google UX Design Certificate", "Adobe Certified Expert"],
    location: "San Francisco, CA",
    salaryExpectation: "$95,000 - $110,000",
    availability: "2 weeks notice",
    rating: 4.2,
  },
  {
    id: "2",
    name: "David Kim",
    position: "Backend Developer",
    email: "david.kim@gmail.com",
    phone: "123-456-792",
    totalExperience: "7 years",
    relevantExperience: "6 years",
    status: "pending",
    resumeUrl: "/documents/david-kim-resume.pdf",
    summary: "Experienced Backend Developer with expertise in scalable systems design and microservices architecture. Strong background in cloud technologies and API development.",
    education: "Bachelor's in Computer Science, UC Berkeley",
    workHistory: [
      {
        company: "CloudTech Inc",
        position: "Senior Backend Developer",
        duration: "2021 - Present",
        description: "Architected microservices handling 10M+ requests daily. Reduced system latency by 60% through optimization."
      },
      {
        company: "StartupXYZ",
        position: "Backend Developer",
        duration: "2019 - 2021",
        description: "Built RESTful APIs and implemented real-time features using WebSocket technology."
      }
    ],
    skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS", "Redis", "GraphQL"],
    certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
    location: "Seattle, WA",
    salaryExpectation: "$120,000 - $140,000",
    availability: "Immediate",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Carlos Mendez",
    position: "Data Scientist",
    email: "carlos.mendez@example.com",
    phone: "123-555-002",
    totalExperience: "6 years",
    relevantExperience: "5 years",
    status: "pending",
    resumeUrl: "/documents/carlos-mendez-resume.pdf",
    summary: "Data Scientist experienced with production ML systems and data engineering.",
    education: "M.S. in Data Science, NYU",
    workHistory: [
      { company: "InsightAI", position: "Data Scientist", duration: "2020 - Present", description: "Productionized ML models and built data pipelines." }
    ],
    skills: ["Python", "PyTorch", "SQL", "ETL"],
    certifications: [],
    location: "New York, NY",
    salaryExpectation: "$130,000 - $150,000",
    availability: "Immediate",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Maya Singh",
    position: "QA Engineer",
    email: "maya.singh@example.com",
    phone: "123-555-003",
    totalExperience: "3 years",
    relevantExperience: "3 years",
    status: "pending",
    resumeUrl: "/documents/maya-singh-resume.pdf",
    summary: "QA Engineer with experience in automation, integration testing, and CI/CD.",
    education: "B.S. in Information Systems, Georgia Tech",
    workHistory: [
      { company: "QualityWorks", position: "QA Engineer", duration: "2021 - Present", description: "Implemented automated test suites and reduced regression time." }
    ],
    skills: ["Selenium", "Cypress", "Jest"],
    certifications: [],
    location: "Atlanta, GA",
    salaryExpectation: "$70,000 - $85,000",
    availability: "1 month",
    rating: 4.0,
  },
  {
    id: "7",
    name: "Sofia Rossi",
    position: "Product Designer",
    email: "sofia.rossi@example.com",
    phone: "123-555-005",
    totalExperience: "6 years",
    relevantExperience: "6 years",
    status: "pending",
    resumeUrl: "/documents/sofia-rossi-resume.pdf",
    summary: "Product Designer with cross-functional experience in UX and visual design.",
    education: "B.A. in Design, Politecnico di Milano",
    workHistory: [
      { company: "StudioX", position: "Product Designer", duration: "2018 - Present", description: "Led cross-platform design initiatives." }
    ],
    skills: ["Figma", "Prototyping", "Design Systems"],
    certifications: [],
    location: "Milan, Italy",
    salaryExpectation: "€60,000 - €75,000",
    availability: "2 weeks",
    rating: 4.5,
  },
];

export type { ScreeningCandidate };
