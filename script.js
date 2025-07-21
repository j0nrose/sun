// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA Button Smooth Scroll
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        const offsetTop = aboutSection.offsetTop - 70;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 215, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 215, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const sections = document.querySelectorAll('.about, .gallery, .contact');
    const cards = document.querySelectorAll('.about-card, .gallery-item');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .about-card, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .about-card.animate-in, .gallery-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .about.animate-in .section-title,
        .gallery.animate-in .section-title,
        .contact.animate-in .section-title {
            animation: titleSlideIn 0.8s ease forwards;
        }
        
        @keyframes titleSlideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.submit-button');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }, 2000);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Dynamic Particle Animation
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.classList.add('dynamic-particle');
        
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #FFD700, #FF8C00);
            border-radius: 50%;
            left: ${left}%;
            bottom: -20px;
            opacity: 0.6;
            animation: floatUp ${duration}s linear forwards;
            z-index: 1;
        `;
        
        document.querySelector('.hero').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Add floating particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Create particles periodically
    setInterval(createFloatingParticle, 3000);

    // Sun Interaction - Click to create burst effect
    const sun = document.querySelector('.sun');
    
    sun.addEventListener('click', function() {
        createSunBurst();
    });

    function createSunBurst() {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300px;
            height: 300px;
            border: 3px solid #FFD700;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
            pointer-events: none;
            z-index: 10;
        `;
        
        sun.appendChild(burst);
        
        burst.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => burst.remove();
        
        // Create multiple small particles
        for (let i = 0; i < 12; i++) {
            createBurstParticle(sun, i * 30);
        }
    }

    function createBurstParticle(parent, angle) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9;
        `;
        
        parent.appendChild(particle);
        
        const radian = angle * Math.PI / 180;
        const distance = 80;
        const endX = Math.cos(radian) * distance;
        const endY = Math.sin(radian) * distance;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%)',
                opacity: 1 
            },
            { 
                transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px))`,
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const sun = document.querySelector('.sun-animation');
        
        if (hero && sun) {
            sun.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }
    });

    // Gallery Item Hover Effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add a subtle entrance animation for the hero content
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.animation = 'heroEntrance 1.5s ease-out';
    });

    // Add hero entrance animation CSS
    const heroStyle = document.createElement('style');
    heroStyle.textContent = `
        @keyframes heroEntrance {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-content {
            opacity: 0;
            animation: heroEntrance 1.5s ease-out forwards;
        }
    `;
    document.head.appendChild(heroStyle);

    // Time-based sun intensity (optional feature)
    function updateSunIntensity() {
        const hour = new Date().getHours();
        const sunCore = document.querySelector('.sun-core');
        
        if (sunCore) {
            let intensity = 1;
            
            if (hour >= 6 && hour <= 18) {
                // Daytime - brighter sun
                intensity = 1 + (Math.sin((hour - 6) * Math.PI / 12) * 0.3);
            } else {
                // Nighttime - dimmer sun
                intensity = 0.7;
            }
            
            sunCore.style.filter = `brightness(${intensity})`;
        }
    }

    // Update sun intensity on load and every hour
    updateSunIntensity();
    setInterval(updateSunIntensity, 3600000); // Every hour

    console.log('Solar Radiance website loaded successfully! ☀
});