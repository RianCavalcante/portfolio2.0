document.addEventListener('DOMContentLoaded', function () {
    let currentTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeToggler = document.getElementById('theme-toggler');
    const iconContainer = document.getElementById('icon-cloud-container');

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

    const words = [
        'Especialista em Automação Inteligente',
        'Arquiteto de Soluções com IA',
        'Otimizador de Processos Empresariais'
    ];
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

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.skill-card, .project-card');
            openModal(card);
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

    applyTheme(currentTheme);
});
