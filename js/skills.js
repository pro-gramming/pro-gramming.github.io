// Skills carousel functionality
export class SkillsCarousel {
    constructor(skills) {
        this.skills = skills;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.skillsGrid = document.getElementById('skills-grid');
        this.skillsTimer = null;
    }

    updateSkillsDisplay(direction = 'next') {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const totalSkills = this.skills.length;
        const existingCards = Array.from(this.skillsGrid.children);
        
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
            newIndex = (this.currentIndex + 2 + totalSkills) % totalSkills;
            newCard.classList.add('far-right');
        } else {
            newIndex = (this.currentIndex - 2 + totalSkills) % totalSkills;
            newCard.classList.add('far-left');
        }
        
        const skill = this.skills[newIndex];
        newCard.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
        `;
        
        newCard.style.opacity = '0';
        this.skillsGrid.appendChild(newCard);
        
        newCard.offsetHeight; // Force reflow
        
        requestAnimationFrame(() => {
            newCard.style.opacity = direction === 'next' ? '0.6' : '0.6';
        });

        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }

    initializeSkillsDisplay() {
        this.skillsGrid.innerHTML = '';
        const totalSkills = this.skills.length;
        
        for (let i = -2; i <= 2; i++) {
            const skillIndex = (this.currentIndex + i + totalSkills) % totalSkills;
            const skill = this.skills[skillIndex];
            
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
            
            this.skillsGrid.appendChild(skillCard);
        }
    }

    startSkillsTimer() {
        this.skillsTimer = setInterval(() => {
            if (!this.isTransitioning) {
                this.currentIndex = (this.currentIndex + 1 + this.skills.length) % this.skills.length;
                this.updateSkillsDisplay('next');
            }
        }, 3000);
    }

    stopSkillsTimer() {
        if (this.skillsTimer) {
            clearInterval(this.skillsTimer);
            this.skillsTimer = null;
        }
    }

    init() {
        this.initializeSkillsDisplay();
        this.startSkillsTimer();

        // Event listeners
        this.skillsGrid.addEventListener('mouseenter', () => this.stopSkillsTimer());
        this.skillsGrid.addEventListener('mouseleave', () => this.startSkillsTimer());

        document.getElementById('prev-skill').addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.currentIndex = (this.currentIndex - 1 + this.skills.length) % this.skills.length;
                this.updateSkillsDisplay('prev');
            }
        });

        document.getElementById('next-skill').addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.currentIndex = (this.currentIndex + 1 + this.skills.length) % this.skills.length;
                this.updateSkillsDisplay('next');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isTransitioning) {
                if (e.key === 'ArrowLeft') {
                    this.currentIndex = (this.currentIndex - 1 + this.skills.length) % this.skills.length;
                    this.updateSkillsDisplay('prev');
                } else if (e.key === 'ArrowRight') {
                    this.currentIndex = (this.currentIndex + 1 + this.skills.length) % this.skills.length;
                    this.updateSkillsDisplay('next');
                }
            }
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.skillsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.skillsGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.currentIndex = (this.currentIndex + 1 + this.skills.length) % this.skills.length;
                this.updateSkillsDisplay('next');
            } else {
                this.currentIndex = (this.currentIndex - 1 + this.skills.length) % this.skills.length;
                this.updateSkillsDisplay('prev');
            }
        }
    }
} 