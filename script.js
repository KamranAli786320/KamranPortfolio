// ============================================================
// script.js — Kamran Ali Portfolio (Updated & Fixed)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ===================== NAVIGATION =====================
    // Uses data-section attribute — NO href-based scroll issues

    function navigateTo(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.toggle('active', l.dataset.section === sectionId);
        });
        // Close mobile menu
        const navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.remove('open');

        // Skills section triggers
        if (sectionId === 'skills') {
            triggerSkillBars();
            setTimeout(drawRadar, 300);
        }
    }

    // Header nav links
    document.querySelectorAll('.nav-link[data-section]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.dataset.section);
        });
    });

    // Buttons and footer links (data-section)
    document.querySelectorAll('.nav-btn[data-section]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            navigateTo(this.dataset.section);
        });
    });

    // Mobile hamburger menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksEl = document.getElementById('navLinks');
    if (mobileMenuBtn && navLinksEl) {
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinksEl.classList.toggle('open');
        });
        document.addEventListener('click', function (e) {
            if (!navLinksEl.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinksEl.classList.remove('open');
            }
        });
    }

    // ===================== ROLE WORD SWITCHER =====================
    const roleWords = document.querySelectorAll('.role-word');
    if (roleWords.length > 0) {
        let current = 0;
        setInterval(() => {
            roleWords[current].classList.remove('active');
            current = (current + 1) % roleWords.length;
            roleWords[current].classList.add('active');
        }, 2200);
    }

    // ===================== COUNTER ANIMATION =====================
    setTimeout(() => {
        document.querySelectorAll('.stat-num').forEach(el => {
            const target = parseInt(el.dataset.target);
            let val = 0;
            const step = Math.max(1, Math.ceil(target / 30));
            const interval = setInterval(() => {
                val = Math.min(val + step, target);
                el.textContent = val;
                if (val >= target) clearInterval(interval);
            }, 40);
        });
    }, 800);

    // ===================== NEURAL CANVAS =====================
    const canvas = document.getElementById('neuralCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, nodes = [];

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < 55; i++) {
            nodes.push({
                x: Math.random() * W, y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2 + 1
            });
        }

        function drawCanvas() {
            ctx.clearRect(0, 0, W, H);
            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;
            });
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0,217,255,${1 - dist / 130})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = '#00d9ff';
                ctx.fill();
            });
            requestAnimationFrame(drawCanvas);
        }
        drawCanvas();
    }

    // ===================== CONTACT FORM =====================
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', function () {
            const name = document.getElementById('cName') ? document.getElementById('cName').value.trim() : '';
            const email = document.getElementById('cEmail') ? document.getElementById('cEmail').value.trim() : '';
            if (!name || !email) {
                alert('Please fill in your name and email.');
                return;
            }
            alert('Message sent! I will get back to you soon.');
            ['cName', 'cEmail', 'cSubject', 'cMsg'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
        });
    }
});

// ============================================================
// SKILL BARS — called when skills section is opened
// ============================================================
function triggerSkillBars() {
    // Reset first so animation plays every visit
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.transition = 'none';
        bar.style.width = '0';
    });
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.transition = 'width 1.2s ease';
            bar.style.width = bar.dataset.width + '%';
        });
    }, 120);
}

// ============================================================
// RADAR CHART — all 10 skills from skill bars
// ============================================================
let radarInstance = null;

function drawRadar() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    if (radarInstance) {
        radarInstance.destroy();
        radarInstance = null;
    }

    radarInstance = new Chart(canvas, {
        type: 'radar',
        data: {
            labels: [
                'Python',
                'ML / DL',
                'LLM & RAG',
                'FastAPI',
                'NestJS',
                'Next.js',
                'Agentic AI',
                'OpenCV/YOLO',
                'Data Prep',
                'Flask/Django'
            ],
            datasets: [{
                label: 'Expertise %',
                data: [95, 90, 85, 90, 75, 75, 80, 85, 95, 80],
                backgroundColor: 'rgba(0, 217, 255, 0.12)',
                borderColor: '#00d9ff',
                pointBackgroundColor: '#7e00ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#00ff88',
                pointHoverBorderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Technical Proficiency',
                    color: '#a0a0c0',
                    font: { size: 13 }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        display: false,
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    grid: { color: 'rgba(160,160,192,0.15)' },
                    angleLines: { color: 'rgba(160,160,192,0.15)' },
                    pointLabels: {
                        color: '#a0a0c0',
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}