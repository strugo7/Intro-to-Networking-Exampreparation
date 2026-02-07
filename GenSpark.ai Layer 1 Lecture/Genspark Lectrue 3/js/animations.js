/* ===========================
   Canvas Animations for OSI Layer 1 Lesson
   =========================== */

// ====== HERO CANVAS - Network Particles ======
class HeroAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: -1000, y: -1000 };
        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    init() {
        const count = Math.min(80, Math.floor(this.canvas.width * this.canvas.height / 8000));
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                color: ['#1abc9c', '#3498db', '#9b59b6', '#f39c12'][Math.floor(Math.random() * 4)],
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw gradient background
        const grad = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
        );
        grad.addColorStop(0, 'rgba(26, 188, 156, 0.05)');
        grad.addColorStop(1, 'rgba(10, 14, 23, 0)');
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update & draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse repulsion
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                p.vx += dx * 0.001;
                p.vy += dy * 0.001;
            }

            // Speed limit
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > 2) {
                p.vx = (p.vx / speed) * 2;
                p.vy = (p.vy / speed) * 2;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const ddx = p.x - p2.x;
                const ddy = p.y - p2.y;
                const ddist = Math.sqrt(ddx * ddx + ddy * ddy);
                if (ddist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = p.color;
                    this.ctx.globalAlpha = (1 - ddist / 120) * 0.2;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ====== BIT SENDING ANIMATION ======
let bitAnimationRunning = false;

function sendBits() {
    if (bitAnimationRunning) return;
    bitAnimationRunning = true;

    const canvas = document.getElementById('bit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const bits = '01001000 01100101 01101100 01101100 01101111';
    const bitArray = bits.replace(/\s/g, '').split('').map(Number);
    const display = document.getElementById('current-bits');
    display.textContent = bits;

    const w = canvas.width;
    const h = canvas.height;
    let frame = 0;
    const totalFrames = 180;

    function drawFrame() {
        ctx.clearRect(0, 0, w, h);

        // Channel line
        ctx.strokeStyle = 'rgba(26, 188, 156, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw signal wave
        const progress = frame / totalFrames;
        const bitsToShow = Math.floor(progress * bitArray.length);

        ctx.beginPath();
        ctx.strokeStyle = '#1abc9c';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#1abc9c';
        ctx.shadowBlur = 10;

        const bitWidth = w / 20;
        let x = w - (frame * 3) % w;

        for (let i = 0; i < Math.min(bitsToShow + 1, bitArray.length); i++) {
            const bitX = (i * bitWidth) - (frame * 2) + w;
            if (bitX < -bitWidth || bitX > w + bitWidth) continue;

            const y = bitArray[i] === 1 ? h * 0.25 : h * 0.75;
            if (i === 0) {
                ctx.moveTo(bitX, y);
            } else {
                const prevY = bitArray[i - 1] === 1 ? h * 0.25 : h * 0.75;
                ctx.lineTo(bitX, prevY);
                ctx.lineTo(bitX, y);
            }

            // Draw bit label
            ctx.save();
            ctx.shadowBlur = 0;
            ctx.fillStyle = bitArray[i] === 1 ? '#1abc9c' : '#e74c3c';
            ctx.font = 'bold 14px IBM Plex Mono';
            ctx.textAlign = 'center';
            ctx.fillText(bitArray[i].toString(), bitX + bitWidth / 2, bitArray[i] === 1 ? h * 0.18 : h * 0.9);
            ctx.restore();
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Moving bit packets
        for (let i = 0; i < 3; i++) {
            const px = ((frame * 4 + i * 200) % (w + 40)) - 20;
            const py = h / 2 + Math.sin(frame * 0.1 + i) * 10;
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#1abc9c';
            ctx.shadowColor = '#1abc9c';
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        frame++;
        if (frame < totalFrames) {
            requestAnimationFrame(drawFrame);
        } else {
            bitAnimationRunning = false;
        }
    }

    drawFrame();
}

// ====== FIBER OPTICS ANIMATION ======
let fiberMode = 'single';

function setFiberMode(mode) {
    fiberMode = mode;
    document.querySelectorAll('[data-mode]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
}

class FiberAnimation {
    constructor() {
        this.canvas = document.getElementById('fiber-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.frame = 0;
        this.animate();
    }

    animate() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Draw fiber cable
        const cableTop = h * 0.25;
        const cableBottom = h * 0.75;
        const cableHeight = cableBottom - cableTop;

        // Cladding
        ctx.fillStyle = 'rgba(52, 152, 219, 0.15)';
        ctx.beginPath();
        ctx.roundRect(30, cableTop - 20, w - 60, cableHeight + 40, 20);
        ctx.fill();
        ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Core
        ctx.fillStyle = 'rgba(26, 188, 156, 0.1)';
        ctx.beginPath();
        ctx.roundRect(30, cableTop, w - 60, cableHeight, 15);
        ctx.fill();
        ctx.strokeStyle = 'rgba(26, 188, 156, 0.3)';
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#3498db';
        ctx.font = '12px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('Cladding (שכבת מעטפת)', w / 2, cableTop - 28);
        ctx.fillStyle = '#1abc9c';
        ctx.fillText('Core (ליבה)', w / 2, cableTop + 16);

        // Light source
        ctx.beginPath();
        ctx.arc(50, h / 2, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#f39c12';
        ctx.shadowColor = '#f39c12';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 8px IBM Plex Mono';
        ctx.textAlign = 'center';
        ctx.fillText('LED', 50, h / 2 + 3);

        // Detector
        ctx.beginPath();
        ctx.arc(w - 50, h / 2, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#2ecc71';
        ctx.shadowColor = '#2ecc71';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.fillText('PD', w - 50, h / 2 + 3);

        // Draw light rays
        if (fiberMode === 'single') {
            // Single mode - straight line
            ctx.beginPath();
            ctx.moveTo(62, h / 2);
            ctx.lineTo(w - 62, h / 2);
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 3;
            ctx.shadowColor = '#f39c12';
            ctx.shadowBlur = 15;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Moving photon
            const photonX = 62 + ((this.frame * 4) % (w - 124));
            ctx.beginPath();
            ctx.arc(photonX, h / 2, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#f39c12';
            ctx.shadowBlur = 25;
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#f39c12';
            ctx.font = '11px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText('Single Mode — קרן אחת ישרה', w / 2, h - 20);
        } else {
            // Multi mode - bouncing rays
            const rays = [
                { amp: cableHeight * 0.35, freq: 0.03, color: '#f39c12', phase: 0 },
                { amp: cableHeight * 0.25, freq: 0.04, color: '#e74c3c', phase: 1 },
                { amp: cableHeight * 0.4, freq: 0.025, color: '#f1c40f', phase: 2 }
            ];

            rays.forEach(ray => {
                ctx.beginPath();
                ctx.strokeStyle = ray.color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.7;
                for (let x = 62; x < w - 62; x++) {
                    const y = h / 2 + Math.sin((x + this.frame * 3 + ray.phase * 100) * ray.freq) * ray.amp;
                    if (x === 62) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.shadowColor = ray.color;
                ctx.shadowBlur = 8;
                ctx.stroke();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            });

            // Moving photons
            rays.forEach((ray, i) => {
                const px = 62 + ((this.frame * 3 + i * 80) % (w - 124));
                const py = h / 2 + Math.sin((px + this.frame * 3 + ray.phase * 100) * ray.freq) * ray.amp;
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = ray.color;
                ctx.shadowBlur = 15;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            ctx.fillStyle = '#e74c3c';
            ctx.font = '11px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText('Multi Mode — מספר קרניים בזוויות שונות', w / 2, h - 20);
        }

        this.frame++;
        requestAnimationFrame(() => this.animate());
    }
}

// ====== FIBER STRUCTURE CANVAS ======
class FiberStructure {
    constructor() {
        this.canvas = document.getElementById('fiber-structure-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.tooltip = document.getElementById('fiber-tooltip');
        this.hoveredPart = null;

        this.parts = [
            { name: 'Core (ליבה)', desc: 'ליבת זכוכית דקיקה שדרכה עובר האור. קוטר: 8-62.5 מיקרומטר', color: '#1abc9c', y: 0.5, r: 0.08 },
            { name: 'Cladding (מעטפת)', desc: 'שכבת זכוכית עם מקדם שבירה נמוך יותר — גורמת לאור להיחזר פנימה', color: '#3498db', y: 0.5, r: 0.16 },
            { name: 'Buffer (חיץ)', desc: 'שכבת הגנה מפלסטיק. מגנה על הסיב ממים ופגיעות פיזיות', color: '#9b59b6', y: 0.5, r: 0.24 },
            { name: 'Jacket (מעטה חיצוני)', desc: 'השכבה החיצונית — בד״כ PVC. מגנה מפני סביבה חיצונית ופגיעות מכניות', color: '#e67e22', y: 0.5, r: 0.32 }
        ];

        this.draw();
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => {
            this.hoveredPart = null;
            this.tooltip.classList.add('hidden');
            this.draw();
        });
    }

    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const my = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);

        let hovered = null;
        for (let i = this.parts.length - 1; i >= 0; i--) {
            if (dist < this.parts[i].r * this.canvas.width) {
                hovered = this.parts[i];
                break;
            }
        }

        if (hovered !== this.hoveredPart) {
            this.hoveredPart = hovered;
            if (hovered) {
                this.tooltip.innerHTML = `<strong>${hovered.name}</strong><br>${hovered.desc}`;
                this.tooltip.classList.remove('hidden');
            } else {
                this.tooltip.classList.add('hidden');
            }
            this.draw();
        }

        if (hovered) {
            const ttX = e.clientX - rect.left + 15;
            const ttY = e.clientY - rect.top - 10;
            this.tooltip.style.left = ttX + 'px';
            this.tooltip.style.top = ttY + 'px';
        }
    }

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        // Title
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('חתך רוחב של סיב אופטי', cx, 25);

        // Draw from outside in
        for (let i = this.parts.length - 1; i >= 0; i--) {
            const part = this.parts[i];
            const r = part.r * w;
            const isHovered = this.hoveredPart === part;

            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = part.color + (isHovered ? '60' : '30');
            ctx.fill();
            ctx.strokeStyle = part.color + (isHovered ? 'ff' : '80');
            ctx.lineWidth = isHovered ? 3 : 1;
            ctx.stroke();

            // Label
            const labelY = cy - r - 8;
            ctx.fillStyle = part.color;
            ctx.font = isHovered ? 'bold 13px Heebo' : '11px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText(part.name, cx, labelY);
        }

        // Center glow (core center)
        const coreR = this.parts[0].r * w;
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
        glow.addColorStop(0, 'rgba(26, 188, 156, 0.4)');
        glow.addColorStop(1, 'rgba(26, 188, 156, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();

        // Draw side view at bottom
        const sideY = h - 70;
        const sideH = 40;
        const sideW = w * 0.7;
        const startX = (w - sideW) / 2;

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('מבט צד', cx, sideY - 12);

        for (let i = this.parts.length - 1; i >= 0; i--) {
            const part = this.parts[i];
            const layerH = sideH * (part.r / 0.32);
            const yOff = (sideH - layerH) / 2;
            const isHovered = this.hoveredPart === part;

            ctx.fillStyle = part.color + (isHovered ? '50' : '20');
            ctx.strokeStyle = part.color + (isHovered ? 'cc' : '60');
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(startX, sideY + yOff, sideW, layerH, 4);
            ctx.fill();
            ctx.stroke();
        }
    }
}

// ====== SINGLE/MULTI MODE MINI CANVASES ======
class MiniModeAnimation {
    constructor(canvasId, mode) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.mode = mode;
        this.frame = 0;
        this.animate();
    }

    animate() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Cable background
        ctx.fillStyle = 'rgba(26, 188, 156, 0.08)';
        ctx.fillRect(10, 20, w - 20, h - 40);
        ctx.strokeStyle = 'rgba(26, 188, 156, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(10, 20, w - 20, h - 40);

        if (this.mode === 'single') {
            ctx.beginPath();
            ctx.moveTo(10, h / 2);
            ctx.lineTo(w - 10, h / 2);
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#f39c12';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;

            const px = 10 + ((this.frame * 3) % (w - 20));
            ctx.beginPath();
            ctx.arc(px, h / 2, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = '#f39c12';
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            const rays = [
                { amp: 20, freq: 0.05, color: '#f39c12' },
                { amp: 15, freq: 0.07, color: '#e74c3c' },
                { amp: 25, freq: 0.04, color: '#f1c40f' }
            ];
            rays.forEach((ray, i) => {
                ctx.beginPath();
                ctx.strokeStyle = ray.color;
                ctx.lineWidth = 1.5;
                ctx.globalAlpha = 0.6;
                for (let x = 10; x < w - 10; x++) {
                    const y = h / 2 + Math.sin((x + this.frame * 2 + i * 50) * ray.freq) * ray.amp;
                    if (x === 10) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.globalAlpha = 1;
            });
        }

        this.frame++;
        requestAnimationFrame(() => this.animate());
    }
}

// ====== COPPER SIGNAL CANVAS ======
class CopperSignal {
    constructor() {
        this.canvas = document.getElementById('copper-signal-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.frame = 0;
        this.voltage = 5;
        this.freq = 3;

        const voltSlider = document.getElementById('voltage-slider');
        const freqSlider = document.getElementById('freq-slider');

        if (voltSlider) {
            voltSlider.addEventListener('input', (e) => {
                this.voltage = parseInt(e.target.value);
                document.getElementById('voltage-val').textContent = this.voltage + 'V';
            });
        }
        if (freqSlider) {
            freqSlider.addEventListener('input', (e) => {
                this.freq = parseInt(e.target.value);
                const labels = ['נמוכה מאוד', 'נמוכה', 'בינונית', 'גבוהה', 'גבוהה מאוד'];
                document.getElementById('freq-val').textContent = labels[this.freq - 1];
            });
        }

        this.animate();
    }

    animate() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        const midY = h / 2;
        const amp = (this.voltage / 10) * (h * 0.35);

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let y = 0; y < h; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Center line
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(w, midY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Voltage labels
        ctx.fillStyle = '#e74c3c';
        ctx.font = '11px IBM Plex Mono';
        ctx.textAlign = 'right';
        ctx.fillText(`+${this.voltage}V (1)`, w - 10, midY - amp - 5);
        ctx.fillStyle = '#3498db';
        ctx.fillText(`-${this.voltage}V (0)`, w - 10, midY + amp + 15);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('0V', w - 10, midY - 5);

        // Digital signal (square wave)
        const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1];
        const bitWidth = w / (bits.length * (1 / this.freq) * 0.5);
        const offset = (this.frame * 2) % bitWidth;

        ctx.beginPath();
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#e74c3c';
        ctx.shadowBlur = 8;

        let firstPoint = true;
        for (let i = 0; i < bits.length * 2; i++) {
            const bi = i % bits.length;
            const x = i * bitWidth - offset;
            if (x > w + bitWidth) break;
            if (x < -bitWidth) continue;

            const y = bits[bi] === 1 ? midY - amp : midY + amp;
            if (firstPoint) {
                ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                const prevY = bits[(bi - 1 + bits.length) % bits.length] === 1 ? midY - amp : midY + amp;
                ctx.lineTo(x, prevY);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(x + bitWidth, y);

            // Bit label
            ctx.save();
            ctx.shadowBlur = 0;
            ctx.fillStyle = bits[bi] === 1 ? '#2ecc71' : '#e74c3c';
            ctx.font = 'bold 14px IBM Plex Mono';
            ctx.textAlign = 'center';
            if (x + bitWidth / 2 > 0 && x + bitWidth / 2 < w) {
                ctx.fillText(bits[bi].toString(), x + bitWidth / 2, bits[bi] === 1 ? midY - amp - 15 : midY + amp + 25);
            }
            ctx.restore();
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        this.frame++;
        requestAnimationFrame(() => this.animate());
    }
}

// ====== CABLE TYPE DRAWING ======
const cableData = {
    utp: {
        name: 'UTP — Unshielded Twisted Pair',
        desc: 'זוגות שזורים ללא הגנה',
        details: `
            <h4>UTP — Unshielded Twisted Pair</h4>
            <p>כבל נחושת הנפוץ ביותר ברשתות מקומיות. מכיל 4 זוגות של חוטי נחושת שזורים.</p>
            <div class="spec-row"><span class="spec-label">זוגות</span><span class="spec-value">4 זוגות (8 חוטים)</span></div>
            <div class="spec-row"><span class="spec-label">הגנה</span><span class="spec-value">ללא (Unshielded)</span></div>
            <div class="spec-row"><span class="spec-label">חיבור</span><span class="spec-value">RJ-45</span></div>
            <div class="spec-row"><span class="spec-label">עלות</span><span class="spec-value">נמוכה מאוד 💰</span></div>
            <div class="spec-row"><span class="spec-label">שימוש</span><span class="spec-value">רשתות LAN, טלפון</span></div>
            <p style="margin-top:12px;color:#94a3b8;font-size:0.85rem">השזירה עצמה מספקת הגנה בסיסית מפני EMI</p>
        `
    },
    stp: {
        name: 'STP — Shielded Twisted Pair',
        desc: 'זוגות שזורים עם הגנה',
        details: `
            <h4>STP — Shielded Twisted Pair</h4>
            <p>דומה ל-UTP אבל עם שכבת הגנה (פויל או קליעת מתכת) סביב כל זוג או סביב כולם.</p>
            <div class="spec-row"><span class="spec-label">זוגות</span><span class="spec-value">4 זוגות (8 חוטים)</span></div>
            <div class="spec-row"><span class="spec-label">הגנה</span><span class="spec-value">פויל/קליעה מתכת 🛡️</span></div>
            <div class="spec-row"><span class="spec-label">חיבור</span><span class="spec-value">RJ-45 / GG45</span></div>
            <div class="spec-row"><span class="spec-label">עלות</span><span class="spec-value">בינונית 💰💰</span></div>
            <div class="spec-row"><span class="spec-label">שימוש</span><span class="spec-value">סביבות תעשייתיות, Cat7</span></div>
            <p style="margin-top:12px;color:#94a3b8;font-size:0.85rem">מומלץ בסביבות עם הפרעות EMI גבוהות</p>
        `
    },
    coaxial: {
        name: 'Coaxial — כבל קואקסיאלי',
        desc: 'מוליך מרכזי עם הגנה',
        details: `
            <h4>Coaxial Cable — כבל קואקסיאלי</h4>
            <p>כבל עם מוליך מרכזי אחד מוקף בשכבת בידוד, הגנת מתכת ומעטפת חיצונית.</p>
            <div class="spec-row"><span class="spec-label">מוליכים</span><span class="spec-value">1 מוליך מרכזי</span></div>
            <div class="spec-row"><span class="spec-label">הגנה</span><span class="spec-value">קליעת מתכת 🛡️🛡️</span></div>
            <div class="spec-row"><span class="spec-label">חיבור</span><span class="spec-value">BNC / F-Type</span></div>
            <div class="spec-row"><span class="spec-label">עלות</span><span class="spec-value">בינונית 💰💰</span></div>
            <div class="spec-row"><span class="spec-label">שימוש</span><span class="spec-value">טלוויזיה בכבלים, אינטרנט ישן</span></div>
            <p style="margin-top:12px;color:#94a3b8;font-size:0.85rem">משמש בעיקר לכבלי טלוויזיה ואנטנות</p>
        `
    }
};

function showCableType(type) {
    document.querySelectorAll('.cable-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.cable === type);
    });
    document.getElementById('cable-info-content').innerHTML = cableData[type].details;
    drawCable(type);
}

function drawCable(type) {
    const canvas = document.getElementById('cable-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    if (type === 'utp') {
        // Draw UTP cross-section
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('חתך רוחב — UTP', cx, 25);

        // Outer jacket
        ctx.beginPath();
        ctx.arc(cx, cy, 130, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#666';
        ctx.font = '11px Heebo';
        ctx.fillText('Jacket (מעטפת)', cx, cy - 140);

        // 4 twisted pairs
        const pairs = [
            { x: -45, y: -45, color1: '#3498db', color2: '#fff', label: 'כחול' },
            { x: 45, y: -45, color1: '#e67e22', color2: '#fff', label: 'כתום' },
            { x: -45, y: 45, color1: '#2ecc71', color2: '#fff', label: 'ירוק' },
            { x: 45, y: 45, color1: '#8B4513', color2: '#fff', label: 'חום' }
        ];

        pairs.forEach(pair => {
            const px = cx + pair.x;
            const py = cy + pair.y;

            // Twist visualization
            ctx.beginPath();
            ctx.arc(px - 12, py, 14, 0, Math.PI * 2);
            ctx.fillStyle = pair.color1 + '40';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px - 12, py, 10, 0, Math.PI * 2);
            ctx.fillStyle = pair.color1;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(px + 12, py, 14, 0, Math.PI * 2);
            ctx.fillStyle = pair.color1 + '40';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px + 12, py, 10, 0, Math.PI * 2);
            ctx.fillStyle = pair.color2;
            ctx.strokeStyle = pair.color1;
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText(pair.label, px, py + 30);
        });

        // Separator
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(cx, cy - 90);
        ctx.lineTo(cx, cy + 90);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 90, cy);
        ctx.lineTo(cx + 90, cy);
        ctx.stroke();
        ctx.setLineDash([]);

    } else if (type === 'stp') {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('חתך רוחב — STP', cx, 25);

        // Outer jacket
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 100, 100, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Overall shield
        ctx.beginPath();
        ctx.arc(cx, cy, 125, 0, Math.PI * 2);
        ctx.strokeStyle = '#c0c0c0';
        ctx.lineWidth = 4;
        ctx.setLineDash([6, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#c0c0c0';
        ctx.font = '10px Heebo';
        ctx.fillText('הגנה כללית (Overall Shield)', cx, cy - 133);

        // Individual shields + pairs
        const pairs = [
            { x: -42, y: -42, color: '#3498db' },
            { x: 42, y: -42, color: '#e67e22' },
            { x: -42, y: 42, color: '#2ecc71' },
            { x: 42, y: 42, color: '#8B4513' }
        ];

        pairs.forEach(pair => {
            const px = cx + pair.x;
            const py = cy + pair.y;

            // Individual foil shield
            ctx.beginPath();
            ctx.arc(px, py, 35, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(192, 192, 192, 0.1)';
            ctx.fill();
            ctx.strokeStyle = '#c0c0c0';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 2]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Wires
            ctx.beginPath();
            ctx.arc(px - 10, py, 9, 0, Math.PI * 2);
            ctx.fillStyle = pair.color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(px + 10, py, 9, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = pair.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        ctx.fillStyle = '#9b59b6';
        ctx.font = '10px Heebo';
        ctx.fillText('🛡️ הגנה פרטנית לכל זוג', cx, cy + 95);

    } else if (type === 'coaxial') {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('חתך רוחב — Coaxial', cx, 25);

        const layers = [
            { r: 130, color: '#333', label: 'Outer Jacket', labelColor: '#666' },
            { r: 110, color: '#c0c0c0', label: 'Braided Shield', labelColor: '#c0c0c0' },
            { r: 90, color: '#444', label: 'Insulator', labelColor: '#888' },
            { r: 40, color: '#cd7f32', label: 'Conductor (מוליך)', labelColor: '#cd7f32' }
        ];

        layers.forEach((layer, i) => {
            ctx.beginPath();
            ctx.arc(cx, cy, layer.r, 0, Math.PI * 2);
            ctx.fillStyle = layer.color + (i === 1 ? '40' : '30');
            ctx.fill();
            ctx.strokeStyle = layer.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label line
            const angle = -Math.PI / 4 + i * (Math.PI / 6);
            const lx = cx + Math.cos(angle) * (layer.r + 20);
            const ly = cy + Math.sin(angle) * (layer.r + 20);
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * layer.r, cy + Math.sin(angle) * layer.r);
            ctx.lineTo(lx, ly);
            ctx.lineTo(lx + (lx > cx ? 30 : -30), ly);
            ctx.strokeStyle = layer.labelColor + '80';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = layer.labelColor;
            ctx.font = '10px Heebo';
            ctx.textAlign = lx > cx ? 'left' : 'right';
            ctx.fillText(layer.label, lx + (lx > cx ? 35 : -35), ly + 4);
        });

        // Braided pattern
        ctx.strokeStyle = '#c0c0c060';
        ctx.lineWidth = 1;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
            ctx.beginPath();
            ctx.arc(cx + Math.cos(a) * 100, cy + Math.sin(a) * 100, 3, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Center conductor glow
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
        glow.addColorStop(0, 'rgba(205, 127, 50, 0.5)');
        glow.addColorStop(1, 'rgba(205, 127, 50, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ====== WIFI ANIMATION ======
class WifiAnimation {
    constructor() {
        this.canvas = document.getElementById('wifi-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.frame = 0;
        this.animate();
    }

    animate() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        const routerX = w / 2;
        const routerY = h / 2;

        // Radio waves
        const maxWaves = 5;
        for (let i = 0; i < maxWaves; i++) {
            const progress = ((this.frame * 2 + i * 40) % 200) / 200;
            const radius = progress * 200;
            const alpha = (1 - progress) * 0.4;

            ctx.beginPath();
            ctx.arc(routerX, routerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(52, 152, 219, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Router icon
        ctx.beginPath();
        ctx.arc(routerX, routerY, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#2c3e50';
        ctx.fill();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.stroke();

        // WiFi icon on router
        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(routerX, routerY + 5, i * 8, -Math.PI * 0.8, -Math.PI * 0.2);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(routerX, routerY + 5, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#3498db';
        ctx.fill();

        // Devices
        const devices = [
            { x: 80, y: 80, icon: '💻', label: 'מחשב נייד' },
            { x: w - 80, y: 80, icon: '📱', label: 'טלפון' },
            { x: 80, y: h - 80, icon: '🖥️', label: 'מחשב' },
            { x: w - 80, y: h - 80, icon: '📺', label: 'טלוויזיה' }
        ];

        devices.forEach((dev, i) => {
            // Connection line (animated dashes)
            ctx.beginPath();
            ctx.moveTo(dev.x, dev.y);
            ctx.lineTo(routerX, routerY);
            ctx.strokeStyle = 'rgba(52, 152, 219, 0.15)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.lineDashOffset = -this.frame * 2;
            ctx.stroke();
            ctx.setLineDash([]);

            // Data packets
            const t = ((this.frame * 3 + i * 40) % 120) / 120;
            const px = dev.x + (routerX - dev.x) * t;
            const py = dev.y + (routerY - dev.y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#3498db';
            ctx.shadowColor = '#3498db';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Device
            ctx.font = '28px serif';
            ctx.textAlign = 'center';
            ctx.fillText(dev.icon, dev.x, dev.y + 8);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px Heebo';
            ctx.fillText(dev.label, dev.x, dev.y + 28);
        });

        // Label
        ctx.fillStyle = '#3498db';
        ctx.font = '12px Heebo';
        ctx.textAlign = 'center';
        ctx.fillText('Access Point', routerX, routerY + 42);

        this.frame++;
        requestAnimationFrame(() => this.animate());
    }
}

// ====== WIFI SIGNAL SIMULATION ======
class WifiSimulation {
    constructor() {
        this.canvas = document.getElementById('wifi-sim-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.frame = 0;
        this.deviceX = 200;
        this.dragging = false;

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', () => this.dragging = false);
        this.canvas.addEventListener('mouseleave', () => this.dragging = false);

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.dragging = true;
            this.updateDevicePos(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.dragging) this.updateDevicePos(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', () => this.dragging = false);

        this.animate();
    }

    updateDevicePos(touch) {
        const rect = this.canvas.getBoundingClientRect();
        this.deviceX = Math.max(120, Math.min(this.canvas.width - 40,
            (touch.clientX - rect.left) * (this.canvas.width / rect.width)));
        this.updateStats();
    }

    onMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const my = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        const dy = this.canvas.height / 2;

        if (Math.abs(mx - this.deviceX) < 40 && Math.abs(my - dy) < 40) {
            this.dragging = true;
        }
    }

    onMouseMove(e) {
        if (!this.dragging) return;
        const rect = this.canvas.getBoundingClientRect();
        this.deviceX = Math.max(120, Math.min(this.canvas.width - 40,
            (e.clientX - rect.left) * (this.canvas.width / rect.width)));
        this.updateStats();
    }

    updateStats() {
        const maxDist = this.canvas.width - 160;
        const dist = this.deviceX - 80;
        const distMeters = Math.round((dist / maxDist) * 50);
        const strength = Math.max(-90, -30 - (dist / maxDist) * 60);
        const speed = Math.max(10, Math.round(1200 * (1 - (dist / maxDist) * 0.95)));

        document.getElementById('wifi-distance').textContent = distMeters + ' מטר';
        document.getElementById('wifi-strength').textContent = Math.round(strength) + ' dBm';
        document.getElementById('wifi-speed').textContent = speed + ' Mbps';

        let quality = 'מצוין ✅';
        if (strength < -50) quality = 'טוב 👍';
        if (strength < -65) quality = 'בינוני ⚠️';
        if (strength < -75) quality = 'חלש ❌';
        if (strength < -85) quality = 'אין קליטה 🚫';
        document.getElementById('wifi-quality').textContent = quality;
    }

    animate() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        const routerX = 80;
        const routerY = h / 2;

        // Distance line
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(routerX, routerY + 50);
        ctx.lineTo(w - 40, routerY + 50);
        ctx.stroke();
        ctx.setLineDash([]);

        // Signal strength gradient
        const dist = this.deviceX - routerX;
        const maxDist = w - 120;
        const signalRatio = 1 - (dist / maxDist);

        const grad = ctx.createLinearGradient(routerX, 0, w - 40, 0);
        grad.addColorStop(0, 'rgba(46, 204, 113, 0.15)');
        grad.addColorStop(0.5, 'rgba(241, 196, 15, 0.1)');
        grad.addColorStop(1, 'rgba(231, 76, 60, 0.05)');
        ctx.fillStyle = grad;
        ctx.fillRect(routerX, routerY - 60, maxDist, 120);

        // Waves from router
        for (let i = 0; i < 6; i++) {
            const progress = ((this.frame * 2 + i * 30) % 180) / 180;
            const radius = progress * maxDist;
            const alpha = (1 - progress) * 0.3 * signalRatio;

            ctx.beginPath();
            ctx.arc(routerX, routerY, radius, -0.3, 0.3);
            ctx.strokeStyle = `rgba(52, 152, 219, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Walls/obstacles
        const walls = [
            { x: w * 0.4, label: 'קיר 1' },
            { x: w * 0.65, label: 'קיר 2' }
        ];
        walls.forEach(wall => {
            ctx.fillStyle = 'rgba(255,255,255,0.03)';
            ctx.fillRect(wall.x, routerY - 70, 8, 140);
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 1;
            ctx.strokeRect(wall.x, routerY - 70, 8, 140);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px Heebo';
            ctx.textAlign = 'center';
            ctx.fillText(wall.label, wall.x + 4, routerY - 78);
        });

        // Router
        ctx.beginPath();
        ctx.arc(routerX, routerY, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#1a2332';
        ctx.fill();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#3498db';
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.fillText('📡', routerX, routerY + 6);
        ctx.fillStyle = '#3498db';
        ctx.font = '10px Heebo';
        ctx.fillText('נתב', routerX, routerY + 36);

        // Device
        const signalColor = signalRatio > 0.6 ? '#2ecc71' : signalRatio > 0.3 ? '#f39c12' : '#e74c3c';
        ctx.beginPath();
        ctx.arc(this.deviceX, routerY, 22, 0, Math.PI * 2);
        ctx.fillStyle = '#1a2332';
        ctx.fill();
        ctx.strokeStyle = signalColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = '18px serif';
        ctx.fillText('💻', this.deviceX, routerY + 6);
        ctx.fillStyle = signalColor;
        ctx.font = '10px Heebo';
        ctx.fillText('גררו אותי!', this.deviceX, routerY + 40);

        // Signal bars on device
        const bars = Math.max(0, Math.ceil(signalRatio * 4));
        for (let i = 0; i < 4; i++) {
            ctx.fillStyle = i < bars ? signalColor : 'rgba(255,255,255,0.1)';
            ctx.fillRect(this.deviceX + 15 + i * 6, routerY - 15 - i * 4, 4, 8 + i * 4);
        }

        this.frame++;
        this.updateStats();
        requestAnimationFrame(() => this.animate());
    }
}

// ====== FREQUENCY WAVE ANIMATIONS ======
class FreqWave {
    constructor(canvasId, freq, color) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.freq = freq;
        this.color = color;
        this.frame = 0;
        this.animate();
    }

    animate() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;

        for (let x = 0; x < w; x++) {
            const y = h / 2 + Math.sin((x + this.frame * 2) * this.freq * 0.05) * (h * 0.35);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        this.frame++;
        requestAnimationFrame(() => this.animate());
    }
}

// ====== SPEED RACE ======
let raceRunning = false;

function startRace() {
    if (raceRunning) return;
    raceRunning = true;

    const fillFiber = document.getElementById('fill-fiber');
    const fillCopper = document.getElementById('fill-copper');
    const fillWifi = document.getElementById('fill-wifi');
    const timeFiber = document.getElementById('time-fiber');
    const timeCopper = document.getElementById('time-copper');
    const timeWifi = document.getElementById('time-wifi');

    fillFiber.style.width = '0%';
    fillCopper.style.width = '0%';
    fillWifi.style.width = '0%';

    const fiberTime = 8;
    const copperTime = 80;
    const wifiTime = 160;
    const animDuration = 5000; // 5 seconds of animation

    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / animDuration, 1);

        // Each tech fills proportionally
        const fiberProg = Math.min(progress * (animDuration / (fiberTime * 60)), 1);
        const copperProg = Math.min(progress * (animDuration / (copperTime * 60)), 1);
        const wifiProg = Math.min(progress * (animDuration / (wifiTime * 60)), 1);

        fillFiber.style.width = (fiberProg * 100) + '%';
        fillCopper.style.width = (copperProg * 100) + '%';
        fillWifi.style.width = (wifiProg * 100) + '%';

        timeFiber.textContent = fiberProg >= 1 ? '✅ סיים!' : Math.round((1 - fiberProg) * fiberTime) + ' שניות';
        timeCopper.textContent = copperProg >= 1 ? '✅ סיים!' : Math.round((1 - copperProg) * copperTime) + ' שניות';
        timeWifi.textContent = wifiProg >= 1 ? '✅ סיים!' : Math.round((1 - wifiProg) * wifiTime) + ' שניות';

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            raceRunning = false;
        }
    }

    requestAnimationFrame(step);
}

// ====== SECTION HEADER CANVAS ANIMATIONS ======
class HeaderParticles {
    constructor(canvasId, color) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.color = color;
        this.particles = [];
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < 40; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.4 + 0.1
            });
        }
    }

    animate() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        });

        requestAnimationFrame(() => this.animate());
    }
}
