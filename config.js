const config = {
    name: "Dinesh",
    title: "DevOps Engineer",
    tagline: "DevOps Engineer | Infrastructure Specialist | Cloud Expert",
    about: `Highly skilled DevOps Engineer with over 3 years of experience in automating, deploying, and maintaining infrastructure. Proven track record of improving efficiency and reducing downtime through implementing best practices and utilizing cutting-edge technologies. Seeking to leverage my expertise to drive innovation and streamline processes in a dynamic and collaborative environment.`,
    
    contact: {
        email: "dineshps8527@gmail.com"
    },

    skills: [
        { name: "Linux expertise", icon: "fab fa-linux" },
        { name: "Kubernetes (K8s)", icon: "fas fa-dharmachakra" },
        { name: "Docker", icon: "fab fa-docker" },
        { name: "Docker Swarm", icon: "fas fa-layer-group" },
        { name: "Azure Cloud Proficiency", icon: "fab fa-microsoft" },
        { name: "Git Version Control", icon: "fab fa-git-alt" },
        { name: "Automation skills", icon: "fas fa-robot" },
        { name: "Python Development", icon: "fab fa-python" },
        { name: "CI/CD proficiency", icon: "fas fa-infinity" },
        { name: "Bash Scripting", icon: "fas fa-terminal" },
        { name: "Infrastructure as Code (IaC)", icon: "fas fa-code" },
        { name: "Monitoring", icon: "fas fa-chart-line" }
    ],

    certifications: [
        {
            name: "CKS: Certified Kubernetes Security Specialist",
            issuer: "linux foundation"
        },
        {
            name: "CKA: Certified Kubernetes Administrator",
            issuer: null
        },
        {
            name: "CKAD: Certified Kubernetes Application Developer",
            issuer: null
        },
        {
            name: "KCNA: Kubernetes and Cloud Native Associate",
            issuer: null
        },
        {
            name: "LFCS: Linux Foundation Certified Systems Administrator",
            issuer: "The Linux Foundation"
        },
        {
            name: "HashiCorp Certified: Terraform Associate",
            issuer: "HashiCorp"
        }
    ],

    experience: [
        {
            role: "DevOps Engineer",
            company: "Kodekloud",
            location: "Singapore, 048545",
            period: "10/2021 – PRESENT",
            achievements: [
                "Spearheaded continuous integration and deployment pipelines with GitLab CI/CD, reducing deployment time, and managed infrastructure as code with Terraform and Ansible, ensuring scalable and reliable cloud applications.",
                "Collaborated with cross-functional teams to efficiently troubleshoot and resolve production issues, leading to minimized downtime and enhanced system performance.",
                "Developed and managed a Python-based framework for Azure-based cloud sessions, overseeing the creation and deletion of all resources, including those created by users.",
                "Enhanced monitoring by creating various Grafana and Prometheus dashboards for Kubernetes clusters, improving visibility of workloads.",
                "Conducted various proof-of-concepts (PoCs) to evaluate the feasibility of implementing new tools and technologies on existing infrastructure.",
                "Created custom images providing ready-made Kubernetes clusters and pre-configured tools for ed-tech course labs."
            ]
        }
    ],

    education: {
        degree: "Information Technology | Bachelor of Technology",
        institution: "Galgotias College of Engineering",
        location: "Greater Noida, India",
        period: "07/2017 – 07/2021"
    },

    projects: [
        {
            name: "Cloud Resource Manager",
            description: "Python-based framework for managing Azure cloud resources with automated provisioning and cleanup",
            icon: "fas fa-cloud",
            technologies: ["Python", "Azure", "Infrastructure as Code"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            name: "K8s Monitoring Stack",
            description: "Comprehensive Kubernetes monitoring solution using Grafana, Prometheus, and custom dashboards",
            icon: "fas fa-chart-line",
            technologies: ["Kubernetes", "Grafana", "Prometheus"],
            liveLink: "#",
            githubLink: "#"
        }
    ]
};

// Make the configuration available globally
window.portfolioConfig = config; 