/* ==========================================================================
   Fuerzas Solar - Main JavaScript
   Interactive functionality for the solar energy website
   ========================================================================== */

// DOM Ready function
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Initialize all functionality when DOM is ready
ready(() => {
    initializeNavigation();
    initializeContactForm();
    initializeCalculator();
    initializeProjectFilter();
    initializeTestimonialSlider();
    initializeNewsletterForm();
    initializeScrollEffects();
    initializeModals();
    initializeSmoothScrolling();
});

/* ==========================================================================
   Navigation Functionality
   ========================================================================== */

function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        // Mobile menu toggle
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            lines.forEach((line, index) => {
                if (mobileToggle.classList.contains('active')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    line.style.transform = '';
                    line.style.opacity = '';
                }
            });
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const lines = mobileToggle.querySelectorAll('.hamburger-line');
                lines.forEach(line => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const lines = mobileToggle.querySelectorAll('.hamburger-line');
                lines.forEach(line => {
                    line.style.transform = '';
                    line.style.opacity = '';
                });
            }
        });
    }

    // Add scroll effect to navigation
    let lastScrollTop = 0;
    const header = document.querySelector('.nav-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
}

/* ==========================================================================
   Contact Form Functionality
   ========================================================================== */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const successClose = document.getElementById('successClose');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate form
            if (!validateContactForm(contactForm)) {
                return;
            }

            // Show loading state
            showLoadingState(submitBtn);

            try {
                // Simulate form submission
                await simulateFormSubmission();
                
                // Show success message or redirect
                if (successModal) {
                    showSuccessModal();
                } else {
                    // Redirect to thank you page
                    window.location.href = '/gracias.html';
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showErrorMessage('Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.');
            } finally {
                hideLoadingState(submitBtn);
            }
        });
    }

    // Success modal close functionality
    if (successClose && successModal) {
        successClose.addEventListener('click', () => {
            hideSuccessModal();
        });
        
        // Close modal when clicking overlay
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                hideSuccessModal();
            }
        });
    }
}

function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo es obligatorio');
            isValid = false;
        } else {
            clearFieldError(field);
            
            // Email validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showFieldError(field, 'Por favor, ingresa un email válido');
                isValid = false;
            }
            
            // Phone validation
            if (field.type === 'tel' && !isValidPhone(field.value)) {
                showFieldError(field, 'Por favor, ingresa un teléfono válido');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#e74c3c';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '4px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.dataset.originalText = originalText;
    button.innerHTML = '<span class="loading-spinner"></span> Enviando...';
    button.disabled = true;
    button.classList.add('loading');
}

function hideLoadingState(button) {
    button.innerHTML = button.dataset.originalText || button.innerHTML;
    button.disabled = false;
    button.classList.remove('loading');
}

function simulateFormSubmission() {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function showErrorMessage(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

/* ==========================================================================
   Calculator Functionality
   ========================================================================== */

function initializeCalculator() {
    const calculatorForm = document.getElementById('savingsCalculator');
    const calculatorResults = document.getElementById('calculatorResults');

    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateSavings();
        });
    }

    // Real-time calculation
    const calculatorInputs = calculatorForm?.querySelectorAll('input, select');
    calculatorInputs?.forEach(input => {
        input.addEventListener('change', () => {
            if (isCalculatorFormValid()) {
                calculateSavings();
            }
        });
    });
}

function isCalculatorFormValid() {
    const monthlyBill = document.getElementById('monthlyBill');
    const roofType = document.getElementById('roofType');
    const location = document.getElementById('location');
    
    return monthlyBill?.value && roofType?.value && location?.value;
}

function calculateSavings() {
    const monthlyBill = parseFloat(document.getElementById('monthlyBill')?.value) || 0;
    const roofType = document.getElementById('roofType')?.value;
    const location = document.getElementById('location')?.value;
    
    if (!monthlyBill) return;

    // Calculation factors based on location and roof type
    const locationFactors = {
        'cdmx': 0.85,
        'jalisco': 0.90,
        'nuevo-leon': 0.88,
        'sonora': 0.95,
        'other': 0.82
    };

    const roofFactors = {
        'concrete': 1.0,
        'metal': 0.95,
        'tile': 0.90,
        'other': 0.85
    };

    const locationFactor = locationFactors[location] || 0.82;
    const roofFactor = roofFactors[roofType] || 0.85;
    
    // Calculate system size needed (approximate)
    const systemSizeKW = Math.ceil((monthlyBill * 12) / 1500); // Rough estimate
    
    // Calculate savings
    const monthlySavings = Math.round(monthlyBill * locationFactor * roofFactor * 0.85);
    const yearlySavings = monthlySavings * 12;
    const lifetimeSavings = yearlySavings * 25;
    
    // Estimate investment
    const pricePerKW = 25000; // MXN per kW
    const estimatedInvestment = systemSizeKW * pricePerKW;
    
    // Calculate payback period
    const paybackPeriod = Math.round((estimatedInvestment / yearlySavings) * 10) / 10;
    
    // Calculate CO2 avoided (approximate)
    const co2PerKWh = 0.458; // kg CO2 per kWh in Mexico
    const annualProduction = systemSizeKW * 1500; // kWh per year
    const co2Avoided = Math.round((annualProduction * co2PerKWh) / 1000); // tons per year

    // Update results
    updateCalculatorResults({
        monthlySavings,
        yearlySavings,
        lifetimeSavings,
        estimatedInvestment,
        paybackPeriod,
        co2Avoided
    });
}

function updateCalculatorResults(results) {
    const resultsContainer = document.getElementById('calculatorResults');
    if (!resultsContainer) return;

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Update values
    const elements = {
        monthlySavings: document.getElementById('monthlySavings'),
        yearlySavings: document.getElementById('yearlySavings'),
        lifetimeSavings: document.getElementById('lifetimeSavings'),
        estimatedInvestment: document.getElementById('estimatedInvestment'),
        paybackPeriod: document.getElementById('paybackPeriod'),
        co2Avoided: document.getElementById('co2Avoided')
    };

    if (elements.monthlySavings) elements.monthlySavings.textContent = formatCurrency(results.monthlySavings);
    if (elements.yearlySavings) elements.yearlySavings.textContent = formatCurrency(results.yearlySavings);
    if (elements.lifetimeSavings) elements.lifetimeSavings.textContent = formatCurrency(results.lifetimeSavings);
    if (elements.estimatedInvestment) elements.estimatedInvestment.textContent = formatCurrency(results.estimatedInvestment);
    if (elements.paybackPeriod) elements.paybackPeriod.textContent = `${results.paybackPeriod} años`;
    if (elements.co2Avoided) elements.co2Avoided.textContent = `${results.co2Avoided} ton`;

    // Show results with animation
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Add animation class
    resultsContainer.style.opacity = '0';
    resultsContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsContainer.style.transition = 'all 0.5s ease';
        resultsContainer.style.opacity = '1';
        resultsContainer.style.transform = 'translateY(0)';
    }, 100);
}

/* ==========================================================================
   Project Filter Functionality
   ========================================================================== */

function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });

    // Load more projects functionality
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreProjects();
        });
    }
}

function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            card.style.display = 'block';
            // Animate in
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function loadMoreProjects() {
    // This would typically load more projects from an API
    // For now, we'll just simulate it
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = '<span class="loading-spinner"></span> Cargando...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            loadMoreBtn.innerHTML = '<span class="btn-text">Cargar Más Proyectos</span><span class="btn-icon">📁</span>';
            loadMoreBtn.disabled = false;
        }, 2000);
    }
}

/* ==========================================================================
   Testimonial Slider
   ========================================================================== */

function initializeTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;

    if (slides.length === 0) return;

    // Auto-advance slides
    const slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);

    // Navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            clearInterval(slideInterval);
        });
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function goToSlide(slideIndex) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[slideIndex].classList.add('active');
        navDots[slideIndex]?.classList.add('active');
        
        currentSlide = slideIndex;
    }

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            setInterval(() => {
                nextSlide();
            }, 5000);
        });
    }
}

/* ==========================================================================
   Newsletter Subscription
   ========================================================================== */

function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Show loading state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Suscribiendo...';
            submitBtn.disabled = true;
            
            try {
                // Simulate subscription
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showNotification('¡Te has suscrito exitosamente! Recibirás noticias sobre energía solar.', 'success');
                emailInput.value = '';
                
            } catch (error) {
                showNotification('Error al suscribirse. Por favor, inténtalo de nuevo.', 'error');
            } finally {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            }
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/* ==========================================================================
   Scroll Effects and Animations
   ========================================================================== */

function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .sol-benefit, .service-card, .project-card, .blog-article,
        .stat-card, .team-member, .testimonial-card, .value-pillar
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('.stat-number, .metric-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Parallax effect for hero images
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImages = document.querySelectorAll('.hero-image');
        
        heroImages.forEach(img => {
            const speed = 0.5;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        // Format the number and preserve any text
        let formattedNumber = Math.floor(current).toLocaleString('es-MX');
        
        // Handle special cases
        if (text.includes('MW')) {
            formattedNumber = (current).toFixed(1);
        } else if (text.includes('$') && text.includes('M')) {
            formattedNumber = '$' + Math.floor(current) + 'M';
        } else if (text.includes('%')) {
            formattedNumber = Math.floor(current) + '%';
        } else if (text.includes(',')) {
            formattedNumber = Math.floor(current).toLocaleString('es-MX');
        }
        
        element.textContent = text.replace(/[\d.,]+/, formattedNumber);
    }, duration / steps);
}

/* ==========================================================================
   Modal Functionality
   ========================================================================== */

function initializeModals() {
    // Project detail modals
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.dataset.project;
            showProjectModal(projectId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', hideProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideProjectModal);
    }

    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideProjectModal();
            hideSuccessModal();
        }
    });
}

function showProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal) return;

    // This would typically fetch project details from an API
    const projectData = getProjectData(projectId);
    
    if (modalTitle) modalTitle.textContent = projectData.title;
    if (modalBody) modalBody.innerHTML = projectData.content;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function getProjectData(projectId) {
    // Mock project data - in a real app this would come from an API
    const projects = {
        'plaza-milenium': {
            title: 'Plaza Milenium - Guadalajara',
            content: `
                <div class="project-details">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" 
                         alt="Plaza Milenium solar installation" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
                    
                    <h3>Detalles del Proyecto</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
                        <div>
                            <strong>Capacidad:</strong> 250kW<br>
                            <strong>Paneles:</strong> 680 unidades<br>
                            <strong>Área:</strong> 3,200m²
                        </div>
                        <div>
                            <strong>Ahorro anual:</strong> $890,000 MXN<br>
                            <strong>CO₂ evitado:</strong> 187 ton/año<br>
                            <strong>Año:</strong> 2024
                        </div>
                    </div>
                    
                    <h3>Descripción</h3>
                    <p>Este proyecto representa uno de nuestros mayores logros en el sector comercial. La instalación en Plaza Milenium incluye 680 paneles solares de alta eficiencia distribuidos estratégicamente en el techo del centro comercial.</p>
                    
                    <p>El sistema está diseñado para cubrir el 85% del consumo energético del centro comercial, resultando en ahorros significativos y estableciendo un nuevo estándar de sustentabilidad en la zona.</p>
                    
                    <h3>Características Técnicas</h3>
                    <ul>
                        <li>Paneles monocristalinos de 370W</li>
                        <li>Inversores string de última generación</li>
                        <li>Sistema de monitoreo en tiempo real</li>
                        <li>Estructura de montaje resistente a vientos de hasta 180 km/h</li>
                        <li>Garantía de 25 años en producción</li>
                    </ul>
                    
                    <h3>Impacto Ambiental</h3>
                    <p>Este proyecto evita la emisión de 187 toneladas de CO₂ anualmente, equivalente a retirar 40 automóviles de circulación durante un año completo.</p>
                </div>
            `
        },
        // Add more project data as needed
        'casa-gonzalez': {
            title: 'Casa González - Monterrey',
            content: `
                <div class="project-details">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                         alt="Casa González solar installation" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
                    
                    <h3>Proyecto Residencial Exitoso</h3>
                    <p>La familia González logró reducir su factura eléctrica de $3,500 a solo $280 pesos mensuales con nuestro sistema solar de 8kW.</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
                        <div>
                            <strong>Sistema:</strong> 8kW<br>
                            <strong>Paneles:</strong> 22 unidades<br>
                            <strong>Ahorro:</strong> 92%
                        </div>
                        <div>
                            <strong>Inversión:</strong> $140,000 MXN<br>
                            <strong>Recuperación:</strong> 4.2 años<br>
                            <strong>Instalación:</strong> 2024
                        </div>
                    </div>
                    
                    <p>Este proyecto demuestra cómo las familias mexicanas pueden lograr independencia energética y ahorros significativos con la energía solar.</p>
                </div>
            `
        }
    };

    return projects[projectId] || {
        title: 'Proyecto No Encontrado',
        content: '<p>Los detalles de este proyecto no están disponibles en este momento.</p>'
    };
}

/* ==========================================================================
   Smooth Scrolling and Utility Functions
   ========================================================================== */

function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back to top functionality
    const backToTopBtn = createBackToTopButton();
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

function createBackToTopButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--gradient-solar, #f1c40f);
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(btn);
    return btn;
}

/* ==========================================================================
   Additional Interactive Features
   ========================================================================== */

// Social sharing functionality
function shareOnSocial(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Initialize social sharing buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('social-share')) {
        e.preventDefault();
        const platform = e.target.dataset.platform;
        const url = window.location.href;
        const text = document.title;
        shareOnSocial(platform, url, text);
    }
});

// Form field enhancements
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentNode.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentNode.classList.remove('focused');
        }
    });
    
    // Check if already has value on page load
    if (input.value) {
        input.parentNode.classList.add('focused');
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: slideIn 0.6s ease forwards;
    }
    
    .form-group.focused .form-label {
        color: var(--primary-yellow, #f1c40f);
        transform: translateY(-5px);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🌞 Fuerzas Solar - Energía Renovable para México', 'color: #f1c40f; font-size: 16px; font-weight: bold;');
console.log('%cSitio web desarrollado con tecnologías modernas y optimizado para la mejor experiencia de usuario.', 'color: #2c3e50; font-size: 14px;');