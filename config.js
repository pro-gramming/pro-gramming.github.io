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

    highlights: [
        {
            title: "CI/CD Pipeline Optimization",
            description: "Implemented GitLab CI/CD pipelines reducing deployment time by 40% and improving reliability through automated testing and deployment processes. Integrated with Docker for containerized builds and Jenkins for orchestration.",
            technologies: ["GitLab CI/CD", "Docker", "Jenkins", "GitHub Actions"],
            link: "#"
        },
        {
            title: "Infrastructure as Code Implementation",
            description: "Led the migration to Infrastructure as Code using Terraform and Ansible, resulting in 60% faster infrastructure provisioning and 80% reduction in configuration errors. Managed multi-cloud deployments across Azure and AWS.",
            technologies: ["Terraform", "Ansible", "Azure", "AWS", "IaC"],
            link: "#"
        },
        {
            title: "Azure Cloud Resource Manager",
            description: "Developed a Python-based framework for Azure cloud session management, automating resource provisioning and cleanup. Reduced manual intervention by 90% and saved 30% in cloud costs through efficient resource management.",
            technologies: ["Python", "Azure", "Cloud Management", "Automation"],
            link: "#"
        },
        {
            title: "Kubernetes Monitoring Solution",
            description: "Implemented comprehensive monitoring solution using Grafana and Prometheus for Kubernetes clusters. Created custom dashboards and alerting rules that improved incident response time by 50%.",
            technologies: ["Kubernetes", "Grafana", "Prometheus", "Monitoring"],
            link: "#"
        },
        {
            title: "Technology PoC Development",
            description: "Led multiple proof-of-concept projects evaluating new tools and technologies. Conducted thorough analysis and documentation, enabling data-driven decisions for technology adoption.",
            technologies: ["Research", "Innovation", "Technology Evaluation"],
            link: "#"
        },
        {
            title: "Custom Kubernetes Environments",
            description: "Architected and built custom Kubernetes environments for educational platforms, featuring pre-configured tools and automated setup. Served over 1000 students with zero deployment issues.",
            technologies: ["Kubernetes", "Docker", "Container Images", "Education Tech"],
            link: "#"
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