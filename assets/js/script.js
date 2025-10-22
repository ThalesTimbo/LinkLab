/* ===========================================
   LinkLab - JavaScript
   Animações, interações e funcionalidades
   =========================================== */

// ===========================================
// LOADING SCREEN CONTROL
// ===========================================

// Controla a tela de carregamento
function initLoadingScreen() {
    const loader = document.querySelector('.loader');
    const body = document.body;
    
    // Simula tempo de carregamento mínimo
    const minLoadTime = 2000; // 2 segundos
    const startTime = Date.now();
    
    // Função para esconder o loader
    function hideLoader() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
            loader.classList.add('hidden');
            body.classList.add('loaded');
            
            // Remove o loader do DOM após a animação
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, remainingTime);
    }
    
    // Esconde o loader quando tudo estiver carregado
    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }
}

// Inicializa a tela de carregamento imediatamente
initLoadingScreen();

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // NAVEGAÇÃO E MENU MOBILE
    // ===========================================
    
    const hamburgerCheckbox = document.querySelector('.hamburger input[type="checkbox"]');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo');
    
    // Toggle do menu mobile
    if (hamburgerCheckbox) {
        hamburgerCheckbox.addEventListener('change', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Fecha o menu mobile ao clicar em um link ou no logo
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        if (hamburgerCheckbox) {
            hamburgerCheckbox.checked = false;
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Fecha o menu mobile ao clicar no logo
    if (logo) {
        logo.addEventListener('click', closeMobileMenu);
    }
    
    // ===========================================
    // SCROLL SUAVE E NAVEGAÇÃO ATIVA
    // ===========================================
    
    // Scroll suave para links internos
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Destaca o link ativo baseado na seção visível
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===========================================
    // HEADER SCROLL EFFECT
    // ===========================================
    
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Esconde/mostra header baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // ===========================================
    // SISTEMA AVANÇADO DE LAZY LOADING E ANIMAÇÕES
    // ===========================================
    
    // Configurações do observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Observer principal para animações
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Adiciona classe visible para ativar animação
                element.classList.add('visible');
                
                // Anima elementos filhos com delays escalonados
                const children = element.querySelectorAll('.feature-card, .service-card, .portfolio-item, .photography-feature, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 150);
                });
                
                // Para elementos com contadores, inicia animação
                const counters = element.querySelectorAll('.counter');
                counters.forEach(counter => {
                    animateCounter(counter, parseInt(counter.dataset.target), 2000);
                });
                
                // Para progress bars, inicia animação
                const progressBars = element.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    setTimeout(() => {
                        bar.classList.add('animate');
                    }, 300);
                });
                
                // Para elementos com shimmer, remove o efeito
                const shimmerElements = element.querySelectorAll('.shimmer');
                shimmerElements.forEach(el => {
                    setTimeout(() => {
                        el.classList.remove('shimmer');
                    }, 500);
                });
                
                // Para elementos skeleton, remove o efeito
                const skeletonElements = element.querySelectorAll('.skeleton');
                skeletonElements.forEach(el => {
                    setTimeout(() => {
                        el.classList.remove('skeleton');
                    }, 800);
                });
            }
        });
    }, observerOptions);
    
    // Observer para parallax
    const parallaxObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('parallax-active');
            } else {
                entry.target.classList.remove('parallax-active');
            }
        });
    }, { threshold: 0.1 });
    
    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale, .fade-in-rotate');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    // Observa elementos para parallax
    const parallaxElements = document.querySelectorAll('.parallax-element');
    parallaxElements.forEach(el => {
        parallaxObserver.observe(el);
    });
    
    // ===========================================
    // SISTEMA DE PARTÍCULAS FLUTUANTES
    // ===========================================
    
    function createParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        heroSection.appendChild(particlesContainer);
        
        // Cria partículas
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // ===========================================
    // EFEITO DE TYPING PARA TÍTULOS
    // ===========================================
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        const originalText = element.textContent;
        
        // Salva o texto original
        element.dataset.originalText = originalText;
        
        // Limpa o texto e adiciona classes
        element.textContent = '';
        element.classList.add('typing-effect', 'typing-animation');
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove a animação após completar
                setTimeout(() => {
                    element.classList.remove('typing-animation');
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        type();
    }
    
    // ===========================================
    // SISTEMA DE LOADING SKELETON
    // ===========================================
    
    function addSkeletonLoading() {
        const cards = document.querySelectorAll('.service-card, .feature-card, .portfolio-item, .photography-feature');
        cards.forEach(card => {
            card.classList.add('skeleton');
            
            // Remove skeleton após delay
            setTimeout(() => {
                card.classList.remove('skeleton');
            }, Math.random() * 1000 + 500);
        });
    }
    
    // ===========================================
    // EFEITO DE SHIMMER PARA ELEMENTOS
    // ===========================================
    
    function addShimmerEffect() {
        const elements = document.querySelectorAll('.hero-title, .section-title');
        elements.forEach(el => {
            el.classList.add('shimmer');
            
            setTimeout(() => {
                el.classList.remove('shimmer');
            }, 2000);
        });
    }
    
    // ===========================================
    // FORMULÁRIO DE CONTATO
    // ===========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Mostra estado de loading
            submitBtn.textContent = 'Enviando...';
            submitBtn.classList.add('loading');
            
            // Simula envio (substitua por integração real)
            setTimeout(() => {
                // Sucesso
                submitBtn.textContent = 'Mensagem enviada!';
                submitBtn.style.background = '#4CAF50';
                
                // Reset do formulário
                this.reset();
                
                // Reset do botão após 3 segundos
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.classList.remove('loading');
                }, 3000);
                
                // Mostra notificação de sucesso
                showNotification('Mensagem enviada com sucesso!', 'success');
                
            }, 2000);
        });
    }
    
    // ===========================================
    // SISTEMA DE NOTIFICAÇÕES
    // ===========================================
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#FFD700'};
            color: ${type === 'success' || type === 'error' ? '#fff' : '#000'};
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Anima entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove após 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    // ===========================================
    // EFEITOS DE HOVER E INTERAÇÃO
    // ===========================================
    
    // Efeito parallax sutil nos shapes do hero
    const heroShapes = document.querySelectorAll('.shape');
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroShapes.forEach((shape, index) => {
            const speed = parallaxSpeed * (index + 1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    // ===========================================
    // CONTADOR ANIMADO (para estatísticas futuras)
    // ===========================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // ===========================================
    // LAZY LOADING DE IMAGENS
    // ===========================================
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observa imagens lazy
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===========================================
    // PERFORMANCE E OTIMIZAÇÕES
    // ===========================================
    
    // Throttle para eventos de scroll
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounce para resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ===========================================
    // EVENT LISTENERS OTIMIZADOS
    // ===========================================
    
    // Scroll events com throttle
    window.addEventListener('scroll', throttle(function() {
        updateActiveNavLink();
        handleHeaderScroll();
        handleParallax();
    }, 16)); // ~60fps
    
    // Resize events com debounce
    window.addEventListener('resize', debounce(function() {
        // Recalcula posições se necessário
        updateActiveNavLink();
    }, 250));
    
    // ===========================================
    // INICIALIZAÇÃO E EFEITOS ESPECIAIS
    // ===========================================
    
    // Inicializa efeitos especiais
    setTimeout(() => {
        // Cria partículas flutuantes
        createParticles();
        
        // Adiciona efeito shimmer inicial
        addShimmerEffect();
        
        // Adiciona skeleton loading temporário
        addSkeletonLoading();
        
        // Efeito de typing no título principal (desabilitado por padrão)
        // Para ativar, descomente as linhas abaixo:
        /*
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !prefersReducedMotion()) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
        }
        */
    }, 500);
    
    // Adiciona classe para indicar que JS está carregado
    document.body.classList.add('js-loaded');
    
    // ===========================================
    // EFEITOS DE PERFORMANCE E OTIMIZAÇÃO
    // ===========================================
    
    // Preload de imagens críticas
    function preloadImages() {
        const criticalImages = [
            'assets/images/Link Lab logo.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Inicia preload
    preloadImages();
    
    // ===========================================
    // SISTEMA DE MÉTRICAS E ANALYTICS
    // ===========================================
    
    // Track de interações do usuário
    function trackUserInteraction(action, element) {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`🎯 User Interaction: ${action}`, element);
        }
        
        // Aqui você pode integrar com Google Analytics ou outros sistemas
        // gtag('event', action, { 'event_category': 'user_interaction' });
    }
    
    // Adiciona tracking aos botões principais
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            trackUserInteraction('cta_click', btn.textContent);
        });
    });
    
    // Track de scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            if (maxScrollDepth % 25 === 0) { // Track a cada 25%
                trackUserInteraction('scroll_depth', `${maxScrollDepth}%`);
            }
        }
    }, 1000));
    
    // ===========================================
    // UTILITÁRIOS
    // ===========================================
    
    // Função para detectar dispositivo móvel
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Função para detectar preferência de movimento reduzido
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    // Desabilita animações se o usuário prefere movimento reduzido
    if (prefersReducedMotion()) {
        document.body.classList.add('reduced-motion');
    }
    
    // ===========================================
    // DEBUG E DESENVOLVIMENTO
    // ===========================================
    
    // Console log para desenvolvimento
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🚀 LinkLab website loaded successfully!');
        console.log('📱 Mobile:', isMobile());
        console.log('🎭 Reduced motion:', prefersReducedMotion());
    }
    
});

// ===========================================
// FUNÇÕES GLOBAIS
// ===========================================

// Função global para scroll suave
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Função global para mostrar notificação
function showGlobalNotification(message, type = 'info') {
    // Reutiliza a função de notificação já definida
    if (typeof showNotification === 'function') {
        showNotification(message, type);
    }
}

// ===========================================
// SERVICE WORKER (PWA - Futuro)
// ===========================================

// Registra service worker se disponível
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
