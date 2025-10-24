document.addEventListener('DOMContentLoaded', function () {
    let currentTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeToggler = document.getElementById('theme-toggler');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const iconContainer = document.getElementById('icon-cloud-container');
    const fingerprintOverlay = document.getElementById('fingerprint-overlay');
    const fingerprintContainer = fingerprintOverlay ? fingerprintOverlay.querySelector('.fingerprint-container') : null;
    const languageToggle = document.getElementById('language-toggle');
    const languageToggleLabel = document.getElementById('language-toggle-label');
    let currentLanguage = localStorage.getItem('language') || 'pt';

    const translations = {
        en: {
            'nav.about': ['About', 'About'],
            'nav.skills': ['Skills', 'Skills'],
            'nav.projects': ['Projects', 'Projects'],
            'nav.contact': ['Contact', 'Contact'],
            'section.about.title': ['About_Me'],
            'about.paragraphs': [
                '&gt; Hello! I am Rian Cavalcante, an intelligent automation specialist focused on transforming business operations into efficient and scalable processes.',
                '&gt; I build AI agents that qualify leads, automate WhatsApp support, integrate CRMs, and eliminate operational bottlenecks. My work helps companies reduce manual tasks, scale with quality, and free their teams for strategic decisions.',
                '&gt; From process mapping to the delivery of intelligent systems, I create solutions that drive real impact: more conversions, predictable pipelines, and sustainable growth. I am currently deepening my Python expertise to design even more robust and customized architectures.'
            ],
            'about.photoLabel': ['AI Specialist'],
            'section.skills.title': ['Core_Skills'],
            'skills.automation.title': ['AI Automation'],
            'skills.automation.subtitle': ['Process Agents'],
            'skills.automation.details': ['<p>I design bespoke AI agents that operate autonomously to optimize processes, reduce costs, and boost operational efficiency. My solutions include:</p><ul class="space-y-2 text-left mt-4"><li>24/7 AI agents for customer support</li><li>Automated sales (virtual SDR/BDR)</li><li>Automatic lead qualification</li><li>Operational process monitoring</li><li>Automatic reporting and analytics</li><li>Elimination of bottlenecks and repetitive tasks</li></ul>'],
            'skills.integration.title': ['System Integration'],
            'skills.integration.subtitle': ['WhatsApp, CRM, APIs'],
            'skills.integration.details': ['<p>I connect digital ecosystems to build cohesive and automated workflows. From WhatsApp to your CRM, I ensure platforms talk to each other, eliminating manual data entry and preserving data consistency.</p><ul class="space-y-2 text-left mt-4"><li>WhatsApp Business integration for automated support</li><li>CRM syncing (automatic data updates)</li><li>Integration with Google Sheets/Forms</li><li>APIs for system-to-system communication</li><li>Automated scheduling workflows</li><li>Data synchronization across platforms</li></ul>'],
            'skills.qualification.title': ['Intelligent Qualification'],
            'skills.qualification.subtitle': ['Funnel triage & optimization'],
            'skills.qualification.details': ['<p>I transform the sales process by automating lead triage and qualification. AI helps me identify high-potential clients so your sales team can focus on closing deals instead of chasing prospects.</p><ul class="space-y-2 text-left mt-4"><li>Automatic ICP profiling</li><li>Urgency and conversion scoring</li><li>Routing to specialized teams</li><li>Automated and personalized follow-ups</li><li>Data-driven conversion optimization</li><li>Shorter sales cycles</li></ul>'],
            'skills.database.title': ['Databases'],
            'skills.database.subtitle': ['Structuring & Optimization'],
            'skills.database.details': ['<p>I structure and optimize databases that power high-performance AI solutions. From SQL for structured data to NoSQL and vector stores, I cover the foundations needed for semantic search and LLM applications.</p><ul class="space-y-2 text-left mt-4"><li>Schema design for performance</li><li>Query optimization</li><li>Vector database implementation (e.g., Pinecone)</li><li>Management of unstructured data (NoSQL)</li><li>Data integrity and security</li><li>Architecture for scalability</li></ul>'],
            'skills.detailButton': ['See details', 'See details', 'See details', 'See details'],
            'section.tools.title': ['Tools & Platforms'],
            'tools.paragraph1': ['I believe the right tools amplify innovation. My stack spans automation platforms such as <span class="accent-color">n8n</span> and <span class="accent-color">Make</span>, and robust databases like <span class="accent-color">PostgreSQL</span> and <span class="accent-color">Firebase</span>.'],
            'tools.paragraph2': ['I rely on this ecosystem to build, train, and deploy AI solutions. For hosting essential services, I trust VPS providers like <span class="accent-color">DigitalOcean</span> and <span class="accent-color">Hostinger</span>, ensuring scalability and availability across all projects.'],
            'tools.canvasFallback': ['Your browser does not support the HTML5 canvas.'],
            'section.projects.title': ['Highlighted_Projects'],
            'projects.telemedicine.sector': ['Healthcare'],
            'projects.telemedicine.title': ['AI for Telemedicine'],
            'projects.telemedicine.description': ['Virtual assistant supporting doctors and medical students during shifts.'],
            'projects.telemedicine.details': ['<h4>The Challenge</h4><p>Deliver real-time support to doctors and medical students during shifts, helping them access information quickly for clinical decisions.</p><h4>The Implemented Solution</h4><p>An AI telemedicine assistant designed to accelerate service delivery and offer guidance aligned with up-to-date medical protocols.</p><h4>Key Features</h4><ul><li><strong>Medication Lookup:</strong> Quick access to drug information aligned with current guidelines.</li><li><strong>Prescription Suggestions:</strong> Recommendations based on diagnoses and symptoms.</li><li><strong>Chart Optimization:</strong> Assisted structuring and completion of medical records.</li></ul>'],
            'projects.advocacy.sector': ['Legal'],
            'projects.advocacy.title': ['AI Agent for Law Firms'],
            'projects.advocacy.description': ['Automated lead qualification and CRM integration.'],
            'projects.advocacy.details': ['<h4>The Challenge</h4><p>Handle large volumes of leads from Facebook Ads while identifying qualified prospects without overloading the legal team.</p><h4>The Implemented Solution</h4><p>A fully autonomous AI agent that triages and qualifies leads, schedules appointments, and keeps the CRM updated so the commercial team acts at the right moment.</p><h4>Key Features</h4><ul><li><strong>Demand Understanding:</strong> Captures the nuances of each inquiry within labor law.</li><li><strong>Automatic Qualification:</strong> Scores leads using predefined criteria.</li><li><strong>CRM Integration:</strong> Manages the lead lifecycle in ClickUp and notifies the sales team when action is required.</li></ul>'],
            'projects.cosmetics.sector': ['Retail'],
            'projects.cosmetics.title': ['AI Agent for Cosmetics'],
            'projects.cosmetics.description': ['Initial customer support, catalog sharing, and quote creation.'],
            'projects.cosmetics.details': ['<h4>The Challenge</h4><p>Respond quickly and personally to Facebook Ads leads, providing product information and quotations for a cosmetics company.</p><h4>The Implemented Solution</h4><p>An AI agent that handles the initial interaction and qualification, keeping conversations personalized and handing off only purchase-ready leads to the sales team.</p><h4>Key Features</h4><ul><li><strong>Digital Catalog:</strong> Sends updated product lists directly to the customer.</li><li><strong>Quote Builder:</strong> Creates personalized quotations based on the customer's needs.</li><li><strong>Qualification & Handoff:</strong> Detects ready-to-buy leads and routes them to a human closer.</li></ul>'],
            'projects.dentistry.sector': ['Dental Care'],
            'projects.dentistry.title': ['AI Agent for Dental Clinics'],
            'projects.dentistry.description': ['Lead qualification and appointment scheduling via WhatsApp.'],
            'projects.dentistry.details': ['<h4>The Challenge</h4><p>Optimize lead qualification, FAQ handling, and appointment scheduling for a dental clinic while keeping all communication centralized on WhatsApp.</p><h4>The Implemented Solution</h4><p>An AI agent integrated directly with WhatsApp to manage every interaction from the first contact through to confirmed appointments.</p><h4>Key Features</h4><ul><li><strong>Lead Qualification:</strong> Covers the entire journey for leads captured via Facebook Ads.</li><li><strong>Appointment Scheduling:</strong> Books visits based on the dentist's availability.</li><li><strong>FAQ Handling:</strong> Provides instant answers to common dental questions.</li><li><strong>Active Follow-ups:</strong> Automated reminders that reduce no-shows.</li></ul>'],
            'projects.common.cta': ['View Project Details', 'View Project Details', 'View Project Details'],
            'projects.dentistry.cta': ['Read Case Study'],
            'projects.dentistry.ribbon': ['Case Study'],
            'footer.title': ["Let's Connect"],
            'footer.subtitle': ["I'm open to new opportunities and collaborations. Feel free to reach out."],
            'footer.copy': ['ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© 2024 Rian Cavalcante. All rights reserved.'],
            'fingerprint.status': ['Authenticating...']
        }
    };

    const typewriterWords = {
        pt: [
            'Especialista em AutomaÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â£o Inteligente',
            'Arquiteto de SoluÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â§ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Âµes com IA',
            'Otimizador de Processos Empresariais'
        ],
        en: [
            'Intelligent Automation Specialist',
            'AI Solutions Architect',
            'Business Process Optimizer'
        ]
    };

    const skillCards = document.querySelectorAll('#habilidades .skill-card');
    const projectCards = document.querySelectorAll('#projetos .project-card');

    const i18nTargets = {
        'nav.about': document.querySelectorAll('[data-i18n-key="nav.about"]'),
        'nav.skills': document.querySelectorAll('[data-i18n-key="nav.skills"]'),
        'nav.projects': document.querySelectorAll('[data-i18n-key="nav.projects"]'),
        'nav.contact': document.querySelectorAll('[data-i18n-key="nav.contact"]'),
        'section.about.title': [document.querySelector('#sobre h2.section-title')].filter(Boolean),
        'about.paragraphs': document.querySelectorAll('#sobre .terminal-text p'),
        'about.photoLabel': [document.querySelector('.terminal-photo-label')].filter(Boolean),
        'section.skills.title': [document.querySelector('#habilidades h2.section-title')].filter(Boolean),
        'skills.automation.title': [skillCards[0]?.querySelector('h3')].filter(Boolean),
        'skills.automation.subtitle': [skillCards[0]?.querySelector('p.text-xs')].filter(Boolean),
        'skills.automation.details': [skillCards[0]?.querySelector('.details-content')].filter(Boolean),
        'skills.integration.title': [skillCards[1]?.querySelector('h3')].filter(Boolean),
        'skills.integration.subtitle': [skillCards[1]?.querySelector('p.text-xs')].filter(Boolean),
        'skills.integration.details': [skillCards[1]?.querySelector('.details-content')].filter(Boolean),
        'skills.qualification.title': [skillCards[2]?.querySelector('h3')].filter(Boolean),
        'skills.qualification.subtitle': [skillCards[2]?.querySelector('p.text-xs')].filter(Boolean),
        'skills.qualification.details': [skillCards[2]?.querySelector('.details-content')].filter(Boolean),
        'skills.database.title': [skillCards[3]?.querySelector('h3')].filter(Boolean),
        'skills.database.subtitle': [skillCards[3]?.querySelector('p.text-xs')].filter(Boolean),
        'skills.database.details': [skillCards[3]?.querySelector('.details-content')].filter(Boolean),
        'skills.detailButton': Array.from(skillCards).map(card => card.querySelector('.details-btn')).filter(Boolean),
        'section.tools.title': [document.querySelector('#habilidades .mt-20 h3')].filter(Boolean),
        'tools.paragraph1': [document.querySelector('#habilidades .mt-20 .md\\:w-1\\/2 p:nth-of-type(1)')].filter(Boolean),
        'tools.paragraph2': [document.querySelector('#habilidades .mt-20 .md\\:w-1\\/2 p:nth-of-type(2)')].filter(Boolean),
        'tools.canvasFallback': [document.querySelector('#iconCanvas p')].filter(Boolean),
        'section.projects.title': [document.querySelector('#projetos h2.section-title')].filter(Boolean),
        'projects.telemedicine.sector': [projectCards[0]?.querySelector('.text-xs')].filter(Boolean),
        'projects.telemedicine.title': [projectCards[0]?.querySelector('h3')].filter(Boolean),
        'projects.telemedicine.description': [projectCards[0]?.querySelector('.text-sm')].filter(Boolean),
        'projects.telemedicine.details': [projectCards[0]?.querySelector('.details-content')].filter(Boolean),
        'projects.advocacy.sector': [projectCards[1]?.querySelector('.text-xs')].filter(Boolean),
        'projects.advocacy.title': [projectCards[1]?.querySelector('h3')].filter(Boolean),
        'projects.advocacy.description': [projectCards[1]?.querySelector('.text-sm')].filter(Boolean),
        'projects.advocacy.details': [projectCards[1]?.querySelector('.details-content')].filter(Boolean),
        'projects.cosmetics.sector': [projectCards[2]?.querySelector('.text-xs')].filter(Boolean),
        'projects.cosmetics.title': [projectCards[2]?.querySelector('h3')].filter(Boolean),
        'projects.cosmetics.description': [projectCards[2]?.querySelector('.text-sm')].filter(Boolean),
        'projects.cosmetics.details': [projectCards[2]?.querySelector('.details-content')].filter(Boolean),
        'projects.dentistry.sector': [projectCards[3]?.querySelector('.text-xs')].filter(Boolean),
        'projects.dentistry.title': [projectCards[3]?.querySelector('h3')].filter(Boolean),
        'projects.dentistry.description': [projectCards[3]?.querySelector('.text-sm')].filter(Boolean),
        'projects.dentistry.details': [projectCards[3]?.querySelector('.details-content')].filter(Boolean),
        'projects.common.cta': [
            projectCards[0]?.querySelector('.details-btn'),
            projectCards[1]?.querySelector('.details-btn'),
            projectCards[2]?.querySelector('.details-btn')
        ].filter(Boolean),
        'projects.dentistry.cta': [projectCards[3]?.querySelector('.details-btn')].filter(Boolean),
        'footer.title': [document.querySelector('footer h2')].filter(Boolean),
        'footer.subtitle': [document.querySelector('footer p.text-gray-400')].filter(Boolean),
        'footer.copy': [document.querySelector('footer p.text-xs')].filter(Boolean),
        'fingerprint.status': [document.querySelector('.fingerprint-text')].filter(Boolean)
    };

    const ptContent = {};
    Object.entries(i18nTargets).forEach(([key, nodes]) => {
        ptContent[key] = Array.from(nodes).map(node => node.innerHTML);
    });

    const caseCard = document.querySelector('.project-card--case');
    const caseLabelTranslations = {
        pt: caseCard ? caseCard.getAttribute('data-case-label') || 'Caso de Estudo' : 'Caso de Estudo',
        en: 'Case Study'
    };
    if (caseCard) {
        caseCard.dataset.caseLabelPt = caseLabelTranslations.pt;
    }

    function updateLanguageToggleLabel(lang) {
        if (!languageToggle || !languageToggleLabel) return;
        languageToggleLabel.textContent = lang === 'pt' ? 'EN' : 'PT';
        const ariaLabel = lang === 'pt' ? 'Switch to English' : 'Switch to Portuguese';
        languageToggle.setAttribute('aria-label', ariaLabel);
        if (lang === 'en') {
            languageToggle.classList.add('active');
        } else {
            languageToggle.classList.remove('active');
        }
    }

    function applyTranslations(lang) {
        Object.entries(i18nTargets).forEach(([key, nodes]) => {
            const values = lang === 'pt' ? ptContent[key] : translations[lang]?.[key] || ptContent[key];
            if (!values) return;
            nodes.forEach((node, index) => {
                const value = Array.isArray(values) ? values[index] ?? values[values.length - 1] : values;
                if (value !== undefined) {
                    node.innerHTML = value;
                }
            });
        });
        if (caseCard) {
            caseCard.setAttribute('data-case-label', caseLabelTranslations[lang] || caseLabelTranslations.pt);
        }
    }

    function setLanguage(lang) {
        if (lang !== 'pt' && !translations[lang]) {
            lang = 'pt';
        }
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        applyTranslations(lang);
        updateLanguageToggleLabel(lang);
        words = typewriterWords[lang] || typewriterWords.pt;
        i = 0;
        j = 0;
        currentWord = '';
        isDeleting = false;
        if (typewriterElement) {
            typewriterElement.textContent = '';
        }
    }

    const darkParticles = {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#30363d' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#30363d', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } } }
        },
        retina_detect: true
    };

    const lightParticles = {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#adb5bd' },
            shape: { type: 'circle' },
            opacity: { value: 0.6, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ced4da', opacity: 0.5, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } } }
        },
        retina_detect: true
    };

    let particlesInitialized = false;

    function renderParticles(theme) {
        const config = theme === 'light' ? lightParticles : darkParticles;
        if (particlesInitialized && window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }
        if (typeof particlesJS === 'function') {
            particlesJS('particles-js', config);
            particlesInitialized = true;
        }
    }

    function scheduleParticles(theme) {
        if (particlesInitialized) {
            renderParticles(theme);
            return;
        }
        const start = () => renderParticles(theme);
        if ('requestIdleCallback' in window) {
            requestIdleCallback(start, { timeout: 600 });
        } else {
            setTimeout(start, 200);
        }
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
        scheduleParticles(theme);
    }

    themeToggler.addEventListener('click', () => {
        currentTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });

    let words = typewriterWords[currentLanguage] || typewriterWords.pt;
    let i = 0;
    let j = 0;
    let currentWord = '';
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');

    function type() {
        currentWord = words[i];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, j - 1);
            j--;
            if (j === 0) {
                isDeleting = false;
                i++;
                if (i === words.length) i = 0;
            }
        } else {
            typewriterElement.textContent = currentWord.substring(0, j + 1);
            j++;
            if (j === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 150);
    }

    setLanguage(currentLanguage);

    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            const nextLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
            setLanguage(nextLanguage);
        });
    }

    type();

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    let tagCanvasStarted = false;
    function startTagCanvas() {
        if (tagCanvasStarted || typeof TagCanvas === 'undefined') {
            return;
        }
        try {
            TagCanvas.Start('iconCanvas', 'icon-tags', {
                textColour: '#58a6ff',
                outlineColour: 'transparent',
                reverse: true,
                depth: 0.8,
                maxSpeed: 0.05,
                weight: true,
                imageScale: 1.2,
                initial: [0.05, -0.05],
                wheelZoom: false
            });
            tagCanvasStarted = true;
        } catch (e) {
            console.error('Erro ao iniciar TagCanvas:', e);
            if (iconContainer) {
                iconContainer.style.display = 'none';
            }
        }
    }

    if (iconContainer) {
        const tagObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTagCanvas();
                    obs.disconnect();
                }
            });
        }, { threshold: 0.1 });
        tagObserver.observe(iconContainer);
    }

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header, footer');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 80) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('modal-close-btn');

    function openModal(card) {
        const title = card.querySelector('h3').textContent;
        const details = card.querySelector('.details-content').innerHTML;

        modalTitle.textContent = title;
        modalBody.innerHTML = details;

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('visible'), 10);
    }

    function closeModal() {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function playFingerprintSequence(onComplete) {
        if (!fingerprintOverlay || !fingerprintContainer) {
            onComplete();
            return;
        }

        const finish = () => {
            fingerprintContainer.classList.remove('active');
            fingerprintOverlay.classList.add('hidden');
            fingerprintOverlay.setAttribute('aria-hidden', 'true');
            fingerprintContainer.removeEventListener('animationend', finish);
            onComplete();
        };

        fingerprintOverlay.classList.remove('hidden');
        fingerprintOverlay.setAttribute('aria-hidden', 'false');
        fingerprintContainer.classList.remove('active');
        void fingerprintContainer.offsetWidth;
        fingerprintContainer.classList.add('active');
        fingerprintContainer.addEventListener('animationend', finish, { once: true });
        setTimeout(() => {
            if (!fingerprintOverlay.classList.contains('hidden')) {
                finish();
            }
        }, 6200);
    }

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.skill-card, .project-card');
            if (!card) {
                return;
            }
            if (card.classList.contains('project-card')) {
                playFingerprintSequence(() => openModal(card));
            } else {
                openModal(card);
            }
        });
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    if (mobileToggle && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');

        function toggleMobileMenu(forceClose = false) {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (forceClose || isOpen) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                mobileToggle.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                mobileToggle.setAttribute('aria-expanded', 'true');
            }
        }

        mobileToggle.addEventListener('click', () => toggleMobileMenu());

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMobileMenu(true));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                toggleMobileMenu(true);
            }
        });
    }

    applyTheme(currentTheme);
});





