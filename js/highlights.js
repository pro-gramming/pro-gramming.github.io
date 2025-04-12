// Professional highlights carousel functionality
export class HighlightsCarousel {
    constructor(highlights) {
        this.highlights = highlights;
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.highlightsGrid = document.getElementById('highlights-grid');
        this.highlightsDots = document.getElementById('highlights-dots');
        this.highlightsTimer = null;
    }

    updateHighlightsDisplay(direction = 'next') {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        const currentHighlight = this.highlightsGrid.querySelector('.highlight-card.active');
        const totalHighlights = this.highlights.length;
        
        // Calculate new index
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % totalHighlights;
        } else {
            this.currentIndex = (this.currentIndex - 1 + totalHighlights) % totalHighlights;
        }

        // Create new highlight card
        const highlight = this.highlights[this.currentIndex];
        const newCard = document.createElement('div');
        newCard.className = 'highlight-card';
        newCard.innerHTML = `
            <h3>${highlight.title}</h3>
            <p class="highlight-description">${highlight.description}</p>
            <div class="highlight-tech">
                ${highlight.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;

        // Handle transition
        if (currentHighlight) {
            currentHighlight.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
            newCard.classList.add(direction === 'next' ? 'from-right' : 'from-left');
            
            setTimeout(() => {
                currentHighlight.remove();
                newCard.classList.remove(direction === 'next' ? 'from-right' : 'from-left');
                newCard.classList.add('active');
                this.isTransitioning = false;
            }, 500);
        } else {
            newCard.classList.add('active');
            this.isTransitioning = false;
        }

        this.highlightsGrid.appendChild(newCard);
        this.updateDotIndicators();
    }

    createDotIndicators() {
        this.highlightsDots.innerHTML = '';
        for (let i = 0; i < this.highlights.length; i++) {
            const dot = document.createElement('button');
            dot.className = 'highlight-dot';
            dot.setAttribute('aria-label', `Go to highlight ${i + 1}`);
            
            dot.addEventListener('click', () => {
                if (i !== this.currentIndex && !this.isTransitioning) {
                    const direction = i > this.currentIndex ? 'next' : 'prev';
                    this.currentIndex = i - 1; // Subtract 1 because updateHighlightsDisplay will add 1
                    this.updateHighlightsDisplay(direction);
                }
            });
            
            this.highlightsDots.appendChild(dot);
        }
        this.updateDotIndicators();
    }

    updateDotIndicators() {
        const dots = this.highlightsDots.querySelectorAll('.highlight-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startHighlightsTimer() {
        this.highlightsTimer = setInterval(() => {
            if (!this.isTransitioning) {
                this.updateHighlightsDisplay('next');
            }
        }, 5000);
    }

    stopHighlightsTimer() {
        if (this.highlightsTimer) {
            clearInterval(this.highlightsTimer);
            this.highlightsTimer = null;
        }
    }

    init() {
        if (this.highlights.length === 0) return;

        this.createDotIndicators();
        this.updateHighlightsDisplay('next');
        this.startHighlightsTimer();

        // Event listeners
        this.highlightsGrid.addEventListener('mouseenter', () => this.stopHighlightsTimer());
        this.highlightsGrid.addEventListener('mouseleave', () => this.startHighlightsTimer());

        document.getElementById('prev-highlight').addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.updateHighlightsDisplay('prev');
            }
        });

        document.getElementById('next-highlight').addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.updateHighlightsDisplay('next');
            }
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.highlightsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.highlightsGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.updateHighlightsDisplay('next');
            } else {
                this.updateHighlightsDisplay('prev');
            }
        }
    }
} 