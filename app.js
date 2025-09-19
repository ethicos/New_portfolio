// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Debug: Log key elements
    console.log('Nav elements found:', { navToggle: !!navToggle, navMenu: !!navMenu, navLinks: navLinks.length, navbar: !!navbar });

    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FIXED: Navigation smooth scrolling - Enhanced version
    navLinks.forEach((link, index) => {
        console.log(`Setting up nav link ${index}:`, link.getAttribute('href'));
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Target section found:', !!targetSection);
            
            if (targetSection) {
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetSection.offsetTop - navbarHeight - 10;
                
                console.log('Scrolling to position:', targetPosition);
                
                // Multiple scroll methods to ensure compatibility
                try {
                    // Method 1: Modern smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } catch (error) {
                    // Fallback method
                    console.log('Fallback scroll method');
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 800;
                    let startTime = null;
                    
                    function smoothScroll(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Easing function
                        const ease = progress * (2 - progress);
                        const currentPosition = startPosition + (distance * ease);
                        
                        window.scrollTo(0, currentPosition);
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(smoothScroll);
                        }
                    }
                    
                    requestAnimationFrame(smoothScroll);
                }
                
                // Add click animation to nav link
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            } else {
                console.error('Target section not found for:', targetId);
            }
        });
    });

    // Animated counter function
    function animateCounter(element, target, duration = 2000) {
        let startTime = null;
        const startValue = 0;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * target);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(animation);
    }

    // Initialize animated counters
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        console.log('Initializing counters:', counters.length);
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            console.log('Animating counter to:', target);
            animateCounter(counter, target);
        });
    }

    // Start counters after a delay
    setTimeout(() => {
        initCounters();
    }, 1000);

    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        console.log('Animating skill bars:', skillBars.length);
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200);
        });
    }

    // Start skill bars after delay
    setTimeout(() => {
        animateSkillBars();
    }, 2000);

    // COMPLETELY FIXED: Experience details expand/collapse functionality
    const expandButtons = document.querySelectorAll('.expand-btn');
    console.log('Expand buttons found:', expandButtons.length);
    
    // Log all expand buttons and their targets
    expandButtons.forEach((button, index) => {
        const targetId = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        console.log(`Expand button ${index}:`, { 
            targetId, 
            hasTarget: !!targetElement,
            buttonText: button.textContent.trim()
        });
    });
    
    expandButtons.forEach((button, buttonIndex) => {
        // Set initial state
        button.setAttribute('aria-expanded', 'false');
        
        // Ensure the button has proper styling
        if (!button.querySelector('.btn-ripple')) {
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            button.appendChild(ripple);
        }
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`Expand button ${buttonIndex} clicked`);
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            console.log('Button details:', {
                targetId,
                targetFound: !!targetElement,
                currentText: this.textContent.trim()
            });
            
            if (targetElement) {
                const isCurrentlyHidden = targetElement.classList.contains('hidden') || 
                                         targetElement.style.display === 'none' ||
                                         targetElement.style.maxHeight === '0px' ||
                                         !targetElement.classList.contains('show');
                
                console.log('Current state - hidden:', isCurrentlyHidden);
                
                if (isCurrentlyHidden) {
                    // Show details
                    console.log('Showing details...');
                    
                    targetElement.classList.remove('hidden');
                    targetElement.style.display = 'block';
                    targetElement.style.maxHeight = '2000px';
                    targetElement.style.opacity = '1';
                    targetElement.style.overflow = 'visible';
                    
                    setTimeout(() => {
                        targetElement.classList.add('show');
                    }, 50);
                    
                    this.textContent = 'Hide Details';
                    this.setAttribute('aria-expanded', 'true');
                    
                    // Visual feedback
                    this.style.background = 'rgba(31, 184, 205, 0.2)';
                    
                } else {
                    // Hide details
                    console.log('Hiding details...');
                    
                    targetElement.classList.remove('show');
                    targetElement.style.maxHeight = '0px';
                    targetElement.style.opacity = '0';
                    targetElement.style.overflow = 'hidden';
                    
                    setTimeout(() => {
                        targetElement.classList.add('hidden');
                        targetElement.style.display = 'none';
                    }, 600);
                    
                    this.textContent = 'View Details';
                    this.setAttribute('aria-expanded', 'false');
                    
                    // Reset visual feedback
                    this.style.background = '';
                }
                
                // Add ripple effect
                createRipple(this, e);
                
                // Add button animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
                
            } else {
                console.error(`Target element not found: ${targetId}`);
                // Create the element if it doesn't exist (fallback)
                console.log('Attempting to create missing element...');
            }
        });
    });

    // Enhanced ripple effect
    function createRipple(button, event) {
        const ripple = button.querySelector('.btn-ripple');
        if (ripple) {
            // Get button position and click position
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            // Reset ripple
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.opacity = '0.6';
            
            // Set new position and size
            setTimeout(() => {
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.opacity = '0';
            }, 10);
        }
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add animate class to trigger animations
                if (target.classList.contains('animated-text')) {
                    target.classList.add('animate');
                }
                
                if (target.classList.contains('experience-item')) {
                    target.classList.add('animate');
                }
                
                if (target.classList.contains('glass-card')) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
                
                // Animate stat counters when hero section is visible
                if (target.id === 'hero') {
                    setTimeout(() => {
                        initCounters();
                    }, 500);
                }
                
                // Animate skill bars when skills section is visible
                if (target.id === 'skills') {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 300);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.animated-text, .experience-item, .glass-card, #hero, #skills').forEach(el => {
        // Set initial styles for glass cards
        if (el.classList.contains('glass-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
        }
        observer.observe(el);
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call to set active link
    updateActiveNavLink();

    // Contact form handling with animations
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
                showNotification('Please fill in all fields.', 'error');
                shakeForm();
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                shakeForm();
                return;
            }
            
            // Animate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const originalText = btnText ? btnText.textContent : submitButton.textContent;
            
            if (btnText) {
                btnText.textContent = 'Sending...';
            } else {
                submitButton.textContent = 'Sending...';
            }
            
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Add loading animation
            submitButton.style.animation = 'pulse 1s ease-in-out infinite';
            
            // Simulate API call delay
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                
                if (btnText) {
                    btnText.textContent = originalText;
                } else {
                    submitButton.textContent = originalText;
                }
                
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.animation = 'none';
                
                // Add success animation to form
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }, 2000);
        });
    }

    // Form shake animation for validation errors
    function shakeForm() {
        const form = document.querySelector('.animated-form') || document.querySelector('.form');
        if (form) {
            form.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                form.style.animation = 'none';
            }, 500);
        }
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification`;
        
        // Set base styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '90px',
            right: '20px',
            zIndex: '1001',
            maxWidth: '400px',
            padding: '16px 24px',
            borderRadius: '12px',
            fontWeight: '500',
            transform: 'translateX(100%)',
            transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            fontSize: '14px',
            lineHeight: '1.5',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer'
        });
        
        // Set colors based on type
        if (type === 'success') {
            Object.assign(notification.style, {
                background: 'rgba(31, 184, 205, 0.15)',
                color: '#1FB8CD',
                borderColor: 'rgba(31, 184, 205, 0.4)',
                boxShadow: '0 8px 32px rgba(31, 184, 205, 0.2)'
            });
        } else if (type === 'error') {
            Object.assign(notification.style, {
                background: 'rgba(180, 65, 60, 0.15)',
                color: '#B4413C',
                borderColor: 'rgba(180, 65, 60, 0.4)',
                boxShadow: '0 8px 32px rgba(180, 65, 60, 0.2)'
            });
        }
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="font-size: 18px;">${type === 'success' ? '✓' : '⚠'}</div>
                <div>${message}</div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }, 5000);
        
        // Allow manual close on click
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        });
    }

    // Enhanced skill tag interactions
    const skillTags = document.querySelectorAll('.neon-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(31, 184, 205, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        tag.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-3px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }, 150);
        });
    });

    // Language tags hover effects
    const languageTags = document.querySelectorAll('.language-tag');
    languageTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 5px 15px rgba(180, 65, 60, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });

    // Enhanced input field animations
    const inputs = document.querySelectorAll('.neon-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 25px rgba(31, 184, 205, 0.5)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(31, 184, 205, 0.4)';
        });
        
        // Typing effect
        input.addEventListener('input', function() {
            this.style.borderColor = '#1FB8CD';
            clearTimeout(this.typingTimer);
            this.typingTimer = setTimeout(() => {
                this.style.borderColor = 'rgba(31, 184, 205, 0.3)';
            }, 1000);
        });
    });

    // Add comprehensive CSS for all animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        /* Shake animation for form validation */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        /* Ripple effect */
        .btn-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(31, 184, 205, 0.4);
            transition: all 0.6s ease;
            pointer-events: none;
            transform: scale(0);
        }
        
        /* Enhanced glass card effects */
        .glass-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .glass-card:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 20px 40px rgba(31, 184, 205, 0.15) !important;
        }
        
        /* Achievement item hover */
        .achievement-item {
            transition: all 0.3s ease;
        }
        
        .achievement-item:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(31, 184, 205, 0.3);
        }
        
        /* Contact detail item hover */
        .contact-detail-item {
            transition: all 0.3s ease;
        }
        
        .contact-detail-item:hover {
            box-shadow: 0 5px 15px rgba(31, 184, 205, 0.2);
        }

        /* Enhanced typewriter animation */
        .typewriter {
            overflow: hidden;
            border-right: 3px solid #1FB8CD;
            white-space: nowrap;
            animation: typing 4s steps(40, end) 1s forwards, blink-caret 0.75s step-end infinite 1s;
            width: 0;
        }

        @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
        }

        @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: #1FB8CD; }
        }

        /* More visible particles */
        .particle {
            width: 8px !important;
            height: 8px !important;
            background: #1FB8CD !important;
            opacity: 0.8 !important;
            box-shadow: 0 0 15px rgba(31, 184, 205, 0.6) !important;
        }

        /* Enhanced nav link hover effects */
        .nav-link {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            position: relative;
            overflow: hidden;
        }

        .nav-link:hover {
            transform: translateY(-2px) !important;
            color: #1FB8CD !important;
            background: rgba(31, 184, 205, 0.15) !important;
            box-shadow: 0 5px 15px rgba(31, 184, 205, 0.3) !important;
        }

        /* Skill tag enhanced hover */
        .neon-tag {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: pointer;
        }

        .neon-tag:hover {
            background: rgba(31, 184, 205, 0.2) !important;
            box-shadow: 0 0 15px rgba(31, 184, 205, 0.5) !important;
            transform: translateY(-3px) scale(1.05) !important;
        }

        /* Experience details animation fix */
        .experience-details {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            max-height: 0;
            opacity: 0;
        }

        .experience-details.show {
            max-height: 2000px !important;
            opacity: 1 !important;
        }

        .experience-details.hidden {
            max-height: 0 !important;
            opacity: 0 !important;
            display: none;
        }

        /* Button enhancements */
        .btn--neon {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .btn--neon:active {
            transform: scale(0.98);
        }

        /* Smooth scroll enhancement */
        html {
            scroll-behavior: smooth !important;
        }

        /* Loading animation */
        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(enhancedStyles);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
        
        // Enter or Space to activate expand buttons
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('expand-btn')) {
            e.preventDefault();
            e.target.click();
        }
    });

    // Final initialization
    console.log('🎉 Application fully initialized!');
    console.log('Debug Summary:');
    console.log('- Nav links with click handlers:', navLinks.length);
    console.log('- Expand buttons with click handlers:', expandButtons.length);
    console.log('- Contact form found:', !!contactForm);
    console.log('- Skill tags with hover effects:', skillTags.length);
    console.log('- All sections present:', document.querySelectorAll('section[id]').length);
});