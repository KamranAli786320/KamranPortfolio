document.addEventListener('DOMContentLoaded', function () {

    // ===================== NAVIGATION =====================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    // Set home active on load
    document.getElementById('home').classList.add('active');

    /**
     * Central navigation function.
     * Call this from ANYWHERE to switch to a section by ID (e.g. 'portfolio').
     */
    function navigateTo(sectionId) {
        // Remove active from all sections and nav links
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        // Show target section
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
            // Small delay so display:block kicks in before scroll
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 30);
        }

        // Highlight matching nav link (href="#sectionId")
        const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (matchingLink) matchingLink.classList.add('active');

        // Close mobile menu if open
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
        }
    }

    // Wire up ALL .nav-link clicks (includes the "View My Work" button since it has nav-link class)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href'); // e.g. "#portfolio"
            if (href && href.startsWith('#')) {
                navigateTo(href.substring(1));
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (mobileMenu &&
            !e.target.closest('.mobile-menu') &&
            !e.target.closest('.nav-links')) {
            mobileMenu.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
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
    function createRadarChart() {
        const radarElement = document.getElementById('radarChart');
        if (!radarElement) return;

        const ctx = radarElement.getContext('2d');

        // Destroy old instance if exists
        if (window.myRadarChart) {
            window.myRadarChart.destroy();
        }

        window.myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Python',
                    'AI/ML/DL',
                    'LLM & RAG',
                    'FastAPI',
                    'NestJS',
                    'Next.js',
                    'Agentic AI',
                    'Computer Vision'
                ],
                datasets: [{
                    label: 'Expertise Level',
                    data: [95, 90, 85, 90, 75, 75, 80, 85],
                    backgroundColor: 'rgba(0, 217, 255, 0.2)',
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
                        text: 'Technical Proficiency',
                        color: '#f0f8ff'
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(160, 160, 192, 0.2)' },
                        grid: { color: 'rgba(160, 160, 192, 0.2)' },
                        pointLabels: { color: '#a0a0c0', font: { size: 12 } },
                        ticks: {
                            display: false,
                            backdropColor: 'transparent',
                            max: 100,
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    // ===================== ANALYTICS (kept for future use) =====================
    const projectData = {
        'heart-disease': {
            name: 'Heart Disease Prediction',
            type: 'classification',
            metrics: { accuracy: 92, precision: 90, recall: 88, 'f1-score': 89 },
            techStack: { 'Python': 95, 'Pandas': 90, 'NumPy': 85, 'Scikit-learn': 90, 'Matplotlib': 80, 'Seaborn': 75 },
            algorithms: { 'Logistic Regression': 85, 'Random Forest': 92, 'XGBoost': 90, 'SVM': 82, 'K-NN': 78 }
        },
        'iris': {
            name: 'Iris Flower Classification',
            type: 'classification',
            metrics: { accuracy: 98, precision: 97, recall: 96, 'f1-score': 97 },
            techStack: { 'Python': 95, 'Pandas': 85, 'NumPy': 80, 'Scikit-learn': 95, 'Matplotlib': 75, 'Seaborn': 70 },
            algorithms: { 'Logistic Regression': 95, 'Random Forest': 98, 'SVM': 92, 'K-NN': 90, 'Decision Tree': 88 }
        },
        'chatbot': {
            name: 'AI Chatbots',
            type: 'nlp',
            metrics: { 'bleu-score': 0.75, 'perplexity': 45.2 },
            techStack: { 'Python': 90, 'Transformers': 85, 'PyTorch': 80, 'Hugging Face': 75, 'Gradio': 70, 'Streamlit': 65 },
            algorithms: { 'LLaMA Fine-tuning': 85, 'BERT': 80, 'GPT-2': 75, 'RAG System': 82, 'Prompt Engineering': 78 }
        },
        'phishing': {
            name: 'Phishing Detection',
            type: 'classification',
            metrics: { accuracy: 94, precision: 92, recall: 91, 'f1-score': 92 },
            techStack: { 'Python': 90, 'Pandas': 85, 'NumPy': 80, 'Scikit-learn': 88, 'BeautifulSoup': 75, 'Requests': 70 },
            algorithms: { 'Random Forest': 94, 'XGBoost': 92, 'Logistic Regression': 85, 'SVM': 82, 'Neural Network': 80 }
        },
        'ecommerce': {
            name: 'E-Commerce Analysis',
            type: 'regression',
            metrics: { 'r2-score': 0.85, 'rmse': 0.12 },
            techStack: { 'Python': 90, 'Pandas': 95, 'NumPy': 85, 'Matplotlib': 80, 'Seaborn': 85, 'Plotly': 75 },
            algorithms: { 'Linear Regression': 82, 'Decision Tree': 78, 'Random Forest': 85, 'XGBoost': 88, 'Neural Network': 80 }
        }
    };

    // Analytics dropdown (safe — won't crash if analytics section is commented out)
    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdownContent = document.getElementById('dropdown-content');
    const selectedProject = document.getElementById('selected-project');
    const metricsContainer = document.getElementById('metrics-container');

    if (metricsContainer) updateProjectAnalytics('heart-disease');

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('active');
        });
    }

    document.addEventListener('click', function () {
        if (dropdownContent) dropdownContent.classList.remove('active');
    });

    if (dropdownContent) {
        dropdownContent.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                const projectId = e.target.getAttribute('data-project');
                updateProjectAnalytics(projectId);
                if (selectedProject) selectedProject.textContent = projectData[projectId].name;
                dropdownContent.classList.remove('active');
            }
        });
    }

    function updateProjectAnalytics(projectId) {
        const project = projectData[projectId];
        if (!project || !metricsContainer) return;

        metricsContainer.classList.remove('show-classification', 'show-regression', 'show-nlp');
        if (project.type === 'classification' || project.type === 'computer-vision') {
            metricsContainer.classList.add('show-classification');
        } else if (project.type === 'regression') {
            metricsContainer.classList.add('show-regression');
        } else if (project.type === 'nlp') {
            metricsContainer.classList.add('show-nlp');
        }

        const metricValues = {
            accuracy: document.getElementById('accuracy'),
            precision: document.getElementById('precision'),
            recall: document.getElementById('recall'),
            'f1-score': document.getElementById('f1-score'),
            'r2-score': document.getElementById('r2-score'),
            'rmse': document.getElementById('rmse'),
            'bleu-score': document.getElementById('bleu-score'),
            'perplexity': document.getElementById('perplexity')
        };

        Object.keys(metricValues).forEach(metric => {
            if (metricValues[metric] && project.metrics[metric] !== undefined) {
                const val = project.metrics[metric];
                if (typeof val === 'number') {
                    if (metric.includes('score') && val <= 1) {
                        metricValues[metric].textContent = val.toFixed(3);
                    } else {
                        animateValue(metricValues[metric], 0, val, 1000);
                    }
                } else {
                    metricValues[metric].textContent = val;
                }
            }
        });

        updateChart('techStackChart', 'doughnut', project.techStack);
        updateChart('algorithmChart', 'bar', project.algorithms);
    }

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    const chartInstances = {};
    function updateChart(canvasId, type, dataObj) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
        chartInstances[canvasId] = new Chart(canvas.getContext('2d'), {
            type: type,
            data: {
                labels: Object.keys(dataObj),
                datasets: [{
                    data: Object.values(dataObj),
                    backgroundColor: [
                        'rgba(0,217,255,0.7)', 'rgba(126,0,255,0.7)', 'rgba(0,255,136,0.7)',
                        'rgba(255,170,0,0.7)', 'rgba(255,0,102,0.7)', 'rgba(200,0,255,0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#a0a0c0' } } },
                scales: type === 'bar' ? {
                    y: { beginAtZero: true, max: 100, ticks: { color: '#a0a0c0' } },
                    x: { ticks: { color: '#a0a0c0' }, grid: { display: false } }
                } : {}
            }
        });
    }

    // ===================== CONTACT FORM =====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
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
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000);
    }
});