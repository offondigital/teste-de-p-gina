// ===== MAIN.JS - Alexandre Terraplanagem =====

(function() {
    'use strict';

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // ===== MOBILE MENU =====
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Previne scroll do body quando menu aberto
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Fecha menu ao clicar em um link
        const mobileLinks = document.querySelectorAll('.nav-mobile a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== SMOOTH SCROLL PARA LINKS ÂNCORA =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignora # vazio
            if (href === "#") return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Opcional: parar de observar após animar
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa cards e features
    const animatedElements = document.querySelectorAll('.service-card, .equipment-card, .feature-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===== FECHA MENU MOBILE AO REDIMENSIONAR PARA DESKTOP =====
    function handleResize() {
        if (window.innerWidth > 768) {
            if (menuToggle && mobileMenu) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);

    // ===== ADICIONA CLASSE ANIMATE PARA ELEMENTOS VISÍVEIS NO LOAD =====
    function animateVisibleElements() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                el.classList.add('animate');
            }
        });
    }

    // Executa após um pequeno delay para garantir que o DOM está pronto
    setTimeout(animateVisibleElements, 100);

    // ===== WHATSAPP BUTTON ANIMATION =====
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Adiciona animação de pulso sutil
        setInterval(() => {
            whatsappButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                whatsappButton.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // ===== LAZY LOADING PARA IMAGENS (SE HOUVER) =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== PERFORMANCE: DEBOUNCE PARA SCROLL E RESIZE =====
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

    // Aplica debounce aos event listeners de performance crítica
    window.addEventListener('scroll', debounce(handleScroll, 10));
    window.addEventListener('resize', debounce(handleResize, 250));

    // ===== LOG DE INICIALIZAÇÃO (DESENVOLVIMENTO) =====
    console.log('Alexandre Terraplanagem - Site carregado com sucesso!');

})();
