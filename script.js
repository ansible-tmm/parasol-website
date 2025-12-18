// Slider functionality
let currentSlideIndex = 0;
let slideInterval;

// Initialize slider
function initSlider() {
    showSlide(currentSlideIndex);
    startAutoSlide();
}

// Show specific slide
function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (index >= slides.length) {
        currentSlideIndex = 0;
    }
    if (index < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Remove active from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current slide and activate dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Change slide (next/previous)
function changeSlide(direction) {
    stopAutoSlide();
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
    startAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
    stopAutoSlide();
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
    startAutoSlide();
}

// Auto slide functionality
function startAutoSlide() {
    slideInterval = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Pause auto-slide when hovering over slider
const slider = document.querySelector('.hero-slider');
if (slider) {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
}

// Button click handlers
document.querySelectorAll('.cta-button, .plan-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't prevent default for actual links
        if (this.tagName === 'BUTTON') {
            e.preventDefault();
            alert('Thank you for your interest! This is a demo website. In a real implementation, this would take you to a quote form or more information.');
        }
    });
});

// Quote form handler
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const insuranceType = document.getElementById('insuranceType').value;
        const startTime = Date.now();

        // Simulate processing time
        setTimeout(() => {
            const endTime = Date.now();
            const processingTime = ((endTime - startTime) / 1000).toFixed(2);

            // Map insurance types to agents and prices
            const agentMap = {
                'auto': { name: 'Matthew Packer', price: '125' },
                'home': { name: 'Nuno Martins', price: '180' },
                'life': { name: 'Anshul Behl', price: '95' },
                'travel': { name: 'Aubrey Trotter', price: '45' }
            };

            const typeMap = {
                'auto': '🚗 Auto Insurance',
                'home': '🏠 Home Insurance',
                'life': '❤️ Life Insurance',
                'travel': '✈️ Travel Insurance'
            };

            const agent = agentMap[insuranceType];

            // Show results
            document.getElementById('resultType').textContent = typeMap[insuranceType];
            document.getElementById('resultAgent').textContent = agent.name;
            document.getElementById('resultPrice').textContent = agent.price;
            document.getElementById('resultTime').textContent = processingTime;

            document.getElementById('quoteResult').style.display = 'block';
            document.getElementById('quoteResult').scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Add transition to header
if (header) {
    header.style.transition = 'transform 0.3s ease-in-out';
}

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', initSlider);

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe plan cards and features
document.querySelectorAll('.plan-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
