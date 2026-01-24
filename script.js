// ====================================
// Mobile Navigation Toggle
// ====================================
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate toggle button
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when link is clicked
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ====================================
// Navbar Scroll Effect
// ====================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ====================================
// Smooth Scroll
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Intersection Observer for Animations
// ====================================
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

// Observe elements for fade-in animations
const animatedElements = document.querySelectorAll('.menu-category, .atmosphere-item, .feature-item, .access-method');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ====================================
// Image Lazy Loading Enhancement
// ==================================== 
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ====================================
// Phone Number Click Tracking
// ====================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call initiated: ' + link.href);
        // Add analytics tracking here if needed
    });
});

// ====================================
// Current Operating Status (Placeholder)
// ====================================
// This function can be connected to a real-time status API or manually updated
function updateOperatingStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    
    // Operating hours: 17:30 - 23:00
    const openingTime = 17 * 60 + 30; // 17:30
    const closingTime = 23 * 60; // 23:00
    
    // Note: Actual irregular holidays need to be checked separately
    // This is just a time-based check
    
    let statusMessage = '';
    let statusClass = '';
    
    if (currentTime >= openingTime && currentTime < closingTime) {
        statusMessage = '営業中';
        statusClass = 'status-open';
    } else if (currentTime < openingTime) {
        const minutesUntilOpen = openingTime - currentTime;
        const hoursUntilOpen = Math.floor(minutesUntilOpen / 60);
        statusMessage = `本日 ${17}:${30} 開店`;
        statusClass = 'status-closed';
    } else {
        statusMessage = '本日の営業は終了しました';
        statusClass = 'status-closed';
    }
    
    // You can display this status on the page if needed
    console.log('Operating Status:', statusMessage);
}

// Update status on page load
updateOperatingStatus();

// ====================================
// Accessibility Enhancements
// ====================================
// Skip to main content link (keyboard navigation)
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #d84315;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ====================================
// Print Styles Handler
// ====================================
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    console.log('Preparing page for printing');
});

// ====================================
// Error Handling for External Resources
// ====================================
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.error('Image failed to load:', e.target.src);
        // Optionally add a placeholder image
        // e.target.src = 'path/to/placeholder.jpg';
    }
}, true);

// ====================================
// Performance Monitoring
// ====================================
window.addEventListener('load', () => {
    // Check page load performance
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    }
});

// ====================================
// Google Maps Enhancement (if needed)
// ====================================
function initMap() {
    // This function can be expanded if custom Google Maps integration is needed
    // For now, we're using embedded iframe
    const mapIframe = document.querySelector('.access-map iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', () => {
            console.log('Map loaded successfully');
        });
    }
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
