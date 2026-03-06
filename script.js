// ===========================
// WHITELINE DIGITAL — SCRIPTS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Nav ---
    const nav = document.getElementById('nav');
    const heroSection = document.getElementById('hero');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    const toggleMenu = () => {
        navLinks.classList.toggle('open');
        navOverlay.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    };

    const closeMenu = () => {
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close menu on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // --- Contact Form ---
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const trade = document.getElementById('form-trade').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name) {
            alert('Please enter your name.');
            return;
        }

        // Build mailto link as fallback
        const subject = encodeURIComponent(`Discovery call request from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nPhone: ${phone}\nTrade: ${trade}\nMessage: ${message}`
        );

        window.location.href = `mailto:rylanwhite.ops@gmail.com?subject=${subject}&body=${body}`;

        // Show confirmation
        submitBtn.textContent = 'Request Sent ✓';
        submitBtn.style.background = '#10B981';

        setTimeout(() => {
            submitBtn.textContent = 'Book My Discovery Call';
            submitBtn.style.background = '';
            form.reset();
        }, 3000);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
