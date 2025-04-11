const config = {
    name: "Dinesh",
    title: "DevOps Engineer",
    tagline: "DevOps Engineer | Infrastructure Specialist | Cloud Expert",
    about: `Highly skilled DevOps Engineer with over 3 years of experience in automating, deploying, and maintaining infrastructure. Proven track record of improving efficiency and reducing downtime through implementing best practices and utilizing cutting-edge technologies. Seeking to leverage my expertise to drive innovation and streamline processes in a dynamic and collaborative environment.`,
    
    contact: {
        email: "dineshps8527@gmail.com",
        linkedin: "https://www.linkedin.com/in/dinesh-pratap-singh-595956190"
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
        { name: "IaC", icon: "fas fa-code" },
        { name: "Monitoring", icon: "fas fa-chart-line" }
    ],

    projects: [
        {
            name: "CI/CD Pipeline Optimization",
            description: "Implemented GitLab CI/CD pipelines reducing deployment time and improving reliability",
            icon: "fas fa-infinity",
            technologies: ["GitLab CI/CD", "Docker", "Jenkins", "GitHub Actions"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            name: "Infrastructure as Code Implementation",
            description: "Managed infrastructure as code with Terraform and Ansible ensuring scalable and reliable cloud applications",
            icon: "fas fa-code",
            technologies: ["Terraform", "Ansible", "Azure", "AWS", "IaC"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            name: "Azure Cloud Resource Manager",
            description: "Developed and managed a Python-based framework for Azure-based cloud sessions with automated provisioning and cleanup.",
            icon: "fab fa-microsoft",
            technologies: ["Python", "Azure", "Cloud Management", "Automation"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            name: "Kubernetes Monitoring Solution",
            description: "Created various Grafana and Prometheus dashboards for Kubernetes clusters, improving visibility of workloads",
            icon: "fas fa-chart-line",
            technologies: ["Kubernetes", "Grafana", "Prometheus", "Monitoring", "Alerting"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            name: "Technology PoC Development",
            description: "Conducted various proof-of-concepts to evaluate the feasibility of implementing new tools and technologies",
            icon: "fas fa-flask",
            technologies: ["Research", "Innovation", "Technology Evaluation", "Documentation"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            name: "Custom Kubernetes Environments",
            description: "Built custom images providing ready-made Kubernetes clusters and pre-configured tools for ed-tech course labs",
            icon: "fas fa-dharmachakra",
            technologies: ["Kubernetes", "Docker", "Container Images", "Education Tech"],
            liveLink: "#",
            githubLink: "#"
        }
    ],

    education: {
        degree: "Information Technology | Bachelor of Technology",
        institution: "Galgotias College of Engineering",
        location: "Greater Noida, India",
        period: "07/2017 – 07/2021"
    }
};

// Make the configuration available globally
window.portfolioConfig = config; 