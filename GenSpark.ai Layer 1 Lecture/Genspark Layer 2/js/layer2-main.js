/* ===========================
   Layer 2 Main Logic
   Navigation, Init
   =========================== */

// ====== STATE ======
let currentSection = 'intro';
const sections = ['intro', 'ethernet', 'switching', 'stp', 'vlan', 'quiz'];
const visitedSections = new Set(['intro']);

// ====== NAVIGATION ======
function navigateTo(sectionId) {
    if (sectionId === currentSection) return;
    const currentEl = document.getElementById('section-' + currentSection);
    if (currentEl) currentEl.classList.remove('active');
    const newEl = document.getElementById('section-' + sectionId);
    if (newEl) newEl.classList.add('active');
    currentSection = sectionId;
    visitedSections.add(sectionId);

    document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === sectionId);
        dot.classList.toggle('completed', visitedSections.has(dot.dataset.section) && dot.dataset.section !== sectionId);
    });

    const sectionIndex = sections.indexOf(sectionId);
    const progress = ((sectionIndex + 1) / sections.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = Math.round(progress) + '%';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.remove('open');

    if (sectionId === 'quiz') initQuiz();

    // Re-init canvases for hidden sections
    setTimeout(() => {
        if (sectionId === 'intro') {
            if (typeof initFrameJourneyCanvas === 'function') initFrameJourneyCanvas();
        }
        if (sectionId === 'ethernet') {
            if (typeof initARPCanvas === 'function') initARPCanvas();
        }
        if (sectionId === 'switching') {
            if (typeof initMACTableCanvas === 'function') initMACTableCanvas();
        }
        if (sectionId === 'stp') {
            if (typeof initSTPCanvas === 'function') initSTPCanvas();
        }
        if (sectionId === 'vlan') {
            if (typeof initVLANCorporateCanvas === 'function') initVLANCorporateCanvas();
            if (typeof initVLANSimCanvas === 'function') initVLANSimCanvas();
        }
    }, 50);
}

// ====== NAV CLICKS ======
function initNavClicks() {
    document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.section));
    });
    document.querySelectorAll('.dot[data-section]').forEach(dot => {
        dot.addEventListener('click', () => navigateTo(dot.dataset.section));
    });
}

// ====== MOBILE NAV ======
function initMobileNav() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }
}

// ====== KEYBOARD NAV ======
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        const idx = sections.indexOf(currentSection);
        if (e.key === 'ArrowLeft' && idx < sections.length - 1) {
            navigateTo(sections[idx + 1]);
        } else if (e.key === 'ArrowRight' && idx > 0) {
            navigateTo(sections[idx - 1]);
        }
    });
}

// ====== SWIPE ======
function initSwipe() {
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
    document.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        const idx = sections.indexOf(currentSection);
        if (Math.abs(diff) > 60) {
            if (diff > 0 && idx < sections.length - 1) navigateTo(sections[idx + 1]);
            if (diff < 0 && idx > 0) navigateTo(sections[idx - 1]);
        }
    });
}

// ====== LOADING SCREEN ======
function hideLoadingScreen() {
    setTimeout(() => {
        const ls = document.getElementById('loading-screen');
        if (ls) ls.classList.add('hidden');
    }, 1800);
}

// ====== SCROLL ANIMATIONS ======
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card, .device-card, .benefit-card, .sublayer-card, .learn-step, .arp-step, .stp-step, .loop-problem-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });

    // Override when visible
    const style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
}

// ====== DOMContentLoaded ======
document.addEventListener('DOMContentLoaded', () => {
    hideLoadingScreen();
    initNavClicks();
    initMobileNav();
    initKeyboardNav();
    initSwipe();

    if (typeof initLayer2Animations === 'function') {
        initLayer2Animations();
    }

    setTimeout(initScrollAnimations, 2000);
});

// Global
window.navigateTo = navigateTo;
