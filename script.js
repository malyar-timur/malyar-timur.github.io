// script.js - Interactive elements and micro-animations for Timur's Painting website

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Glassmorphic Navbar Scrolling Effect
    const navbar = document.querySelector('.navbar');
    
    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Initialize on load and bind to scroll
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // 2. High-Performance Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px', // Trigger slightly before element enters viewport
        threshold: 0.1 // 10% visibility
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add tiny stagger delay for multiple items in view
                const delay = (index % 3) * 100;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Elegant Full-Screen Portfolio Image Viewer Modal
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            // Create glassmorphic modal markup
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            
            const fullImg = document.createElement('img');
            fullImg.className = 'modal-image';
            fullImg.src = img.src;
            fullImg.alt = img.alt;
            
            overlay.appendChild(fullImg);
            document.body.appendChild(overlay);
            
            // Force reflow and activate transitions
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);

            // Freeze background scrolling
            document.body.style.overflow = 'hidden';

            // Close modal on click
            overlay.addEventListener('click', () => {
                overlay.classList.remove('active');
                
                // Wait for transition before removing from DOM
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    });
});
