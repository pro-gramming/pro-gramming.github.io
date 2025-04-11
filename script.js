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

// Enhanced Intersection Observer options
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Create observers for different types of elements
const createObserver = (elements, className = 'animate') => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                
                // For grid containers, animate their children
                if (entry.target.classList.contains('skills-grid') ||
                    entry.target.classList.contains('certifications-grid') ||
                    entry.target.classList.contains('project-grid')) {
                    Array.from(entry.target.children).forEach((child, index) => {
                        // Add a slight delay before adding the animate class
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 100);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => observer.observe(element));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // ... existing configuration code ...

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        createObserver([section]);
        
        // Observe grid containers within sections
        const grids = section.querySelectorAll('.skills-grid, .certifications-grid, .project-grid, .experience-timeline');
        if (grids.length) {
            grids.forEach(grid => {
                createObserver([grid]);
            });
        }
        
        // Observe individual items
        const items = section.querySelectorAll('.skill-card, .certification-card, .project-card, .experience-item');
        if (items.length) {
            createObserver(Array.from(items));
        }
    });
});

// Enhanced scroll-based navbar
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove background based on scroll position
    if (scrollTop > 50) {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add smooth transition to navbar
navbar.style.transition = 'all 0.3s ease';

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

// Enhance hover animations
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        icon.style.animation = 'none';
        icon.offsetHeight; // Trigger reflow
        icon.style.animation = 'rotateIn 0.6s ease';
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
}); 