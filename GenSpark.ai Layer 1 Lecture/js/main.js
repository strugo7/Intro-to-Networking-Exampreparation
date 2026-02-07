/* ===========================
   Main Logic — Navigation, Init, Interactions
   =========================== */

// ====== STATE ======
let currentSection = 'intro';
const sections = ['intro', 'fiber', 'copper', 'wifi', 'compare', 'quiz'];
const visitedSections = new Set(['intro']);

// ====== NAVIGATION ======
function navigateTo(sectionId) {
    if (sectionId === currentSection) return;

    // Hide current section
    const currentEl = document.getElementById('section-' + currentSection);
    if (currentEl) {
        currentEl.classList.remove('active');
    }

    // Show new section
    const newEl = document.getElementById('section-' + sectionId);
    if (newEl) {
        newEl.classList.add('active');
    }

    currentSection = sectionId;
    visitedSections.add(sectionId);

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    // Update dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === sectionId);
        dot.classList.toggle('completed', visitedSections.has(dot.dataset.section) && dot.dataset.section !== sectionId);
    });

    // Update progress bar
    const sectionIndex = sections.indexOf(sectionId);
    const progress = ((sectionIndex + 1) / sections.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = Math.round(progress) + '%';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile nav
    document.getElementById('main-nav').classList.remove('open');

    // Initialize section-specific content
    initSectionAnimations(sectionId);

    // Init quiz if needed
    if (sectionId === 'quiz') {
        initQuiz();
    }
}

function initSectionAnimations(sectionId) {
    switch (sectionId) {
        case 'fiber':
            if (!window._fiberAnim) window._fiberAnim = new FiberAnimation();
            if (!window._fiberStruct) window._fiberStruct = new FiberStructure();
            if (!window._singleMode) window._singleMode = new MiniModeAnimation('single-mode-canvas', 'single');
            if (!window._multiMode) window._multiMode = new MiniModeAnimation('multi-mode-canvas', 'multi');
            if (!window._fiberHeader) window._fiberHeader = new HeaderParticles('fiber-header-canvas', '#f39c12');
            break;
        case 'copper':
            if (!window._copperSignal) window._copperSignal = new CopperSignal();
            if (!window._copperHeader) window._copperHeader = new HeaderParticles('copper-header-canvas', '#e74c3c');
            showCableType('utp');
            break;
        case 'wifi':
            if (!window._wifiAnim) window._wifiAnim = new WifiAnimation();
            if (!window._wifiSim) window._wifiSim = new WifiSimulation();
            if (!window._freq24) window._freq24 = new FreqWave('freq-24-canvas', 1, '#3498db');
            if (!window._freq5) window._freq5 = new FreqWave('freq-5-canvas', 2.5, '#9b59b6');
            if (!window._freq6) window._freq6 = new FreqWave('freq-6-canvas', 4, '#e74c3c');
            if (!window._wifiHeader) window._wifiHeader = new HeaderParticles('wifi-header-canvas', '#3498db');
            break;
    }
}

// ====== NAV BUTTON CLICKS ======
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.section));
});

document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => navigateTo(dot.dataset.section));
});

// ====== MOBILE NAV ======
document.getElementById('mobile-nav-toggle').addEventListener('click', () => {
    document.getElementById('main-nav').classList.toggle('open');
});

// Close nav on outside click
document.addEventListener('click', (e) => {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('mobile-nav-toggle');
    if (window.innerWidth <= 1024 && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
    }
});

// ====== KEYBOARD NAVIGATION ======
document.addEventListener('keydown', (e) => {
    const idx = sections.indexOf(currentSection);

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        // Next section
        if (idx < sections.length - 1) {
            navigateTo(sections[idx + 1]);
        }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        // Previous section
        if (idx > 0) {
            navigateTo(sections[idx - 1]);
        }
    }
});

// ====== OSI TOWER INTERACTION ======
document.querySelectorAll('.tower-layer').forEach(layer => {
    layer.addEventListener('click', function () {
        const num = this.dataset.layer;
        const info = {
            '7': 'שכבת היישום (Application) — הממשק בין המשתמש לרשת. פרוטוקולים: HTTP, FTP, SMTP, DNS.',
            '6': 'שכבת המצג (Presentation) — הצפנה, דחיסה והמרת פורמטים. דוגמאות: SSL/TLS, JPEG, ASCII.',
            '5': 'שכבת השיחה (Session) — ניהול חיבורים בין תהליכים. אחראית על פתיחה, ניהול וסגירת שיחות.',
            '4': 'שכבת התעבורה (Transport) — העברה אמינה מקצה לקצה. פרוטוקולים: TCP (אמין), UDP (מהיר).',
            '3': 'שכבת הרשת (Network) — ניתוב חבילות בין רשתות. פרוטוקול: IP. ציוד: Router.',
            '2': 'שכבת קישור הנתונים (Data Link) — העברה אמינה בין צמתים שכנים. פרוטוקול: Ethernet, MAC. ציוד: Switch.',
            '1': '⭐ השכבה הפיזית (Physical) — העברת ביטים גולמיים. כבלים, סיבים אופטיים, WiFi. זה מה שלומדים כאן!'
        };

        // Create tooltip
        let tt = document.getElementById('tower-tooltip');
        if (!tt) {
            tt = document.createElement('div');
            tt.id = 'tower-tooltip';
            tt.style.cssText = 'position:fixed;padding:14px 18px;background:rgba(17,24,39,0.97);border:1px solid #1abc9c;border-radius:12px;color:#e2e8f0;font-size:0.9rem;max-width:350px;z-index:9999;pointer-events:none;line-height:1.7;box-shadow:0 8px 32px rgba(0,0,0,0.4);transition:opacity 0.2s;';
            document.body.appendChild(tt);
        }

        tt.textContent = info[num] || '';
        tt.style.opacity = '1';

        const rect = this.getBoundingClientRect();
        tt.style.left = (rect.left - 370) + 'px';
        tt.style.top = rect.top + 'px';

        if (rect.left - 370 < 10) {
            tt.style.left = (rect.right + 10) + 'px';
        }

        setTimeout(() => {
            tt.style.opacity = '0';
            setTimeout(() => tt.remove(), 200);
        }, 4000);
    });
});

// ====== SCROLL ANIMATIONS (Intersection Observer) ======
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card, .type-card, .freq-card, .step-card, .scenario-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ====== LOADING SCREEN ======
function hideLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    loader.classList.add('hidden');
    setTimeout(() => loader.style.display = 'none', 500);
}

// ====== INITIALIZATION ======
function init() {
    // Start hero animation
    window._heroAnim = new HeroAnimation('hero-canvas');

    // Set initial progress
    document.getElementById('progress-fill').style.width = (1 / sections.length * 100) + '%';

    // Setup scroll animations
    setupScrollAnimations();

    // Hide loading screen
    setTimeout(hideLoadingScreen, 2200);

    // Add bit animation initial state
    const bitCanvas = document.getElementById('bit-canvas');
    if (bitCanvas) {
        const ctx = bitCanvas.getContext('2d');
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('לחצו "שלח ביטים" כדי לראות את ההדגמה', bitCanvas.width / 2, bitCanvas.height / 2);
    }
}

// Wait for DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ====== TOUCH SWIPE NAVIGATION ======
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only handle horizontal swipes (not on canvas/interactive elements)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
        const target = e.target;
        if (target.tagName === 'CANVAS' || target.closest('.wifi-sim-container')) return;

        const idx = sections.indexOf(currentSection);
        if (diffX > 0 && idx < sections.length - 1) {
            // Swipe left = next
            navigateTo(sections[idx + 1]);
        } else if (diffX < 0 && idx > 0) {
            // Swipe right = prev
            navigateTo(sections[idx - 1]);
        }
    }
}, { passive: true });
