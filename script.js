document.addEventListener('DOMContentLoaded', function () {

    // ===================== NAVIGATION =====================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    document.getElementById('home').classList.add('active');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.classList.add('active');
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
                setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
            }
        });
    });

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.mobile-menu') && !e.target.closest('.nav-links')) {
            if (mobileMenu) mobileMenu.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });

    // ===================== PORTFOLIO FILTER =====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.4s ease-out forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ===================== SKILL BARS =====================
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    createRadarChart();
                }
            });
        });
        observer.observe(skillsSection);
    }

    // ===================== RADAR CHART =====================
    let radarChartInstance = null;

    function createRadarChart() {
        const canvas = document.getElementById('radarChart');
        if (!canvas) return;
        if (radarChartInstance) return; // don't recreate

        const ctx = canvas.getContext('2d');
        radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'TensorFlow', 'LLM', 'NLP', 'OpenCV', 'LangChain', 'Data Analysis', 'RAG Systems'],
                datasets: [{
                    label: 'Technical Skills',
                    data: [95, 85, 80, 85, 70, 75, 90, 85],
                    backgroundColor: 'rgba(0, 217, 255, 0.15)',
                    borderColor: 'rgba(0, 217, 255, 1)',
                    pointBackgroundColor: 'rgba(0, 217, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 217, 255, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Skills Radar',
                        color: '#f0f8ff',
                        font: { size: 14 }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(160, 160, 192, 0.15)' },
                        grid: { color: 'rgba(160, 160, 192, 0.15)' },
                        pointLabels: { color: '#a0a0c0', font: { size: 11 } },
                        ticks: { backdropColor: 'transparent', color: '#a0a0c0', stepSize: 20 }
                    }
                }
            }
        });
    }

    // ===================== TYPING ANIMATION =====================
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 90);
            }
        }
        setTimeout(typeWriter, 800);
    }

    // ===================== CONTACT FORM =====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"] span');
            const origText = btn.textContent;
            btn.textContent = 'Message Sent ✓';
            setTimeout(() => {
                btn.textContent = origText;
                this.reset();
            }, 3000);
        });
    }

    // ===================== SMOOTH SCROLL ACTIVE NAV ON HASH =====================
    const hash = window.location.hash;
    if (hash) {
        const targetLink = document.querySelector(`.nav-link[href="${hash}"]`);
        if (targetLink) targetLink.click();
    }

});