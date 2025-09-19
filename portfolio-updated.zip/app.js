// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

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

    // Experience details expand/collapse functionality
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        // Set initial state
        button.setAttribute('aria-expanded', 'false');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            console.log('Button clicked:', targetId); // Debug log
            
            if (targetElement) {
                const isHidden = targetElement.classList.contains('hidden');
                
                console.log('Is hidden:', isHidden); // Debug log
                
                if (isHidden) {
                    // Show details
                    targetElement.classList.remove('hidden');
                    targetElement.style.display = 'block';
                    
                    // Trigger reflow then add show class for animation
                    targetElement.offsetHeight;
                    targetElement.classList.add('show');
                    
                    this.textContent = 'Hide Details';
                    this.setAttribute('aria-expanded', 'true');
                } else {
                    // Hide details
                    targetElement.classList.remove('show');
                    
                    // Wait for animation then hide
                    setTimeout(() => {
                        targetElement.classList.add('hidden');
                        targetElement.style.display = 'none';
                    }, 300);
                    
                    this.textContent = 'View Details';
                    this.setAttribute('aria-expanded', 'false');
                }
            } else {
                console.error('Target element not found:', targetId);
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 60;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('Form submitted'); // Debug log
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            console.log('Form data:', { name, email, subject, message }); // Debug log
            
            // Basic form validation
            if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        console.log('Showing notification:', message, type); // Debug log
        
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification status status--${type}`;
        
        // Set styles directly
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: '1001',
            maxWidth: '400px',
            padding: '16px 20px',
            borderRadius: '8px',
            fontWeight: '500',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontSize: '14px',
            lineHeight: '1.4'
        });
        
        // Set colors based on type
        if (type === 'success') {
            Object.assign(notification.style, {
                backgroundColor: 'rgba(33, 128, 141, 0.15)',
                color: 'var(--color-success)',
                border: '1px solid rgba(33, 128, 141, 0.25)'
            });
        } else if (type === 'error') {
            Object.assign(notification.style, {
                backgroundColor: 'rgba(192, 21, 47, 0.15)',
                color: 'var(--color-error)',
                border: '1px solid rgba(192, 21, 47, 0.25)'
            });
        }
        
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        console.log('Notification added to DOM'); // Debug log
        
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
            }, 300);
        }, 5000);
        
        // Allow manual close on click
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 60;
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
    
    // Add active link styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-primary) !important;
            background-color: var(--color-secondary);
        }
        
        .experience-details.show {
            max-height: 1000px;
            opacity: 1;
        }
        
        .experience-details.hidden {
            max-height: 0;
            opacity: 0;
            display: none;
        }
        
        .experience-details {
            transition: max-height 0.3s ease, opacity 0.3s ease;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Listen for scroll events to update active navigation
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

    // Skill tags hover effect enhancement
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation for professional photo when it's added
    function setupImageLoading() {
        const imageContainer = document.querySelector('.image-placeholder');
        const img = imageContainer ? imageContainer.querySelector('img') : null;
        
        if (img) {
            img.addEventListener('load', function() {
                imageContainer.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                // Fallback to placeholder if image fails to load
                console.log('Professional photo failed to load, using placeholder');
            });
        }
    }
    
    // Call setup function
    setupImageLoading();

    // Lazy loading observer for future images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add animation to cards on scroll
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Apply animation setup to all cards
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }

    // Console welcome message
    console.log('🚀 Portfolio loaded successfully!');
    console.log('👋 Hello! Thanks for checking out the code.');
    console.log('📧 Feel free to reach out: manuprasad.m.work@gmail.com');
    
    // Debug: Log if key elements are found
    console.log('Expand buttons found:', expandButtons.length);
    console.log('Contact form found:', contactForm ? 'Yes' : 'No');
    console.log('Nav toggle found:', navToggle ? 'Yes' : 'No');
});