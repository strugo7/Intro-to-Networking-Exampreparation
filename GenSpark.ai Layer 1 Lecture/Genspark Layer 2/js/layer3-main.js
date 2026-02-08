/* ===========================
   Layer 3 Main Logic
   Navigation, Init, IP Converter, Subnet Calculator, Routing Table
   =========================== */

// ====== STATE ======
let currentSection = 'intro';
const sections = ['intro', 'ip', 'binary', 'subnetting', 'routing', 'protocols', 'quiz'];
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

    // Update nav buttons
    document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    // Update dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === sectionId);
        dot.classList.toggle('completed', visitedSections.has(dot.dataset.section) && dot.dataset.section !== sectionId);
    });

    // Progress bar
    const sectionIndex = sections.indexOf(sectionId);
    const progress = ((sectionIndex + 1) / sections.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = Math.round(progress) + '%';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile nav
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.remove('open');

    // Init quiz if needed
    if (sectionId === 'quiz') {
        initQuiz();
    }

    // Re-init canvases for sections that were hidden
    setTimeout(() => {
        if (sectionId === 'ip' && typeof initIPv4StructureCanvas === 'function') {
            initIPv4StructureCanvas();
        }
        if (sectionId === 'routing' && typeof initLPMCanvas === 'function') {
            initLPMCanvas();
            if (typeof initDirectRoutingCanvas === 'function') initDirectRoutingCanvas();
            if (typeof initStaticRoutingCanvas === 'function') initStaticRoutingCanvas();
            if (typeof initDynamicRoutingCanvas === 'function') initDynamicRoutingCanvas();
        }
        if (sectionId === 'protocols') {
            if (typeof initASExplainCanvas === 'function') initASExplainCanvas();
        }
        if (sectionId === 'intro') {
            if (typeof initPacketJourneyCanvas === 'function') initPacketJourneyCanvas();
        }
    }, 50);
}

// ====== BIT TOGGLES (Binary Converter) ======
function initBitToggles() {
    const container = document.getElementById('bit-toggles');
    if (!container) return;

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.bit-toggle');
        if (!btn) return;

        const state = btn.dataset.state === '0' ? '1' : '0';
        btn.dataset.state = state;
        btn.textContent = state;
        updateBinaryResult();
    });
    updateBinaryResult();
}

function updateBinaryResult() {
    const bits = [];
    const weights = [128, 64, 32, 16, 8, 4, 2, 1];
    let total = 0;
    const activeParts = [];

    document.querySelectorAll('.bit-toggle').forEach(btn => {
        const bitVal = parseInt(btn.dataset.state);
        const bitPos = parseInt(btn.dataset.bit);
        bits.push(bitVal);
        if (bitVal === 1) {
            total += weights[7 - bitPos];
            activeParts.push(weights[7 - bitPos]);
        }
    });

    const binaryStr = bits.join('');
    const binaryEl = document.getElementById('binary-result');
    const decimalEl = document.getElementById('decimal-result');
    const calcEl = document.getElementById('calc-display');

    if (binaryEl) binaryEl.textContent = binaryStr;
    if (decimalEl) {
        decimalEl.textContent = total;
        decimalEl.style.transition = 'transform 0.2s ease';
        decimalEl.style.transform = 'scale(1.2)';
        setTimeout(() => decimalEl.style.transform = 'scale(1)', 200);
    }
    if (calcEl) {
        if (activeParts.length > 0) {
            calcEl.innerHTML = `<span class="calc-parts">${activeParts.join(' + ')} = <strong>${total}</strong></span>`;
        } else {
            calcEl.innerHTML = `<span class="calc-parts">0</span>`;
        }
    }
}

// ====== FULL IP CONVERTER ======
function convertFullIP() {
    const display = document.getElementById('ip-conversion-display');
    if (!display) return;

    const octets = [];
    for (let i = 1; i <= 4; i++) {
        let val = parseInt(document.getElementById('oc' + i).value) || 0;
        val = Math.max(0, Math.min(255, val));
        document.getElementById('oc' + i).value = val;
        octets.push(val);
    }

    display.innerHTML = '';
    let fullBinary = '';

    octets.forEach((octet, i) => {
        const binary = octet.toString(2).padStart(8, '0');
        fullBinary += binary;

        const row = document.createElement('div');
        row.className = 'ip-octet-result';
        row.style.animationDelay = (i * 0.1) + 's';
        row.innerHTML = `
            <span class="decimal-val">${octet}</span>
            <span class="arrow">→</span>
            <span class="binary-val">${binary}</span>
        `;
        display.appendChild(row);
    });

    // Full binary
    const fullRow = document.createElement('div');
    fullRow.className = 'ip-octet-result';
    fullRow.style.borderColor = 'rgba(59,130,246,0.4)';
    fullRow.style.background = 'rgba(59,130,246,0.1)';
    fullRow.innerHTML = `
        <span class="decimal-val" style="font-size:0.85rem">${octets.join('.')}</span>
        <span class="arrow">=</span>
        <span class="binary-val" style="letter-spacing:1px;font-size:0.85rem">${fullBinary.match(/.{8}/g).join('.')}</span>
    `;
    display.appendChild(fullRow);
}

// ====== SUBNET MASK VISUAL ======
function initSubnetMaskVisual() {
    const slider = document.getElementById('cidr-slider');
    if (!slider) return;

    slider.addEventListener('input', updateSubnetMaskVisual);
    updateSubnetMaskVisual();
}

function updateSubnetMaskVisual() {
    const cidr = parseInt(document.getElementById('cidr-slider').value);
    const cidrLabel = document.getElementById('cidr-val');
    if (cidrLabel) cidrLabel.textContent = '/' + cidr;

    const ip = [192, 168, 10, 50];
    const ipBits = ip.map(o => o.toString(2).padStart(8, '0')).join('');
    const maskBits = '1'.repeat(cidr) + '0'.repeat(32 - cidr);

    // Network ID
    const networkBits = [];
    for (let i = 0; i < 32; i++) {
        networkBits.push(parseInt(ipBits[i]) & parseInt(maskBits[i]));
    }

    // Render bits
    renderBitRow('mask-ip-bits', ipBits, cidr);
    renderBitRow('mask-subnet-bits', maskBits, cidr);
    renderBitRow('mask-network-bits', networkBits.join(''), cidr, true);

    // Info
    const maskInfo = document.getElementById('mask-info');
    if (maskInfo) {
        const hostBits = 32 - cidr;
        const totalHosts = Math.pow(2, hostBits);
        const usableHosts = Math.max(0, totalHosts - 2);
        const maskOctets = [];
        for (let i = 0; i < 4; i++) {
            maskOctets.push(parseInt(maskBits.substring(i * 8, (i + 1) * 8), 2));
        }

        // Calculate broadcast
        const broadcastBits = networkBits.map((b, idx) => idx < cidr ? b : 1);
        const broadcastOctets = [];
        const networkOctets = [];
        for (let i = 0; i < 4; i++) {
            broadcastOctets.push(parseInt(broadcastBits.slice(i*8, (i+1)*8).join(''), 2));
            networkOctets.push(parseInt(networkBits.slice(i*8, (i+1)*8).join(''), 2));
        }

        // First and last host
        const firstHost = [...networkOctets];
        firstHost[3] += 1;
        const lastHost = [...broadcastOctets];
        lastHost[3] -= 1;

        maskInfo.innerHTML = `
            <div class="mask-info-item">
                <span class="mask-info-label">Subnet Mask</span>
                <span class="mask-info-value">${maskOctets.join('.')}</span>
            </div>
            <div class="mask-info-item">
                <span class="mask-info-label">מארחים זמינים</span>
                <span class="mask-info-value">${usableHosts > 0 ? usableHosts.toLocaleString() : 0}</span>
            </div>
            <div class="mask-info-item">
                <span class="mask-info-label">ביטים למארח</span>
                <span class="mask-info-value">${hostBits}</span>
            </div>
            <div class="mask-info-item">
                <span class="mask-info-label">כתובת רשת</span>
                <span class="mask-info-value">${networkOctets.join('.')}</span>
            </div>
            <div class="mask-info-item">
                <span class="mask-info-label">Broadcast</span>
                <span class="mask-info-value">${broadcastOctets.join('.')}</span>
            </div>
            <div class="mask-info-item">
                <span class="mask-info-label">טווח מארחים</span>
                <span class="mask-info-value">${usableHosts > 0 ? firstHost.join('.') + ' — ' + lastHost.join('.') : 'N/A'}</span>
            </div>
        `;
    }
}

function renderBitRow(containerId, bits, cidr, isResult) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 32; i++) {
        if (i > 0 && i % 8 === 0) {
            const sep = document.createElement('span');
            sep.className = 'mask-bit octet-sep';
            sep.textContent = '.';
            container.appendChild(sep);
        }

        const bit = document.createElement('span');
        bit.className = 'mask-bit ' + (i < cidr ? 'network-bit' : 'host-bit');
        bit.textContent = bits[i];
        container.appendChild(bit);
    }
}

// ====== SUBNET CALCULATOR ======
function calculateSubnet() {
    const ipStr = document.getElementById('calc-ip').value.trim();
    const cidr = parseInt(document.getElementById('calc-cidr').value);
    const resultsDiv = document.getElementById('calc-results');
    if (!resultsDiv) return;

    // Parse IP
    const parts = ipStr.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        resultsDiv.innerHTML = '<div class="calc-result-item" style="grid-column:1/-1"><span style="color:var(--danger)">כתובת IP לא תקינה</span></div>';
        return;
    }
    if (isNaN(cidr) || cidr < 1 || cidr > 32) {
        resultsDiv.innerHTML = '<div class="calc-result-item" style="grid-column:1/-1"><span style="color:var(--danger)">CIDR לא תקין (1-32)</span></div>';
        return;
    }

    // Calculate
    const ipBin = parts.map(p => p.toString(2).padStart(8, '0')).join('');
    const maskBin = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
    const wildcardBin = maskBin.split('').map(b => b === '1' ? '0' : '1').join('');

    // Network address
    const networkBin = ipBin.split('').map((b, i) => (parseInt(b) & parseInt(maskBin[i])).toString()).join('');
    // Broadcast
    const broadcastBin = networkBin.split('').map((b, i) => i < cidr ? b : '1').join('');

    function binToIP(bin) {
        const octets = [];
        for (let i = 0; i < 4; i++) octets.push(parseInt(bin.substring(i * 8, (i + 1) * 8), 2));
        return octets.join('.');
    }

    const networkAddr = binToIP(networkBin);
    const broadcastAddr = binToIP(broadcastBin);
    const maskAddr = binToIP(maskBin);
    const wildcardAddr = binToIP(wildcardBin);
    const hostBits = 32 - cidr;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = Math.max(0, totalHosts - 2);

    // First usable = network + 1
    const firstBin = networkBin.substring(0, 31) + '1';
    const firstUsable = binToIP(firstBin);
    // Last usable = broadcast - 1
    const lastBin = broadcastBin.substring(0, 31) + '0';
    const lastUsable = binToIP(lastBin);

    resultsDiv.innerHTML = `
        <div class="calc-result-item"><span class="calc-result-label">כתובת רשת</span><span class="calc-result-value">${networkAddr}/${cidr}</span></div>
        <div class="calc-result-item"><span class="calc-result-label">Subnet Mask</span><span class="calc-result-value">${maskAddr}</span></div>
        <div class="calc-result-item"><span class="calc-result-label">Wildcard Mask</span><span class="calc-result-value">${wildcardAddr}</span></div>
        <div class="calc-result-item"><span class="calc-result-label">כתובת Broadcast</span><span class="calc-result-value">${broadcastAddr}</span></div>
        <div class="calc-result-item"><span class="calc-result-label">מארח ראשון</span><span class="calc-result-value">${usableHosts > 0 ? firstUsable : 'N/A'}</span></div>
        <div class="calc-result-item"><span class="calc-result-label">מארח אחרון</span><span class="calc-result-value">${usableHosts > 0 ? lastUsable : 'N/A'}</span></div>
        <div class="calc-result-item"><span class="calc-result-label">מארחים זמינים</span><span class="calc-result-value" style="color:var(--success);font-size:1.1rem">${usableHosts.toLocaleString()}</span></div>
        <div class="calc-result-item"><span class="calc-result-label">סה"כ כתובות</span><span class="calc-result-value">${totalHosts.toLocaleString()}</span></div>
    `;
}

// ====== ROUTING TABLE LOOKUP ======
function lookupRoute() {
    const destIP = document.getElementById('rt-dest-ip').value.trim();
    const resultDiv = document.getElementById('rt-result');
    const rows = document.querySelectorAll('#routing-table-body tr');

    // Parse dest IP
    const destParts = destIP.split('.').map(Number);
    if (destParts.length !== 4 || destParts.some(p => isNaN(p) || p < 0 || p > 255)) {
        if (resultDiv) resultDiv.innerHTML = '<span style="color:var(--danger)">כתובת IP לא תקינה</span>';
        return;
    }

    const destBin = destParts.map(p => p.toString(2).padStart(8, '0')).join('');
    let bestMatch = -1;
    let bestMask = -1;

    rows.forEach((row, i) => {
        const network = row.dataset.network;
        const mask = parseInt(row.dataset.mask);
        const netParts = network.split('.').map(Number);
        const netBin = netParts.map(p => p.toString(2).padStart(8, '0')).join('');

        // Check match
        let matched = true;
        for (let b = 0; b < mask; b++) {
            if (destBin[b] !== netBin[b]) {
                matched = false;
                break;
            }
        }

        // Reset status
        const statusCell = document.getElementById('rt-match-' + i);
        row.classList.remove('match-row', 'best-match', 'no-match');

        if (matched) {
            row.classList.add('match-row');
            if (statusCell) statusCell.innerHTML = '<span style="color:#3b82f6">✓ התאמה</span>';
            if (mask > bestMask) {
                bestMask = mask;
                bestMatch = i;
            }
        } else {
            row.classList.add('no-match');
            if (statusCell) statusCell.innerHTML = '<span style="color:var(--text-muted)">—</span>';
        }
    });

    // Highlight best match
    if (bestMatch >= 0) {
        rows[bestMatch].classList.remove('match-row');
        rows[bestMatch].classList.add('best-match');
        const statusCell = document.getElementById('rt-match-' + bestMatch);
        if (statusCell) statusCell.innerHTML = '<span style="color:#22c55e">⭐ Best Match!</span>';

        const cells = rows[bestMatch].querySelectorAll('td');
        const nextHop = cells[2] ? cells[2].textContent : '';
        const iface = cells[3] ? cells[3].textContent : '';
        const network = cells[0] ? cells[0].textContent : '';

        if (resultDiv) {
            resultDiv.innerHTML = `
                <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center">
                    <span>📦 חבילה אל <strong style="color:var(--primary)">${destIP}</strong></span>
                    <span style="color:var(--text-muted)">→</span>
                    <span>נשלחת דרך <strong style="color:var(--success)">${nextHop}</strong></span>
                    <span style="color:var(--text-muted)">|</span>
                    <span>ממשק: <strong>${iface}</strong></span>
                    <span style="color:var(--text-muted)">|</span>
                    <span>Longest Prefix Match: <strong style="color:var(--warning)">${network}</strong></span>
                </div>
            `;
        }
    } else {
        if (resultDiv) resultDiv.innerHTML = '<span style="color:var(--danger)">לא נמצא נתיב מתאים!</span>';
    }
}

// ====== KEYBOARD NAVIGATION ======
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        const idx = sections.indexOf(currentSection);
        if (e.key === 'ArrowLeft' && idx < sections.length - 1) {
            navigateTo(sections[idx + 1]);
        }
        if (e.key === 'ArrowRight' && idx > 0) {
            navigateTo(sections[idx - 1]);
        }
    });
}

// ====== TOUCH SWIPE ======
function initSwipe() {
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
            const idx = sections.indexOf(currentSection);
            if (diffX > 0 && idx < sections.length - 1) {
                navigateTo(sections[idx + 1]);
            } else if (diffX < 0 && idx > 0) {
                navigateTo(sections[idx - 1]);
            }
        }
    }, { passive: true });
}

// ====== MOBILE NAV TOGGLE ======
function initMobileNav() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('open');
        }
    });
}

// ====== LOADING SCREEN ======
function hideLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    if (screen) {
        setTimeout(() => screen.classList.add('hidden'), 1500);
    }
}

// ====== SCROLL ANIMATIONS ======
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card, .class-card, .rt-type-card, .protocol-block, .reason, .special-item, .pp-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ====== NAV CLICK HANDLERS ======
function initNavClicks() {
    document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.section));
    });

    document.querySelectorAll('.dot[data-section]').forEach(dot => {
        dot.addEventListener('click', () => navigateTo(dot.dataset.section));
    });
}

// ====== IP OCTET INPUT HANDLERS ======
function initOctetInputs() {
    document.querySelectorAll('.ip-octet-input').forEach(input => {
        input.addEventListener('change', () => {
            let val = parseInt(input.value) || 0;
            input.value = Math.max(0, Math.min(255, val));
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') convertFullIP();
        });
    });
}

// ====== ENTER KEY FOR ROUTING TABLE ======
function initRoutingInput() {
    const input = document.getElementById('rt-dest-ip');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') lookupRoute();
        });
    }

    const calcIp = document.getElementById('calc-ip');
    const calcCidr = document.getElementById('calc-cidr');
    if (calcIp) calcIp.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculateSubnet(); });
    if (calcCidr) calcCidr.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculateSubnet(); });
}

// ====== INITIALIZE EVERYTHING ======
document.addEventListener('DOMContentLoaded', () => {
    hideLoadingScreen();
    initNavClicks();
    initMobileNav();
    initKeyboardNav();
    initSwipe();
    initBitToggles();
    initOctetInputs();
    initSubnetMaskVisual();
    initRoutingInput();

    // Init animations
    if (typeof initLayer3Animations === 'function') {
        initLayer3Animations();
    }

    // Auto-convert IP on load
    convertFullIP();

    // Calculate subnet on load
    calculateSubnet();

    // Scroll animations after a short delay
    setTimeout(initScrollAnimations, 2000);
});

// Make functions globally available
window.navigateTo = navigateTo;
window.convertFullIP = convertFullIP;
window.calculateSubnet = calculateSubnet;
window.lookupRoute = lookupRoute;
window.startPacketJourney = window.startPacketJourney || function(){};
window.startDirectRoutingSim = window.startDirectRoutingSim || function(){};
window.resetDirectRoutingSim = window.resetDirectRoutingSim || function(){};
window.startStaticRoutingSim = window.startStaticRoutingSim || function(){};
window.resetStaticRoutingSim = window.resetStaticRoutingSim || function(){};
window.startDynamicRoutingSim = window.startDynamicRoutingSim || function(){};
window.resetDynamicRoutingSim = window.resetDynamicRoutingSim || function(){};
