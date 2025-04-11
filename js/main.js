import { initDarkMode } from './darkMode.js';
import { initTypingEffect } from './typingEffect.js';
import { SkillsCarousel } from './skills.js';
import { HighlightsCarousel } from './highlights.js';
import { initAnimations } from './animations.js';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const config = window.portfolioConfig;

    // Initialize dark mode
    initDarkMode();

    // Initialize typing effect
    initTypingEffect(config);

    // Populate basic information
    document.getElementById('tagline').textContent = config.tagline;
    document.getElementById('about-text').textContent = config.about;
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