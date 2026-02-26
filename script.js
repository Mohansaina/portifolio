// ==================== MOBILE NAVIGATION ====================
const hamburger  = document.querySelector('.hamburger');
const navMenu    = document.querySelector('.nav-menu');
const navOverlay = document.getElementById('navOverlay');

function openNav() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    hamburger.classList.contains('active') ? closeNav() : openNav();
});

navOverlay.addEventListener('click', closeNav);
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', closeNav));

// ==================== STICKY HEADER ====================
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 0);
});

// ==================== ACTIVE NAV LINK ====================
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// ==================== SCROLL PROGRESS BAR ====================
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop    = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = ((scrollTop / scrollHeight) * 100) + '%';
    });
}

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 420));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ==================== TYPEWRITER ====================
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const words = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Freelancer'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    function type() {
        const word = words[wordIdx];
        typewriterEl.textContent = deleting ? word.slice(0, charIdx - 1) : word.slice(0, charIdx + 1);
        deleting ? charIdx-- : charIdx++;

        if (!deleting && charIdx === word.length) {
            deleting = true;
            setTimeout(type, 2000);
            return;
        }
        if (deleting && charIdx === 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
        }
        setTimeout(type, deleting ? 55 : 100);
    }
    type();
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) window.scrollTo({ top: target.offsetTop - 78, behavior: 'smooth' });
    });
});

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.section-header, .about-content, .skill-category, .project-card, .contact-content').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.07) + 's';
    revealObserver.observe(el);
});

// ==================== SKILL BAR ANIMATION ====================
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.progress').forEach(bar => {
                    const w = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => { bar.style.width = w; }, 300);
                });
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.2 });
    skillsObserver.observe(skillsSection);
}

// ==================== ANIMATED STAT COUNTERS ====================
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num').forEach(el => {
                const target = +el.dataset.target;
                const dur    = 1600;
                const step   = dur / target;
                let current  = 0;

                const timer = setInterval(() => {
                    current++;
                    el.textContent = current;
                    if (current >= target) clearInterval(timer);
                }, step);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

// ==================== 3D CARD TILT ====================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect     = card.getBoundingClientRect();
        const x        = e.clientX - rect.left;
        const y        = e.clientY - rect.top;
        const centerX  = rect.width  / 2;
        const centerY  = rect.height / 2;
        const rotateX  = ((y - centerY) / centerY) * -7;
        const rotateY  = ((x - centerX) / centerX) *  7;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
    });
});

// ==================== MOUSE PARALLAX ON HERO BLOBS ====================
const heroSection = document.getElementById('home');
const blobs = document.querySelectorAll('.hero-blob');

if (heroSection && blobs.length) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
        const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

        blobs.forEach((blob, i) => {
            const factor = (i + 1) * 28;
            blob.style.transition = 'transform 1.2s ease';
            blob.style.transform  = `translate(${cx * factor}px, ${cy * factor}px)`;
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        blobs.forEach(blob => {
            blob.style.transition = 'transform 1.5s ease';
            blob.style.transform  = 'translate(0, 0)';
        });
    });
}

// ==================== TOAST NOTIFICATION ====================
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);
}

// ==================== FORM SUBMISSION ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = 'Send Message';
            this.reset();
            showToast();
        }, 1400);
    });
}

// ==================== PROJECT LINKS ====================
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('target') === '_blank') return;
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) window.location.href = href;
    });
});

// ==================== DYNAMIC FOOTER YEAR ====================
document.addEventListener('DOMContentLoaded', () => {
    const footerP = document.querySelector('footer p');
    if (footerP) footerP.innerHTML = footerP.innerHTML.replace(/\d{4}/, new Date().getFullYear());
});
