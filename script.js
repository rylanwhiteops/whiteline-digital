// ===========================
// WHITELINE DIGITAL — SCRIPTS
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Nav ---
    const nav = document.getElementById('nav');

    const handleScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu ---
    const navToggle  = document.getElementById('nav-toggle');
    const navLinks   = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    const closeMenu = () => {
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navOverlay.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navOverlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    // --- Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => observer.observe(el));

    // ===========================
    // TYPEWRITER EFFECT
    // ===========================
    const typewriterEl = document.getElementById('typewriter');
    const words = [
        'restaurant',
        'salon',
        'landscaping business',
        'local shop',
        'trades business',
        'fitness studio',
        'law office',
    ];

    // First word is pre-shown in HTML — start by deleting it, then cycle
    let wordIndex  = 0;
    let charIndex  = words[0].length;
    let isDeleting = true; // immediately start backspacing the pre-shown word

    function type() {
        const current = words[wordIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 55 : 90;

        if (!isDeleting && charIndex === current.length) {
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex  = (wordIndex + 1) % words.length;
            delay      = 400;
        }

        setTimeout(type, delay);
    }

    // Show first word for 2s, then start cycling
    setTimeout(type, 2000);

    // Cards now animate via pure CSS (card-fade-in + card-rise + card-float-*)

    // ===========================
    // CONTACT FORM
    // ===========================
    const form      = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = document.getElementById('form-name').value.trim();
            const phone   = document.getElementById('form-phone').value.trim();
            const trade   = document.getElementById('form-trade').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name) { alert('Please enter your name.'); return; }

            const subject = encodeURIComponent(`Discovery call request from ${name}`);
            const body    = encodeURIComponent(
                `Name: ${name}\nPhone: ${phone}\nTrade: ${trade}\nMessage: ${message}`
            );

            window.location.href = `mailto:rylanwhite.ops@gmail.com?subject=${subject}&body=${body}`;

            submitBtn.textContent    = 'Request Sent ✓';
            submitBtn.style.background = '#10B981';

            setTimeout(() => {
                submitBtn.textContent    = 'Book My Discovery Call';
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
