/* ============================================
   GhNewa - Landing Page Scripts
   ============================================ */

(function () {
    'use strict';

    // --- Configuration ---
    const CONFIG = {
        typewriter: {
            words: {
                en: ['Content Creator', 'Streamer', 'Gamer', 'YouTuber'],
                ar: ['صانع محتوى', 'ستريمر', 'جيمر', 'يوتيوبر']
            },
            typeSpeed: 100,
            deleteSpeed: 50,
            pauseTime: 2000
        },
        particles: {
            count: 40,
            minDuration: 8,
            maxDuration: 20
        },
        i18n: {
            en: {
                rights: 'All rights reserved',
                developed: 'Developed by'
            },
            ar: {
                rights: 'جميع الحقوق محفوظة',
                developed: 'تم التطوير بواسطة'
            }
        }
    };

    // --- State ---
    let currentLang = 'en';
    let currentTheme = localStorage.getItem('theme') || 'dark';
    let savedLang = localStorage.getItem('lang') || 'en';

    // --- DOM Elements ---
    const html = document.documentElement;
    const langToggle = document.getElementById('langToggle');
    const themeToggle = document.getElementById('themeToggle');
    const typewriterEl = document.getElementById('typewriter');
    const particlesContainer = document.getElementById('particles');

    // --- Initialize ---
    function init() {
        setTheme(currentTheme);
        setLanguage(savedLang);
        createParticles();
        startTypewriter();
        bindEvents();
    }

    // --- Theme Toggle ---
    function setTheme(theme) {
        currentTheme = theme;
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    function toggleTheme() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // --- Language Toggle ---
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        if (lang === 'ar') {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            document.body.style.fontFamily = "var(--font-arabic)";
        } else {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            document.body.style.fontFamily = "var(--font-primary)";
        }

        // Update translatable text
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (CONFIG.i18n[lang] && CONFIG.i18n[lang][key]) {
                el.textContent = CONFIG.i18n[lang][key];
            }
        });
    }

    function toggleLanguage() {
        var newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    }

    // --- Typewriter Effect ---
    function startTypewriter() {
        var wordIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var isPaused = false;

        function type() {
            var words = CONFIG.typewriter.words[currentLang] || CONFIG.typewriter.words.en;
            var currentWord = words[wordIndex % words.length];

            if (isPaused) {
                isPaused = false;
                isDeleting = true;
                setTimeout(type, CONFIG.typewriter.pauseTime);
                return;
            }

            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex++;
                    setTimeout(type, CONFIG.typewriter.typeSpeed);
                    return;
                }

                setTimeout(type, CONFIG.typewriter.deleteSpeed);
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentWord.length) {
                    isPaused = true;
                    setTimeout(type, 100);
                    return;
                }

                setTimeout(type, CONFIG.typewriter.typeSpeed);
            }
        }

        type();
    }

    // --- Particles ---
    function createParticles() {
        if (!particlesContainer) return;

        for (var i = 0; i < CONFIG.particles.count; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';

            var x = Math.random() * 100;
            var duration = CONFIG.particles.minDuration + Math.random() * (CONFIG.particles.maxDuration - CONFIG.particles.minDuration);
            var delay = Math.random() * duration;
            var size = 1 + Math.random() * 2;

            particle.style.left = x + '%';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = '-' + delay + 's';
            particle.style.opacity = (0.2 + Math.random() * 0.5).toString();

            particlesContainer.appendChild(particle);
        }
    }

    // --- Event Binding ---
    function bindEvents() {
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        if (langToggle) {
            langToggle.addEventListener('click', toggleLanguage);
        }

        // Keyboard accessibility
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                document.activeElement.blur();
            }
        });
    }

    // --- Start ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
