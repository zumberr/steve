document.addEventListener('DOMContentLoaded', function() {
    let currentLang = localStorage.getItem('preferredLanguage') || 'es';
    
    const updateLanguage = (lang) => {
        document.documentElement.lang = lang;
        
        const title = document.querySelector('title');
        if (title && title.hasAttribute(`data-${lang}`)) {
            title.textContent = title.getAttribute(`data-${lang}`);
        }
        
        const elements = document.querySelectorAll('[data-es], [data-en]');
        
        elements.forEach(el => {
            el.classList.add('fade-transition');
            el.classList.add('fade-out');
        });
        
        setTimeout(() => {
            elements.forEach(el => {
                if (el.hasAttribute(`data-${lang}`)) {
                    const text = el.getAttribute(`data-${lang}`);
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = text;
                    } else if (el.querySelector('span')) {
                        const span = el.querySelector('span');
                        if (span) {
                            span.textContent = text;
                        }
                    } else {
                        el.textContent = text;
                    }
                }
                el.classList.remove('fade-out');
                el.classList.add('fade-in');
            });
        }, 150);
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        localStorage.setItem('preferredLanguage', lang);
        currentLang = lang;
    };
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            if (lang && lang !== currentLang) {
                updateLanguage(lang);
            }
        });
    });
    
    updateLanguage(currentLang);
    
    setTimeout(() => {
        document.querySelectorAll('.fade-transition').forEach(el => {
            el.classList.remove('fade-transition', 'fade-in');
        });
    }, 500);
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat, .timeline-item, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        console.log('Form submitted:', { name, email, subject, message });
        
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.querySelector('span').textContent;
        const successText = currentLang === 'es' ? '¡Mensaje enviado!' : 'Message sent!';
        
        button.querySelector('span').textContent = successText;
        button.style.background = 'linear-gradient(135deg, #00ff00, #00ffff)';
        
        setTimeout(() => {
            button.querySelector('span').textContent = originalText;
            button.style.background = '';
            this.reset();
        }, 3000);
    });
    
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    const createEnhancedSpaceElements = () => {
        const spaceContainer = document.createElement('div');
        spaceContainer.className = 'space-container';
        
        const starsLayer1 = document.createElement('div');
        starsLayer1.className = 'stars-layer stars-layer-1';
        spaceContainer.appendChild(starsLayer1);
        
        const starsLayer2 = document.createElement('div');
        starsLayer2.className = 'stars-layer stars-layer-2';
        spaceContainer.appendChild(starsLayer2);
        
        const aurora = document.createElement('div');
        aurora.className = 'aurora';
        document.body.appendChild(aurora);
        
        const galaxy = document.createElement('div');
        galaxy.className = 'galaxy';
        const galaxySpiral = document.createElement('div');
        galaxySpiral.className = 'galaxy-spiral';
        galaxy.appendChild(galaxySpiral);
        spaceContainer.appendChild(galaxy);
        
        const planet1 = document.createElement('div');
        planet1.className = 'planet planet-1';
        const ring1 = document.createElement('div');
        ring1.className = 'planet-ring';
        planet1.appendChild(ring1);
        spaceContainer.appendChild(planet1);
        
        const planet2 = document.createElement('div');
        planet2.className = 'planet planet-2';
        spaceContainer.appendChild(planet2);
        
        const planet3 = document.createElement('div');
        planet3.className = 'planet planet-3';
        const ring3 = document.createElement('div');
        ring3.className = 'planet-ring';
        planet3.appendChild(ring3);
        spaceContainer.appendChild(planet3);
        
        const gravityWaves = document.createElement('div');
        gravityWaves.className = 'gravity-waves';
        for (let i = 0; i < 4; i++) {
            const wave = document.createElement('div');
            wave.className = 'gravity-wave';
            gravityWaves.appendChild(wave);
        }
        spaceContainer.appendChild(gravityWaves);
        
        const quantumParticles = document.createElement('div');
        quantumParticles.className = 'quantum-particles';
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            quantumParticles.appendChild(particle);
        }
        spaceContainer.appendChild(quantumParticles);
        
        document.body.appendChild(spaceContainer);
        
        const createComet = () => {
            const comet = document.createElement('div');
            comet.className = 'comet';
            comet.style.top = Math.random() * 50 + '%';
            comet.style.left = '-100px';
            spaceContainer.appendChild(comet);
            
            setTimeout(() => {
                comet.remove();
            }, 8000);
        };
        
        setInterval(createComet, 5000);
        
        const createShootingStars = () => {
            const shootingStar = document.createElement('div');
            shootingStar.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #fff;
                border-radius: 50%;
                top: ${Math.random() * 50}%;
                left: ${Math.random() * 100}%;
                animation: shootingStar 1s linear;
                box-shadow: 0 0 10px #fff;
            `;
            
            const tail = document.createElement('div');
            tail.style.cssText = `
                position: absolute;
                width: 100px;
                height: 1px;
                background: linear-gradient(90deg, #fff, transparent);
                top: 50%;
                right: 0;
                transform: translateY(-50%);
            `;
            
            shootingStar.appendChild(tail);
            spaceContainer.appendChild(shootingStar);
            
            setTimeout(() => {
                shootingStar.remove();
            }, 1000);
        };
        
        setInterval(createShootingStars, 3000);
    };
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes shootingStar {
            from {
                transform: translateX(0) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-200px) translateY(200px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    createEnhancedSpaceElements();
    
    const createOrbitingElements = () => {
        const hero = document.querySelector('.hero');
        
        for (let i = 0; i < 3; i++) {
            const orbit = document.createElement('div');
            orbit.style.cssText = `
                position: absolute;
                width: ${200 + i * 100}px;
                height: ${200 + i * 100}px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: rotate ${20 + i * 10}s linear infinite;
            `;
            
            const orbiter = document.createElement('div');
            orbiter.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: linear-gradient(135deg, #00ffff, #ff00ff);
                border-radius: 50%;
                top: -5px;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
            `;
            
            orbit.appendChild(orbiter);
            hero.appendChild(orbit);
        }
    };
    
    const orbitStyle = document.createElement('style');
    orbitStyle.textContent = `
        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(orbitStyle);
    
    createOrbitingElements();
    
    const addParallaxEffect = () => {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.space-container');
            const speed = 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    };
    
    addParallaxEffect();
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const typingEffect = () => {
        const nameElement = document.querySelector('.name');
        const text = nameElement.textContent;
        nameElement.textContent = '';
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                nameElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        };
        
        setTimeout(type, 500);
    };
    
    typingEffect();
    
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.innerText;
                const time = value / speed;
                
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value;
                }
            }
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animate();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    };
    
    animateCounters();
});