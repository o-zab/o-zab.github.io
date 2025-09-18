
// Hamburger Toggle
function toggleMenu() {
  const icon = document.querySelector(".hamburger-icon");
  const menu = document.querySelector(".menu-links");
  icon.classList.toggle("open");
  menu.classList.toggle("open");
}


// Close Hamburger Menu on Outside Click
document.addEventListener("click", function (event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  // Check if the menu is open and the click is outside the hamburger menu
  if (menu.classList.contains("open") && !hamburgerMenu.contains(event.target)) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});


// Scroll Behavior for Both Navbars
let prevScrollpos = window.pageYOffset;
const desktopNav = document.getElementById("desktop-nav");
const hamburgerNav = document.getElementById("hamburger-nav");

window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;

    // Desktop Navbar
    if (prevScrollpos > currentScrollPos) {
        desktopNav.style.top = "0";
    } else {
        desktopNav.style.top = `-${desktopNav.offsetHeight}px`;
    }

    // Hamburger Navbar
    if (prevScrollpos > currentScrollPos) {
        hamburgerNav.style.top = "0";
    } else {
        hamburgerNav.style.top = `-${hamburgerNav.offsetHeight}px`;
    }

    prevScrollpos = currentScrollPos;
};





// Update year dynamically
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("current-year").textContent = new Date().getFullYear();
});

// Project filtering functionality
function filterProjects(category) {
    const items = document.querySelectorAll('.project-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Show/hide projects based on category
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load saved theme on page load and initialize skills slider
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Skills Slider Logic
    initializeSkillsSlider();
});

function initializeSkillsSlider() {
    const slider = document.querySelector('.skills-slider');
    const categories = document.querySelectorAll('.skill-category');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!slider || categories.length === 0) return;

    let currentIndex = 0;
    const totalSlides = categories.length; // One card at a time

    // Function to get slide width percentage
    function getSlideWidth() {
        if (window.innerWidth <= 480) {
            return 100;
        } else if (window.innerWidth <= 768) {
            return 90;
        } else {
            return 80;
        }
    }

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');
    updateDots();

    // Navigation functions
    function goToSlide(index) {
        currentIndex = index;
        const slideWidth = getSlideWidth();
        const translateX = -index * slideWidth;
        slider.style.transform = `translateX(${translateX}%)`;
        updateDots();
        updateButtons();
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back to start
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(totalSlides - 1); // Loop to end
        }
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateButtons() {
        if (prevBtn) {
            prevBtn.disabled = false; // Always enabled for looping
        }
        if (nextBtn) {
            nextBtn.disabled = false; // Always enabled for looping
        }
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Autoplay functionality
    let autoplayInterval = setInterval(nextSlide, 3500);

    // Pause autoplay on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    slider.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 3500);
    });

    // Handle window resize
    window.addEventListener('resize', () => goToSlide(currentIndex));

    // Initialize
    updateButtons();
}

// Category navigation functions
function showCategory(categoryId) {
    // Hide categories overview
    document.getElementById('categories-overview').style.display = 'none';

    // Hide all category sections
    const categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach(section => {
        section.style.display = 'none';
    });

    // Show selected category
    document.getElementById(categoryId).style.display = 'block';
}

function showCategories() {
    // Hide all category sections
    const categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach(section => {
        section.style.display = 'none';
    });

    // Show categories overview
    document.getElementById('categories-overview').style.display = 'grid';
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Disable submit button
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // EmailJS configuration
            // Note: Replace these with your actual EmailJS service details
            const serviceID = 'service_9kt28fr'; // Replace with your EmailJS service ID
            const templateID = 'template_ibewrm8'; // Replace with your EmailJS template ID
            const publicKey = 'yvuNsuhLsC3ILuj8W'; // Replace with your EmailJS public key

            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_name: 'Zablon Owino'
            };

            // Send email using EmailJS
            emailjs.send(serviceID, templateID, templateParams, publicKey)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormMessage('Thanks for reaching out! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
                })
                .finally(function() {
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message';

        if (type === 'success') {
            formMessage.style.color = '#4BB543';
        } else if (type === 'error') {
            formMessage.style.color = '#ff4444';
        }

        // Clear message after 5 seconds
        setTimeout(function() {
            formMessage.textContent = '';
        }, 5000);
    }
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000, // 5 seconds delay between slides
            disableOnInteraction: false,
        },
        speed: 1000, // Transition speed in milliseconds

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 1,
                spaceBetween: 30
            }
        }
    });
});

// Card switch functionality
var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 2,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
