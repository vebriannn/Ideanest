document.addEventListener('DOMContentLoaded', function() {
    // Image Slider - For future implementation of multiple image sets
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = dots.length;

    // Initialize slider dots
    function updateDots(index) {
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current dot
        dots[index].classList.add('active');
    }

    // Next slide set
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateDots(currentSlide);
        
        // Add animation to images
        const images = document.querySelectorAll('.image-item img');
        images.forEach(img => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 300);
        });
    }

    // Previous slide set
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateDots(currentSlide);
        
        // Add animation to images
        const images = document.querySelectorAll('.image-item img');
        images.forEach(img => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 300);
        });
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateDots(currentSlide);
            
            // Add animation to images
            const images = document.querySelectorAll('.image-item img');
            images.forEach(img => {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 300);
            });
        });
    });

    // Initialize slider
    updateDots(currentSlide);

    // Add transition to images
    const images = document.querySelectorAll('.image-item img');
    images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.info-section, .modal-allocation, .tip-item, .allocation-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.info-section, .modal-allocation').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    document.querySelectorAll('.tip-item, .allocation-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn-sign-up, .download-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = 'none';
        });
    });

    // Add glow effect to tip items on hover
    const tipItems = document.querySelectorAll('.tip-item');
    
    tipItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = 'none';
        });
    });

    // Subscription form validation
    const subscriptionForm = document.querySelector('.subscription-form');
    const emailInput = document.querySelector('.subscription-form input');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = 'red';
            emailInput.style.animation = 'shake 0.5s';
            
            setTimeout(() => {
                emailInput.style.animation = 'none';
            }, 500);
        } else {
            emailInput.style.borderColor = 'var(--primary-color)';
            alert('Terima kasih telah berlangganan!');
            emailInput.value = '';
        }
    });
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Add shake animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});