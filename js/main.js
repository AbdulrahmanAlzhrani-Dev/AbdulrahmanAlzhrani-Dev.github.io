// Language Switcher
const langButtons = document.querySelectorAll('.lang-btn');
const currentLang = localStorage.getItem('language') || 'ar';

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update active button
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    localStorage.setItem('language', lang);
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.getAttribute('data-lang'));
    });
});

// Initialize language
setLanguage(currentLang);

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', theme);
    
    // Update navbar background
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.backgroundColor = theme === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    }
}

themeToggle.addEventListener('click', () => {
    const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Initialize theme
setTheme(currentTheme);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = currentTheme === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = currentTheme === 'dark' ? '#1a1a1a' : '#ffffff';
    }
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Portfolio items data
const portfolioItems = [
    {
        title: 'مشروع 1',
        description: 'وصف المشروع الأول',
        image: 'images/project1.jpg',
        link: '#'
    },
    {
        title: 'مشروع 2',
        description: 'وصف المشروع الثاني',
        image: 'images/project2.jpg',
        link: '#'
    },
    {
        title: 'مشروع 3',
        description: 'وصف المشروع الثالث',
        image: 'images/project3.jpg',
        link: '#'
    }
];

// Load portfolio items
function loadPortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioItems.forEach(item => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="project-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}" class="project-link">عرض المشروع</a>
            </div>
        `;
        portfolioGrid.appendChild(projectCard);
    });
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        // Show success message
        alert(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!');
        contactForm.reset();
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Intersection Observer for skill bars animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
});

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Initialize portfolio items
document.addEventListener('DOMContentLoaded', loadPortfolioItems);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
}); 