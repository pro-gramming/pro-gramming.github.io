import { initDarkMode } from './darkMode.js';
import { initTypingEffect } from './typingEffect.js';
import { SkillsCarousel } from './skills.js';
import { HighlightsCarousel } from './highlights.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const config = window.portfolioConfig;

    // Initialize navigation
    initNavigation();

    // Initialize dark mode
    initDarkMode();

    // Initialize typing effect
    initTypingEffect(config);

    // Populate basic information
    document.getElementById('tagline').textContent = config.tagline;
    
    // Populate about section with structured content
    const aboutText = document.getElementById('about-text');
    aboutText.innerHTML = `
        <p class="about-intro">${config.about.intro}</p>
        <ul class="about-specialties">
            ${config.about.specialties.map(specialty => `<li><i class="fas fa-check"></i> ${specialty}</li>`).join('')}
        </ul>
        <p class="about-passion">${config.about.passion}</p>
        <p class="about-focus">${config.about.focus}</p>
        <p class="about-motto"><i class="fas fa-quote-left"></i> ${config.about.motto} <i class="fas fa-quote-right"></i></p>
    `;
    
    document.getElementById('footer-name').textContent = config.name;

    // Populate contact information
    document.getElementById('email-link').href = `mailto:${config.contact.email}`;
    document.getElementById('email-link').textContent = config.contact.email;
    document.getElementById('linkedin-link').href = config.contact.linkedin;

    // Initialize skills carousel
    const skillsCarousel = new SkillsCarousel(config.skills);
    skillsCarousel.init();

    // Initialize highlights carousel
    const highlightsCarousel = new HighlightsCarousel(config.highlights);
    highlightsCarousel.init();

    // Initialize animations
    initAnimations();
}); 