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
        pt: {
            'nav.about': 'Sobre',
            'nav.skills': 'Habilidades',
            'nav.projects': 'Projetos',
            'nav.contact': 'Contato',
            'section.about.title': 'Sobre_Mim',
            'about.paragraph1': '&gt; OlÃ¡! Sou Rian Cavalcante, especialista em automaÃ§Ã£o inteligente com IA, focado em transformar operaÃ§Ãµes empresariais em processos eficientes e escalÃ¡veis.',
            'about.paragraph2': '&gt; Atuo desenvolvendo agentes de IA que qualificam leads, automatizam atendimento via WhatsApp, integram CRMs e eliminam gargalos operacionais. Meu trabalho permite que empresas reduzam dependÃªncia de tarefas manuais, escalem com qualidade e liberem suas equipes para decisÃµes estratÃ©gicas.',
            'about.paragraph3': '&gt; Do mapeamento de processos Ã  implementaÃ§Ã£o de sistemas inteligentes, construo soluÃ§Ãµes que geram impacto real: mais conversÃµes, pipelines previsÃ­veis e crescimento sustentÃ¡vel. Atualmente aprofundando conhecimentos em Python para criar arquiteturas ainda mais robustas e personalizadas.',
            'section.skills.title': 'Habilidades_Principais',
            'skills.detailButton': 'Ver detalhes',
            'skills.automation.title': 'AutomaÃ§Ã£o com IA',
            'skills.automation.subtitle': 'Agentes para processos',
            'skills.automation.details': `<p>Desenvolvo agentes de IA customizados que operam de forma autÃ´noma para otimizar processos, reduzir custos e aumentar a eficiÃªncia operacional do seu negÃ³cio. Minhas soluÃ§Ãµes incluem:</p><ul class="space-y-2 text-left mt-4"><li>CriaÃ§Ã£o de agentes de IA para atendimento 24/7</li><li>AutomaÃ§Ã£o de vendas (SDR/BDR virtual)</li><li>QualificaÃ§Ã£o automÃ¡tica de leads</li><li>Monitoramento de processos operacionais</li><li>GeraÃ§Ã£o automÃ¡tica de relatÃ³rios e anÃ¡lises</li><li>EliminaÃ§Ã£o de gargalos e tarefas repetitivas</li></ul>`,
            'skills.integration.title': 'IntegraÃ§Ã£o de Sistemas',
            'skills.integration.subtitle': 'WhatsApp, CRM, APIs',
            'skills.integration.details': `<p>Conecto ecossistemas digitais para criar fluxos de trabalho coesos e automatizados. Minha expertise permite que diferentes plataformas, do WhatsApp ao seu CRM, conversem entre si, eliminando a entrada manual de dados e garantindo a consistÃªncia das informaÃ§Ãµes.</p><ul class="space-y-2 text-left mt-4"><li>IntegraÃ§Ã£o WhatsApp Business para atendimento automatizado</li><li>ConexÃ£o com CRM (atualizaÃ§Ã£o automÃ¡tica de dados)</li><li>IntegraÃ§Ã£o com Google Sheets/Forms</li><li>APIs para comunicaÃ§Ã£o entre sistemas</li><li>AutomaÃ§Ã£o de agendamentos</li><li>SincronizaÃ§Ã£o de dados entre plataformas</li></ul>`,
            'skills.qualification.title': 'QualificaÃ§Ã£o Inteligente',
            'skills.qualification.subtitle': 'Triagem e otimizaÃ§Ã£o de funis',
            'skills.qualification.details': `<p>Transformo o processo de vendas com a automaÃ§Ã£o da triagem e qualificaÃ§Ã£o de leads. Utilizo IA para analisar e identificar os clientes com maior potencial de conversÃ£o, permitindo que a sua equipe comercial foque em fechar negÃ³cios, e nÃ£o em procurar por eles.</p><ul class="space-y-2 text-left mt-4"><li>IdentificaÃ§Ã£o automÃ¡tica de perfil de cliente ideal</li><li>ClassificaÃ§Ã£o de urgÃªncia e potencial de conversÃ£o</li><li>Direcionamento para equipes especializadas</li><li>Follow-up automatizado e personalizado</li><li>AnÃ¡lise de dados para otimizaÃ§Ã£o de conversÃ£o</li><li>ReduÃ§Ã£o de tempo no funil de vendas</li></ul>`,
            'skills.database.title': 'Banco de Dados',
            'skills.database.subtitle': 'EstruturaÃ§Ã£o e OtimizaÃ§Ã£o',
            'skills.database.details': `<p>Estruturo e otimizo bancos de dados que sÃ£o a base para sistemas de IA de alta performance. Minha experiÃªncia abrange desde bancos relacionais (SQL) para dados estruturados, atÃ© NoSQL e vetoriais, essenciais para buscas semÃ¢nticas e aplicaÃ§Ãµes com LLMs.</p><ul class="space-y-2 text-left mt-4"><li>Design de schemas para performance</li><li>OtimizaÃ§Ã£o de consultas (queries)</li><li>ImplementaÃ§Ã£o de bancos vetoriais (ex: Pinecone)</li><li>Gerenciamento de dados nÃ£o estruturados (NoSQL)</li><li>Garantia de integridade e seguranÃ§a dos dados</li><li>Arquitetura para escalabilidade</li></ul>`,
            'section.tools.title': 'Ferramentas e Plataformas',
            'tools.paragraph1': 'Acredito que as ferramentas certas potencializam a inovaÃ§Ã£o. Minha experiÃªncia abrange um ecossistema de tecnologias de ponta, desde plataformas de automaÃ§Ã£o como <span class="accent-color">n8n</span> e <span class="accent-color">Make</span> atÃ© a robustez de bancos de dados como <span class="accent-color">PostgreSQL</span> e <span class="accent-color">Firebase</span>.',
            'tools.paragraph2': 'Utilizo essas plataformas para construir, treinar e implantar modelos de IA. Para a hospedagem de aplicaÃ§Ãµes e ferramentas essenciais, confio na performance de VPS em provedores como <span class="accent-color">DigitalOcean</span> e <span class="accent-color">Hostinger</span>, garantindo a escalabilidade e a disponibilidade dos meus projetos.',
            'tools.canvasFallback': 'Seu navegador nÃ£o suporta o canvas HTML5.',
            'section.projects.title': 'Projetos_em_Destaque',
            'projects.common.cta': 'Ver Detalhes do Projeto',
            'projects.telemedicine.sector': 'Setor de SaÃºde',
            'projects.telemedicine.title': 'IA para Telemedicina',
            'projects.telemedicine.description': 'Assistente virtual para suporte a mÃ©dicos e estudantes em plantÃµes.',
            'projects.telemedicine.details': `<h4>O Desafio</h4><p>Proporcionar agilidade e suporte rÃ¡pido a mÃ©dicos e estudantes de medicina em plantÃµes, que frequentemente necessitam de informaÃ§Ãµes e auxÃ­lio em tempo real para tomada de decisÃ£o clÃ­nica.</p><h4>A SoluÃ§Ã£o Implementada</h4><p>Desenvolvimento de uma InteligÃªncia Artificial de telemedicina projetada para ser um assistente virtual eficiente, acelerando o processo de atendimento e fornecendo suporte baseado em protocolos mÃ©dicos atualizados.</p><h4>Funcionalidades-Chave</h4><ul><li><strong>Consulta de MedicaÃ§Ã£o:</strong> Acesso rÃ¡pido a informaÃ§Ãµes de medicamentos com base em protocolos atualizados.</li><li><strong>SugestÃµes para PrescriÃ§Ãµes:</strong> GeraÃ§Ã£o de sugestÃµes com base em diagnÃ³sticos e sintomas.</li><li><strong>OtimizaÃ§Ã£o de ProntuÃ¡rios:</strong> EstruturaÃ§Ã£o e preenchimento automatizado de prontuÃ¡rios com assistÃªncia da IA.</li></ul>`,
            'projects.advocacy.sector': 'Setor JurÃ­dico',
            'projects.advocacy.title': 'Agente IA para Advocacia',
            'projects.advocacy.description': 'AutomaÃ§Ã£o da qualificaÃ§Ã£o de leads e integraÃ§Ã£o com CRM.',
            'projects.advocacy.details': `<h4>O Desafio</h4><p>Gerenciar e qualificar um alto volume de leads de campanhas de Facebook Ads para um escritÃ³rio de advocacia, identificando os potenciais clientes de forma eficiente sem consumir o tempo da equipe jurÃ­dica.</p><h4>A SoluÃ§Ã£o Implementada</h4><p>CriaÃ§Ã£o de um agente de IA autÃ´nomo para realizar a triagem e qualificaÃ§Ã£o inicial dos leads, direcionando-os para o time comercial apÃ³s o agendamento e gerenciando todo o processo no CRM.</p><h4>Funcionalidades-Chave</h4><ul><li><strong>CompreensÃ£o de Demanda:</strong> A IA entende a demanda especÃ­fica do lead em relaÃ§Ã£o ao direito trabalhista.</li><li><strong>QualificaÃ§Ã£o AutomÃ¡tica:</strong> O sistema determina se o lead Ã© qualificado com base em critÃ©rios prÃ©-definidos.</li><li><strong>IntegraÃ§Ã£o com CRM:</strong> O agente gerencia automaticamente o ciclo de vida do lead no CRM (ClickUp), notificando a equipe comercial no momento certo.</li></ul>`,
            'projects.cosmetics.sector': 'Setor de Varejo',
            'projects.cosmetics.title': 'Agente IA para CosmÃ©ticos',
            'projects.cosmetics.description': 'Atendimento inicial, envio de catÃ¡logo e criaÃ§Ã£o de orÃ§amentos.',
            'projects.cosmetics.details': `<h4>O Desafio</h4><p>Atender leads gerados por campanhas de Facebook Ads de forma Ã¡gil e personalizada, fornecendo informaÃ§Ãµes sobre produtos e orÃ§amentos para uma empresa de cosmÃ©ticos.</p><h4>A SoluÃ§Ã£o Implementada</h4><p>ImplementaÃ§Ã£o de um agente de IA para realizar o atendimento inicial e a qualificaÃ§Ã£o de clientes, mantendo uma conversa personalizada e encaminhando apenas os leads prontos para a compra ao time de vendas.</p><h4>Funcionalidades-Chave</h4><ul><li><strong>CatÃ¡logo Digital:</strong> Envio de tabelas de produtos atualizadas diretamente para o cliente.</li><li><strong>CriaÃ§Ã£o de OrÃ§amentos:</strong> ElaboraÃ§Ã£o de orÃ§amentos personalizados com base nas necessidades do cliente.</li><li><strong>QualificaÃ§Ã£o e TransferÃªncia:</strong> IdentificaÃ§Ã£o de leads qualificados e transferÃªncia automÃ¡tica para um vendedor humano finalizar a venda.</li></ul>`,
            'projects.dentistry.sector': 'Setor OdontolÃ³gico',
            'projects.dentistry.title': 'Agente IA para ClÃ­nica DentÃ¡ria',
            'projects.dentistry.description': 'QualificaÃ§Ã£o de leads e agendamento de consultas via WhatsApp.',
            'projects.dentistry.cta': 'Ler Caso de Estudo',
            'projects.dentistry.details': `<h4>O Desafio</h4><p>Otimizar o processo de qualificaÃ§Ã£o de leads, esclarecimento de dÃºvidas e agendamento de consultas para uma clÃ­nica dentÃ¡ria, centralizando toda a comunicaÃ§Ã£o e follow-ups via WhatsApp.</p><h4>A SoluÃ§Ã£o Implementada</h4><p>Desenvolvimento de um agente de IA integrado diretamente ao WhatsApp para gerenciar todas as interaÃ§Ãµes com os leads, desde o primeiro contato atÃ© o agendamento da consulta.</p><h4>Funcionalidades-Chave</h4><ul><li><strong>QualificaÃ§Ã£o de Leads:</strong> Realiza o processo completo de qualificaÃ§Ã£o dos leads gerados por campanhas do Facebook Ads.</li><li><strong>Agendamento de Consultas:</strong> Efetua agendamentos com base nas disponibilidades do dentista.</li><li><strong>Atendimento a DÃºvidas:</strong> Responde a dÃºvidas frequentes sobre serviÃ§os odontolÃ³gicos.</li><li><strong>Follow-ups Ativos:</strong> Sistema de follow-ups automatizados para lembretes de consultas.</li></ul>`,
            'projects.dentistry.ribbon': 'Caso de Estudo',
            'fingerprint.status': 'Autenticando...',
            'footer.title': 'Vamos nos conectar',
            'footer.subtitle': 'Estou aberto a novas oportunidades e colaboraÃ§Ãµes. Sinta-se Ã  vontade para entrar em contato.',
            'footer.copy': 'Â© 2024 Rian Cavalcante. Todos os direitos reservados.'
        },
        en: {
            'nav.about': 'About',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'section.about.title': 'About_Me',
            'about.paragraph1': '&gt; Hello! I am Rian Cavalcante, an intelligent automation specialist focused on transforming business operations into efficient and scalable processes.',
            'about.paragraph2': '&gt; I build AI agents that qualify leads, automate WhatsApp support, integrate CRMs, and eliminate operational bottlenecks. My work helps companies reduce manual tasks, scale with quality, and free their teams for strategic decisions.',
            'about.paragraph3': '&gt; From process mapping to the delivery of intelligent systems, I create solutions that drive real impact: more conversions, predictable pipelines, and sustainable growth. I am currently deepening my Python expertise to design even more robust and customized architectures.',
            'section.skills.title': 'Core_Skills',
            'skills.detailButton': 'See details',
            'skills.automation.title': 'AI Automation',
            'skills.automation.subtitle': 'Process Agents',
            'skills.automation.details': `<p>I design bespoke AI agents that operate autonomously to optimize processes, reduce costs, and boost operational efficiency. My solutions include:</p><ul class="space-y-2 text-left mt-4"><li>24/7 AI agents for customer support</li><li>Automated sales (virtual SDR/BDR)</li><li>Automatic lead qualification</li><li>Operational process monitoring</li><li>Automatic reporting and analytics</li><li>Elimination of bottlenecks and repetitive tasks</li></ul>`,
            'skills.integration.title': 'System Integration',
            'skills.integration.subtitle': 'WhatsApp, CRM, APIs',
            'skills.integration.details': `<p>I connect digital ecosystems to build cohesive and automated workflows. From WhatsApp to your CRM, I ensure platforms talk to each other, eliminating manual data entry and preserving data consistency.</p><ul class="space-y-2 text-left mt-4"><li>WhatsApp Business integration for automated support</li><li>CRM syncing (automatic data updates)</li><li>Integration with Google Sheets/Forms</li><li>APIs for system-to-system communication</li><li>Automated scheduling workflows</li><li>Data synchronization across platforms</li></ul>`,
            'skills.qualification.title': 'Intelligent Qualification',
            'skills.qualification.subtitle': 'Funnel triage & optimization',
            'skills.qualification.details': `<p>I transform the sales process by automating lead triage and qualification. AI helps me identify high-potential clients so your sales team can focus on closing deals instead of chasing prospects.</p><ul class="space-y-2 text-left mt-4"><li>Automatic ICP profiling</li><li>Urgency and conversion scoring</li><li>Routing to specialized teams</li><li>Automated and personalized follow-ups</li><li>Data-driven conversion optimization</li><li>Shorter sales cycles</li></ul>`,
            'skills.database.title': 'Databases',
            'skills.database.subtitle': 'Structuring & Optimization',
            'skills.database.details': `<p>I structure and optimize databases that power high-performance AI solutions. From SQL for structured data to NoSQL and vector stores, I cover the foundations needed for semantic search and LLM applications.</p><ul class="space-y-2 text-left mt-4"><li>Schema design for performance</li><li>Query optimization</li><li>Vector database implementation (e.g., Pinecone)</li><li>Management of unstructured data (NoSQL)</li><li>Data integrity and security</li><li>Architecture for scalability</li></ul>`,
            'section.tools.title': 'Tools & Platforms',
            'tools.paragraph1': 'I believe the right tools amplify innovation. My stack spans automation platforms such as <span class="accent-color">n8n</span> and <span class="accent-color">Make</span>, and robust databases like <span class="accent-color">PostgreSQL</span> and <span class="accent-color">Firebase</span>.',
            'tools.paragraph2': 'I rely on this ecosystem to build, train, and deploy AI solutions. For hosting essential services, I trust VPS providers like <span class="accent-color">DigitalOcean</span> and <span class="accent-color">Hostinger</span>, ensuring scalability and availability across all projects.',
            'tools.canvasFallback': 'Your browser does not support the HTML5 canvas.',
            'section.projects.title': 'Highlighted_Projects',
            'projects.common.cta': 'View Project Details',
            'projects.telemedicine.sector': 'Healthcare',
            'projects.telemedicine.title': 'AI for Telemedicine',
            'projects.telemedicine.description': 'Virtual assistant supporting doctors and medical students during shifts.',
            'projects.telemedicine.details': `<h4>The Challenge</h4><p>Deliver real-time support to doctors and medical students on call, helping them access information quickly for clinical decisions.</p><h4>The Solution</h4><p>An AI telemedicine assistant designed to accelerate service delivery and offer guidance aligned with up-to-date medical protocols.</p><h4>Key Features</h4><ul><li><strong>Medication Lookup:</strong> Quick access to drug information aligned with current guidelines.</li><li><strong>Prescription Suggestions:</strong> Recommendations based on diagnoses and symptoms.</li><li><strong>Chart Optimization:</strong> Assisted structuring and completion of medical records.</li></ul>`,
            'projects.advocacy.sector': 'Legal',
            'projects.advocacy.title': 'AI Agent for Law Firms',
            'projects.advocacy.description': 'Automated lead qualification and CRM integration.',
            'projects.advocacy.details': `<h4>The Challenge</h4><p>Handle large volumes of leads from Facebook Ads while identifying qualified prospects without overloading the legal team.</p><h4>The Solution</h4><p>A fully autonomous AI agent that triages and qualifies leads, schedules appointments, and keeps the CRM updated so the commercial team acts at the right time.</p><h4>Key Features</h4><ul><li><strong>Demand Understanding:</strong> Captures the nuances of every inquiry within labor law.</li><li><strong>Automatic Qualification:</strong> Scores leads using predefined criteria.</li><li><strong>CRM Integration:</strong> Manages the lead lifecycle in ClickUp and notifies sales when action is required.</li></ul>`,
            'projects.cosmetics.sector': 'Retail',
            'projects.cosmetics.title': 'AI Agent for Cosmetics',
            'projects.cosmetics.description': 'Initial support, catalog sharing, and quote creation.',
            'projects.cosmetics.details': `<h4>The Challenge</h4><p>Respond to Facebook Ads leads quickly and personally, offering product information and quotations for a cosmetics company.</p><h4>The Solution</h4><p>An AI agent that handles initial interactions and qualification, keeping conversations personalized and handing off only purchase-ready leads to the sales team.</p><h4>Key Features</h4><ul><li><strong>Digital Catalog:</strong> Sends updated product lists directly to the customer.</li><li><strong>Quote Builder:</strong> Provides personalized quotations based on each need.</li><li><strong>Qualification & Handoff:</strong> Detects ready-to-buy leads and routes them to a human closer.</li></ul>`,
            'projects.dentistry.sector': 'Dental Care',
            'projects.dentistry.title': 'AI Agent for Dental Clinics',
            'projects.dentistry.description': 'Lead qualification and appointment booking via WhatsApp.',
            'projects.dentistry.cta': 'Read Case Study',
            'projects.dentistry.details': `<h4>The Challenge</h4><p>Streamline lead qualification, FAQ handling, and appointment scheduling for a dental clinic while keeping all communication inside WhatsApp.</p><h4>The Solution</h4><p>An AI agent integrated with WhatsApp to manage every interaction from first contact to confirmed appointment.</p><h4>Key Features</h4><ul><li><strong>Lead Qualification:</strong> Covers the entire journey for leads captured through Facebook Ads.</li><li><strong>Appointment Scheduling:</strong> Books visits based on the dentist's availability.</li><li><strong>FAQ Handling:</strong> Provides instant answers to common dental questions.</li><li><strong>Active Follow-ups:</strong> Automated reminders that reduce no-shows.</li></ul>`,
            'projects.dentistry.ribbon': 'Case Study',
            'fingerprint.status': 'Authenticating...',
            'footer.title': "Let's Connect",
            'footer.subtitle': "I'm open to new opportunities and collaborations. Feel free to reach out.",
            'footer.copy': 'Â© 2024 Rian Cavalcante. All rights reserved.'
        }
    };

    const typewriterWords = {
        pt: [
            'Especialista em AutomaÃ§Ã£o Inteligente',
            'Arquiteto de SoluÃ§Ãµes com IA',
            'Otimizador de Processos Empresariais'
        ],
        en: [
            'Intelligent Automation Specialist',
            'AI Solutions Architect',
            'Business Process Optimizer'
        ]
    };

    let words = typewriterWords[currentLanguage] || typewriterWords.pt;
    let i = 0;
    let j = 0;
    let currentWord = '';
    let isDeleting = false;

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

    const typewriterElement = document.getElementById('typewriter');

    function updateLanguageToggleLabel(lang) {
        if (!languageToggle || !languageToggleLabel) {
            return;
        }
        languageToggleLabel.textContent = lang === 'pt' ? 'EN' : 'PT';
        if (lang === 'en') {
            languageToggle.classList.add('active');
        } else {
            languageToggle.classList.remove('active');
        }
        const ariaLabel = lang === 'pt' ? 'Switch to English' : 'Alternar para português';
        languageToggle.setAttribute('aria-label', ariaLabel);
    } else {
            languageToggle.classList.remove('active');
        }
    }

    function applyTranslations(lang) {
        const dict = translations[lang] || translations.pt;
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            if (!key || !(key in dict)) {
                return;
            }
            if (element.dataset.i18nHtml === 'true') {
                element.innerHTML = dict[key];
            } else {
                element.textContent = dict[key];
            }
        });

        const caseCard = document.querySelector('.project-card--case');
        if (caseCard && dict['projects.dentistry.ribbon']) {
            caseCard.setAttribute('data-case-label', dict['projects.dentistry.ribbon']);
        }

        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            lang = 'pt';
        }
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        words = typewriterWords[lang] || typewriterWords.pt;
        i = 0;
        j = 0;
        currentWord = '';
        isDeleting = false;
        if (typewriterElement) {
            typewriterElement.textContent = '';
        }
        applyTranslations(lang);
        updateLanguageToggleLabel(lang);
    }

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








