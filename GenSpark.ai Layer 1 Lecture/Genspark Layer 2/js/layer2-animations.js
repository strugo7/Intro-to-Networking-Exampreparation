/* ===========================
   Layer 2 Animations — Canvas-based
   Data Link Layer Interactive Lesson
   =========================== */

// ====== HERO CANVAS — Switch Particles ======
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
    }
    resize();
    window.addEventListener('resize', resize);
    const w = () => canvas.width / dpr;
    const h = () => canvas.height / dpr;

    const nodes = [];
    for (let i = 0; i < 25; i++) {
        nodes.push({ x: Math.random() * 1200, y: Math.random() * 600, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: 3 + Math.random() * 3, pulse: Math.random() * Math.PI * 2 });
    }
    const frames = [];
    function spawnFrame() {
        if (frames.length > 10) return;
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes[Math.floor(Math.random() * nodes.length)];
        if (a === b) return;
        frames.push({ fromX: a.x, fromY: a.y, toX: b.x, toY: b.y, progress: 0, speed: 0.006 + Math.random() * 0.008, color: ['#06b6d4', '#f59e0b', '#22c55e', '#8b5cf6'][Math.floor(Math.random() * 4)] });
    }
    let fc = 0;
    function draw() {
        const W = w(), H = h();
        ctx.clearRect(0, 0, W, H);
        fc++;
        if (fc % 35 === 0) spawnFrame();
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(6,182,212,${(1 - dist / 160) * 0.12})`;
                    ctx.lineWidth = 1; ctx.stroke();
                }
            }
        }
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
            n.pulse += 0.03;
            const pr = n.r + Math.sin(n.pulse) * 1.5;
            ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6,182,212,0.5)'; ctx.fill();
        });
        for (let i = frames.length - 1; i >= 0; i--) {
            const f = frames[i];
            f.progress += f.speed;
            if (f.progress >= 1) { frames.splice(i, 1); continue; }
            const x = f.fromX + (f.toX - f.fromX) * f.progress;
            const y = f.fromY + (f.toY - f.fromY) * f.progress;
            ctx.save();
            ctx.shadowColor = f.color; ctx.shadowBlur = 8;
            ctx.beginPath(); ctx.roundRect(x - 10, y - 6, 20, 12, 3);
            ctx.fillStyle = f.color; ctx.fill(); ctx.restore();
            ctx.font = '600 6px IBM Plex Mono, monospace';
            ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
            ctx.fillText('FRM', x, y + 2);
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// ====== FRAME JOURNEY ======
let fjRunning = false;
function initFrameJourneyCanvas() {
    const canvas = document.getElementById('frame-journey-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 800);
    canvas.width = w * dpr; canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = w + 'px'; canvas.style.height = '200px';
    drawFrameJourneyStatic(ctx, w, 200);
}
function drawFrameJourneyStatic(ctx, W, H) {
    ctx.clearRect(0, 0, W, H);
    const nodes = [
        { x: W * 0.08, y: H * 0.5, label: '💻 PC A', sub: 'AA:11:22:33:44:55' },
        { x: W * 0.35, y: H * 0.5, label: '🔀 Switch', sub: 'Learning...' },
        { x: W * 0.65, y: H * 0.5, label: '🔀 Switch', sub: 'Forwarding...' },
        { x: W * 0.92, y: H * 0.5, label: '💻 PC B', sub: 'BB:66:77:88:99:00' }
    ];
    // Links
    for (let i = 0; i < nodes.length - 1; i++) {
        ctx.beginPath(); ctx.moveTo(nodes[i].x + 30, nodes[i].y); ctx.lineTo(nodes[i + 1].x - 30, nodes[i + 1].y);
        ctx.strokeStyle = 'rgba(6,182,212,0.3)'; ctx.lineWidth = 2; ctx.setLineDash([6, 3]); ctx.stroke(); ctx.setLineDash([]);
    }
    nodes.forEach(n => {
        ctx.font = '18px serif'; ctx.textAlign = 'center'; ctx.fillText(n.label.split(' ')[0], n.x, n.y + 6);
        ctx.font = '600 10px Heebo, sans-serif'; ctx.fillStyle = '#e2e8f0'; ctx.fillText(n.label.split(' ')[1] || '', n.x, n.y - 24);
        ctx.font = '500 8px IBM Plex Mono, monospace'; ctx.fillStyle = '#94a3b8'; ctx.fillText(n.sub, n.x, n.y + 28);
    });
    return nodes;
}
function startFrameJourney() {
    if (fjRunning) return;
    fjRunning = true;
    const canvas = document.getElementById('frame-journey-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr, H = canvas.height / dpr;
    const nodes = [
        { x: W * 0.08, y: H * 0.5 },
        { x: W * 0.35, y: H * 0.5 },
        { x: W * 0.65, y: H * 0.5 },
        { x: W * 0.92, y: H * 0.5 }
    ];
    let seg = 0, progress = 0;
    function animate() {
        drawFrameJourneyStatic(ctx, W, H);
        progress += 0.02;
        if (progress >= 1) { seg++; progress = 0; }
        if (seg >= nodes.length - 1) {
            drawFrameJourneyStatic(ctx, W, H);
            ctx.font = '700 13px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e'; ctx.fillText('✅ Frame נמסר בהצלחה ל-PC B!', W / 2, 22);
            fjRunning = false; return;
        }
        const from = nodes[seg], to = nodes[seg + 1];
        const x = from.x + (to.x - from.x) * progress;
        const y = from.y + (to.y - from.y) * progress;
        ctx.save(); ctx.shadowColor = '#06b6d4'; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.roundRect(x - 18, y - 10, 36, 20, 5);
        ctx.fillStyle = '#06b6d4'; ctx.fill(); ctx.restore();
        ctx.font = '700 8px IBM Plex Mono, monospace'; ctx.textAlign = 'center';
        ctx.fillStyle = '#fff'; ctx.fillText('FRAME', x, y + 3);
        const labels = ['PC A → Switch 1', 'Switch 1 → Switch 2', 'Switch 2 → PC B'];
        ctx.font = '600 11px Heebo, sans-serif'; ctx.fillStyle = '#f59e0b'; ctx.fillText('📦 ' + labels[seg], W / 2, 22);
        requestAnimationFrame(animate);
    }
    animate();
}

// ====== ARP ANIMATION ======
let arpRunning = false;
function initARPCanvas() {
    const canvas = document.getElementById('arp-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 600);
    canvas.width = w * dpr; canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = w + 'px'; canvas.style.height = '200px';
    drawARPStatic(ctx, w, 200);
}
function drawARPStatic(ctx, W, H) {
    ctx.clearRect(0, 0, W, H);
    const pcs = [
        { x: W * 0.15, y: H * 0.5, label: 'PC A', ip: '.1.10' },
        { x: W * 0.5, y: H * 0.2, label: 'PC B', ip: '.1.20' },
        { x: W * 0.85, y: H * 0.5, label: 'PC C', ip: '.1.30' },
        { x: W * 0.5, y: H * 0.8, label: 'PC D', ip: '.1.40' }
    ];
    const sw = { x: W * 0.5, y: H * 0.5 };
    pcs.forEach(pc => {
        ctx.beginPath(); ctx.moveTo(sw.x, sw.y); ctx.lineTo(pc.x, pc.y);
        ctx.strokeStyle = 'rgba(100,116,139,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
    });
    ctx.beginPath(); ctx.arc(sw.x, sw.y, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d422'; ctx.fill();
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2; ctx.stroke();
    ctx.font = '16px serif'; ctx.textAlign = 'center'; ctx.fillText('🔀', sw.x, sw.y + 6);
    pcs.forEach(pc => {
        ctx.font = '14px serif'; ctx.textAlign = 'center'; ctx.fillText('💻', pc.x, pc.y + 5);
        ctx.font = '600 9px Heebo, sans-serif'; ctx.fillStyle = '#e2e8f0'; ctx.fillText(pc.label, pc.x, pc.y - 16);
        ctx.font = '500 8px IBM Plex Mono, monospace'; ctx.fillStyle = '#94a3b8'; ctx.fillText(pc.ip, pc.x, pc.y + 22);
    });
    return { pcs, sw };
}
function startARPAnimation() {
    if (arpRunning) return;
    arpRunning = true;
    const canvas = document.getElementById('arp-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr, H = canvas.height / dpr;
    const { pcs, sw } = drawARPStatic(ctx, W, H);
    let frame = 0;
    const totalFrames = 300;
    function animate() {
        frame++;
        const scene = drawARPStatic(ctx, W, H);
        if (frame <= 80) {
            // ARP Request broadcast from PC A to Switch
            const p = Math.min(frame / 40, 1);
            if (p <= 1) {
                const x = pcs[0].x + (sw.x - pcs[0].x) * p;
                const y = pcs[0].y + (sw.y - pcs[0].y) * p;
                drawPacket(ctx, x, y, '#f59e0b', 'ARP?');
            }
            if (frame > 40) {
                // Flood to all PCs
                const p2 = (frame - 40) / 40;
                [1, 2, 3].forEach(i => {
                    const x = sw.x + (pcs[i].x - sw.x) * p2;
                    const y = sw.y + (pcs[i].y - sw.y) * p2;
                    drawPacket(ctx, x, y, '#f59e0b', 'ARP?');
                });
            }
            ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#f59e0b'; ctx.fillText('📢 ARP Request: "מי זה 192.168.1.30?"', W / 2, 16);
        } else if (frame <= 180) {
            // ARP Reply from PC C
            const p = Math.min((frame - 80) / 50, 1);
            const x = pcs[2].x + (pcs[0].x - pcs[2].x) * p;
            const y = pcs[2].y + (pcs[0].y - pcs[2].y) * p;
            drawPacket(ctx, x, y, '#22c55e', 'ARP!');
            ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e'; ctx.fillText('👤 ARP Reply: "אני .1.30, MAC שלי: CC:33:..."', W / 2, 16);
        } else {
            ctx.font = '700 12px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e'; ctx.fillText('✅ PC A שמר: 192.168.1.30 → CC:33:44:55:66:77', W / 2, 16);
            if (frame > totalFrames) { arpRunning = false; return; }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function drawPacket(ctx, x, y, color, label) {
    ctx.save();
    ctx.shadowColor = color; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.roundRect(x - 14, y - 8, 28, 16, 4);
    ctx.fillStyle = color; ctx.fill(); ctx.restore();
    ctx.font = '700 7px IBM Plex Mono, monospace'; ctx.textAlign = 'center';
    ctx.fillStyle = color === '#f59e0b' ? '#000' : '#fff'; ctx.fillText(label, x, y + 3);
}

// ====== MAC TABLE SIMULATOR ======
let macSimRunning = false;
let macTable = {};
let macSimCtx, macSimW, macSimH;
const macSimDevices = [
    { label: 'PC 1', mac: 'AA:11:22:33:44:01', port: 'Fa0/1', color: '#3b82f6' },
    { label: 'PC 2', mac: 'BB:22:33:44:55:02', port: 'Fa0/2', color: '#22c55e' },
    { label: 'PC 3', mac: 'CC:33:44:55:66:03', port: 'Fa0/3', color: '#f59e0b' },
    { label: 'PC 4', mac: 'DD:44:55:66:77:04', port: 'Fa0/4', color: '#ef4444' }
];

function initMACTableCanvas() {
    const canvas = document.getElementById('mac-table-canvas');
    if (!canvas) return;
    macSimCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 600);
    canvas.width = w * dpr; canvas.height = 340 * dpr;
    macSimCtx.scale(dpr, dpr);
    canvas.style.width = w + 'px'; canvas.style.height = '340px';
    macSimW = w; macSimH = 340;
    drawMACSimStatic();
}

function getMACSimPositions() {
    const W = macSimW, H = macSimH;
    const sw = { x: W * 0.5, y: H * 0.45 };
    const devs = [
        { x: W * 0.12, y: H * 0.2 },
        { x: W * 0.88, y: H * 0.2 },
        { x: W * 0.12, y: H * 0.75 },
        { x: W * 0.88, y: H * 0.75 }
    ];
    return { sw, devs };
}

function drawMACSimStatic(highlights) {
    if (!macSimCtx) return;
    const ctx = macSimCtx, W = macSimW, H = macSimH;
    ctx.clearRect(0, 0, W, H);
    const { sw, devs } = getMACSimPositions();

    // Links
    devs.forEach((d, i) => {
        ctx.beginPath(); ctx.moveTo(sw.x, sw.y); ctx.lineTo(d.x, d.y);
        const isHighlighted = highlights && highlights.includes(i);
        ctx.strokeStyle = isHighlighted ? macSimDevices[i].color + '88' : 'rgba(100,116,139,0.3)';
        ctx.lineWidth = isHighlighted ? 3 : 1.5;
        ctx.stroke();
    });

    // Switch
    ctx.beginPath(); ctx.arc(sw.x, sw.y, 35, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d418'; ctx.fill();
    ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.font = '28px serif'; ctx.textAlign = 'center'; ctx.fillText('🔀', sw.x, sw.y + 9);
    ctx.font = '700 11px Heebo, sans-serif'; ctx.fillStyle = '#e2e8f0'; ctx.fillText('Switch', sw.x, sw.y - 42);

    // Port labels
    const portLabels = ['Fa0/1', 'Fa0/2', 'Fa0/3', 'Fa0/4'];
    devs.forEach((d, i) => {
        const mx = (sw.x + d.x) / 2, my = (sw.y + d.y) / 2;
        ctx.font = '500 8px IBM Plex Mono, monospace'; ctx.textAlign = 'center';
        ctx.fillStyle = macSimDevices[i].color; ctx.fillText(portLabels[i], mx, my - 6);
    });

    // Devices
    devs.forEach((d, i) => {
        const dev = macSimDevices[i];
        ctx.font = '22px serif'; ctx.textAlign = 'center'; ctx.fillText('💻', d.x, d.y + 7);
        ctx.font = '700 10px Heebo, sans-serif'; ctx.fillStyle = dev.color; ctx.fillText(dev.label, d.x, d.y - 20);
        ctx.font = '500 7px IBM Plex Mono, monospace'; ctx.fillStyle = '#94a3b8'; ctx.fillText(dev.mac, d.x, d.y + 26);
    });
}

function updateMACTableDisplay() {
    const tbody = document.getElementById('mac-table-body');
    if (!tbody) return;
    const entries = Object.entries(macTable);
    if (entries.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="3">הטבלה ריקה — הפעילו סימולציה!</td></tr>';
        return;
    }
    tbody.innerHTML = entries.map(([mac, info]) =>
        `<tr class="${info.isNew ? 'highlight-row' : ''}"><td class="mono">${info.port}</td><td class="mono">${mac}</td><td>✅ למד</td></tr>`
    ).join('');
}

function addLog(msg, type) {
    const log = document.getElementById('mac-sim-log');
    if (!log) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry log-' + type;
    entry.textContent = '> ' + msg;
    log.prepend(entry);
    if (log.children.length > 20) log.removeChild(log.lastChild);
}

function startMACTableSim() {
    if (macSimRunning) return;
    macSimRunning = true;
    macTable = {};
    updateMACTableDisplay();
    const log = document.getElementById('mac-sim-log');
    if (log) log.innerHTML = '';

    const { sw, devs } = getMACSimPositions();
    const scenarios = [
        { from: 0, to: 1, desc: 'PC 1 → PC 2' },
        { from: 1, to: 0, desc: 'PC 2 → PC 1' },
        { from: 2, to: 3, desc: 'PC 3 → PC 4' },
        { from: 3, to: 2, desc: 'PC 4 → PC 3' },
        { from: 0, to: 2, desc: 'PC 1 → PC 3' }
    ];
    let scenarioIdx = 0;
    let progress = 0;
    let phase = 'toSwitch'; // toSwitch, fromSwitch

    function animate() {
        if (scenarioIdx >= scenarios.length) {
            drawMACSimStatic();
            const ctx = macSimCtx, W = macSimW;
            ctx.font = '700 12px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e'; ctx.fillText('✅ הטבלה מלאה! Switch מכיר את כל המכשירים.', W / 2, 20);
            macSimRunning = false; return;
        }

        const sc = scenarios[scenarioIdx];
        const fromDev = macSimDevices[sc.from];
        const toDev = macSimDevices[sc.to];
        const fromPos = devs[sc.from];
        const toPos = devs[sc.to];

        progress += 0.025;

        if (phase === 'toSwitch') {
            const highlights = [sc.from];
            drawMACSimStatic(highlights);
            const x = fromPos.x + (sw.x - fromPos.x) * Math.min(progress, 1);
            const y = fromPos.y + (sw.y - fromPos.y) * Math.min(progress, 1);
            drawPacket(macSimCtx, x, y, fromDev.color, 'FRM');

            macSimCtx.font = '600 10px Heebo, sans-serif'; macSimCtx.textAlign = 'center';
            macSimCtx.fillStyle = '#f59e0b'; macSimCtx.fillText('📦 ' + sc.desc + ' — Frame מגיע ל-Switch', macSimW / 2, 20);

            if (progress >= 1) {
                // Learn source MAC
                Object.keys(macTable).forEach(k => macTable[k].isNew = false);
                macTable[fromDev.mac] = { port: fromDev.port, isNew: true };
                updateMACTableDisplay();
                addLog('LEARN: ' + fromDev.mac + ' on ' + fromDev.port, 'learn');

                const knownDest = macTable[toDev.mac];
                if (knownDest) {
                    addLog('FORWARD: → ' + toDev.mac + ' via ' + knownDest.port, 'forward');
                } else {
                    addLog('FLOOD: ' + toDev.mac + ' unknown — sending to all ports', 'flood');
                }
                progress = 0;
                phase = 'fromSwitch';
            }
        } else {
            const knownDest = macTable[toDev.mac];
            const targetPorts = knownDest ? [sc.to] : [0, 1, 2, 3].filter(i => i !== sc.from);
            drawMACSimStatic(targetPorts);

            targetPorts.forEach(idx => {
                const tp = devs[idx];
                const x = sw.x + (tp.x - sw.x) * Math.min(progress, 1);
                const y = sw.y + (tp.y - sw.y) * Math.min(progress, 1);
                drawPacket(macSimCtx, x, y, knownDest ? '#06b6d4' : '#f59e0b', knownDest ? 'FRM' : 'FLD');
            });

            macSimCtx.font = '600 10px Heebo, sans-serif'; macSimCtx.textAlign = 'center';
            macSimCtx.fillStyle = knownDest ? '#06b6d4' : '#f59e0b';
            macSimCtx.fillText(knownDest ? '✅ FORWARD — ' + toDev.port : '📢 FLOOD — נשלח לכל הפורטים!', macSimW / 2, 20);

            if (progress >= 1) {
                progress = 0;
                phase = 'toSwitch';
                scenarioIdx++;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function sendSingleFrame() {
    if (macSimRunning) return;
    macSimRunning = true;
    const { sw, devs } = getMACSimPositions();
    const from = Math.floor(Math.random() * 4);
    let to = Math.floor(Math.random() * 4);
    while (to === from) to = Math.floor(Math.random() * 4);
    const fromDev = macSimDevices[from], toDev = macSimDevices[to];
    let progress = 0, phase = 'toSwitch';

    function animate() {
        progress += 0.03;
        if (phase === 'toSwitch') {
            drawMACSimStatic([from]);
            const x = devs[from].x + (sw.x - devs[from].x) * Math.min(progress, 1);
            const y = devs[from].y + (sw.y - devs[from].y) * Math.min(progress, 1);
            drawPacket(macSimCtx, x, y, fromDev.color, 'FRM');
            macSimCtx.font = '600 10px Heebo, sans-serif'; macSimCtx.textAlign = 'center';
            macSimCtx.fillStyle = '#f59e0b'; macSimCtx.fillText('📦 ' + fromDev.label + ' → ' + toDev.label, macSimW / 2, 20);
            if (progress >= 1) {
                Object.keys(macTable).forEach(k => macTable[k].isNew = false);
                macTable[fromDev.mac] = { port: fromDev.port, isNew: true };
                updateMACTableDisplay();
                addLog('LEARN: ' + fromDev.mac + ' on ' + fromDev.port, 'learn');
                progress = 0; phase = 'fromSwitch';
            }
        } else {
            const known = macTable[toDev.mac];
            const targets = known ? [to] : [0,1,2,3].filter(i => i !== from);
            drawMACSimStatic(targets);
            targets.forEach(idx => {
                const x = sw.x + (devs[idx].x - sw.x) * Math.min(progress, 1);
                const y = sw.y + (devs[idx].y - sw.y) * Math.min(progress, 1);
                drawPacket(macSimCtx, x, y, known ? '#06b6d4' : '#f59e0b', known ? 'FRM' : 'FLD');
            });
            macSimCtx.font = '600 10px Heebo, sans-serif'; macSimCtx.textAlign = 'center';
            macSimCtx.fillStyle = known ? '#06b6d4' : '#f59e0b';
            macSimCtx.fillText(known ? '✅ FORWARD → ' + toDev.port : '📢 FLOOD', macSimW / 2, 20);
            if (progress >= 1) { macSimRunning = false; return; }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function resetMACTableSim() {
    macSimRunning = false;
    macTable = {};
    updateMACTableDisplay();
    const log = document.getElementById('mac-sim-log');
    if (log) log.innerHTML = '';
    initMACTableCanvas();
}

// ====== STP SIMULATOR ======
let stpSimRunning = false;
let stpBrokenLink = -1;
let stpCtx, stpW, stpH;

function initSTPCanvas() {
    const canvas = document.getElementById('stp-canvas');
    if (!canvas) return;
    stpCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 700);
    canvas.width = w * dpr; canvas.height = 380 * dpr;
    stpCtx.scale(dpr, dpr);
    canvas.style.width = w + 'px'; canvas.style.height = '380px';
    stpW = w; stpH = 380;
    stpBrokenLink = -1;
    drawSTPStatic('idle');
}

function getSTPPositions() {
    const W = stpW, H = stpH;
    return [
        { x: W * 0.5, y: H * 0.15, label: 'SW1', bid: 'BID: 100', color: '#f59e0b', isRoot: false },
        { x: W * 0.2, y: H * 0.5, label: 'SW2', bid: 'BID: 200', color: '#3b82f6', isRoot: false },
        { x: W * 0.8, y: H * 0.5, label: 'SW3', bid: 'BID: 300', color: '#22c55e', isRoot: false },
        { x: W * 0.35, y: H * 0.82, label: 'SW4', bid: 'BID: 400', color: '#ef4444', isRoot: false },
        { x: W * 0.65, y: H * 0.82, label: 'SW5', bid: 'BID: 500', color: '#8b5cf6', isRoot: false }
    ];
}

const stpLinks = [[0,1],[0,2],[1,2],[1,3],[2,4],[3,4]];

function drawSTPStatic(phase, portStates) {
    if (!stpCtx) return;
    const ctx = stpCtx, W = stpW, H = stpH;
    ctx.clearRect(0, 0, W, H);
    const sws = getSTPPositions();

    // Links
    stpLinks.forEach(([a, b], idx) => {
        if (stpBrokenLink === idx) {
            ctx.beginPath(); ctx.moveTo(sws[a].x, sws[a].y); ctx.lineTo(sws[b].x, sws[b].y);
            ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
            const mx = (sws[a].x + sws[b].x) / 2, my = (sws[a].y + sws[b].y) / 2;
            ctx.font = '16px serif'; ctx.textAlign = 'center'; ctx.fillText('✖', mx, my + 5);
            return;
        }
        let linkColor = 'rgba(100,116,139,0.3)';
        let lineW = 2;
        if (portStates) {
            const key = a + '-' + b;
            if (portStates[key] === 'blocked') { linkColor = '#ef444466'; lineW = 3; }
            else if (portStates[key] === 'forwarding') { linkColor = '#22c55e88'; lineW = 3; }
        }
        ctx.beginPath(); ctx.moveTo(sws[a].x, sws[a].y); ctx.lineTo(sws[b].x, sws[b].y);
        ctx.strokeStyle = linkColor; ctx.lineWidth = lineW; ctx.stroke();

        // Port state indicators
        if (portStates) {
            const key = a + '-' + b;
            const mx = (sws[a].x + sws[b].x) / 2, my = (sws[a].y + sws[b].y) / 2;
            if (portStates[key] === 'blocked') {
                ctx.beginPath(); ctx.arc(mx, my, 8, 0, Math.PI * 2);
                ctx.fillStyle = '#ef4444'; ctx.fill();
                ctx.font = '700 8px serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.fillText('🚫', mx, my + 3);
            }
        }
    });

    // Switches
    sws.forEach((sw, i) => {
        const isRoot = phase !== 'idle' && i === 0;
        ctx.beginPath(); ctx.arc(sw.x, sw.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = isRoot ? '#f59e0b22' : sw.color + '18';
        ctx.fill();
        ctx.strokeStyle = isRoot ? '#f59e0b' : sw.color;
        ctx.lineWidth = isRoot ? 3 : 2; ctx.stroke();

        if (isRoot) {
            ctx.beginPath(); ctx.arc(sw.x, sw.y, 36, 0, Math.PI * 2);
            ctx.strokeStyle = '#f59e0b44'; ctx.lineWidth = 1.5; ctx.stroke();
        }

        ctx.font = '22px serif'; ctx.textAlign = 'center'; ctx.fillText('🔀', sw.x, sw.y + 7);
        ctx.font = '700 11px Heebo, sans-serif'; ctx.fillStyle = isRoot ? '#f59e0b' : '#e2e8f0';
        ctx.fillText(sw.label + (isRoot ? ' 👑' : ''), sw.x, sw.y - 36);
        ctx.font = '500 8px IBM Plex Mono, monospace'; ctx.fillStyle = '#94a3b8';
        ctx.fillText(sw.bid, sw.x, sw.y + 44);
    });
}

function startSTPSim() {
    if (stpSimRunning) return;
    stpSimRunning = true;
    stpBrokenLink = -1;
    let frame = 0;
    const totalFrames = 350;
    const sws = getSTPPositions();
    let bpduPackets = [];

    function animate() {
        frame++;
        const ctx = stpCtx, W = stpW, H = stpH;

        if (frame <= 80) {
            // Phase 1: BPDU Exchange
            drawSTPStatic('electing');
            if (frame === 1) {
                stpLinks.forEach(([a, b]) => {
                    bpduPackets.push({ from: a, to: b, progress: 0 });
                    bpduPackets.push({ from: b, to: a, progress: 0 });
                });
            }
            bpduPackets.forEach(p => { p.progress += 0.02; });
            bpduPackets.forEach(p => {
                if (p.progress > 0 && p.progress < 1) {
                    const from = sws[p.from], to = sws[p.to];
                    const x = from.x + (to.x - from.x) * p.progress;
                    const y = from.y + (to.y - from.y) * p.progress;
                    drawPacket(ctx, x, y, '#8b5cf6', 'BPDU');
                }
            });
            ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#8b5cf6'; ctx.fillText('🔄 שלב 1: החלפת BPDU — מי יהיה Root Bridge?', W / 2, H - 12);

        } else if (frame <= 140) {
            // Phase 2: Root Bridge elected (SW1 — BID 100)
            drawSTPStatic('root-elected');
            ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#f59e0b'; ctx.fillText('👑 שלב 2: SW1 (BID: 100) נבחר כ-Root Bridge!', W / 2, H - 12);

        } else if (frame <= 220) {
            // Phase 3: Set port roles
            const portStates = {
                '0-1': 'forwarding', '0-2': 'forwarding',
                '1-2': 'blocked',
                '1-3': 'forwarding', '2-4': 'forwarding',
                '3-4': 'blocked'
            };
            drawSTPStatic('ports-set', portStates);
            // Draw RP/DP labels
            ctx.font = '700 8px IBM Plex Mono, monospace'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e';
            ctx.fillText('RP', sws[1].x + 20, sws[1].y - 20); // Root Port on SW2
            ctx.fillText('RP', sws[2].x - 20, sws[2].y - 20); // Root Port on SW3
            ctx.fillText('RP', sws[3].x - 5, sws[3].y - 20);
            ctx.fillText('RP', sws[4].x + 5, sws[4].y - 20);
            ctx.fillStyle = '#f59e0b';
            ctx.fillText('DP', sws[0].x - 26, sws[0].y + 10);
            ctx.fillText('DP', sws[0].x + 26, sws[0].y + 10);
            ctx.fillStyle = '#ef4444';
            const mx1 = (sws[1].x + sws[2].x) / 2, my1 = (sws[1].y + sws[2].y) / 2;
            ctx.fillText('BLK', mx1, my1 - 12);
            const mx2 = (sws[3].x + sws[4].x) / 2, my2 = (sws[3].y + sws[4].y) / 2;
            ctx.fillText('BLK', mx2, my2 - 12);

            ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e'; ctx.fillText('✅ שלב 3: נקבעו Root Ports, Designated ו-Blocked', W / 2, H - 12);

        } else {
            // Phase 4: Converged
            const portStates = {
                '0-1': 'forwarding', '0-2': 'forwarding',
                '1-2': 'blocked',
                '1-3': 'forwarding', '2-4': 'forwarding',
                '3-4': 'blocked'
            };
            drawSTPStatic('converged', portStates);
            ctx.font = '700 8px IBM Plex Mono, monospace'; ctx.textAlign = 'center';
            ctx.fillStyle = '#ef4444';
            const mx1 = (sws[1].x + sws[2].x) / 2, my1 = (sws[1].y + sws[2].y) / 2;
            ctx.fillText('BLK', mx1, my1 - 12);
            const mx2 = (sws[3].x + sws[4].x) / 2, my2 = (sws[3].y + sws[4].y) / 2;
            ctx.fillText('BLK', mx2, my2 - 12);

            ctx.font = '700 12px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e'; ctx.fillText('✅ STP Converged — אין לולאות! הרשת בטוחה.', W / 2, H - 12);

            if (frame > totalFrames) { stpSimRunning = false; return; }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function breakSTPLink() {
    if (stpSimRunning) return;
    stpBrokenLink = 0; // Break SW1-SW2 link
    stpSimRunning = true;
    let frame = 0;
    const sws = getSTPPositions();

    function animate() {
        frame++;
        const ctx = stpCtx, W = stpW;
        if (frame <= 60) {
            const portStates = { '0-2': 'forwarding', '1-2': 'blocked', '1-3': 'forwarding', '2-4': 'forwarding', '3-4': 'blocked' };
            drawSTPStatic('broken', portStates);
            ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#ef4444'; ctx.fillText('⚠️ קישור SW1↔SW2 נפל! STP מחשב מחדש...', W / 2, stpH - 12);
        } else if (frame <= 150) {
            // Reconverge — unblock SW2-SW3 link
            const portStates = { '0-2': 'forwarding', '1-2': 'forwarding', '1-3': 'forwarding', '2-4': 'forwarding', '3-4': 'blocked' };
            drawSTPStatic('reconverged', portStates);
            ctx.font = '700 8px IBM Plex Mono, monospace'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e';
            const mx = (sws[1].x + sws[2].x) / 2, my = (sws[1].y + sws[2].y) / 2;
            ctx.fillText('FWD!', mx, my - 12);
            ctx.fillStyle = '#ef4444';
            const mx2 = (sws[3].x + sws[4].x) / 2, my2 = (sws[3].y + sws[4].y) / 2;
            ctx.fillText('BLK', mx2, my2 - 12);

            ctx.font = '700 12px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#22c55e'; ctx.fillText('✅ STP פתח את הנתיב SW2↔SW3 — הרשת חזרה!', W / 2, stpH - 12);
            if (frame > 200) { stpSimRunning = false; return; }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function resetSTPSim() {
    stpSimRunning = false; stpBrokenLink = -1; initSTPCanvas();
}

// ====== VLAN CORPORATE CANVAS ======
function initVLANCorporateCanvas() {
    const canvas = document.getElementById('vlan-corporate-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 700);
    canvas.width = w * dpr; canvas.height = 320 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = w + 'px'; canvas.style.height = '320px';
    drawVLANCorporate(ctx, w, 320);
}

function drawVLANCorporate(ctx, W, H) {
    ctx.clearRect(0, 0, W, H);
    const sw = { x: W / 2, y: H / 2 };
    const vlans = [
        { id: 'VLAN 10', name: 'הנהלה', color: '#3b82f6', devices: [{ x: W * 0.08, y: H * 0.2 }, { x: W * 0.08, y: H * 0.5 }] },
        { id: 'VLAN 20', name: 'IT', color: '#22c55e', devices: [{ x: W * 0.92, y: H * 0.2 }, { x: W * 0.92, y: H * 0.5 }] },
        { id: 'VLAN 30', name: 'כספים', color: '#f59e0b', devices: [{ x: W * 0.25, y: H * 0.88 }] },
        { id: 'VLAN 40', name: 'אורחים', color: '#ef4444', devices: [{ x: W * 0.75, y: H * 0.88 }] }
    ];

    // VLAN zones
    vlans.forEach(vlan => {
        vlan.devices.forEach(d => {
            ctx.beginPath(); ctx.moveTo(sw.x, sw.y); ctx.lineTo(d.x, d.y);
            ctx.strokeStyle = vlan.color + '44'; ctx.lineWidth = 2; ctx.stroke();
        });
    });

    // Switch
    ctx.beginPath(); ctx.arc(sw.x, sw.y, 32, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d418'; ctx.fill(); ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.font = '26px serif'; ctx.textAlign = 'center'; ctx.fillText('🔀', sw.x, sw.y + 8);
    ctx.font = '700 10px Heebo, sans-serif'; ctx.fillStyle = '#e2e8f0'; ctx.fillText('Switch', sw.x, sw.y - 38);

    // Devices
    vlans.forEach(vlan => {
        vlan.devices.forEach(d => {
            ctx.font = '18px serif'; ctx.textAlign = 'center'; ctx.fillText('💻', d.x, d.y + 5);
            ctx.font = '600 8px IBM Plex Mono, monospace'; ctx.fillStyle = vlan.color;
            ctx.fillText(vlan.id, d.x, d.y + 24);
            ctx.font = '500 8px Heebo, sans-serif'; ctx.fillStyle = '#94a3b8';
            ctx.fillText(vlan.name, d.x, d.y - 18);
        });
    });

    // Border regions
    vlans.forEach(vlan => {
        if (vlan.devices.length > 1) {
            const minX = Math.min(...vlan.devices.map(d => d.x)) - 25;
            const minY = Math.min(...vlan.devices.map(d => d.y)) - 30;
            const maxX = Math.max(...vlan.devices.map(d => d.x)) + 25;
            const maxY = Math.max(...vlan.devices.map(d => d.y)) + 35;
            ctx.beginPath(); ctx.roundRect(minX, minY, maxX - minX, maxY - minY, 8);
            ctx.strokeStyle = vlan.color + '33'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
            ctx.font = '600 9px Heebo, sans-serif'; ctx.fillStyle = vlan.color; ctx.textAlign = 'center';
            ctx.fillText(vlan.id + ' — ' + vlan.name, (minX + maxX) / 2, minY - 6);
        }
    });
}

// ====== VLAN SIMULATOR ======
let vlanSimRunning = false;
let vlanSimCtx, vlanSimW, vlanSimH;

function initVLANSimCanvas() {
    const canvas = document.getElementById('vlan-sim-canvas');
    if (!canvas) return;
    vlanSimCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 650);
    canvas.width = w * dpr; canvas.height = 320 * dpr;
    vlanSimCtx.scale(dpr, dpr);
    canvas.style.width = w + 'px'; canvas.style.height = '320px';
    vlanSimW = w; vlanSimH = 320;
    drawVLANSimStatic();
}

function getVLANSimPositions() {
    const W = vlanSimW, H = vlanSimH;
    return {
        sw: { x: W / 2, y: H / 2 },
        devs: [
            { x: W * 0.1, y: H * 0.25, label: 'PC A', vlan: 10, color: '#3b82f6' },
            { x: W * 0.1, y: H * 0.75, label: 'PC B', vlan: 10, color: '#3b82f6' },
            { x: W * 0.9, y: H * 0.25, label: 'PC C', vlan: 20, color: '#22c55e' },
            { x: W * 0.9, y: H * 0.75, label: 'PC D', vlan: 20, color: '#22c55e' }
        ]
    };
}

function drawVLANSimStatic(status) {
    if (!vlanSimCtx) return;
    const ctx = vlanSimCtx, W = vlanSimW, H = vlanSimH;
    ctx.clearRect(0, 0, W, H);
    const { sw, devs } = getVLANSimPositions();

    devs.forEach(d => {
        ctx.beginPath(); ctx.moveTo(sw.x, sw.y); ctx.lineTo(d.x, d.y);
        ctx.strokeStyle = d.color + '33'; ctx.lineWidth = 2; ctx.stroke();
    });

    ctx.beginPath(); ctx.arc(sw.x, sw.y, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d418'; ctx.fill(); ctx.strokeStyle = '#06b6d4'; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.font = '24px serif'; ctx.textAlign = 'center'; ctx.fillText('🔀', sw.x, sw.y + 7);
    ctx.font = '700 10px Heebo, sans-serif'; ctx.fillStyle = '#e2e8f0'; ctx.fillText('Switch', sw.x, sw.y - 36);

    // VLAN zones
    ctx.beginPath(); ctx.roundRect(devs[0].x - 28, devs[0].y - 35, 56, devs[1].y - devs[0].y + 70, 8);
    ctx.strokeStyle = '#3b82f633'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = '600 9px IBM Plex Mono, monospace'; ctx.fillStyle = '#3b82f6'; ctx.textAlign = 'center';
    ctx.fillText('VLAN 10', devs[0].x, devs[0].y - 42);

    ctx.beginPath(); ctx.roundRect(devs[2].x - 28, devs[2].y - 35, 56, devs[3].y - devs[2].y + 70, 8);
    ctx.strokeStyle = '#22c55e33'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('VLAN 20', devs[2].x, devs[2].y - 42);

    devs.forEach(d => {
        ctx.font = '18px serif'; ctx.textAlign = 'center'; ctx.fillText('💻', d.x, d.y + 5);
        ctx.font = '600 9px Heebo, sans-serif'; ctx.fillStyle = d.color; ctx.fillText(d.label, d.x, d.y - 18);
        ctx.font = '500 8px IBM Plex Mono, monospace'; ctx.fillStyle = '#94a3b8'; ctx.fillText('VLAN ' + d.vlan, d.x, d.y + 24);
    });
}

function startVLANSim(mode) {
    if (vlanSimRunning) return;
    vlanSimRunning = true;
    const { sw, devs } = getVLANSimPositions();
    let frame = 0;
    const isSame = mode === 'same';
    const fromIdx = 0; // PC A (VLAN 10)
    const toIdx = isSame ? 1 : 2; // PC B (VLAN 10) or PC C (VLAN 20)
    const from = devs[fromIdx], to = devs[toIdx];

    function animate() {
        frame++;
        drawVLANSimStatic();
        const ctx = vlanSimCtx, W = vlanSimW, H = vlanSimH;

        if (frame <= 50) {
            // Frame to switch
            const p = frame / 50;
            const x = from.x + (sw.x - from.x) * p;
            const y = from.y + (sw.y - from.y) * p;
            drawPacket(ctx, x, y, from.color, 'FRM');
            ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
            ctx.fillStyle = '#f59e0b'; ctx.fillText('📦 PC A שולח Frame ל-Switch', W / 2, 18);
        } else if (frame <= 120) {
            if (isSame) {
                const p = (frame - 50) / 50;
                const x = sw.x + (to.x - sw.x) * Math.min(p, 1);
                const y = sw.y + (to.y - sw.y) * Math.min(p, 1);
                drawPacket(ctx, x, y, '#06b6d4', 'FRM');
                ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
                ctx.fillStyle = '#22c55e'; ctx.fillText('✅ אותו VLAN → Switch מעביר ל-PC B!', W / 2, 18);
            } else {
                // Draw X
                ctx.save();
                ctx.font = '40px serif'; ctx.textAlign = 'center'; ctx.fillText('🚫', sw.x, sw.y + 50);
                ctx.restore();
                ctx.font = '600 11px Heebo, sans-serif'; ctx.textAlign = 'center';
                ctx.fillStyle = '#ef4444'; ctx.fillText('❌ VLAN שונה! Switch חוסם — צריך Router!', W / 2, 18);
            }
            if (frame > 140) { vlanSimRunning = false; return; }
        } else {
            vlanSimRunning = false; return;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function resetVLANSim() {
    vlanSimRunning = false;
    initVLANSimCanvas();
}

// ====== HEADER CANVASES ======
function initHeaderCanvas(canvasId, baseColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
    const W = rect.width, H = rect.height;
    const dots = [];
    for (let i = 0; i < 40; i++) dots.push({ x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2, speed: 0.2 + Math.random() * 0.3, angle: Math.random() * Math.PI * 2 });
    function draw() {
        ctx.clearRect(0, 0, W, H);
        dots.forEach(d => {
            d.x += Math.cos(d.angle) * d.speed; d.y += Math.sin(d.angle) * d.speed;
            if (d.x < 0 || d.x > W) d.angle = Math.PI - d.angle;
            if (d.y < 0 || d.y > H) d.angle = -d.angle;
            ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            const [r, g, b] = baseColor; ctx.fillStyle = `rgba(${r},${g},${b},0.15)`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// ====== INIT ALL ======
function initLayer2Animations() {
    initHeroCanvas();
    initFrameJourneyCanvas();
    initARPCanvas();
    initMACTableCanvas();
    initSTPCanvas();
    initVLANCorporateCanvas();
    initVLANSimCanvas();
    initHeaderCanvas('ethernet-header-canvas', [6, 182, 212]);
    initHeaderCanvas('switching-header-canvas', [34, 197, 94]);
    initHeaderCanvas('stp-header-canvas', [139, 92, 246]);
    initHeaderCanvas('vlan-header-canvas', [245, 158, 11]);
}

// Global
window.initLayer2Animations = initLayer2Animations;
window.startFrameJourney = startFrameJourney;
window.startARPAnimation = startARPAnimation;
window.startMACTableSim = startMACTableSim;
window.sendSingleFrame = sendSingleFrame;
window.resetMACTableSim = resetMACTableSim;
window.startSTPSim = startSTPSim;
window.breakSTPLink = breakSTPLink;
window.resetSTPSim = resetSTPSim;
window.startVLANSim = startVLANSim;
window.resetVLANSim = resetVLANSim;
window.initMACTableCanvas = initMACTableCanvas;
window.initSTPCanvas = initSTPCanvas;
window.initVLANSimCanvas = initVLANSimCanvas;
window.initVLANCorporateCanvas = initVLANCorporateCanvas;
window.initFrameJourneyCanvas = initFrameJourneyCanvas;
window.initARPCanvas = initARPCanvas;
