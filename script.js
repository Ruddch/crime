// PlasmaCrime - Prison Carousel Script
class PrisonCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.cards = document.querySelectorAll('.criminal-card');
        this.currentIndex = 0;
        this.cardWidth = 320; // 300px + 20px gap
        this.visibleCards = this.getVisibleCardsCount();
        this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCarousel();
        this.startAutoPlay();
        this.addPrisonEffects();
    }
    
    getVisibleCardsCount() {
        const containerWidth = this.track.parentElement.offsetWidth;
        return Math.floor(containerWidth / this.cardWidth);
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            this.stopAutoPlay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            this.startAutoPlay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Pause auto-play on hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.visibleCards = this.getVisibleCardsCount();
            this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateCarousel();
        });
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
            this.addSlideEffect('prev');
        }
    }
    
    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
            this.addSlideEffect('next');
        }
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex === this.maxIndex ? '0.5' : '1';
        
        // Add prison sound effect (visual feedback)
        this.addPrisonSoundEffect();
    }
    
    addSlideEffect(direction) {
        // Add visual feedback for slide transitions
        this.track.style.filter = 'brightness(1.1)';
        setTimeout(() => {
            this.track.style.filter = 'brightness(1)';
        }, 200);
    }
    
    addPrisonSoundEffect() {
        // Visual prison sound effect using CSS animations
        const effect = document.createElement('div');
        effect.className = 'prison-sound-effect';
        effect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: #ff4444;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: prisonPulse 0.3s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            document.body.removeChild(effect);
        }, 300);
    }
    
    addPrisonEffects() {
        // Add CSS for prison sound effect animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes prisonPulse {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add random prison atmosphere effects
        this.addRandomPrisonEffects();
    }
    
    addRandomPrisonEffects() {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                this.addPrisonAtmosphereEffect();
            }
        }, 3000);
    }
    
    addPrisonAtmosphereEffect() {
        const effects = [
            () => this.addFlickerEffect(),
            () => this.addDustEffect(),
            () => this.addShadowEffect()
        ];
        
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
    }
    
    addFlickerEffect() {
        const originalOpacity = this.track.style.opacity;
        this.track.style.transition = 'opacity 0.1s ease';
        
        let flickerCount = 0;
        const flickerInterval = setInterval(() => {
            this.track.style.opacity = this.track.style.opacity === '0.8' ? '1' : '0.8';
            flickerCount++;
            
            if (flickerCount >= 6) {
                clearInterval(flickerInterval);
                this.track.style.opacity = originalOpacity || '1';
                this.track.style.transition = '';
            }
        }, 100);
    }
    
    addDustEffect() {
        const dust = document.createElement('div');
        dust.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #666, transparent);
            animation: dustFall 2s ease-out forwards;
            pointer-events: none;
            z-index: 5;
        `;
        
        this.track.parentElement.appendChild(dust);
        
        setTimeout(() => {
            if (dust.parentElement) {
                dust.parentElement.removeChild(dust);
            }
        }, 2000);
    }
    
    addShadowEffect() {
        const shadow = document.createElement('div');
        shadow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.3) 100%);
            animation: shadowPass 1s ease-out forwards;
            pointer-events: none;
            z-index: 5;
        `;
        
        this.track.parentElement.appendChild(shadow);
        
        setTimeout(() => {
            if (shadow.parentElement) {
                shadow.parentElement.removeChild(shadow);
            }
        }, 1000);
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex < this.maxIndex) {
                this.nextSlide();
            } else {
                this.currentIndex = 0;
                this.updateCarousel();
            }
        }, 4000); // Change slide every 4 seconds
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Prison Button Effects
class PrisonButtonEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.addButtonEffects();
        this.addPrisonSounds();
    }
    
    addButtonEffects() {
        const buttons = document.querySelectorAll('.prison-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.addClickEffect(e.target);
                this.addPrisonClickSound();
            });
            
            button.addEventListener('mouseenter', () => {
                this.addHoverEffect(button);
            });
        });
    }
    
    addClickEffect(button) {
        // Ripple effect
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentElement) {
                ripple.parentElement.removeChild(ripple);
            }
        }, 600);
    }
    
    addHoverEffect(button) {
        button.style.transform = 'translateY(-2px) scale(1.05)';
        button.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }
    
    addPrisonClickSound() {
        // Visual feedback for button clicks
        const soundWave = document.createElement('div');
        soundWave.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 2px;
            height: 2px;
            background: #ff4444;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: prisonClickWave 0.5s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(soundWave);
        
        setTimeout(() => {
            document.body.removeChild(soundWave);
        }, 500);
    }
    
    addPrisonSounds() {
        // Add CSS for sound effect animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes dustFall {
                0% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100px);
                    opacity: 0;
                }
            }
            
            @keyframes shadowPass {
                0% {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes prisonClickWave {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(50);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Prison Atmosphere
class PrisonAtmosphere {
    constructor() {
        this.init();
    }
    
    init() {
        this.addPrisonAmbience();
        this.addRandomEvents();
    }
    
    addPrisonAmbience() {
        // Add subtle background animations
        this.addFloatingParticles();
        this.addPrisonShadows();
    }
    
    addFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        document.body.appendChild(particleContainer);
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createParticle(particleContainer);
            }
        }, 2000);
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: floatUp 4s ease-out forwards;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentElement) {
                particle.parentElement.removeChild(particle);
            }
        }, 4000);
    }
    
    addPrisonShadows() {
        const shadow = document.createElement('div');
        shadow.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 20% 80%, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
            pointer-events: none;
            z-index: 1;
            animation: shadowMove 10s ease-in-out infinite;
        `;
        
        document.body.appendChild(shadow);
    }
    
    addRandomEvents() {
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance
                this.triggerRandomEvent();
            }
        }, 5000);
    }
    
    triggerRandomEvent() {
        const events = [
            () => this.addPrisonFlicker(),
            () => this.addPrisonRumble(),
            () => this.addPrisonGlow()
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        randomEvent();
    }
    
    addPrisonFlicker() {
        document.body.style.filter = 'brightness(0.8)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 100);
    }
    
    addPrisonRumble() {
        document.body.style.animation = 'prisonRumble 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
    
    addPrisonGlow() {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 68, 68, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 2;
            animation: prisonGlowPulse 2s ease-out forwards;
        `;
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            document.body.removeChild(glow);
        }, 2000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add additional CSS for animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(100vh);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px);
                opacity: 0;
            }
        }
        
        @keyframes shadowMove {
            0%, 100% {
                transform: translateX(0) translateY(0);
            }
            25% {
                transform: translateX(20px) translateY(-10px);
            }
            50% {
                transform: translateX(-10px) translateY(20px);
            }
            75% {
                transform: translateX(10px) translateY(-5px);
            }
        }
        
        @keyframes prisonRumble {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-2px); }
            20% { transform: translateX(2px); }
            30% { transform: translateX(-1px); }
            40% { transform: translateX(1px); }
            50% { transform: translateX(-1px); }
            60% { transform: translateX(1px); }
            70% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
            90% { transform: translateX(-1px); }
        }
        
        @keyframes prisonGlowPulse {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            50% {
                opacity: 1;
                transform: scale(1.1);
            }
            100% {
                opacity: 0;
                transform: scale(1.2);
            }
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Initialize all components
    new PrisonCarousel();
    new PrisonButtonEffects();
    new PrisonAtmosphere();
    
    console.log('🔒 PlasmaCrime Prison System Initialized! Welcome to the most dangerous crypto prison! 🔒');
});

// CA (Contract Address) copy function
function copyCA() {
    const contractAddress = '0x1234567890abcdef1234567890abcdef12345678'; // Replace with actual contract address
    const button = document.getElementById('caButton');
    
    // Copy to clipboard
    navigator.clipboard.writeText(contractAddress).then(() => {
        // Visual feedback
        const originalText = button.textContent;
        button.textContent = 'COPIED!';
        button.style.background = 'linear-gradient(145deg, #00ff00, #00cc00)';
        button.style.color = '#000';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(145deg, #4a90e2, #357abd)';
            button.style.color = 'white';
        }, 2000);
        
        // Add copy animation
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
        
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = contractAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Visual feedback for fallback
        const originalText = button.textContent;
        button.textContent = 'COPIED!';
        button.style.background = 'linear-gradient(145deg, #00ff00, #00cc00)';
        button.style.color = '#000';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(145deg, #4a90e2, #357abd)';
            button.style.color = 'white';
        }, 2000);
    });
}
