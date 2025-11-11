document.addEventListener('DOMContentLoaded', function() {
    initLanguageToggle();
    initSmoothScroll();
    initContactForm();
    initAnimations();
    initCosmicEffects();
});

function initCosmicEffects() {
    const cosmicDust = document.querySelector('.cosmic-dust');
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            cosmicDust.style.animation = 'cosmicFloat 10s ease-in-out infinite';
        });
        
        section.addEventListener('mouseleave', function() {
            cosmicDust.style.animation = 'cosmicFloat 20s ease-in-out infinite';
        });
    });
}

function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithData = document.querySelectorAll('[data-es][data-en]');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            elementsWithData.forEach(element => {
                element.textContent = element.dataset[selectedLang];
            });
            
            document.documentElement.lang = selectedLang;
        });
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            const mailtoLink = `mailto:steve.londono212@pascualbravo.edu.co?subject=Contacto desde Portfolio - ${name}&body=Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${message}`;
            
            window.location.href = mailtoLink;
            
            this.reset();
            
            showNotification('¡Mensaje enviado correctamente!');
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--space-blue) 0%, var(--space-purple) 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .education-card, .skill-item, .stat-card, .contact-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(250, 250, 250, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(250, 250, 250, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
