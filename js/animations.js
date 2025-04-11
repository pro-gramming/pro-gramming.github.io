// Animation utilities
export function createObserver(elements, className = 'animate') {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
}

export function initAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    createObserver(animatedElements);

    // Remove skills section from animation system
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.classList.add('no-animate');
        const observer = new IntersectionObserver(() => {}, { threshold: 0.1 });
        observer.observe(skillsSection);
    }
} 