// Surprise Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const revealBtn = document.getElementById('revealBtn');
    const surpriseReveal = document.getElementById('surpriseReveal');
    const colorDots = document.querySelectorAll('.color-dot');
    const musicBtns = document.querySelectorAll('.music-btn');
    const startGameBtn = document.getElementById('startStarGame');
    const starCount = document.getElementById('starCount');
    const frameBtns = document.querySelectorAll('.frame-btn');
    const framedPhoto = document.getElementById('framedPhoto');
    const messageCards = document.querySelectorAll('.message-card');
    const dots = document.querySelectorAll('.dot');

    let currentMessageIndex = 0;
    let gameActive = false;
    let stars = 0;

    // Initialize surprise page
    function initSurprise() {
        setupRevealButton();
        setupColorGame();
        setupMusicBox();
        setupStarGame();
        setupPhotoFrame();
        setupMessageCarousel();
    }

    // Reveal button functionality
    function setupRevealButton() {
        if (revealBtn) {
            revealBtn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    revealSurprise();
                }, 150);
            });
        }
    }

    function revealSurprise() {
        if (surpriseReveal) {
            surpriseReveal.classList.add('active');
            
            // Scroll to reveal section
            surpriseReveal.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Create confetti effect
            createConfetti();
            
            // Play celebration sound (visual feedback)
            celebrateReveal();
        }
    }

    function createConfetti() {
        const colors = ['#ff6b9d', '#667eea', '#f093fb', '#4ecdc4', '#f9ca24'];
        const confettiContainer = document.querySelector('.confetti');
        
        if (confettiContainer) {
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confettiPiece = document.createElement('div');
                    confettiPiece.style.position = 'absolute';
                    confettiPiece.style.width = '10px';
                    confettiPiece.style.height = '10px';
                    confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confettiPiece.style.left = Math.random() * 100 + '%';
                    confettiPiece.style.top = '-10px';
                    confettiPiece.style.borderRadius = '50%';
                    confettiPiece.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
                    
                    confettiContainer.appendChild(confettiPiece);
                    
                    setTimeout(() => {
                        confettiPiece.remove();
                    }, 5000);
                }, i * 100);
            }
        }
    }

    function celebrateReveal() {
        // Add celebration class for animations
        document.querySelector('.surprise-message')?.classList.add('celebrate');
        
        // Remove class after animation
        setTimeout(() => {
            document.querySelector('.surprise-message')?.classList.remove('celebrate');
        }, 2000);
    }

    // Color game functionality
    function setupColorGame() {
        colorDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const color = this.dataset.color;
                changePageColor(color);
                
                // Add click animation
                this.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    function changePageColor(color) {
        const activityCards = document.querySelectorAll('.activity-card');
        activityCards.forEach(card => {
            card.style.background = `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, -20)} 100%)`;
        });
        
        // Add sparkle effect
        createSparkles(color);
    }

    function adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    function createSparkles(color) {
        const sparkleContainer = document.querySelector('.activity-grid');
        if (sparkleContainer) {
            for (let i = 0; i < 10; i++) {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.fontSize = '1rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'sparkle 1s ease-out forwards';
                sparkle.style.zIndex = '1000';
                
                sparkleContainer.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        }
    }

    // Music box functionality
    function setupMusicBox() {
        musicBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const sound = this.dataset.sound;
                playMusic(sound);
                
                // Visual feedback
                this.style.background = 'white';
                this.style.color = '#667eea';
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.background = 'rgba(255, 255, 255, 0.2)';
                    this.style.color = 'white';
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }

    function playMusic(soundType) {
        // Visual music representation
        const musicBox = document.getElementById('musicBox');
        if (musicBox) {
            const notes = ['🎵', '🎶', '🎼', '🎤'];
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const note = document.createElement('div');
                    note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
                    note.style.position = 'absolute';
                    note.style.left = Math.random() * 100 + '%';
                    note.style.top = '100%';
                    note.style.fontSize = '1.5rem';
                    note.style.pointerEvents = 'none';
                    note.style.animation = 'musicNote 2s ease-out forwards';
                    note.style.zIndex = '1000';
                    
                    musicBox.appendChild(note);
                    
                    setTimeout(() => {
                        note.remove();
                    }, 2000);
                }, i * 200);
            }
        }
    }

    // Star collector game
    function setupStarGame() {
        if (startGameBtn) {
            startGameBtn.addEventListener('click', function() {
                if (!gameActive) {
                    startStarGame();
                } else {
                    stopStarGame();
                }
            });
        }
    }

    function startStarGame() {
        gameActive = true;
        stars = 0;
        updateStarCount();
        
        if (startGameBtn) {
            startGameBtn.textContent = 'Stop Game';
            startGameBtn.style.background = '#ff6b9d';
        }
        
        // Create falling stars
        const gameArea = document.querySelector('.game-area');
        if (gameArea) {
            const starInterval = setInterval(() => {
                if (!gameActive) {
                    clearInterval(starInterval);
                    return;
                }
                
                createFallingStar(gameArea);
            }, 1000);
            
            // Auto-stop after 30 seconds
            setTimeout(() => {
                if (gameActive) {
                    stopStarGame();
                }
            }, 30000);
        }
    }

    function stopStarGame() {
        gameActive = false;
        
        if (startGameBtn) {
            startGameBtn.textContent = 'Start Game';
            startGameBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        }
        
        // Remove all falling stars
        document.querySelectorAll('.falling-star').forEach(star => {
            star.remove();
        });
    }

    function createFallingStar(container) {
        const star = document.createElement('div');
        star.innerHTML = '⭐';
        star.className = 'falling-star';
        star.style.left = Math.random() * (container.offsetWidth - 30) + 'px';
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        
        star.addEventListener('click', function() {
            stars++;
            updateStarCount();
            this.remove();
            
            // Create collection effect
            createCollectionEffect(this);
        });
        
        container.appendChild(star);
        
        // Remove star if not clicked
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, 5000);
    }

    function updateStarCount() {
        if (starCount) {
            starCount.textContent = stars;
        }
    }

    function createCollectionEffect(element) {
        const effect = document.createElement('div');
        effect.innerHTML = '+1';
        effect.style.position = 'absolute';
        effect.style.left = element.style.left;
        effect.style.top = element.style.top;
        effect.style.color = '#f9ca24';
        effect.style.fontWeight = 'bold';
        effect.style.fontSize = '1.2rem';
        effect.style.pointerEvents = 'none';
        effect.style.animation = 'collectEffect 1s ease-out forwards';
        effect.style.zIndex = '1001';
        
        element.parentNode.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }

    // Photo frame functionality
    function setupPhotoFrame() {
        frameBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const frame = this.dataset.frame;
                applyPhotoFrame(frame);
                
                // Update active button
                frameBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    function applyPhotoFrame(frameType) {
        if (framedPhoto) {
            // Remove existing frame classes
            framedPhoto.classList.remove('heart-frame', 'star-frame', 'flower-frame');
            
            // Add new frame class
            if (frameType !== 'none') {
                framedPhoto.classList.add(frameType + '-frame');
            }
            
            // Add animation
            framedPhoto.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                framedPhoto.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }
    }

    // Message carousel functionality
    function setupMessageCarousel() {
        // Auto-rotate messages
        setInterval(() => {
            nextMessage();
        }, 4000);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showMessage(index);
            });
        });
    }

    function nextMessage() {
        currentMessageIndex = (currentMessageIndex + 1) % messageCards.length;
        showMessage(currentMessageIndex);
    }

    function showMessage(index) {
        currentMessageIndex = index;
        
        messageCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Initialize everything
    initSurprise();
});

// Add CSS for surprise animations
const surpriseStyle = document.createElement('style');
surpriseStyle.textContent = `
    .surprise-message.celebrate {
        animation: celebrate 2s ease-in-out;
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.05) rotate(1deg); }
        50% { transform: scale(1.1) rotate(-1deg); }
        75% { transform: scale(1.05) rotate(1deg); }
    }
    
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes musicNote {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes collectEffect {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-30px) scale(1.5);
            opacity: 0;
        }
    }
    
    .activity-card {
        transition: background 0.5s ease;
    }
    
    .framed-photo {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(surpriseStyle);