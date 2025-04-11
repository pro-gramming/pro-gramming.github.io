// Populate content from configuration
document.addEventListener('DOMContentLoaded', () => {
    const config = window.portfolioConfig;

    // Populate basic information
    document.getElementById('name').textContent = config.name;
    document.getElementById('tagline').textContent = config.tagline;
    document.getElementById('about-text').textContent = config.about;
    document.getElementById('footer-name').textContent = config.name;

    // Populate contact information
    document.getElementById('email-link').href = `mailto:${config.contact.email}`;
    document.getElementById('email-link').textContent = config.contact.email;

    // Populate skills
    const skillsGrid = document.getElementById('skills-grid');
    config.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
        `;
        skillsGrid.appendChild(skillCard);
    });

    // Populate certifications
    const certificationsGrid = document.getElementById('certifications-grid');
    config.certifications.forEach(cert => {
        const certCard = document.createElement('div');
        certCard.className = 'certification-card';
        certCard.innerHTML = `
            <h3>${cert.name}</h3>
            ${cert.issuer ? `<div class="issuer">${cert.issuer}</div>` : ''}
        `;
        certificationsGrid.appendChild(certCard);
    });

    // Populate experience
    const experienceTimeline = document.getElementById('experience-timeline');
    config.experience.forEach(exp => {
        const expItem = document.createElement('div');
        expItem.className = 'experience-item';
        expItem.innerHTML = `
            <div class="experience-header">
                <div class="experience-title">${exp.role}</div>
                <div class="experience-company">${exp.company}</div>
                <div class="experience-period">${exp.period}</div>
                <div class="experience-location">${exp.location}</div>
            </div>
            <ul class="experience-achievements">
                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        experienceTimeline.appendChild(expItem);
    });

    // Populate projects
    const projectGrid = document.getElementById('project-grid');
    config.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-icon">
                <i class="${project.icon}"></i>
            </div>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="project-technology">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.liveLink}" class="btn small">View Live</a>
                <a href="${project.githubLink}" class="btn small secondary">GitHub</a>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation classes to elements
document.querySelectorAll('.skill-card, .project-card, .certification-card, .experience-item').forEach(element => {
    element.classList.add('fade-in');
});

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').appendChild(mobileMenuButton);

const navMenu = document.querySelector('.nav-menu');
mobileMenuButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-button')) {
        navMenu.classList.remove('active');
    }
});

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-color);
        cursor: pointer;
        padding: 0.5rem;
    }

    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }

        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }

        .nav-menu.active {
            transform: translateY(0);
            display: flex;
        }
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 