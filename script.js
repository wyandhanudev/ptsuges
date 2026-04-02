// ========== SMOOTH SCROLLING & NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll untuk navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Close nav menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinksContainer.style.display = 'none';
            }
        });
    });
});

// ========== CONTACT FORM HANDLING ==========
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const nama = document.querySelector('input[placeholder="Nama Lengkap"]').value;
            const email = document.querySelector('input[placeholder="Email Anda"]').value;
            const telepon = document.querySelector('input[placeholder="Nomor Telepon"]').value;
            const subjek = document.querySelector('input[placeholder="Subjek"]').value;
            const pesan = document.querySelector('textarea[placeholder="Pesan Anda"]').value;
            
            // Validate form
            if (!nama || !email || !telepon || !pesan) {
                showNotification('Semua field harus diisi!', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Email tidak valid!', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Mengirim...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.', 'success');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerText = message;
    
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.innerText = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            .notification-success {
                background: #00d4a3;
                color: #0a0e27;
            }
            
            .notification-error {
                background: #ff4444;
                color: white;
            }
            
            .notification-info {
                background: #00d4ff;
                color: #0a0e27;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== SCROLL ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.service-card, .portfolio-card, .feature-card, .about-features').forEach(el => {
        observer.observe(el);
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', function() {
    const stars = document.querySelector('.stars');
    if (stars) {
        const scrollPosition = window.pageYOffset;
        stars.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerText = target;
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(current);
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    let animated = false;
    
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                document.querySelectorAll('.stat-item h4').forEach(el => {
                    const number = parseInt(el.innerText);
                    animateCounter(el, number);
                });
                observer.unobserve(statsSection);
            }
        });
        
        observer.observe(statsSection);
    }
});

// ========== NAVBAR ACTIVE STATE ==========
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== ADD ACTIVE STYLE TO NAV ==========
const style = document.createElement('style');
style.innerText = `
    .nav-links a.active {
        color: #00d4ff;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== MOBILE RESPONSIVE ADJUSTMENTS ==========
function handleResponsive() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth > 768) {
        if (navLinks) {
            navLinks.style.display = 'flex';
        }
    }
}

window.addEventListener('resize', handleResponsive);
document.addEventListener('DOMContentLoaded', handleResponsive);

// ========== DARK MODE / LIGHT MODE TOGGLE (OPTIONAL) ==========
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// ========== COPY TO CLIPBOARD ==========
function copyToClipboard(text, elementId) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add animation class to elements
    const addAnimationClass = () => {
        document.querySelectorAll('.service-card, .portfolio-card').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('animate-in');
            }
        });
    };
    
    window.addEventListener('scroll', addAnimationClass);
    addAnimationClass();
});

// ========== TYPING ANIMATION (OPTIONAL) ==========
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerText = '';
    
    function type() {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========== SCROLL TO TOP BUTTON ==========
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        border: none;
        color: #0a0e27;
        cursor: pointer;
        display: none;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ========== FORM VALIDATION HELPER ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{7,}$/;
    return re.test(phone);
}

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c PT.SUGES SUKSES BERSAMA', 'color: #00d4ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);');
console.log('%c Solusi Teknologi Informasi Terpadu', 'color: #0099cc; font-size: 14px;');
console.log('%c https://ptsuges.co.id', 'color: #00d4a3;');
