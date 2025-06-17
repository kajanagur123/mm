// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;
    let visibleImages = [];

    // Initialize gallery
    function initGallery() {
        updateVisibleImages('all');
        setupFilterButtons();
        setupLightbox();
    }

    // Filter functionality
    function updateVisibleImages(filter) {
        visibleImages = [];
        
        galleryItems.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.classList.remove('hidden');
                visibleImages.push({
                    element: item,
                    index: index,
                    src: item.querySelector('.gallery-image').src,
                    alt: item.querySelector('.gallery-image').alt
                });
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Setup filter buttons
    function setupFilterButtons() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter images
                const filter = this.dataset.filter;
                updateVisibleImages(filter);
                
                // Add animation delay to visible items
                const visibleElements = document.querySelectorAll('.gallery-item:not(.hidden)');
                visibleElements.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                });
            });
        });
    }

    // Setup lightbox
    function setupLightbox() {
        // Open lightbox when clicking on gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                if (!this.classList.contains('hidden')) {
                    const visibleIndex = visibleImages.findIndex(img => img.element === this);
                    openLightbox(visibleIndex);
                }
            });
        });

        // Close lightbox
        if (closeLightbox) {
            closeLightbox.addEventListener('click', closeLightboxModal);
        }

        // Close lightbox when clicking outside image
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeLightboxModal();
                }
            });
        }

        // Navigation buttons
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', showPrevImage);
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', showNextImage);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox && lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        closeLightboxModal();
                        break;
                    case 'ArrowLeft':
                        showPrevImage();
                        break;
                    case 'ArrowRight':
                        showNextImage();
                        break;
                }
            }
        });
    }

    // Lightbox functions
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightboxModal() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function updateLightboxImage() {
        if (lightboxImage && visibleImages[currentImageIndex]) {
            const currentImage = visibleImages[currentImageIndex];
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.alt;
        }
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        updateLightboxImage();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        updateLightboxImage();
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage(); // Swipe left - next image
            } else {
                showPrevImage(); // Swipe right - previous image
            }
        }
    }

    // Lazy loading for images
    function setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.gallery-image').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Initialize everything
    initGallery();
    setupLazyLoading();

    // Add loading animation for images
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add CSS for gallery animations
const galleryStyle = document.createElement('style');
galleryStyle.textContent = `
    .gallery-image {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .gallery-item.hidden {
        opacity: 0;
        transform: scale(0.8);
        pointer-events: none;
    }
    
    .lightbox {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .lightbox.active {
        opacity: 1;
        visibility: visible;
    }
    
    .lightbox-image {
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .lightbox.active .lightbox-image {
        transform: scale(1);
    }
    
    @media (max-width: 768px) {
        .lightbox-prev,
        .lightbox-next {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-prev {
            left: 10px;
            margin-left: 0;
        }
        
        .lightbox-next {
            right: 10px;
            margin-right: 0;
        }
    }
`;
document.head.appendChild(galleryStyle);