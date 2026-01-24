// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initComponents();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Force hide preloader after 3 seconds (safety fallback)
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 3000);
});

// Initialize all website components
function initComponents() {
    // Initialize navigation
    initNavigation();
    
    // Initialize preloader
    initPreloader();
    
    // Load products on homepage
    if (document.querySelector('.products-grid')) {
        loadProducts();
        initProductFilter();
    }
    
    // Initialize map on contact page
    if (document.getElementById('map')) {
        initMap();
    }
    
    // Initialize form functionality
    if (document.querySelector('.form-section')) {
        initFormPages();
        initFormSubmissions();
    }
    
    // Initialize product page if needed
    if (document.querySelector('.product-page')) {
        initProductPage();
    }
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize hero image animation
    initHeroAnimation();
}

// Initialize preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });
}

// Initialize navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Load products on homepage
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    // Product data - UPDATED WITH CORRECT INFORMATION
    const products = [
        { 
            id: 1, 
            name: "ثلاجة شامية 70 سنتيمتر", 
            desc: "تبريد هجين ومبخرة لرفع الأداء، عزل مضاعف، ضاغط انفرتر، عزل 6 سم، أنابيب نحاسية 22 متر.",
            category: "home"
        },
        { 
            id: 2, 
            name: "ثلاجة شامية 80 سنتيمتر", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف، ضاغط انفرتر، عزل 6 سم، أنابيب نحاسية 22 متر، عرض 80 سم.",
            category: "home"
        },
        { 
            id: 3, 
            name: "ثلاجة شامية 80 سنتيمتر", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف، ضاغط انفرتر، عزل 6 سم، أنابيب نحاسية 22 متر، 5 رفوف.",
            category: "home"
        },
        { 
            id: 4, 
            name: "ثلاجة شامية 65 سبور", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف 5 سم، ضاغط انفرتر، أنابيب نحاسية 20 متر، 5 رفوف.",
            category: "home"
        },
        { 
            id: 5, 
            name: "ثلاجة شامية 65 سبور", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف 5 سم، ضاغط انفرتر، أنابيب نحاسية 20 متر، عرض 65 سم.",
            category: "home"
        },
        { 
            id: 6, 
            name: "ثلاجة شامية 65 سبور", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف 5 سم، ضاغط انفرتر، أنابيب نحاسية 20 متر، موفر للطاقة.",
            category: "home"
        },
        { 
            id: 7, 
            name: "ثلاجة شامية 70 سنتيمتر", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف 6 سم، ضاغط انفرتر، أنابيب نحاسية 22 متر، صناعة سورية.",
            category: "home"
        },
        { 
            id: 8, 
            name: "ثلاجة شامية 80 سنتيمتر", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف 6 سم، ضاغط انفرتر، أنابيب نحاسية 22 متر، 5 رفوف.",
            category: "home"
        },
        { 
            id: 9, 
            name: "ثلاجة شامية 70 سنتيمتر", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف 6 سم، ضاغط انفرتر، أنابيب نحاسية 22 متر، تصميم عصري.",
            category: "home"
        },
        { 
            id: 10, 
            name: "ثلاجة شامية 70 سنتيمتر", 
            desc: "تبريد هجين ومبخرة، عزل مضاعف 6 سم، ضاغط انفرتر، أنابيب نحاسية 22 متر، غاز صديق للبيئة.",
            category: "home"
        },
        { 
            id: 11, 
            name: "فريزر شامية التجاري الواسع", 
            desc: "فريزر تجاري واسع، سعة كبيرة، تبريد سريع وقوي، استهلاك منخفض للطاقة، صناعة سورية.",
            category: "commercial"
        }
    ];
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Create product cards
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = `product-card product-${product.category}`;
        productCard.setAttribute('data-category', product.category);
        productCard.style.animationDelay = `${index * 0.1}s`;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="product/${product.id}.png" 
                     alt="${product.name}" 
                     data-src="product/${product.id}.png"
                     loading="lazy"
                     class="product-img">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.desc}</p>
                <a href="${product.id}.html" class="btn btn-primary product-action">
                    <i class="fas fa-eye"></i>
                    <span>عرض التفاصيل</span>
                </a>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Initialize product images loading
    initProductImages();
}

// Initialize product filter
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                if (filter === 'all' || product.getAttribute('data-category') === filter) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize product images loading
function initProductImages() {
    const productImages = document.querySelectorAll('.product-img');
    
    productImages.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Create image element
        const image = new Image();
        image.src = img.getAttribute('data-src');
        image.alt = img.alt;
        
        image.onload = function() {
            img.src = this.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
        };
        
        image.onerror = function() {
            // If image fails to load, show placeholder
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiNjY2MiPkJhbm5lcjwvdGV4dD48L3N2Zz4=';
            img.classList.remove('loading');
            img.classList.add('error');
        };
    });
}

// Initialize hero animation
function initHeroAnimation() {
    const heroFridge = document.getElementById('heroFridge');
    
    if (heroFridge) {
        const image = new Image();
        image.src = heroFridge.src;
        
        image.onload = function() {
            heroFridge.classList.add('loaded');
        };
    }
}

// Initialize map
function initMap() {
    // Default location (Aleppo, Syria)
    const location = [36.2021, 37.1343];
    
    // Create map
    const map = L.map('map').setView(location, 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Custom icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<i class="fas fa-map-marker-alt"></i>',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });
    
    // Add marker
    L.marker(location, { icon: customIcon }).addTo(map)
        .bindPopup('<b>شامية للثلاجات</b><br>حلب - الشيخ نجار')
        .openPopup();
    
    // Adjust map on window resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    });
}

// Initialize product page
function initProductPage() {
    // Get product ID from URL
    const pathname = window.location.pathname;
    const productId = pathname.split('/').pop().replace('.html', '');
    
    // Update product image and details based on product ID
    const productImage = document.getElementById('productMainImage');
    const productTitle = document.querySelector('.form-title');
    const specsList = document.getElementById('productSpecs');
    
    // Update product image
    if (productImage && productId) {
        productImage.src = `product/${productId}.png`;
        productImage.alt = `ثلاجة شامية ${productId}`;
        
        // Add loading animation
        productImage.classList.add('loading');
        
        // Load image
        const image = new Image();
        image.src = `product/${productId}.png`;
        
        image.onload = function() {
            productImage.classList.remove('loading');
            productImage.classList.add('loaded');
        };
    }
    
    // Product details from your data
    const productDetails = {
        '1': {
            name: 'ثلاجة شامية 70 سنتيمتر',
            specs: [
                { label: 'السعة', value: '70 سنتيمتر' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٦ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٢ متر' },
                { label: 'قطر الأنابيب', value: '٥/١٦' },
                { label: 'حماية النحاس', value: '٨ متر' },
                { label: 'الغاز', value: 'فريون صديق للبيئة' }
            ]
        },
        '2': {
            name: 'ثلاجة شامية 80 سنتيمتر',
            specs: [
                { label: 'السعة', value: '80 سنتيمتر' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٦ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٢ متر' },
                { label: 'قطر الأنابيب', value: '٥/١٦' },
                { label: 'حماية النحاس', value: '٩ متر' },
                { label: 'عرض الواجهة', value: '٨٠ سنتيمتر' },
                { label: 'عدد الرفوف', value: '٥ رفوف' }
            ]
        },
        '3': {
            name: 'ثلاجة شامية 80 سنتيمتر',
            specs: [
                { label: 'السعة', value: '80 سنتيمتر' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٦ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٢ متر' },
                { label: 'قطر الأنابيب', value: '٥/١٦' },
                { label: 'حماية النحاس', value: '٩ متر' },
                { label: 'عرض الواجهة', value: '٨٠ سنتيمتر' },
                { label: 'عدد الرفوف', value: '٥ رفوف' }
            ]
        },
        '4': {
            name: 'ثلاجة شامية 65 سبور',
            specs: [
                { label: 'السعة', value: '65 سبور' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٥ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٠ متر' },
                { label: 'قطر الأنابيب', value: '١/٤' },
                { label: 'حماية النحاس', value: '٦ متر' },
                { label: 'عرض الواجهة', value: '٦٥ سنتيمتر' },
                { label: 'عدد الرفوف', value: '٥ رفوف' }
            ]
        },
        '5': {
            name: 'ثلاجة شامية 65 سبور',
            specs: [
                { label: 'السعة', value: '65 سبور' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٥ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٠ متر' },
                { label: 'قطر الأنابيب', value: '١/٤' },
                { label: 'حماية النحاس', value: '٦ متر' },
                { label: 'عرض الواجهة', value: '٦٥ سنتيمتر' },
                { label: 'عدد الرفوف', value: '٥ رفوف' }
            ]
        },
        '6': {
            name: 'ثلاجة شامية 65 سبور',
            specs: [
                { label: 'السعة', value: '65 سبور' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٥ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٠ متر' },
                { label: 'قطر الأنابيب', value: '١/٤' },
                { label: 'حماية النحاس', value: '٦ متر' },
                { label: 'عرض الواجهة', value: '٦٥ سنتيمتر' },
                { label: 'عدد الرفوف', value: '٥ رفوف' }
            ]
        },
        '7': {
            name: 'ثلاجة شامية 70 سنتيمتر',
            specs: [
                { label: 'السعة', value: '70 سنتيمتر' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٦ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٢ متر' },
                { label: 'قطر الأنابيب', value: '٥/١٦' },
                { label: 'حماية النحاس', value: '٨ متر' },
                { label: 'الغاز', value: 'فريون صديق للبيئة' }
            ]
        },
        '8': {
            name: 'ثلاجة شامية 80 سنتيمتر',
            specs: [
                { label: 'السعة', value: '80 سنتيمتر' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٦ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٢ متر' },
                { label: 'قطر الأنابيب', value: '٥/١٦' },
                { label: 'حماية النحاس', value: '٩ متر' },
                { label: 'عرض الواجهة', value: '٨٠ سنتيمتر' },
                { label: 'عدد الرفوف', value: '٥ رفوف' }
            ]
        },
        '9': {
            name: 'ثلاجة شامية 70 سنتيمتر',
            specs: [
                { label: 'السعة', value: '70 سنتيمتر' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٦ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٢ متر' },
                { label: 'قطر الأنابيب', value: '٥/١٦' },
                { label: 'حماية النحاس', value: '٨ متر' },
                { label: 'الغاز', value: 'فريون صديق للبيئة' }
            ]
        },
        '10': {
            name: 'ثلاجة شامية 70 سنتيمتر',
            specs: [
                { label: 'السعة', value: '70 سنتيمتر' },
                { label: 'نوع التبريد', value: 'تبريد هجين' },
                { label: 'الضاغط', value: 'ضاغط انفرتر' },
                { label: 'سماكة العزل', value: '٦ سنتمتر' },
                { label: 'الأنابيب', value: 'نحاسية بطول ٢٢ متر' },
                { label: 'قطر الأنابيب', value: '٥/١٦' },
                { label: 'حماية النحاس', value: '٨ متر' },
                { label: 'الغاز', value: 'فريون صديق للبيئة' }
            ]
        },
        '11': {
            name: 'فريزر شامية التجاري الواسع',
            specs: [
                { label: 'النوع', value: 'فريزر تجاري واسع' },
                { label: 'الاستخدام', value: 'تجاري مكثف' },
                { label: 'التبريد', value: 'تبريد سريع وقوي' },
                { label: 'السعة', value: 'كبيرة' },
                { label: 'الطاقة', value: 'موفر للطاقة' },
                { label: 'التصنيع', value: 'صناعة سورية' },
                { label: 'المواد', value: 'عالية الجودة' },
                { label: 'الضمان', value: 'ضمان ممتد' }
            ]
        }
    };
    
    const details = productDetails[productId] || productDetails['1'];
    
    // Update page title and breadcrumb
    if (productTitle) {
        document.title = `${details.name} - شامية`;
    }
    
    // Update breadcrumb
    const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
    if (breadcrumbCurrent && details.name) {
        breadcrumbCurrent.textContent = details.name;
    }
}

// Form handling functions from old main.js
function initFormPages() {
    if (document.querySelector('.form-step')) {
        initMultiStepForms();
        populateFormSelects();
        initFormMaps();
    }
}
function initMultiStepForms() {
    const forms = document.querySelectorAll('.form-content');
    
    forms.forEach(form => {
        const steps = form.querySelectorAll('.form-step');
        const nextBtns = form.querySelectorAll('.btn-next');
        const prevBtns = form.querySelectorAll('.btn-prev');
        const progressFill = form.closest('.form-container')?.querySelector('.progress-fill');
        const progressSteps = form.closest('.form-container')?.querySelectorAll('.progress-step');
        
        if (!steps.length) return;
        
        let currentStep = 0;
        showStep(currentStep);
        
        // Next button click
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    currentStep++;
                    updateProgress();
                    showStep(currentStep);
                    // تحديث الملخص ورابط واتساب
                    updateSummary();
                }
            });
        });
        prevBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                currentStep--;
                updateProgress();
                showStep(currentStep);
                // تحديث الملخص ورابط واتساب
                updateSummary();
            });
        });

        
        // Edit button in order summary
        const editOrderBtn = document.getElementById('editOrderBtn');
        if (editOrderBtn) {
            editOrderBtn.addEventListener('click', function() {
                currentStep = 0;
                updateProgress();
                showStep(currentStep);
            });
        }
        
        function showStep(step) {
            steps.forEach(s => s.classList.remove('active'));
            if (steps[step]) {
                steps[step].classList.add('active');
            }
        }
        
        function updateProgress() {
            const progress = ((currentStep + 1) / steps.length) * 100;
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
            
            if (progressSteps) {
                progressSteps.forEach((step, index) => {
                    if (index <= currentStep) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
            }
        }
        
        function validateStep(step) {
            const currentStepElement = steps[step];
            const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e53e3e';
                    
                    // Add shake animation
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 500);
                    
                    // Reset border color after 2 seconds
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            return isValid;
        }
        
        // Add shake animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            .shake {
                animation: shake 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    });
}

function populateFormSelects() {
    // Syrian cities
    const syrianCities = [
        "حلب", "دمشق", "حمص", "اللاذقية", "حماة", "طرطوس", "دير الزور",
        "السويداء", "درعا", "القنيطرة", "ريف دمشق", "إدلب", "الحسكة", "الرقة"
    ];
    
    // Populate city selects
    const citySelects = document.querySelectorAll('#orderCity, #repairCity');
    citySelects.forEach(select => {
        if (select.children.length <= 1) { // Only if not already populated
            syrianCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                select.appendChild(option);
            });
        }
    });
}

function initFormMaps() {
    const orderMapElement = document.getElementById('orderMap');
    if (orderMapElement) {
        initOrderMap();
    }
    
    const repairMapElement = document.getElementById('repairMap');
    if (repairMapElement) {
        initRepairMap();
    }
}

function initOrderMap() {
    const orderMap = L.map('orderMap').setView([36.2021, 37.1343], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(orderMap);
    
    let orderMarker;
    
    // Add click event to place marker
    orderMap.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        // Remove existing marker
        if (orderMarker) {
            orderMap.removeLayer(orderMarker);
        }
        
        // Add new marker
        orderMarker = L.marker([lat, lng]).addTo(orderMap);
        
        // Update coordinate inputs
        document.getElementById('orderLat').value = lat.toFixed(6);
        document.getElementById('orderLng').value = lng.toFixed(6);
        
        // Show success notification
        showNotification('تم تحديد موقعك بنجاح!', 'success');
    });
    
    // Adjust map on window resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            orderMap.invalidateSize();
        }, 100);
    });
}

function initRepairMap() {
    const repairMap = L.map('repairMap').setView([36.2021, 37.1343], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(repairMap);
    
    let repairMarker;
    
    // Add click event to place marker
    repairMap.on('click', function(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        // Remove existing marker
        if (repairMarker) {
            repairMap.removeLayer(repairMarker);
        }
        
        // Add new marker
        repairMarker = L.marker([lat, lng]).addTo(repairMap);
        
        // Update coordinate inputs
        document.getElementById('repairLat').value = lat.toFixed(6);
        document.getElementById('repairLng').value = lng.toFixed(6);
        
        // Show success notification
        showNotification('تم تحديد موقعك بنجاح!', 'success');
    });
    
    // Adjust map on window resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            repairMap.invalidateSize();
        }, 100);
    });
}
function updateSummary() {
    // Order summary
    if (document.getElementById('summaryName')) {
        const name = document.getElementById('orderName')?.value || '-';
        const phone = document.getElementById('orderPhone')?.value || '-';
        const city = document.getElementById('orderCity')?.value || '-';
        const district = document.getElementById('orderDistrict')?.value || '-';
        const notes = document.getElementById('orderNotes')?.value || 'لا توجد ملاحظات';
        
        document.getElementById('summaryName').textContent = name;
        document.getElementById('summaryPhone').textContent = phone;
        document.getElementById('summaryCity').textContent = city;
        document.getElementById('summaryDistrict').textContent = district;
        document.getElementById('summaryNotes').textContent = notes;
    }
    
    // Repair summary - تحديث هنا
    if (document.getElementById('repairSummaryName')) {
        const name = document.getElementById('repairName')?.value || '-';
        const phone = document.getElementById('repairPhone')?.value || '-';
        const city = document.getElementById('repairCity')?.value || '-';
        const problemType = document.getElementById('problemType')?.value || '-';
        const preferredTime = document.getElementById('preferredTime')?.value || '-';
        const address = document.getElementById('repairAddress')?.value || '';
        const problemDetails = document.getElementById('problemDetails')?.value || '';
        
        document.getElementById('repairSummaryName').textContent = name;
        document.getElementById('repairSummaryPhone').textContent = phone;
        document.getElementById('repairSummaryCity').textContent = city;
        document.getElementById('repairSummaryProblem').textContent = problemType;
        document.getElementById('repairSummaryTime').textContent = preferredTime;
        
        // تحديث رابط واتساب عند كل تحديث للملخص
        generateRepairWhatsAppMessage();
    }
}

function generateRepairWhatsAppMessage() {
    const name = document.getElementById('repairName')?.value || '';
    const phone = document.getElementById('repairPhone')?.value || '';
    const city = document.getElementById('repairCity')?.value || '';
    const problemType = document.getElementById('problemType')?.value || '';
    const problemDetails = document.getElementById('problemDetails')?.value || '';
    const preferredTime = document.getElementById('preferredTime')?.value || '';
    const address = document.getElementById('repairAddress')?.value || '';
    const lat = document.getElementById('repairLat')?.value || '';
    const lng = document.getElementById('repairLng')?.value || '';
    
    // إنشاء رسالة واتساب
    const message = `طلب خدمة صيانة ثلاجات شامية%0A%0A` +
        `الاسم: ${name}%0A` +
        `الهاتف: ${phone}%0A` +
        `المحافظة: ${city}%0A` +
        `العنوان: ${address}%0A` +
        `نوع المشكلة: ${problemType}%0A` +
        `تفاصيل المشكلة: ${problemDetails}%0A` +
        `الوقت المفضل: ${preferredTime}%0A` +
        `الموقع: ${lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : 'غير محدد'}%0A` +
        `التاريخ: ${new Date().toLocaleDateString('ar-SY')}%0A` +
        `وقت الإرسال: ${new Date().toLocaleTimeString('ar-SY')}%0A%0A` +
        `هذا الطلب تم إرساله من موقع شامية للثلاجات`;
    
    const whatsappBtn = document.getElementById('repairWhatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/963936604658?text=${message}`;
        whatsappBtn.setAttribute('target', '_blank');
        whatsappBtn.setAttribute('rel', 'noopener noreferrer');
    }
}

function initFormSubmissions() {
    // Order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(orderForm)) {
                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    // تحديث رابط واتساب قبل العرض
                    generateOrderWhatsAppMessage();
                    
                    // ثم عرض رسالة النجاح
                    successMessage.style.display = 'block';
                    orderForm.style.display = 'none';
                }
            }
        });
    }
    
    // Repair form submission
    const repairForm = document.getElementById('repairForm');
    if (repairForm) {
        repairForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(repairForm)) {
                // Show success message
                const successMessage = document.getElementById('repairSuccessMessage');
                if (successMessage) {
                    // تحديث رابط واتساب قبل العرض
                    generateRepairWhatsAppMessage();
                    
                    // ثم عرض رسالة النجاح
                    successMessage.style.display = 'block';
                    repairForm.style.display = 'none';
                    
                    // إعادة تعيين النموذج (اختياري)
                    repairForm.reset();
                }
            }
        });
    }
}

// إضافة مستمع حدث لحقول النموذج لتحديث رابط واتساب تلقائياً
document.addEventListener('DOMContentLoaded', function() {
    // إضافة مستمعات حدث للحقول في نموذج الصيانة
    const repairFormFields = ['repairName', 'repairPhone', 'repairCity', 'problemType', 'problemDetails', 'preferredTime', 'repairAddress'];
    
    repairFormFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', generateRepairWhatsAppMessage);
            field.addEventListener('change', generateRepairWhatsAppMessage);
        }
    });
    
    // إضافة مستمع للحقول الجغرافية أيضاً
    const latField = document.getElementById('repairLat');
    const lngField = document.getElementById('repairLng');
    if (latField) latField.addEventListener('input', generateRepairWhatsAppMessage);
    if (lngField) lngField.addEventListener('input', generateRepairWhatsAppMessage);
});
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e53e3e';
            
            // Reset border color after 2 seconds
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });
    
    // Check terms agreement
    const terms = form.querySelector('input[type="checkbox"][required]');
    if (terms && !terms.checked) {
        isValid = false;
        showNotification('الرجاء الموافقة على الشروط والأحكام', 'error');
    }
    
    if (!isValid) {
        showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
    }
    
    return isValid;
}

function generateOrderWhatsAppMessage() {
    const name = document.getElementById('orderName')?.value || '';
    const phone = document.getElementById('orderPhone')?.value || '';
    const city = document.getElementById('orderCity')?.value || '';
    const district = document.getElementById('orderDistrict')?.value || '';
    const address = document.getElementById('orderAddress')?.value || '';
    const notes = document.getElementById('orderNotes')?.value || '';
    const lat = document.getElementById('orderLat')?.value || '';
    const lng = document.getElementById('orderLng')?.value || '';
    
    // Get product from URL or page
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    let productName = 'ثلاجة شامية';
    
    if (productId) {
        const productDetails = {
            '1': 'ثلاجة شامية 70 سنتيمتر',
            '2': 'ثلاجة شامية 80 سنتيمتر',
            '3': 'ثلاجة شامية 80 سنتيمتر',
            '4': 'ثلاجة شامية 65 سبور',
            '5': 'ثلاجة شامية 65 سبور',
            '6': 'ثلاجة شامية 65 سبور',
            '7': 'ثلاجة شامية 70 سنتيمتر',
            '8': 'ثلاجة شامية 80 سنتيمتر',
            '9': 'ثلاجة شامية 70 سنتيمتر',
            '10': 'ثلاجة شامية 70 سنتيمتر',
            '11': 'فريزر شامية التجاري الواسع'
        };
        productName = productDetails[productId] || productName;
    }
    
    // Removed emojis from the message
    const message = `طلب شراء ثلاجة شامية%0A%0A` +
        `الاسم: ${name}%0A` +
        `الهاتف: ${phone}%0A` +
        `المحافظة: ${city}%0A` +
        `المنطقة: ${district}%0A` +
        `العنوان: ${address}%0A` +
        `المنتج: ${productName}%0A` +
        `الموقع: ${lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : 'غير محدد'}%0A` +
        `ملاحظات: ${notes || 'لا توجد'}%0A` +
        `التاريخ: ${new Date().toLocaleDateString('ar-SY')}%0A` +
        `الوقت: ${new Date().toLocaleTimeString('ar-SY')}%0A%0A` +
        `هذا الطلب تم إرساله من موقع شامية للثلاجات`;
    
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/963936604658?text=${message}`;
        // Ensure the button has target="_blank"
        whatsappBtn.setAttribute('target', '_blank');
    }
}

function generateRepairWhatsAppMessage() {
    const name = document.getElementById('repairName')?.value || '';
    const phone = document.getElementById('repairPhone')?.value || '';
    const city = document.getElementById('repairCity')?.value || '';
    const problemType = document.getElementById('problemType')?.value || '';
    const problemDetails = document.getElementById('problemDetails')?.value || '';
    const preferredTime = document.getElementById('preferredTime')?.value || '';
    const address = document.getElementById('repairAddress')?.value || '';
    const lat = document.getElementById('repairLat')?.value || '';
    const lng = document.getElementById('repairLng')?.value || '';
    
    // Removed emojis from the message
    const message = `طلب خدمة صيانة ثلاجات شامية%0A%0A` +
        `الاسم: ${name}%0A` +
        `الهاتف: ${phone}%0A` +
        `المحافظة: ${city}%0A` +
        `العنوان: ${address}%0A` +
        `نوع المشكلة: ${problemType}%0A` +
        `تفاصيل المشكلة: ${problemDetails}%0A` +
        `الوقت المفضل: ${preferredTime}%0A` +
        `الموقع: ${lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : 'غير محدد'}%0A` +
        `التاريخ: ${new Date().toLocaleDateString('ar-SY')}%0A` +
        `وقت الإرسال: ${new Date().toLocaleTimeString('ar-SY')}%0A%0A` +
        `هذا الطلب تم إرساله من موقع شامية للثلاجات`;
    
    const whatsappBtn = document.getElementById('repairWhatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/963936604658?text=${message}`;
        // Ensure the button has target="_blank"
        whatsappBtn.setAttribute('target', '_blank');
    }
}

// Initialize lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.product-card, .about-feature, .info-card, .repair-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Show notification
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#38a169' : '#e53e3e'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 3.5s forwards;
        max-width: 90%;
        box-sizing: border-box;
    `;
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}
