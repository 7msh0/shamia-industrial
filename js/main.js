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
    
    // Initialize form functionality on order/repair pages
    if (document.getElementById('orderForm')) {
        initOrderForm();
    }
    
    if (document.getElementById('repairForm')) {
        initRepairForm();
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
    
    // Product data
    const products = [
        { 
            id: 1, 
            name: "ثلاجة شميا ١٢ قدم", 
            desc: "ثلاجة ١٢ قدم بتصميم عصري، موفرة للطاقة بنسبة ٤٠٪، مزودة بثلاث أدراج وضاغط ساكن.",
            features: ["تبريد موحد", "ضاغط ساكن", "شاشة تحكم", "٣ أدراج"],
            category: "home"
        },
        { 
            id: 2, 
            name: "ثلاجة شميا ١٤ قدم", 
            desc: "ثلاجة ١٤ قدم مع نظام التبريد الذكي، سعة تخزين كبيرة، مناسبة للعائلات المتوسطة.",
            features: ["نظام تبريد ذكي", "مؤشر درجة الحرارة", "٤ أدراج", "مقاومة للصقيع"],
            category: "home"
        },
        { 
            id: 3, 
            name: "ثلاجة شميا ١٦ قدم", 
            desc: "ثلاجة ١٦ قدم، فريزر سفلي، تقنية التبريد السريع، تصميم فاخر.",
            features: ["فريزر سفلي", "تبريد سريع", "توفير طاقة", "شاشة لمس"],
            category: "home"
        },
        { 
            id: 4, 
            name: "ثلاجة شميا ١٨ قدم", 
            desc: "ثلاجة ١٨ قدم، نظام تبريد مزدوج، مقاومة للصقيع، سعة كبيرة.",
            features: ["نظام تبريد مزدوج", "مقاومة الصقيع", "٥ أدراج", "عزل حراري"],
            category: "home"
        },
        { 
            id: 5, 
            name: "ثلاجة شميا ٢٠ قدم", 
            desc: "ثلاجة ٢٠ قدم، ضاغط ساكن، تصميم فاخر، مناسبة للعائلات الكبيرة.",
            features: ["ضاغط ساكن", "تصميم فاخر", "إضاءة LED", "تحكم رقمي"],
            category: "home"
        },
        { 
            id: 6, 
            name: "ثلاجة شميا ٢٢ قدم", 
            desc: "ثلاجة ٢٢ قدم، نظام توزيع هواء ذكي، سعة كبيرة، موفرة للطاقة.",
            features: ["توزيع هواء ذكي", "سعة كبيرة", "أرفف قابلة للتعديل", "عمر طويل"],
            category: "home"
        },
        { 
            id: 7, 
            name: "ثلاجة شميا ٢٤ قدم", 
            desc: "ثلاجة ٢٤ قدم، بابين، صناعة سورية ١٠٠٪، ضمان ١٠ سنوات.",
            features: ["بابين", "صناعة سورية", "ضمان ١٠ سنوات", "تصميم كلاسيكي"],
            category: "home"
        },
        { 
            id: 8, 
            name: "ثلاجة شميا ١٠ قدم", 
            desc: "ثلاجة ١٠ قدم، مناسبة للمكاتب والاستخدام الخفيف، هادئة التشغيل.",
            features: ["حجم صغير", "مناسبة للمكاتب", "هادئة", "سهلة النقل"],
            category: "home"
        },
        { 
            id: 9, 
            name: "ثلاجة شميا ٨ قدم", 
            desc: "ثلاجة ٨ قدم، صغيرة الحجم، كبيرة الأداء، موفرة للطاقة.",
            features: ["حجم مضغوط", "أداء عالي", "موفرة للطاقة", "سهلة التركيب"],
            category: "home"
        },
        { 
            id: 10, 
            name: "ثلاجة شميا التجارية", 
            desc: "ثلاجة تجارية ٣٠ قدم، مناسبة للمطاعم والمحلات، متحملة للاستخدام المكثف.",
            features: ["سعة تجارية", "متحمل للاستخدام المكثف", "تبريد سريع", "ضمان ممتد"],
            category: "commercial"
        },
        { 
            id: 11, 
            name: "ثلاجة شميا الذكية", 
            desc: "ثلاجة ذكية ١٨ قدم، متصلة بالإنترنت، تحكم صوتي، تحديثات برمجية.",
            features: ["ذكية", "متصلة بالإنترنت", "تحكم صوتي", "تحديثات برمجية"],
            category: "home"
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
                <ul class="product-features">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
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
    // Default location (Damascus, Syria)
    const damascus = [33.5138, 36.2765];
    
    // Create map
    const map = L.map('map').setView(damascus, 13);
    
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
    L.marker(damascus, { icon: customIcon }).addTo(map)
        .bindPopup('<b>شميا للثلاجات</b><br>دمشق، شارع الثورة')
        .openPopup();
    
    // Adjust map on window resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    });
}

// Initialize order form
function initOrderForm() {
    const orderForm = document.getElementById('orderForm');
    const citySelect = document.getElementById('city');
    const mapContainer = document.getElementById('orderMap');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (!orderForm) return;
    
    // Syrian cities
    const syrianCities = [
        "دمشق", "حلب", "حمص", "اللاذقية", "حماة", "طرطوس", "دير الزور",
        "السويداء", "درعا", "القنيطرة", "ريف دمشق", "إدلب", "الحسكة", "الرقة"
    ];
    
    // Populate cities dropdown
    syrianCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
    
    // Initialize map for order form
    let orderMap;
    let orderMarker;
    
    if (mapContainer) {
        orderMap = L.map('orderMap').setView([35.0000, 38.0000], 7);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(orderMap);
        
        // Adjust map on window resize
        window.addEventListener('resize', function() {
            setTimeout(() => {
                orderMap.invalidateSize();
            }, 100);
        });
        
        // Add click event to place marker
        orderMap.on('click', function(e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            
            // Remove existing marker
            if (orderMarker) {
                orderMap.removeLayer(orderMarker);
            }
            
            // Custom icon
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: '<i class="fas fa-map-pin"></i>',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            });
            
            // Add new marker
            orderMarker = L.marker([lat, lng], { icon: customIcon }).addTo(orderMap);
            
            // Update hidden inputs
            document.getElementById('locationLat').value = lat.toFixed(6);
            document.getElementById('locationLng').value = lng.toFixed(6);
            
            // Show success message
            showNotification('تم تحديد موقعك بنجاح!', 'success');
        });
    }
    
    // Form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(orderForm)) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            city: document.getElementById('city').value,
            tubeType: document.querySelector('input[name="tubeType"]:checked')?.value || 'لا تفضيل',
            locationLat: document.getElementById('locationLat').value,
            locationLng: document.getElementById('locationLng').value,
            notes: document.getElementById('notes').value || 'لا توجد ملاحظات',
            product: getProductFromURL() || 'ثلاجة شميا',
            date: new Date().toLocaleDateString('ar-SY'),
            time: new Date().toLocaleTimeString('ar-SY')
        };
        
        // Create WhatsApp message
        const message = `📋 *طلب شراء ثلاجة شميا*%0A%0A`
            + `👤 *الاسم:* ${formData.name}%0A`
            + `🏙️ *المدينة:* ${formData.city}%0A`
            + `🔧 *نوع الأنابيب:* ${formData.tubeType}%0A`
            + `🛒 *المنتج:* ${formData.product}%0A`
            + `📍 *الموقع:* ${formData.locationLat ? `https://maps.google.com/?q=${formData.locationLat},${formData.locationLng}` : 'غير محدد'}%0A`
            + `📝 *ملاحظات:* ${formData.notes}%0A`
            + `📅 *التاريخ:* ${formData.date}%0A`
            + `⏰ *الوقت:* ${formData.time}%0A%0A`
            + `_هذا الطلب تم إرساله من موقع شميا للثلاجات_`;
        
        // Update WhatsApp button link
        if (whatsappBtn) {
            whatsappBtn.href = `https://wa.me/963111111111?text=${message}`;
            whatsappBtn.target = '_blank';
            
            // Show success message
            showNotification('تم حفظ بيانات الطلب! اضغط على زر الواتساب لإرسال الطلب.', 'success');
        }
    });
}

// Initialize repair form
function initRepairForm() {
    const repairForm = document.getElementById('repairForm');
    const fridgeSelect = document.getElementById('fridgeModel');
    const mapContainer = document.getElementById('repairMap');
    const whatsappBtn = document.getElementById('repairWhatsappBtn');
    
    if (!repairForm) return;
    
    // Populate refrigerator options
    const fridgeModels = [
        { id: 1, name: "ثلاجة شميا ١٢ قدم" },
        { id: 2, name: "ثلاجة شميا ١٤ قدم" },
        { id: 3, name: "ثلاجة شميا ١٦ قدم" },
        { id: 4, name: "ثلاجة شميا ١٨ قدم" },
        { id: 5, name: "ثلاجة شميا ٢٠ قدم" },
        { id: 6, name: "ثلاجة شميا ٢٢ قدم" },
        { id: 7, name: "ثلاجة شميا ٢٤ قدم" },
        { id: 8, name: "ثلاجة شميا ١٠ قدم" },
        { id: 9, name: "ثلاجة شميا ٨ قدم" },
        { id: 10, name: "ثلاجة شميا التجارية" },
        { id: 11, name: "ثلاجة شميا الذكية" }
    ];
    
    fridgeModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = model.name;
        fridgeSelect.appendChild(option);
    });
    
    // Initialize map for repair form
    let repairMap;
    let repairMarker;
    
    if (mapContainer) {
        repairMap = L.map('repairMap').setView([35.0000, 38.0000], 7);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(repairMap);
        
        // Adjust map on window resize
        window.addEventListener('resize', function() {
            setTimeout(() => {
                repairMap.invalidateSize();
            }, 100);
        });
        
        // Add click event to place marker
        repairMap.on('click', function(e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;
            
            // Remove existing marker
            if (repairMarker) {
                repairMap.removeLayer(repairMarker);
            }
            
            // Custom icon
            const customIcon = L.divIcon({
                className: 'custom-marker repair',
                html: '<i class="fas fa-tools"></i>',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            });
            
            // Add new marker
            repairMarker = L.marker([lat, lng], { icon: customIcon }).addTo(repairMap);
            
            // Update hidden inputs
            document.getElementById('repairLocationLat').value = lat.toFixed(6);
            document.getElementById('repairLocationLng').value = lng.toFixed(6);
            
            // Show success message
            showNotification('تم تحديد موقعك بنجاح!', 'success');
        });
    }
    
    // Form submission
    repairForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(repairForm)) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('repairName').value,
            fridgeModel: fridgeSelect.options[fridgeSelect.selectedIndex].text,
            problem: document.getElementById('problem').value,
            locationLat: document.getElementById('repairLocationLat').value,
            locationLng: document.getElementById('repairLocationLng').value,
            repairTime: document.getElementById('repairTime').value,
            date: new Date().toLocaleDateString('ar-SY'),
            time: new Date().toLocaleTimeString('ar-SY')
        };
        
        // Create WhatsApp message
        const message = `🔧 *طلب خدمة صيانة ثلاجات شميا*%0A%0A`
            + `👤 *الاسم:* ${formData.name}%0A`
            + `❄️ *موديل الثلاجة:* ${formData.fridgeModel}%0A`
            + `⚠️ *وصف المشكلة:* ${formData.problem}%0A`
            + `📍 *الموقع:* ${formData.locationLat ? `https://maps.google.com/?q=${formData.locationLat},${formData.locationLng}` : 'غير محدد'}%0A`
            + `⏰ *الوقت المناسب:* ${formData.repairTime}%0A`
            + `📅 *التاريخ:* ${formData.date}%0A`
            + `🕐 *وقت الإرسال:* ${formData.time}%0A%0A`
            + `_هذا الطلب تم إرساله من موقع شميا للثلاجات_`;
        
        // Update WhatsApp button link
        if (whatsappBtn) {
            whatsappBtn.href = `https://wa.me/963111111111?text=${message}`;
            whatsappBtn.target = '_blank';
            
            // Show success message
            showNotification('تم حفظ بيانات الصيانة! اضغط على زر الواتساب لإرسال الطلب.', 'success');
        }
    });
}

// Initialize product page
function initProductPage() {
    // Get product ID from URL or page
    const pathname = window.location.pathname;
    const productId = pathname.split('/').pop().replace('.html', '');
    
    // Update product image and details based on product ID
    const productImage = document.querySelector('.product-gallery img');
    const productTitle = document.querySelector('.product-info h1');
    const productDesc = document.querySelector('.product-description');
    const specsList = document.querySelector('.specs-list');
    
    if (productImage && productId) {
        productImage.src = `product/${productId}.png`;
        productImage.alt = `ثلاجة شميا ${productId}`;
        productImage.setAttribute('data-src', `product/${productId}.png`);
        
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
    
    // Update product details
    if (productId) {
        const productDetails = {
            '1': {
                name: 'ثلاجة شميا ١٢ قدم - موديل 2023',
                desc: 'ثلاجة شميا ١٢ قدم بتصميم أنيق وحديث، توفر مساحة تخزين كبيرة مع استهلاك منخفض للطاقة. مزودة بتقنية التبريد الذكي التي تحافظ على الطعام طازجاً لفترة أطول. تتميز بضاغط ساكن يقلل من استهلاك الطاقة ويوفر في فواتير الكهرباء، مع نظام تبريد موحد يحافظ على درجة حرارة مثالية في جميع أجزاء الثلاجة.',
                specs: [
                    { label: 'السعة', value: '١٢ قدم (٣٤٠ لتر)' },
                    { label: 'اللون', value: 'فضي / أبيض' },
                    { label: 'نوع التبريد', value: 'تبريد هوائي ذكي' },
                    { label: 'الطاقة', value: '⭐️⭐️⭐️⭐️ (موفر للطاقة)' },
                    { label: 'الضاغط', value: 'ضاغط ساكن موفر للطاقة' },
                    { label: 'الضمان', value: '١٠ سنوات على الضاغط' },
                    { label: 'الأبعاد', value: 'عرض ٦٠ سم × عمق ٦٥ سم × ارتفاع ١٦٠ سم' },
                    { label: 'المميزات', value: 'مؤشر درجة الحرارة، أرفف قابلة للتعديل' }
                ]
            },
            '2': {
                name: 'ثلاجة شميا ١٤ قدم - موديل 2023',
                desc: 'ثلاجة شميا ١٤ قدم مع نظام التبريد الذكي المتطور، تقدم أداءً استثنائياً مع توفير استهلاك الطاقة. مثالية للعائلات المتوسطة.',
                specs: [
                    { label: 'السعة', value: '١٤ قدم (٣٩٦ لتر)' },
                    { label: 'اللون', value: 'فضي' },
                    { label: 'نوع التبريد', value: 'نظام تبريد ذكي' },
                    { label: 'الطاقة', value: '⭐️⭐️⭐️⭐️⭐️ (موفر للطاقة)' },
                    { label: 'الضاغط', value: 'ضاغط ساكن' },
                    { label: 'الضمان', value: '١٠ سنوات على الضاغط' },
                    { label: 'الأبعاد', value: 'عرض ٦٥ سم × عمق ٦٨ سم × ارتفاع ١٦٥ سم' },
                    { label: 'المميزات', value: 'مؤشر رقمي، ٤ أدراج كبيرة' }
                ]
            }
        };
        
        const details = productDetails[productId] || productDetails['1'];
        
        if (productTitle) productTitle.textContent = details.name;
        if (productDesc) productDesc.textContent = details.desc;
        
        // Update specs list
        if (specsList) {
            specsList.innerHTML = '';
            details.specs.forEach(spec => {
                const li = document.createElement('li');
                li.className = 'spec-item';
                li.innerHTML = `
                    <span class="spec-label">${spec.label}:</span>
                    <span class="spec-value">${spec.value}</span>
                `;
                specsList.appendChild(li);
            });
        }
    }
    
    // Update order button link
    const orderBtn = document.querySelector('.btn-order');
    if (orderBtn && productId) {
        orderBtn.href = `order.html?product=${productId}`;
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

// Form validation
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
    
    if (!isValid) {
        showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
    }
    
    return isValid;
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

// Helper function to get product from URL
function getProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        const productNames = {
            '1': 'ثلاجة شميا ١٢ قدم',
            '2': 'ثلاجة شميا ١٤ قدم',
            '3': 'ثلاجة شميا ١٦ قدم',
            '4': 'ثلاجة شميا ١٨ قدم',
            '5': 'ثلاجة شميا ٢٠ قدم',
            '6': 'ثلاجة شميا ٢٢ قدم',
            '7': 'ثلاجة شميا ٢٤ قدم',
            '8': 'ثلاجة شميا ١٠ قدم',
            '9': 'ثلاجة شميا ٨ قدم',
            '10': 'ثلاجة شميا التجارية',
            '11': 'ثلاجة شميا الذكية'
        };
        
        return productNames[productId] || `ثلاجة شميا ${productId}`;
    }
    
    return null;
}

// Form handling for order and repair pages
function initFormPages() {
    // Check if we're on a form page
    if (document.querySelector('.form-section')) {
        initMultiStepForms();
        populateFormSelects();
        initFormMaps();
    }
}

// Initialize multi-step forms
function initMultiStepForms() {
    const forms = document.querySelectorAll('.form-content');
    
    forms.forEach(form => {
        const steps = form.querySelectorAll('.form-step');
        const nextBtns = form.querySelectorAll('.btn-next');
        const prevBtns = form.querySelectorAll('.btn-prev');
        const progressFill = form.closest('.form-container').querySelector('.progress-fill');
        const progressSteps = form.closest('.form-container').querySelectorAll('.progress-step');
        
        // Set current step
        let currentStep = 0;
        
        // Show first step
        showStep(currentStep);
        
        // Next button click
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    currentStep++;
                    updateProgress();
                    showStep(currentStep);
                }
            });
        });
        
        // Previous button click
        prevBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                currentStep--;
                updateProgress();
                showStep(currentStep);
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
            // Hide all steps
            steps.forEach(step => step.classList.remove('active'));
            
            // Show current step
            if (steps[step]) {
                steps[step].classList.add('active');
                
                // Update summary if on last step
                if (step === 2) {
                    updateOrderSummary();
                }
            }
        }
        
        function updateProgress() {
            const progress = ((currentStep + 1) / steps.length) * 100;
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
            
            // Update progress steps
            progressSteps.forEach((step, index) => {
                if (index <= currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
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

// Populate form selects
function populateFormSelects() {
    // Syrian cities
    const syrianCities = [
        "دمشق", "حلب", "حمص", "اللاذقية", "حماة", "طرطوس", "دير الزور",
        "السويداء", "درعا", "القنيطرة", "ريف دمشق", "إدلب", "الحسكة", "الرقة"
    ];
    
    // Populate city selects
    const citySelects = document.querySelectorAll('#orderCity, #repairCity');
    citySelects.forEach(select => {
        syrianCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            select.appendChild(option);
        });
    });
    
    // Populate product selects
    const productSelects = document.querySelectorAll('#orderProduct, #fridgeModel');
    productSelects.forEach(select => {
        const products = [
            { id: 1, name: "ثلاجة شميا ١٢ قدم" },
            { id: 2, name: "ثلاجة شميا ١٤ قدم" },
            { id: 3, name: "ثلاجة شميا ١٦ قدم" },
            { id: 4, name: "ثلاجة شميا ١٨ قدم" },
            { id: 5, name: "ثلاجة شميا ٢٠ قدم" },
            { id: 6, name: "ثلاجة شميا ٢٢ قدم" },
            { id: 7, name: "ثلاجة شميا ٢٤ قدم" },
            { id: 8, name: "ثلاجة شميا ١٠ قدم" },
            { id: 9, name: "ثلاجة شميا ٨ قدم" },
            { id: 10, name: "ثلاجة شميا التجارية" },
            { id: 11, name: "ثلاجة شميا الذكية" }
        ];
        
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            select.appendChild(option);
        });
    });
}

// Initialize form maps
function initFormMaps() {
    // Order page map
    const orderMapElement = document.getElementById('orderMap');
    if (orderMapElement) {
        initOrderMap();
    }
    
    // Repair page map
    const repairMapElement = document.getElementById('repairMap');
    if (repairMapElement) {
        initRepairMap();
    }
}

function initOrderMap() {
    const orderMap = L.map('orderMap').setView([35.0000, 38.0000], 7);
    
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
        showFormNotification('تم تحديد موقعك بنجاح!', 'success');
    });
    
    // Adjust map on window resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            orderMap.invalidateSize();
        }, 100);
    });
}

function initRepairMap() {
    const repairMap = L.map('repairMap').setView([35.0000, 38.0000], 7);
    
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
        showFormNotification('تم تحديد موقعك بنجاح!', 'success');
    });
    
    // Adjust map on window resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            repairMap.invalidateSize();
        }, 100);
    });
}

// Update order summary
function updateOrderSummary() {
    // Get form values
    const name = document.getElementById('orderName')?.value || '-';
    const phone = document.getElementById('orderPhone')?.value || '-';
    const city = document.getElementById('orderCity')?.value || '-';
    const district = document.getElementById('orderDistrict')?.value || '-';
    const productId = document.getElementById('orderProduct')?.value;
    const tubeType = document.querySelector('input[name="tubeType"]:checked')?.value || '-';
    const notes = document.getElementById('orderNotes')?.value || 'لا توجد ملاحظات';
    
    // Get product name
    let productName = '-';
    if (productId) {
        const productSelect = document.getElementById('orderProduct');
        productName = productSelect.options[productSelect.selectedIndex].text;
    }
    
    // Update summary display
    const summaryElements = {
        'summaryName': name,
        'summaryPhone': phone,
        'summaryCity': city,
        'summaryDistrict': district,
        'summaryProduct': productName,
        'summaryTube': tubeType,
        'summaryNotes': notes
    };
    
    Object.entries(summaryElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Update repair summary
function updateRepairSummary() {
    // Get form values
    const name = document.getElementById('repairName')?.value || '-';
    const phone = document.getElementById('repairPhone')?.value || '-';
    const city = document.getElementById('repairCity')?.value || '-';
    const modelId = document.getElementById('fridgeModel')?.value;
    const problemType = document.getElementById('problemType')?.value || '-';
    const preferredTime = document.getElementById('preferredTime')?.value || '-';
    
    // Get model name
    let modelName = '-';
    if (modelId) {
        const modelSelect = document.getElementById('fridgeModel');
        modelName = modelSelect.options[modelSelect.selectedIndex].text;
    }
    
    // Update summary display
    const summaryElements = {
        'repairSummaryName': name,
        'repairSummaryPhone': phone,
        'repairSummaryCity': city,
        'repairSummaryModel': modelName,
        'repairSummaryProblem': problemType,
        'repairSummaryTime': preferredTime
    };
    
    Object.entries(summaryElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Form submission
function initFormSubmissions() {
    // Order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                orderForm.style.display = 'none';
                
                // Generate WhatsApp message
                generateOrderWhatsAppMessage();
            }
        });
    }
    
    // Repair form submission
    const repairForm = document.getElementById('repairForm');
    if (repairForm) {
        repairForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMessage = document.getElementById('repairSuccessMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                repairForm.style.display = 'none';
                
                // Generate WhatsApp message
                generateRepairWhatsAppMessage();
            }
        });
    }
}

// Generate WhatsApp message for order
function generateOrderWhatsAppMessage() {
    const name = document.getElementById('orderName')?.value || '';
    const phone = document.getElementById('orderPhone')?.value || '';
    const city = document.getElementById('orderCity')?.value || '';
    const district = document.getElementById('orderDistrict')?.value || '';
    const address = document.getElementById('orderAddress')?.value || '';
    const productId = document.getElementById('orderProduct')?.value;
    const tubeType = document.querySelector('input[name="tubeType"]:checked')?.value || '';
    const notes = document.getElementById('orderNotes')?.value || '';
    const lat = document.getElementById('orderLat')?.value || '';
    const lng = document.getElementById('orderLng')?.value || '';
    
    let productName = '';
    if (productId) {
        const productSelect = document.getElementById('orderProduct');
        productName = productSelect.options[productSelect.selectedIndex].text;
    }
    
    const message = `📋 *طلب شراء ثلاجة شميا*%0A%0A`
        + `👤 *الاسم:* ${name}%0A`
        + `📱 *الهاتف:* ${phone}%0A`
        + `🏙️ *المحافظة:* ${city}%0A`
        + `📍 *المنطقة:* ${district}%0A`
        + `🏠 *العنوان:* ${address}%0A`
        + `🛒 *المنتج:* ${productName}%0A`
        + `🔧 *نوع الأنابيب:* ${tubeType}%0A`
        + `🗺️ *الموقع:* ${lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : 'غير محدد'}%0A`
        + `📝 *ملاحظات:* ${notes || 'لا توجد'}%0A`
        + `📅 *التاريخ:* ${new Date().toLocaleDateString('ar-SY')}%0A`
        + `⏰ *الوقت:* ${new Date().toLocaleTimeString('ar-SY')}%0A%0A`
        + `_هذا الطلب تم إرساله من موقع شميا للثلاجات_`;
    
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/963111111111?text=${message}`;
    }
}

// Generate WhatsApp message for repair
function generateRepairWhatsAppMessage() {
    const name = document.getElementById('repairName')?.value || '';
    const phone = document.getElementById('repairPhone')?.value || '';
    const city = document.getElementById('repairCity')?.value || '';
    const modelId = document.getElementById('fridgeModel')?.value;
    const problemType = document.getElementById('problemType')?.value || '';
    const problemDetails = document.getElementById('problemDetails')?.value || '';
    const preferredTime = document.getElementById('preferredTime')?.value || '';
    const address = document.getElementById('repairAddress')?.value || '';
    const lat = document.getElementById('repairLat')?.value || '';
    const lng = document.getElementById('repairLng')?.value || '';
    
    let modelName = '';
    if (modelId) {
        const modelSelect = document.getElementById('fridgeModel');
        modelName = modelSelect.options[modelSelect.selectedIndex].text;
    }
    
    const message = `🔧 *طلب خدمة صيانة ثلاجات شميا*%0A%0A`
        + `👤 *الاسم:* ${name}%0A`
        + `📱 *الهاتف:* ${phone}%0A`
        + `🏙️ *المحافظة:* ${city}%0A`
        + `🏠 *العنوان:* ${address}%0A`
        + `❄️ *موديل الثلاجة:* ${modelName}%0A`
        + `⚠️ *نوع المشكلة:* ${problemType}%0A`
        + `📋 *تفاصيل المشكلة:* ${problemDetails}%0A`
        + `⏰ *الوقت المفضل:* ${preferredTime}%0A`
        + `🗺️ *الموقع:* ${lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : 'غير محدد'}%0A`
        + `📅 *التاريخ:* ${new Date().toLocaleDateString('ar-SY')}%0A`
        + `🕐 *وقت الإرسال:* ${new Date().toLocaleTimeString('ar-SY')}%0A%0A`
        + `_هذا الطلب تم إرساله من موقع شميا للثلاجات_`;
    
    const whatsappBtn = document.getElementById('repairWhatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/963111111111?text=${message}`;
    }
}

// Show form notification
function showFormNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `form-notification form-notification-${type}`;
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
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.5s forwards;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update the initComponents function to include form pages
// Add this line inside initComponents function:
// initFormPages();
// initFormSubmissions();

// And update the initComponents function to look like this:
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
    
    // Initialize form functionality on order/repair pages
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