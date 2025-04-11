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
    document.getElementById('linkedin-link').href = config.contact.linkedin;

    // Populate skills with cover flow effect
    const skillsGrid = document.getElementById('skills-grid');
    let currentIndex = 0;
    const skills = config.skills;
    let isTransitioning = false;

    function updateSkillsDisplay(direction = 'next') {
        if (isTransitioning) return;
        isTransitioning = true;

        const totalSkills = skills.length;
        const existingCards = Array.from(skillsGrid.children);
        
        // First, update classes on existing cards based on direction
        existingCards.forEach(card => {
            const currentClass = Array.from(card.classList).find(cls => 
                ['center', 'left', 'right', 'far-left', 'far-right'].includes(cls)
            );
            
            if (currentClass) {
                card.classList.remove(currentClass);
                let newClass;
                
                if (direction === 'next') {
                    switch (currentClass) {
                        case 'far-left': card.remove(); return;
                        case 'left': newClass = 'far-left'; break;
                        case 'center': newClass = 'left'; break;
                        case 'right': newClass = 'center'; break;
                        case 'far-right': newClass = 'right'; break;
                    }
                } else {
                    switch (currentClass) {
                        case 'far-right': card.remove(); return;
                        case 'right': newClass = 'far-right'; break;
                        case 'center': newClass = 'right'; break;
                        case 'left': newClass = 'center'; break;
                        case 'far-left': newClass = 'left'; break;
                    }
                }
                
                if (newClass) {
                    card.classList.add(newClass);
                }
            }
        });

        // Add new card
        const newCard = document.createElement('div');
        newCard.className = 'skill-card';
        
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 2 + totalSkills) % totalSkills;
            newCard.classList.add('far-right');
        } else {
            newIndex = (currentIndex - 2 + totalSkills) % totalSkills;
            newCard.classList.add('far-left');
        }
        
        const skill = skills[newIndex];
        newCard.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
        `;
        
        // Initially set opacity to 0
        newCard.style.opacity = '0';
        skillsGrid.appendChild(newCard);
        
        // Force reflow
        newCard.offsetHeight;
        
        // Fade in the new card
        requestAnimationFrame(() => {
            newCard.style.opacity = direction === 'next' ? '0.6' : '0.6';
        });

        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    // Initialize skills display
    function initializeSkillsDisplay() {
        skillsGrid.innerHTML = '';
        const totalSkills = skills.length;
        
        // Create initial set of cards
        for (let i = -2; i <= 2; i++) {
            const skillIndex = (currentIndex + i + totalSkills) % totalSkills;
            const skill = skills[skillIndex];
            
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            
            if (i === 0) skillCard.classList.add('center');
            else if (i === -1) skillCard.classList.add('left');
            else if (i === 1) skillCard.classList.add('right');
            else if (i === -2) skillCard.classList.add('far-left');
            else if (i === 2) skillCard.classList.add('far-right');
            
            skillCard.innerHTML = `
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
            `;
            
            skillsGrid.appendChild(skillCard);
        }
    }

    // Initialize the display
    initializeSkillsDisplay();

    // Add automatic timer for skills slider
    let skillsTimer;
    const startSkillsTimer = () => {
        skillsTimer = setInterval(() => {
            if (!isTransitioning) {
                currentIndex = (currentIndex + 1 + skills.length) % skills.length;
                updateSkillsDisplay('next');
            }
        }, 3000); // Move every 3 seconds
    };

    // Start the skills timer
    startSkillsTimer();

    // Pause timer on hover
    skillsGrid.addEventListener('mouseenter', () => clearInterval(skillsTimer));
    skillsGrid.addEventListener('mouseleave', startSkillsTimer);

    // Completely remove the skills section from the animation system
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.classList.add('no-animate');
        const observer = new IntersectionObserver(() => {}, { threshold: 0.1 });
        observer.observe(skillsSection);
    }

    // Add navigation event listeners
    document.getElementById('prev-skill').addEventListener('click', () => {
        if (!isTransitioning) {
            currentIndex = (currentIndex - 1 + skills.length) % skills.length;
            updateSkillsDisplay('prev');
        }
    });

    document.getElementById('next-skill').addEventListener('click', () => {
        if (!isTransitioning) {
            currentIndex = (currentIndex + 1 + skills.length) % skills.length;
            updateSkillsDisplay('next');
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isTransitioning) {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + skills.length) % skills.length;
                updateSkillsDisplay('prev');
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1 + skills.length) % skills.length;
                updateSkillsDisplay('next');
            }
        }
    });

    // Add touch/swipe support with smooth transitions
    let touchStartX = 0;
    let touchEndX = 0;

    skillsGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    skillsGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold && !isTransitioning) {
            if (diff > 0) {
                // Swipe left - go next
                currentIndex = (currentIndex + 1 + skills.length) % skills.length;
                updateSkillsDisplay('next');
            } else {
                // Swipe right - go previous
                currentIndex = (currentIndex - 1 + skills.length) % skills.length;
                updateSkillsDisplay('prev');
            }
        }
    }

    // Populate projects with cover flow effect
    const highlightsGrid = document.getElementById('highlights-grid');
    const highlightsDots = document.getElementById('highlights-dots');
    let currentHighlightIndex = 0;
    const projects = config.projects;
    let isHighlightTransitioning = false;

    function updateHighlightsDisplay(direction = 'next') {
        if (isHighlightTransitioning) return;
        isHighlightTransitioning = true;

        const totalProjects = projects.length;
        const existingCards = Array.from(highlightsGrid.children);
        
        // First, update classes on existing cards based on direction
        existingCards.forEach(card => {
            const currentClass = Array.from(card.classList).find(cls => 
                ['center', 'left', 'right', 'far-left', 'far-right'].includes(cls)
            );
            
            if (currentClass) {
                card.classList.remove(currentClass);
                let newClass;
                
                if (direction === 'next') {
                    switch (currentClass) {
                        case 'far-left': card.remove(); return;
                        case 'left': newClass = 'far-left'; break;
                        case 'center': newClass = 'left'; break;
                        case 'right': newClass = 'center'; break;
                        case 'far-right': newClass = 'right'; break;
                    }
                } else {
                    switch (currentClass) {
                        case 'far-right': card.remove(); return;
                        case 'right': newClass = 'far-right'; break;
                        case 'center': newClass = 'right'; break;
                        case 'left': newClass = 'center'; break;
                        case 'far-left': newClass = 'left'; break;
                    }
                }
                
                if (newClass) {
                    card.classList.add(newClass);
                }
            }
        });

        // Add new card
        const newCard = document.createElement('div');
        newCard.className = 'highlight-card';
        
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentHighlightIndex + 2 + totalProjects) % totalProjects;
            newCard.classList.add('far-right');
        } else {
            newIndex = (currentHighlightIndex - 2 + totalProjects) % totalProjects;
            newCard.classList.add('far-left');
        }
        
        const project = projects[newIndex];
        newCard.innerHTML = `
            <div class="project-icon">
                <i class="${project.icon}"></i>
            </div>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="project-technology">${tech}</span>`).join('')}
            </div>
        `;
        
        // Initially set opacity to 0
        newCard.style.opacity = '0';
        highlightsGrid.appendChild(newCard);
        
        // Force reflow
        newCard.offsetHeight;
        
        // Fade in the new card
        requestAnimationFrame(() => {
            newCard.style.opacity = direction === 'next' ? '0.6' : '0.6';
        });

        // Update dot indicators
        updateDotIndicators();

        // Reset transition lock after animation completes
        setTimeout(() => {
            isHighlightTransitioning = false;
        }, 800);
    }

    // Initialize highlights display
    function initializeHighlightsDisplay() {
        highlightsGrid.innerHTML = '';
        const totalProjects = projects.length;
        
        // Create initial set of cards
        for (let i = -2; i <= 2; i++) {
            const projectIndex = (currentHighlightIndex + i + totalProjects) % totalProjects;
            const project = projects[projectIndex];
            
            const highlightCard = document.createElement('div');
            highlightCard.className = 'highlight-card';
            
            if (i === 0) highlightCard.classList.add('center');
            else if (i === -1) highlightCard.classList.add('left');
            else if (i === 1) highlightCard.classList.add('right');
            else if (i === -2) highlightCard.classList.add('far-left');
            else if (i === 2) highlightCard.classList.add('far-right');
            
            highlightCard.innerHTML = `
                <div class="project-icon">
                    <i class="${project.icon}"></i>
                </div>
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="project-technology">${tech}</span>`).join('')}
                </div>
            `;
            
            highlightsGrid.appendChild(highlightCard);
        }

        // Create dot indicators
        createDotIndicators();
    }

    // Create dot indicators
    function createDotIndicators() {
        highlightsDots.innerHTML = '';
        projects.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `highlight-dot ${index === currentHighlightIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                if (!isHighlightTransitioning) {
                    const diff = index - currentHighlightIndex;
                    if (diff !== 0) {
                        const direction = diff > 0 ? 'next' : 'prev';
                        const steps = Math.abs(diff);
                        for (let i = 0; i < steps; i++) {
                            setTimeout(() => {
                                currentHighlightIndex = (currentHighlightIndex + (direction === 'next' ? 1 : -1) + projects.length) % projects.length;
                                updateHighlightsDisplay(direction);
                            }, i * 800);
                        }
                    }
                }
            });
            highlightsDots.appendChild(dot);
        });
    }

    // Update dot indicators
    function updateDotIndicators() {
        const dots = highlightsDots.children;
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === currentHighlightIndex);
        });
    }

    // Initialize the highlights display
    initializeHighlightsDisplay();

    // Add automatic timer for highlights slider
    let highlightsTimer;
    const startHighlightsTimer = () => {
        highlightsTimer = setInterval(() => {
            if (!isHighlightTransitioning) {
                currentHighlightIndex = (currentHighlightIndex + 1 + projects.length) % projects.length;
                updateHighlightsDisplay('next');
            }
        }, 3000); // Move every 3 seconds
    };

    // Start the highlights timer
    startHighlightsTimer();

    // Pause timer on hover
    highlightsGrid.addEventListener('mouseenter', () => clearInterval(highlightsTimer));
    highlightsGrid.addEventListener('mouseleave', startHighlightsTimer);

    // Add navigation event listeners
    document.getElementById('prev-highlight').addEventListener('click', () => {
        if (!isHighlightTransitioning) {
            currentHighlightIndex = (currentHighlightIndex - 1 + projects.length) % projects.length;
            updateHighlightsDisplay('prev');
        }
    });

    document.getElementById('next-highlight').addEventListener('click', () => {
        if (!isHighlightTransitioning) {
            currentHighlightIndex = (currentHighlightIndex + 1 + projects.length) % projects.length;
            updateHighlightsDisplay('next');
        }
    });

    // Add keyboard navigation for highlights
    document.addEventListener('keydown', (e) => {
        if (!isHighlightTransitioning) {
            if (e.key === 'ArrowLeft') {
                currentHighlightIndex = (currentHighlightIndex - 1 + projects.length) % projects.length;
                updateHighlightsDisplay('prev');
            } else if (e.key === 'ArrowRight') {
                currentHighlightIndex = (currentHighlightIndex + 1 + projects.length) % projects.length;
                updateHighlightsDisplay('next');
            }
        }
    });

    // Add touch/swipe support for highlights
    let highlightTouchStartX = 0;
    let highlightTouchEndX = 0;

    highlightsGrid.addEventListener('touchstart', (e) => {
        highlightTouchStartX = e.changedTouches[0].screenX;
    });

    highlightsGrid.addEventListener('touchend', (e) => {
        highlightTouchEndX = e.changedTouches[0].screenX;
        handleHighlightSwipe();
    });

    function handleHighlightSwipe() {
        const swipeThreshold = 50;
        const diff = highlightTouchStartX - highlightTouchEndX;

        if (Math.abs(diff) > swipeThreshold && !isHighlightTransitioning) {
            if (diff > 0) {
                // Swipe left - go next
                currentHighlightIndex = (currentHighlightIndex + 1 + projects.length) % projects.length;
                updateHighlightsDisplay('next');
            } else {
                // Swipe right - go previous
                currentHighlightIndex = (currentHighlightIndex - 1 + projects.length) % projects.length;
                updateHighlightsDisplay('prev');
            }
        }
    }

    // Remove highlights section from animation system
    const highlightsSection = document.getElementById('professional-highlights');
    if (highlightsSection) {
        highlightsSection.classList.add('no-animate');
        const observer = new IntersectionObserver(() => {}, { threshold: 0.1 });
        observer.observe(highlightsSection);
    }

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

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        createObserver([section]);
        
        // Observe grid containers within sections
        const grids = section.querySelectorAll('.skills-grid, .project-grid');
        if (grids.length) {
            grids.forEach(grid => {
                createObserver([grid]);
            });
        }
        
        // Observe individual items
        const items = section.querySelectorAll('.skill-card, .project-card');
        if (items.length) {
            createObserver(Array.from(items));
        }
    });

    // Remove skills section from animation system
    if (skillsSection) {
        skillsSection.classList.add('no-animate');
        const observer = new IntersectionObserver(() => {}, { threshold: 0.1 });
        observer.observe(skillsSection);
    }
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
                    entry.target.classList.contains('project-grid') ||
                    entry.target.classList.contains('highlights-grid')) {
                    Array.from(entry.target.children).forEach((child, index) => {
                        // Add a slight delay before adding the animate class
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 100);
                    });
                }
                
                // For sections, animate their headings
                if (entry.target.tagName === 'SECTION') {
                    const heading = entry.target.querySelector('h2');
                    if (heading) {
                        heading.classList.add('animate');
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => observer.observe(element));
};

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

// Mobile menu functionality
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
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