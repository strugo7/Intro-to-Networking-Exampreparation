/* ===========================
   Layer 3 Animations — Canvas-based
   Network Layer Interactive Lesson
   =========================== */

// ====== HERO CANVAS — Network Particles ======
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

    // Nodes (routers)
    const nodes = [];
    const nodeCount = 30;
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * 1200,
            y: Math.random() * 800,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: 3 + Math.random() * 4,
            pulse: Math.random() * Math.PI * 2
        });
    }

    // Packets
    const packets = [];
    function spawnPacket() {
        if (packets.length > 15) return;
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes[Math.floor(Math.random() * nodes.length)];
        if (a === b) return;
        packets.push({
            fromX: a.x, fromY: a.y,
            toX: b.x, toY: b.y,
            progress: 0,
            speed: 0.005 + Math.random() * 0.01,
            color: ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b'][Math.floor(Math.random() * 4)]
        });
    }

    let frame = 0;
    function draw() {
        const W = w(), H = h();
        ctx.clearRect(0, 0, W, H);

        frame++;
        if (frame % 30 === 0) spawnPacket();

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const alpha = 1 - dist / 180;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(59,130,246,${alpha * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw & move nodes
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
            n.pulse += 0.03;

            const pr = n.r + Math.sin(n.pulse) * 2;
            ctx.beginPath();
            ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59,130,246,0.6)';
            ctx.fill();

            // glow
            ctx.beginPath();
            ctx.arc(n.x, n.y, pr + 6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(59,130,246,0.08)';
            ctx.fill();
        });

        // Draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += p.speed;
            if (p.progress >= 1) { packets.splice(i, 1); continue; }
            const x = p.fromX + (p.toX - p.fromX) * p.progress;
            const y = p.fromY + (p.toY - p.fromY) * p.progress;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // trail
            const trailLen = 5;
            for (let t = 1; t <= trailLen; t++) {
                const tp = p.progress - t * 0.015;
                if (tp < 0) break;
                const tx = p.fromX + (p.toX - p.fromX) * tp;
                const ty = p.fromY + (p.toY - p.fromY) * tp;
                ctx.beginPath();
                ctx.arc(tx, ty, 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace(')', `,${0.3 - t * 0.05})`).replace('rgb', 'rgba');
                ctx.fill();
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
}

// ====== PACKET JOURNEY ANIMATION ======
let packetJourneyRunning = false;
let pjCtx, pjW, pjH;

function initPacketJourneyCanvas() {
    const canvas = document.getElementById('packet-journey-canvas');
    if (!canvas) return;
    pjCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 300 * dpr;
    pjCtx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '300px';
    pjW = rect.width;
    pjH = 300;
    drawPacketJourneyStatic();
}

const pjRouters = [];
const pjLabels = ['מקור', 'Router A', 'Router B', 'Router C', 'יעד'];

function drawPacketJourneyStatic() {
    if (!pjCtx) return;
    pjRouters.length = 0;
    const spacing = pjW / (pjLabels.length + 1);
    for (let i = 0; i < pjLabels.length; i++) {
        pjRouters.push({ x: spacing * (i + 1), y: pjH / 2 });
    }
    pjCtx.clearRect(0, 0, pjW, pjH);

    // connections
    for (let i = 0; i < pjRouters.length - 1; i++) {
        pjCtx.beginPath();
        pjCtx.moveTo(pjRouters[i].x, pjRouters[i].y);
        pjCtx.lineTo(pjRouters[i + 1].x, pjRouters[i + 1].y);
        pjCtx.strokeStyle = 'rgba(59,130,246,0.3)';
        pjCtx.lineWidth = 2;
        pjCtx.setLineDash([6, 4]);
        pjCtx.stroke();
        pjCtx.setLineDash([]);
    }

    // nodes
    pjRouters.forEach((r, i) => {
        const isEndpoint = i === 0 || i === pjRouters.length - 1;
        const color = isEndpoint ? '#22c55e' : '#3b82f6';
        const icon = isEndpoint ? '💻' : '🔀';

        pjCtx.beginPath();
        pjCtx.arc(r.x, r.y, 24, 0, Math.PI * 2);
        pjCtx.fillStyle = `${color}22`;
        pjCtx.fill();
        pjCtx.strokeStyle = color;
        pjCtx.lineWidth = 2;
        pjCtx.stroke();

        pjCtx.font = '20px serif';
        pjCtx.textAlign = 'center';
        pjCtx.fillText(icon, r.x, r.y + 7);

        pjCtx.font = '600 13px Heebo, sans-serif';
        pjCtx.fillStyle = '#94a3b8';
        pjCtx.fillText(pjLabels[i], r.x, r.y + 50);
    });
}

function startPacketJourney() {
    if (packetJourneyRunning) return;
    packetJourneyRunning = true;
    const btn = document.getElementById('send-packet-btn');
    if (btn) btn.disabled = true;

    let currentHop = 0;
    let progress = 0;

    function animate() {
        if (currentHop >= pjRouters.length - 1) {
            packetJourneyRunning = false;
            if (btn) btn.disabled = false;
            return;
        }
        drawPacketJourneyStatic();
        progress += 0.02;

        const from = pjRouters[currentHop];
        const to = pjRouters[currentHop + 1];
        const x = from.x + (to.x - from.x) * progress;
        const y = from.y + (to.y - from.y) * progress;

        // packet
        pjCtx.save();
        pjCtx.shadowColor = '#f59e0b';
        pjCtx.shadowBlur = 15;
        pjCtx.beginPath();
        pjCtx.roundRect(x - 18, y - 12, 36, 24, 6);
        pjCtx.fillStyle = '#f59e0b';
        pjCtx.fill();
        pjCtx.restore();

        pjCtx.font = '700 10px IBM Plex Mono, monospace';
        pjCtx.textAlign = 'center';
        pjCtx.fillStyle = '#000';
        pjCtx.fillText('PKT', x, y + 4);

        // Hop indicator
        pjCtx.font = '600 12px Heebo, sans-serif';
        pjCtx.fillStyle = '#f59e0b';
        pjCtx.fillText(`Hop ${currentHop + 1}`, x, y - 24);

        // highlight visited
        for (let i = 0; i <= currentHop; i++) {
            pjCtx.beginPath();
            pjCtx.arc(pjRouters[i].x, pjRouters[i].y, 28, 0, Math.PI * 2);
            pjCtx.strokeStyle = 'rgba(245,158,11,0.5)';
            pjCtx.lineWidth = 2;
            pjCtx.stroke();
        }

        if (progress >= 1) {
            progress = 0;
            currentHop++;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ====== IPv4 STRUCTURE CANVAS ======
function initIPv4StructureCanvas() {
    const canvas = document.getElementById('ipv4-structure-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '200px';

    const W = rect.width;
    const H = 200;
    const octets = [192, 168, 1, 100];
    const binaries = octets.map(o => o.toString(2).padStart(8, '0'));
    let hoverOctet = -1;

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const totalW = W - 80;
        const octetW = totalW / 4;
        const startX = 40;
        const y = H / 2;

        // 32 bits label
        ctx.font = '600 14px IBM Plex Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('32 bits', W / 2, 25);

        // Draw bracket
        ctx.beginPath();
        ctx.moveTo(startX, 35);
        ctx.lineTo(startX, 40);
        ctx.lineTo(startX + totalW, 40);
        ctx.lineTo(startX + totalW, 35);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < 4; i++) {
            const ox = startX + i * octetW;
            const isHovered = hoverOctet === i;
            const isNetwork = i < 3;

            // octet box
            ctx.beginPath();
            ctx.roundRect(ox + 4, y - 30, octetW - 8, 60, 8);
            ctx.fillStyle = isHovered
                ? (isNetwork ? 'rgba(59,130,246,0.25)' : 'rgba(34,197,94,0.25)')
                : (isNetwork ? 'rgba(59,130,246,0.1)' : 'rgba(34,197,94,0.1)');
            ctx.fill();
            ctx.strokeStyle = isHovered
                ? (isNetwork ? '#3b82f6' : '#22c55e')
                : 'rgba(255,255,255,0.1)';
            ctx.lineWidth = isHovered ? 2 : 1;
            ctx.stroke();

            // decimal value
            ctx.font = `${isHovered ? '800' : '700'} ${isHovered ? '24' : '20'}px IBM Plex Mono, monospace`;
            ctx.textAlign = 'center';
            ctx.fillStyle = isNetwork ? '#3b82f6' : '#22c55e';
            ctx.fillText(octets[i], ox + octetW / 2, y + 7);

            // 8 bits label
            ctx.font = '500 10px IBM Plex Mono, monospace';
            ctx.fillStyle = '#64748b';
            ctx.fillText('8 bits', ox + octetW / 2, y - 38);

            // binary
            if (isHovered) {
                ctx.font = '600 13px IBM Plex Mono, monospace';
                ctx.fillStyle = '#f59e0b';
                ctx.fillText(binaries[i], ox + octetW / 2, y + 50);
            }

            // dot separator
            if (i < 3) {
                ctx.font = '700 18px IBM Plex Mono, monospace';
                ctx.fillStyle = '#475569';
                ctx.fillText('.', ox + octetW, y + 4);
            }
        }

        // Legend
        ctx.font = '600 12px Heebo, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('● Network', W - 20, H - 20);
        ctx.fillStyle = '#22c55e';
        ctx.fillText('● Host', W - 120, H - 20);
    }

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const totalW = W - 80;
        const octetW = totalW / 4;
        const startX = 40;
        hoverOctet = -1;
        for (let i = 0; i < 4; i++) {
            if (mx >= startX + i * octetW && mx < startX + (i + 1) * octetW) {
                hoverOctet = i;
            }
        }
        draw();
    });

    canvas.addEventListener('mouseleave', () => {
        hoverOctet = -1;
        draw();
    });

    draw();
}

// ====== LPM (Longest Prefix Match) Canvas ======
function initLPMCanvas() {
    const canvas = document.getElementById('lpm-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '280px';

    const W = rect.width;
    const H = 280;
    let animPhase = 0;
    let frame = 0;

    const routes = [
        { net: '10.0.0.0/8', mask: 8, color: '#ef4444', w: 0.8 },
        { net: '10.20.0.0/16', mask: 16, color: '#f59e0b', w: 0.5 },
        { net: '10.20.30.0/24', mask: 24, color: '#22c55e', w: 0.2 }
    ];

    function draw() {
        ctx.clearRect(0, 0, W, H);
        frame++;

        const barX = 80;
        const barW = W - 160;
        const dest = '10.20.30.40';

        // Title
        ctx.font = '600 14px IBM Plex Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`Destination: ${dest}`, W / 2, 30);

        // Draw bars
        routes.forEach((r, i) => {
            const y = 60 + i * 70;
            const routeW = barW * r.w;
            const show = animPhase > i;
            const isBest = animPhase > 2 && i === 2;

            // Label
            ctx.font = '600 12px IBM Plex Mono, monospace';
            ctx.textAlign = 'right';
            ctx.fillStyle = show ? r.color : '#475569';
            ctx.fillText(r.net, barX - 10, y + 22);

            // Bar background
            ctx.beginPath();
            ctx.roundRect(barX, y, barW, 36, 6);
            ctx.fillStyle = 'rgba(255,255,255,0.03)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Matched portion
            if (show) {
                ctx.beginPath();
                ctx.roundRect(barX, y, routeW, 36, 6);
                ctx.fillStyle = r.color + '33';
                ctx.fill();
                ctx.strokeStyle = r.color;
                ctx.lineWidth = isBest ? 3 : 1;
                ctx.stroke();

                // Match label
                ctx.font = '700 11px IBM Plex Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = r.color;
                ctx.fillText(`/${r.mask} match`, barX + routeW / 2, y + 22);
            }

            // Best match indicator
            if (isBest) {
                const glow = Math.sin(frame * 0.05) * 0.3 + 0.7;
                ctx.save();
                ctx.shadowColor = r.color;
                ctx.shadowBlur = 12 * glow;
                ctx.beginPath();
                ctx.roundRect(barX, y, routeW, 36, 6);
                ctx.strokeStyle = r.color;
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.restore();

                ctx.font = '700 13px Heebo, sans-serif';
                ctx.textAlign = 'left';
                ctx.fillStyle = '#22c55e';
                ctx.fillText('✓ Best Match!', barX + routeW + 16, y + 24);
            }
        });

        if (animPhase <= 3) {
            if (frame % 60 === 0) animPhase++;
        }

        requestAnimationFrame(draw);
    }

    // Reset on click
    canvas.addEventListener('click', () => {
        animPhase = 0;
        frame = 0;
    });

    draw();
}

// ====== RIP ANIMATION ======
let ripAnimRunning = false;
function animateRIP() {
    if (ripAnimRunning) return;
    ripAnimRunning = true;
    const canvas = document.getElementById('rip-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 450, H = 280;
    canvas.width = W * 2; canvas.height = H * 2;
    ctx.scale(2, 2);

    const routers = [
        { x: 80, y: 80, label: 'R1', table: [{ dst: 'A', hops: 0 }] },
        { x: 225, y: 50, label: 'R2', table: [{ dst: 'B', hops: 0 }] },
        { x: 370, y: 80, label: 'R3', table: [{ dst: 'C', hops: 0 }] },
        { x: 150, y: 200, label: 'R4', table: [{ dst: 'D', hops: 0 }] },
        { x: 300, y: 200, label: 'R5', table: [{ dst: 'E', hops: 0 }] }
    ];

    const links = [[0,1],[1,2],[0,3],[3,4],[4,2],[1,4]];
    let updates = [];
    let round = 0;
    let frame = 0;

    function spawnUpdate() {
        links.forEach(([a, b]) => {
            updates.push({
                from: a, to: b, progress: 0,
                color: '#f59e0b'
            });
            updates.push({
                from: b, to: a, progress: 0,
                color: '#f59e0b'
            });
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        frame++;

        // Links
        links.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(routers[a].x, routers[a].y);
            ctx.lineTo(routers[b].x, routers[b].y);
            ctx.strokeStyle = 'rgba(245,158,11,0.2)';
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // Routers
        routers.forEach(r => {
            ctx.beginPath();
            ctx.arc(r.x, r.y, 22, 0, Math.PI * 2);
            ctx.fillStyle = '#1a2332';
            ctx.fill();
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = '700 13px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#f59e0b';
            ctx.fillText(r.label, r.x, r.y + 5);
        });

        // Updates
        for (let i = updates.length - 1; i >= 0; i--) {
            const u = updates[i];
            u.progress += 0.02;
            if (u.progress >= 1) { updates.splice(i, 1); continue; }

            const from = routers[u.from];
            const to = routers[u.to];
            const x = from.x + (to.x - from.x) * u.progress;
            const y = from.y + (to.y - from.y) * u.progress;

            ctx.save();
            ctx.shadowColor = u.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = u.color;
            ctx.fill();
            ctx.restore();
        }

        // Info
        ctx.font = '500 11px Heebo, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`עדכון ${round + 1} — RIP שולח טבלאות כל 30 שניות`, W / 2, H - 10);
        ctx.fillText(`Metric: Hop Count | Max: 15 hops`, W / 2, H - 28);

        if (updates.length === 0 && round < 3) {
            round++;
            setTimeout(spawnUpdate, 500);
        }

        if (round < 4) {
            requestAnimationFrame(draw);
        } else {
            ripAnimRunning = false;
        }
    }

    spawnUpdate();
    draw();
}

// ====== OSPF ANIMATION ======
let ospfAnimRunning = false;
function animateOSPF() {
    if (ospfAnimRunning) return;
    ospfAnimRunning = true;
    const canvas = document.getElementById('ospf-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 450, H = 320;
    canvas.width = W * 2; canvas.height = H * 2;
    ctx.scale(2, 2);

    const routers = [
        { x: 100, y: 100, label: 'R1', area: 0 },
        { x: 225, y: 60, label: 'R2', area: 0 },
        { x: 350, y: 100, label: 'R3', area: 0 },
        { x: 100, y: 220, label: 'R4', area: 1 },
        { x: 225, y: 260, label: 'R5', area: 1 },
        { x: 350, y: 220, label: 'R6', area: 2 }
    ];

    const links = [
        [0,1,10], [1,2,5], [0,3,20], [3,4,15], [2,5,8], [1,4,12]
    ];

    let phase = 0; // 0: show areas, 1: LSA flood, 2: Dijkstra path
    let frame = 0;
    let lsaPackets = [];
    let pathHighlight = [];
    let dijkstraStep = 0;

    const areaColors = ['rgba(59,130,246,0.1)', 'rgba(245,158,11,0.1)', 'rgba(139,92,246,0.1)'];
    const areaBorders = ['#3b82f6', '#f59e0b', '#8b5cf6'];

    function draw() {
        ctx.clearRect(0, 0, W, H);
        frame++;

        // Area backgrounds
        if (phase >= 0) {
            // Area 0 (backbone)
            ctx.beginPath();
            ctx.roundRect(60, 30, 330, 110, 12);
            ctx.fillStyle = areaColors[0];
            ctx.fill();
            ctx.strokeStyle = areaBorders[0];
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = '600 10px IBM Plex Mono, monospace';
            ctx.textAlign = 'left';
            ctx.fillStyle = areaBorders[0];
            ctx.fillText('Area 0 (Backbone)', 70, 50);

            // Area 1
            ctx.beginPath();
            ctx.roundRect(60, 180, 220, 110, 12);
            ctx.fillStyle = areaColors[1];
            ctx.fill();
            ctx.strokeStyle = areaBorders[1];
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = areaBorders[1];
            ctx.fillText('Area 1', 70, 200);

            // Area 2
            ctx.beginPath();
            ctx.roundRect(310, 180, 100, 80, 12);
            ctx.fillStyle = areaColors[2];
            ctx.fill();
            ctx.strokeStyle = areaBorders[2];
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = areaBorders[2];
            ctx.fillText('Area 2', 320, 200);
        }

        // Links
        links.forEach(([a, b, cost]) => {
            const isPath = pathHighlight.some(([pa, pb]) => (pa === a && pb === b) || (pa === b && pb === a));
            ctx.beginPath();
            ctx.moveTo(routers[a].x, routers[a].y);
            ctx.lineTo(routers[b].x, routers[b].y);
            ctx.strokeStyle = isPath ? '#22c55e' : 'rgba(34,197,94,0.2)';
            ctx.lineWidth = isPath ? 3 : 1.5;
            ctx.stroke();

            // Cost label
            const mx = (routers[a].x + routers[b].x) / 2;
            const my = (routers[a].y + routers[b].y) / 2;
            ctx.font = '700 10px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = isPath ? '#22c55e' : '#475569';
            ctx.fillText(`Cost:${cost}`, mx, my - 8);
        });

        // Routers
        routers.forEach((r, i) => {
            const isPath = phase >= 2 && (pathHighlight.flat().includes(i));
            ctx.beginPath();
            ctx.arc(r.x, r.y, 22, 0, Math.PI * 2);
            ctx.fillStyle = isPath ? '#22c55e22' : '#1a2332';
            ctx.fill();
            ctx.strokeStyle = isPath ? '#22c55e' : areaBorders[r.area];
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = '700 13px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = isPath ? '#22c55e' : areaBorders[r.area];
            ctx.fillText(r.label, r.x, r.y + 5);
        });

        // LSA Packets
        for (let i = lsaPackets.length - 1; i >= 0; i--) {
            const p = lsaPackets[i];
            p.progress += 0.025;
            if (p.progress >= 1) { lsaPackets.splice(i, 1); continue; }
            const from = routers[p.from];
            const to = routers[p.to];
            const x = from.x + (to.x - from.x) * p.progress;
            const y = from.y + (to.y - from.y) * p.progress;

            ctx.save();
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#22c55e';
            ctx.fill();
            ctx.restore();
        }

        // Phase transitions
        if (phase === 0 && frame === 60) {
            phase = 1;
            links.forEach(([a, b]) => {
                lsaPackets.push({ from: a, to: b, progress: 0 });
                lsaPackets.push({ from: b, to: a, progress: 0 });
            });
        }
        if (phase === 1 && lsaPackets.length === 0 && frame > 120) {
            phase = 2;
            // Dijkstra: shortest path R1 to R6
            pathHighlight = [[0, 1], [1, 2], [2, 5]]; // Cost: 10+5+8 = 23
        }

        // Info
        const messages = [
            '1. OSPF מגדיר Areas — Area 0 הוא ה-Backbone',
            '2. כל נתב שולח LSA (Link-State Advertisements)',
            '3. Dijkstra מחשב הנתיב הקצר ביותר: R1→R2→R3→R6 (Cost: 23)'
        ];
        ctx.font = '500 11px Heebo, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(messages[Math.min(phase, 2)], W / 2, H - 10);

        if (frame < 300) {
            requestAnimationFrame(draw);
        } else {
            ospfAnimRunning = false;
        }
    }
    draw();
}

// ====== BGP ANIMATION ======
let bgpAnimRunning = false;
function animateBGP() {
    if (bgpAnimRunning) return;
    bgpAnimRunning = true;
    const canvas = document.getElementById('bgp-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 450, H = 300;
    canvas.width = W * 2; canvas.height = H * 2;
    ctx.scale(2, 2);

    const ases = [
        { x: 100, y: 80, label: 'AS 100', sub: 'ISP ישראל', color: '#3b82f6', r: 45 },
        { x: 350, y: 80, label: 'AS 200', sub: 'ISP אירופה', color: '#8b5cf6', r: 45 },
        { x: 100, y: 220, label: 'AS 300', sub: 'Google', color: '#22c55e', r: 45 },
        { x: 350, y: 220, label: 'AS 400', sub: 'Amazon', color: '#f59e0b', r: 45 },
        { x: 225, y: 150, label: 'AS 500', sub: 'Transit', color: '#ef4444', r: 40 }
    ];

    const peerings = [[0,1],[0,2],[0,4],[1,3],[1,4],[2,4],[3,4],[2,3]];
    let packets = [];
    let frame = 0;
    let pathAnnouncements = [];

    function draw() {
        ctx.clearRect(0, 0, W, H);
        frame++;

        // Peering links
        peerings.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(ases[a].x, ases[a].y);
            ctx.lineTo(ases[b].x, ases[b].y);
            ctx.strokeStyle = 'rgba(139,92,246,0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // AS clouds
        ases.forEach((as) => {
            // Cloud
            ctx.beginPath();
            ctx.arc(as.x, as.y, as.r, 0, Math.PI * 2);
            ctx.fillStyle = as.color + '15';
            ctx.fill();
            ctx.strokeStyle = as.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = '700 12px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = as.color;
            ctx.fillText(as.label, as.x, as.y - 4);

            ctx.font = '400 9px Heebo, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText(as.sub, as.x, as.y + 12);
        });

        // Spawn route announcements
        if (frame % 40 === 0 && packets.length < 10) {
            const [a, b] = peerings[Math.floor(Math.random() * peerings.length)];
            packets.push({
                from: a, to: b, progress: 0,
                color: ases[a].color
            });
        }

        // Packets
        for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += 0.02;
            if (p.progress >= 1) { packets.splice(i, 1); continue; }

            const from = ases[p.from];
            const to = ases[p.to];
            const x = from.x + (to.x - from.x) * p.progress;
            const y = from.y + (to.y - from.y) * p.progress;

            ctx.save();
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.roundRect(x - 12, y - 7, 24, 14, 4);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();

            ctx.font = '700 7px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.fillText('BGP', x, y + 3);
        }

        // Info
        ctx.font = '500 11px Heebo, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('BGP — החלפת נתיבים בין Autonomous Systems', W / 2, H - 10);

        if (frame < 400) {
            requestAnimationFrame(draw);
        } else {
            bgpAnimRunning = false;
        }
    }
    draw();
}

// ====== DIRECT ROUTING SIMULATOR ======
let directSimRunning = false;
let directSimCtx, directSimW, directSimH;
let directSimPackets = [];
let directSimPhase = 'idle'; // idle, sending, done

function initDirectRoutingCanvas() {
    const canvas = document.getElementById('direct-routing-canvas');
    if (!canvas) return;
    directSimCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 600);
    canvas.width = w * dpr;
    canvas.height = 280 * dpr;
    directSimCtx.scale(dpr, dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = '280px';
    directSimW = w;
    directSimH = 280;
    drawDirectRoutingStatic();
}

function drawDirectRoutingStatic() {
    if (!directSimCtx) return;
    const ctx = directSimCtx, W = directSimW, H = directSimH;
    ctx.clearRect(0, 0, W, H);

    const leftX = W * 0.15, rightX = W * 0.85, cy = H * 0.45;
    const pcLeftX = W * 0.04, pcRightX = W * 0.96;

    // Cable between routers
    ctx.beginPath();
    ctx.moveTo(leftX + 38, cy);
    ctx.lineTo(rightX - 38, cy);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Cable from PCs to routers
    ctx.beginPath();
    ctx.moveTo(pcLeftX + 20, cy);
    ctx.lineTo(leftX - 38, cy);
    ctx.strokeStyle = 'rgba(100,116,139,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rightX + 38, cy);
    ctx.lineTo(pcRightX - 20, cy);
    ctx.strokeStyle = 'rgba(100,116,139,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // PCs
    drawPC(ctx, pcLeftX, cy, 'PC A', '192.168.1.10');
    drawPC(ctx, pcRightX, cy, 'PC B', '10.0.0.10');

    // Routers
    drawRouter(ctx, leftX, cy, 'Router 1', '#3b82f6');
    drawRouter(ctx, rightX, cy, 'Router 2', '#3b82f6');

    // Interface labels
    ctx.font = '600 10px IBM Plex Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#22c55e';
    ctx.fillText('eth0: 192.168.1.1', leftX, cy + 52);
    ctx.fillText('eth1: 10.0.0.1', leftX, cy + 66);

    ctx.fillText('eth0: 10.0.0.2', rightX, cy + 52);
    ctx.fillText('eth1: 10.0.0.1', rightX, cy + 66);

    // Direct connection label
    ctx.font = '700 12px Heebo, sans-serif';
    ctx.fillStyle = '#3b82f6';
    ctx.textAlign = 'center';
    ctx.fillText('חיבור ישיר (Direct)', W / 2, cy - 50);

    // Routing tables
    drawMiniRoutingTable(ctx, leftX - 50, H * 0.76, 'Router 1', [
        { net: '192.168.1.0/24', hop: 'Direct', iface: 'eth0', type: 'C' },
        { net: '10.0.0.0/8', hop: 'Direct', iface: 'eth1', type: 'C' }
    ]);
    drawMiniRoutingTable(ctx, rightX - 50, H * 0.76, 'Router 2', [
        { net: '10.0.0.0/8', hop: 'Direct', iface: 'eth0', type: 'C' },
        { net: '192.168.1.0/24', hop: 'Direct', iface: 'eth1', type: 'C' }
    ]);
}

function drawPC(ctx, x, y, label, ip) {
    // PC icon
    ctx.save();
    ctx.font = '22px serif';
    ctx.textAlign = 'center';
    ctx.fillText('💻', x, y + 7);
    ctx.font = '600 10px Heebo, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(label, x, y - 20);
    ctx.font = '500 9px IBM Plex Mono, monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(ip, x, y + 24);
    ctx.restore();
}

function drawRouter(ctx, x, y, label, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fillStyle = color + '22';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🔀', x, y + 8);

    ctx.font = '700 11px Heebo, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(label, x, y - 36);
    ctx.restore();
}

function drawMiniRoutingTable(ctx, x, y, title, routes) {
    ctx.save();
    ctx.font = '600 9px IBM Plex Mono, monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'left';
    ctx.fillText('Routing Table:', x, y);
    let ty = y + 14;
    routes.forEach(r => {
        ctx.fillStyle = '#22c55e';
        ctx.fillText(r.type, x, ty);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(r.net + ' → ' + r.hop + ' (' + r.iface + ')', x + 14, ty);
        ty += 13;
    });
    ctx.restore();
}

function startDirectRoutingSim() {
    if (directSimRunning) return;
    directSimRunning = true;
    directSimPackets = [];

    const W = directSimW, H = directSimH;
    const leftX = W * 0.15, rightX = W * 0.85, cy = H * 0.45;
    const pcLeftX = W * 0.04, pcRightX = W * 0.96;

    // Phase 1: PC A sends to Router 1
    directSimPackets.push({
        fromX: pcLeftX, fromY: cy, toX: leftX, toY: cy,
        progress: 0, speed: 0.025, color: '#22c55e', label: 'PKT',
        phase: 0
    });

    let frame = 0;
    function animate() {
        drawDirectRoutingStatic();
        frame++;

        // Status text
        const ctx = directSimCtx;
        ctx.font = '600 11px Heebo, sans-serif';
        ctx.textAlign = 'center';

        let allDone = true;
        for (let i = directSimPackets.length - 1; i >= 0; i--) {
            const p = directSimPackets[i];
            p.progress += p.speed;

            if (p.progress >= 1) {
                // Chain to next phase
                if (p.phase === 0 && directSimPackets.length === 1) {
                    // Router 1 → Router 2
                    directSimPackets.push({
                        fromX: leftX, fromY: cy, toX: rightX, toY: cy,
                        progress: 0, speed: 0.015, color: '#3b82f6', label: 'PKT',
                        phase: 1
                    });
                } else if (p.phase === 1 && directSimPackets.length === 2) {
                    // Router 2 → PC B
                    directSimPackets.push({
                        fromX: rightX, fromY: cy, toX: pcRightX, toY: cy,
                        progress: 0, speed: 0.025, color: '#22c55e', label: 'PKT',
                        phase: 2
                    });
                }
                p.progress = 1;
            }

            if (p.progress < 1) allDone = false;

            const x = p.fromX + (p.toX - p.fromX) * Math.min(p.progress, 1);
            const y = p.fromY + (p.toY - p.fromY) * Math.min(p.progress, 1);

            if (p.progress <= 1) {
                ctx.save();
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.roundRect(x - 14, y - 9, 28, 18, 5);
                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.restore();

                ctx.font = '700 8px IBM Plex Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.fillText(p.label, x, y + 3);
            }
        }

        // Show status based on current phase
        const activePhase = directSimPackets.filter(p => p.progress < 1)[0];
        ctx.fillStyle = '#f59e0b';
        ctx.font = '600 12px Heebo, sans-serif';
        ctx.textAlign = 'center';
        if (activePhase) {
            if (activePhase.phase === 0) ctx.fillText('📡 PC A שולח ל-Router 1...', W/2, 22);
            if (activePhase.phase === 1) ctx.fillText('🔀 Router 1 → Router 2 (Direct Connection!)', W/2, 22);
            if (activePhase.phase === 2) ctx.fillText('📡 Router 2 מעביר ל-PC B...', W/2, 22);
        }

        if (allDone && directSimPackets.length >= 3) {
            ctx.fillStyle = '#22c55e';
            ctx.font = '700 13px Heebo, sans-serif';
            ctx.fillText('✅ החבילה הגיעה! ניתוב ישיר — בלי תיווך!', W/2, 22);
            directSimRunning = false;
            return;
        }

        requestAnimationFrame(animate);
    }
    animate();
}

function resetDirectRoutingSim() {
    directSimRunning = false;
    directSimPackets = [];
    initDirectRoutingCanvas();
}

// ====== STATIC ROUTING SIMULATOR ======
let staticSimRunning = false;
let staticSimCtx, staticSimW, staticSimH;

function initStaticRoutingCanvas() {
    const canvas = document.getElementById('static-routing-canvas');
    if (!canvas) return;
    staticSimCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 600);
    canvas.width = w * dpr;
    canvas.height = 300 * dpr;
    staticSimCtx.scale(dpr, dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = '300px';
    staticSimW = w;
    staticSimH = 300;
    drawStaticRoutingStatic();
}

function drawStaticRoutingStatic() {
    if (!staticSimCtx) return;
    const ctx = staticSimCtx, W = staticSimW, H = staticSimH;
    ctx.clearRect(0, 0, W, H);

    const positions = [
        { x: W * 0.12, y: H * 0.4, label: 'PC A', ip: '192.168.1.10', type: 'pc' },
        { x: W * 0.32, y: H * 0.4, label: 'R1', ip: '', type: 'router', color: '#3b82f6' },
        { x: W * 0.55, y: H * 0.25, label: 'R2', ip: '', type: 'router', color: '#8b5cf6' },
        { x: W * 0.55, y: H * 0.55, label: 'R3', ip: '', type: 'router', color: '#f59e0b' },
        { x: W * 0.78, y: H * 0.4, label: 'R4', ip: '', type: 'router', color: '#ef4444' },
        { x: W * 0.92, y: H * 0.4, label: 'PC B', ip: '10.20.30.5', type: 'pc' }
    ];

    // Links
    const links = [[0,1],[1,2],[1,3],[2,4],[3,4],[4,5]];
    links.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(positions[a].x, positions[a].y);
        ctx.lineTo(positions[b].x, positions[b].y);
        ctx.strokeStyle = 'rgba(100,116,139,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Highlight the static path R1 → R2 → R4
    ctx.beginPath();
    ctx.moveTo(positions[1].x, positions[1].y);
    ctx.lineTo(positions[2].x, positions[2].y);
    ctx.lineTo(positions[4].x, positions[4].y);
    ctx.strokeStyle = '#8b5cf622';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Nodes
    positions.forEach(p => {
        if (p.type === 'pc') {
            drawPC(ctx, p.x, p.y, p.label, p.ip);
        } else {
            drawRouter(ctx, p.x, p.y, p.label, p.color);
        }
    });

    // Static route config label
    ctx.font = '600 10px IBM Plex Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8b5cf6';
    ctx.fillText('Static: 10.20.30.0/24 → R2', W * 0.32, H * 0.13);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 10px Heebo, sans-serif';
    ctx.fillText('הנתיב הוגדר ידנית: R1 → R2 → R4', W / 2, H * 0.88);
    ctx.fillText('(הנתב לא יודע על R3 כנתיב חלופי!)', W / 2, H * 0.94);

    // Store positions for animation
    staticSimPositions = positions;
    staticSimPath = [0, 1, 2, 4, 5];
}

let staticSimPositions = [];
let staticSimPath = [];

function startStaticRoutingSim() {
    if (staticSimRunning) return;
    staticSimRunning = true;

    let pathIdx = 0;
    let progress = 0;

    function animate() {
        drawStaticRoutingStatic();
        const ctx = staticSimCtx, W = staticSimW;

        if (pathIdx >= staticSimPath.length - 1) {
            ctx.fillStyle = '#22c55e';
            ctx.font = '700 12px Heebo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✅ החבילה הגיעה! נתיב סטטי: PC A → R1 → R2 → R4 → PC B', W / 2, 18);
            staticSimRunning = false;
            return;
        }

        progress += 0.02;
        if (progress >= 1) {
            pathIdx++;
            progress = 0;
        }

        if (pathIdx < staticSimPath.length - 1) {
            const from = staticSimPositions[staticSimPath[pathIdx]];
            const to = staticSimPositions[staticSimPath[pathIdx + 1]];
            const x = from.x + (to.x - from.x) * progress;
            const y = from.y + (to.y - from.y) * progress;

            ctx.save();
            ctx.shadowColor = '#8b5cf6';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.roundRect(x - 14, y - 9, 28, 18, 5);
            ctx.fillStyle = '#8b5cf6';
            ctx.fill();
            ctx.restore();

            ctx.font = '700 8px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.fillText('PKT', x, y + 3);

            // Status
            const names = ['PC A', 'R1', 'R2', 'R4', 'PC B'];
            ctx.fillStyle = '#f59e0b';
            ctx.font = '600 11px Heebo, sans-serif';
            ctx.fillText('📦 ' + names[pathIdx] + ' → ' + names[pathIdx + 1] + ' (Static Route)', W / 2, 18);
        }

        requestAnimationFrame(animate);
    }
    animate();
}

function resetStaticRoutingSim() {
    staticSimRunning = false;
    initStaticRoutingCanvas();
}

// ====== DYNAMIC ROUTING SIMULATOR ======
let dynamicSimRunning = false;
let dynamicSimCtx, dynamicSimW, dynamicSimH;

function initDynamicRoutingCanvas() {
    const canvas = document.getElementById('dynamic-routing-canvas');
    if (!canvas) return;
    dynamicSimCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 600);
    canvas.width = w * dpr;
    canvas.height = 320 * dpr;
    dynamicSimCtx.scale(dpr, dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = '320px';
    dynamicSimW = w;
    dynamicSimH = 320;
    drawDynamicRoutingStatic('idle');
}

const dynamicNodes = [];
const dynamicLinks = [];
let dynamicPhase = 'idle'; // idle, learning, converged, failover, rerouted

function getDynamicPositions(W, H) {
    return [
        { x: W * 0.08, y: H * 0.4, label: 'PC A', ip: '192.168.1.5', type: 'pc' },
        { x: W * 0.25, y: H * 0.4, label: 'R1', type: 'router', color: '#3b82f6' },
        { x: W * 0.5, y: H * 0.18, label: 'R2', type: 'router', color: '#22c55e' },
        { x: W * 0.5, y: H * 0.62, label: 'R3', type: 'router', color: '#f59e0b' },
        { x: W * 0.75, y: H * 0.4, label: 'R4', type: 'router', color: '#ef4444' },
        { x: W * 0.92, y: H * 0.4, label: 'PC B', ip: '10.0.0.5', type: 'pc' }
    ];
}

function drawDynamicRoutingStatic(phase, failedLink, routeUpdates) {
    if (!dynamicSimCtx) return;
    const ctx = dynamicSimCtx, W = dynamicSimW, H = dynamicSimH;
    ctx.clearRect(0, 0, W, H);

    const pos = getDynamicPositions(W, H);
    const links = [[0,1],[1,2],[1,3],[2,4],[3,4],[4,5]];

    // Draw links
    links.forEach(([a, b], idx) => {
        const isFailed = failedLink && failedLink[0] === a && failedLink[1] === b;
        ctx.beginPath();
        ctx.moveTo(pos[a].x, pos[a].y);
        ctx.lineTo(pos[b].x, pos[b].y);
        if (isFailed) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.setLineDash([4, 4]);
        } else {
            ctx.strokeStyle = 'rgba(100,116,139,0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Show X on failed link
        if (isFailed) {
            const mx = (pos[a].x + pos[b].x) / 2;
            const my = (pos[a].y + pos[b].y) / 2;
            ctx.font = '700 20px serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ef4444';
            ctx.fillText('✖', mx, my + 6);
        }
    });

    // Draw route update packets
    if (routeUpdates) {
        routeUpdates.forEach(ru => {
            if (ru.progress > 0 && ru.progress < 1) {
                const from = pos[ru.from];
                const to = pos[ru.to];
                const x = from.x + (to.x - from.x) * ru.progress;
                const y = from.y + (to.y - from.y) * ru.progress;

                ctx.save();
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.roundRect(x - 16, y - 8, 32, 16, 4);
                ctx.fillStyle = '#f59e0b';
                ctx.fill();
                ctx.restore();

                ctx.font = '600 7px IBM Plex Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#000';
                ctx.fillText('UPDATE', x, y + 3);
            }
        });
    }

    // Draw nodes
    pos.forEach(p => {
        if (p.type === 'pc') drawPC(ctx, p.x, p.y, p.label, p.ip);
        else drawRouter(ctx, p.x, p.y, p.label, p.color);
    });

    // OSPF labels on routers
    if (phase !== 'idle') {
        ctx.font = '600 8px IBM Plex Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#22c55e';
        [1, 2, 3, 4].forEach(i => {
            ctx.fillText('OSPF', pos[i].x, pos[i].y + 48);
        });
    }

    return pos;
}

function startDynamicRoutingSim() {
    if (dynamicSimRunning) return;
    dynamicSimRunning = true;

    const W = dynamicSimW, H = dynamicSimH;
    const pos = getDynamicPositions(W, H);
    let frame = 0;
    const totalFrames = 700;
    let routeUpdates = [];
    let packetProgress = 0;
    let packetPhase = 'wait'; // wait, sendOriginal, failover, sendAlternate, done

    function animate() {
        frame++;
        const ctx = dynamicSimCtx;

        let failedLink = null;
        let statusText = '';
        let statusColor = '#f59e0b';

        // Phase 1: Learning (frames 1-100)
        if (frame <= 100) {
            // Spawn route update packets
            if (frame === 1) {
                routeUpdates = [
                    { from: 1, to: 2, progress: 0 },
                    { from: 1, to: 3, progress: 0 },
                    { from: 2, to: 4, progress: 0 },
                    { from: 3, to: 4, progress: 0 },
                    { from: 2, to: 1, progress: -0.3 },
                    { from: 4, to: 2, progress: -0.3 },
                ];
            }
            routeUpdates.forEach(ru => { ru.progress += 0.015; });
            statusText = '🔄 שלב 1: הנתבים מחליפים מידע ניתוב (OSPF)...';
            drawDynamicRoutingStatic('learning', null, routeUpdates);
        }
        // Phase 2: Converged, send packet via optimal path R1→R2→R4 (frames 101-250)
        else if (frame <= 250) {
            routeUpdates = [];
            drawDynamicRoutingStatic('converged', null, null);

            if (frame === 101) packetPhase = 'sendOriginal';

            if (packetPhase === 'sendOriginal') {
                const originalPath = [0, 1, 2, 4, 5];
                const relFrame = frame - 101;
                const segment = Math.floor(relFrame / 30);
                const segProgress = (relFrame % 30) / 30;

                if (segment < originalPath.length - 1) {
                    const from = pos[originalPath[segment]];
                    const to = pos[originalPath[segment + 1]];
                    const x = from.x + (to.x - from.x) * segProgress;
                    const y = from.y + (to.y - from.y) * segProgress;

                    ctx.save();
                    ctx.shadowColor = '#22c55e';
                    ctx.shadowBlur = 12;
                    ctx.beginPath();
                    ctx.roundRect(x - 14, y - 9, 28, 18, 5);
                    ctx.fillStyle = '#22c55e';
                    ctx.fill();
                    ctx.restore();
                    ctx.font = '700 8px IBM Plex Mono, monospace';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#fff';
                    ctx.fillText('PKT', x, y + 3);
                }

                statusText = '📦 שלב 2: שליחת חבילה בנתיב האופטימלי R1→R2→R4';
                statusColor = '#22c55e';

                // Highlight optimal path
                ctx.beginPath();
                ctx.moveTo(pos[1].x, pos[1].y);
                ctx.lineTo(pos[2].x, pos[2].y);
                ctx.lineTo(pos[4].x, pos[4].y);
                ctx.strokeStyle = '#22c55e33';
                ctx.lineWidth = 8;
                ctx.stroke();
            }
        }
        // Phase 3: Link failure R1-R2 (frames 251-350)
        else if (frame <= 350) {
            failedLink = [1, 2];
            drawDynamicRoutingStatic('failover', failedLink, null);

            if (frame > 270 && frame <= 350) {
                // Route updates for reconvergence
                if (frame === 271) {
                    routeUpdates = [
                        { from: 1, to: 3, progress: 0 },
                        { from: 3, to: 4, progress: -0.4 },
                        { from: 4, to: 3, progress: -0.2 }
                    ];
                }
                routeUpdates.forEach(ru => { ru.progress += 0.02; });
                drawDynamicRoutingStatic('failover', failedLink, routeUpdates);
            }

            statusText = '⚠️ שלב 3: הקישור R1↔R2 נפל! הנתבים מחפשים נתיב חלופי...';
            statusColor = '#ef4444';
        }
        // Phase 4: Reroute via R3 (frames 351-530)
        else if (frame <= 530) {
            failedLink = [1, 2];
            drawDynamicRoutingStatic('rerouted', failedLink, null);

            const altPath = [0, 1, 3, 4, 5];
            const relFrame = frame - 351;
            const segment = Math.floor(relFrame / 35);
            const segProgress = (relFrame % 35) / 35;

            // Highlight alternative path
            ctx.beginPath();
            ctx.moveTo(pos[1].x, pos[1].y);
            ctx.lineTo(pos[3].x, pos[3].y);
            ctx.lineTo(pos[4].x, pos[4].y);
            ctx.strokeStyle = '#f59e0b33';
            ctx.lineWidth = 8;
            ctx.stroke();

            if (segment < altPath.length - 1) {
                const from = pos[altPath[segment]];
                const to = pos[altPath[segment + 1]];
                const x = from.x + (to.x - from.x) * segProgress;
                const y = from.y + (to.y - from.y) * segProgress;

                ctx.save();
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.roundRect(x - 14, y - 9, 28, 18, 5);
                ctx.fillStyle = '#f59e0b';
                ctx.fill();
                ctx.restore();
                ctx.font = '700 8px IBM Plex Mono, monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#000';
                ctx.fillText('PKT', x, y + 3);
            }

            statusText = '🔄 שלב 4: נמצא נתיב חלופי! R1→R3→R4 (Failover!)';
            statusColor = '#f59e0b';
        }
        // Done
        else {
            failedLink = [1, 2];
            drawDynamicRoutingStatic('rerouted', failedLink, null);
            ctx.beginPath();
            ctx.moveTo(pos[1].x, pos[1].y);
            ctx.lineTo(pos[3].x, pos[3].y);
            ctx.lineTo(pos[4].x, pos[4].y);
            ctx.strokeStyle = '#22c55e33';
            ctx.lineWidth = 8;
            ctx.stroke();

            ctx.fillStyle = '#22c55e';
            ctx.font = '700 12px Heebo, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✅ ניתוב דינמי = התאוששות אוטומטית! R1→R3→R4', W / 2, 18);
            dynamicSimRunning = false;
            return;
        }

        // Draw status
        ctx.fillStyle = statusColor;
        ctx.font = '600 11px Heebo, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(statusText, W / 2, 18);

        requestAnimationFrame(animate);
    }
    animate();
}

function resetDynamicRoutingSim() {
    dynamicSimRunning = false;
    initDynamicRoutingCanvas();
}

// ====== AS EXPLANATION CANVAS ======
function initASExplainCanvas() {
    const canvas = document.getElementById('as-explain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.min(rect.width, 500);
    canvas.width = w * dpr;
    canvas.height = 300 * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = '300px';

    const W = w, H = 300;
    let frame = 0;
    let packets = [];

    const ases = [
        { x: W * 0.25, y: H * 0.28, label: 'AS 15169', sub: 'Google', color: '#22c55e', r: 42 },
        { x: W * 0.75, y: H * 0.28, label: 'AS 32934', sub: 'Meta', color: '#3b82f6', r: 42 },
        { x: W * 0.17, y: H * 0.72, label: 'AS 8551', sub: 'Bezeq', color: '#f59e0b', r: 36 },
        { x: W * 0.83, y: H * 0.72, label: 'AS 16116', sub: 'Partner', color: '#ef4444', r: 36 },
        { x: W * 0.5, y: H * 0.5, label: 'AS 6939', sub: 'Hurricane\nElectric', color: '#8b5cf6', r: 38 }
    ];

    const links = [[0,1],[0,2],[0,4],[1,3],[1,4],[2,3],[2,4],[3,4]];

    function draw() {
        ctx.clearRect(0, 0, W, H);
        frame++;

        // Draw links
        links.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(ases[a].x, ases[a].y);
            ctx.lineTo(ases[b].x, ases[b].y);
            ctx.strokeStyle = 'rgba(139,92,246,0.15)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });

        // Draw AS bubbles
        ases.forEach(as => {
            const pulse = Math.sin(frame * 0.03 + as.x) * 2;
            ctx.beginPath();
            ctx.arc(as.x, as.y, as.r + pulse, 0, Math.PI * 2);
            ctx.fillStyle = as.color + '15';
            ctx.fill();
            ctx.strokeStyle = as.color + '88';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = '700 10px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = as.color;
            ctx.fillText(as.label, as.x, as.y - 6);

            ctx.font = '400 9px Heebo, sans-serif';
            ctx.fillStyle = '#94a3b8';
            const subLines = as.sub.split('\n');
            subLines.forEach((line, i) => {
                ctx.fillText(line, as.x, as.y + 10 + i * 12);
            });
        });

        // Spawn BGP packets
        if (frame % 50 === 0 && packets.length < 8) {
            const [a, b] = links[Math.floor(Math.random() * links.length)];
            const dir = Math.random() > 0.5;
            packets.push({
                from: dir ? a : b,
                to: dir ? b : a,
                progress: 0,
                color: ases[dir ? a : b].color
            });
        }

        // Draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += 0.015;
            if (p.progress >= 1) { packets.splice(i, 1); continue; }

            const from = ases[p.from], to = ases[p.to];
            const x = from.x + (to.x - from.x) * p.progress;
            const y = from.y + (to.y - from.y) * p.progress;

            ctx.save();
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.roundRect(x - 12, y - 7, 24, 14, 4);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();

            ctx.font = '700 7px IBM Plex Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.fillText('BGP', x, y + 3);
        }

        ctx.font = '500 10px Heebo, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#64748b';
        ctx.fillText('כל עיגול = AS · כל חבילה = BGP Route Update', W / 2, H - 8);

        requestAnimationFrame(draw);
    }
    draw();
}

// ====== SECTION HEADER CANVASES ======
function initHeaderCanvas(canvasId, baseColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const W = rect.width;
    const H = rect.height;
    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 1 + Math.random() * 3,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: 0.1 + Math.random() * 0.3
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `${baseColor}${Math.floor((1 - dist / 120) * 30).toString(16).padStart(2, '0')}`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `${baseColor}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }
    draw();
}

// ====== INIT ALL ANIMATIONS ======
function initLayer3Animations() {
    initHeroCanvas();
    initPacketJourneyCanvas();
    initIPv4StructureCanvas();
    initLPMCanvas();

    // Routing type simulators
    initDirectRoutingCanvas();
    initStaticRoutingCanvas();
    initDynamicRoutingCanvas();

    // AS Explain canvas (protocols section)
    initASExplainCanvas();

    // Header canvases
    initHeaderCanvas('ip-header-canvas', '#3b82f6');
    initHeaderCanvas('binary-header-canvas', '#8b5cf6');
    initHeaderCanvas('subnet-header-canvas', '#22c55e');
    initHeaderCanvas('routing-header-canvas', '#ef4444');
    initHeaderCanvas('protocols-header-canvas', '#8b5cf6');
}

// Make functions globally available
window.initLayer3Animations = initLayer3Animations;
window.startPacketJourney = startPacketJourney;
window.animateRIP = animateRIP;
window.animateOSPF = animateOSPF;
window.animateBGP = animateBGP;
window.initIPv4StructureCanvas = initIPv4StructureCanvas;
window.initLPMCanvas = initLPMCanvas;
window.initPacketJourneyCanvas = initPacketJourneyCanvas;
window.initDirectRoutingCanvas = initDirectRoutingCanvas;
window.startDirectRoutingSim = startDirectRoutingSim;
window.resetDirectRoutingSim = resetDirectRoutingSim;
window.initStaticRoutingCanvas = initStaticRoutingCanvas;
window.startStaticRoutingSim = startStaticRoutingSim;
window.resetStaticRoutingSim = resetStaticRoutingSim;
window.initDynamicRoutingCanvas = initDynamicRoutingCanvas;
window.startDynamicRoutingSim = startDynamicRoutingSim;
window.resetDynamicRoutingSim = resetDynamicRoutingSim;
window.initASExplainCanvas = initASExplainCanvas;
