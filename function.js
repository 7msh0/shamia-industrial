const products = [
  {
    name: "Model 1000",
    img: "product/1000.png",
    specs: [
      "السعة : 450 لتر",
      "A++ : فئة الطاقة",
      "الضجيج : 38",
      "الضمان : 5 سنوات"
    ]
  },
  {
    name: "Model 500",
    img: "product/500.png",
    specs: [
      "السعة : 450 لتر",
      "A+ : فئة الطاقة",
      "الضجيج : 48",
      "الضمان : 2 سنوات"
    ]
  }
];

let currentIndex = 0;

const imgEl = document.getElementById("product-img");
const nameEl = document.getElementById("product-name");
const specsEl = document.getElementById("product-specs");
const orderBtn = document.getElementById("orderBtn");


function renderProduct(i) {
  const p = products[i];

  imgEl.src = p.img;
  nameEl.textContent = p.name;

  specsEl.innerHTML = "";
  p.specs.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    specsEl.appendChild(li);
  });

  //send model
  const encodedModel = encodeURIComponent(p.name);
  orderBtn.href = `order.html?model=${encodedModel}`;
}

function animateChange() {
  imgEl.style.opacity = 0;
  imgEl.style.transform = "scale(0.95)";

  setTimeout(() => {
    renderProduct(currentIndex);
    imgEl.style.opacity = 1;
    imgEl.style.transform = "scale(1)";
  }, 180);
}

function nextProduct() {
  currentIndex = (currentIndex + 1) % products.length;
  animateChange();
}

function prevProduct() {
  currentIndex =
    (currentIndex - 1 + products.length) % products.length;
  animateChange();
}

document.getElementById("nextBtn").onclick = nextProduct;
document.getElementById("prevBtn").onclick = prevProduct;

/* SWIPE */
let startX = 0;
let dragging = false;

const showcase =
  document.querySelector(".product-showcase");

showcase.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  dragging = true;
});

showcase.addEventListener(
  "touchmove",
  e => {
    if (!dragging) return;

    if (Math.abs(e.touches[0].clientX - startX) > 10) {
      e.preventDefault();
    }
  },
  { passive: false }
);

showcase.addEventListener("touchend", e => {
  if (!dragging) return;

  dragging = false;
  const diff = e.changedTouches[0].clientX - startX;

  if (diff > 60) prevProduct();
  else if (diff < -60) nextProduct();
});

renderProduct(currentIndex);

/* Snowflake creation */
const snowContainer = document.getElementById("snow-container");

// Function to create a single snowflake
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");

  // Use Unicode snowflake character
  snowflake.textContent = "❄";

  // Random size and position
  const size = Math.random() * 12 + 8; // 8px to 20px
  snowflake.style.fontSize = size + "px";
  snowflake.style.left = Math.random() * window.innerWidth + "px";

  // Random fall duration
  const duration = Math.random() * 5 + 5; // 5s to 10s
  snowflake.style.animationDuration = duration + "s";

  // Add to container
  snowContainer.appendChild(snowflake);

  // Remove after animation completes
  snowflake.addEventListener("animationend", () => {
    snowflake.remove();
  });
}

// Start snow after 3 seconds
setTimeout(() => {
  setInterval(createSnowflake, 550);
}, 3000);

// Scroll-triggered animation
// Fade in elements when scrolling into view
const fadeItems = document.querySelectorAll('.fade-item');

function checkFade() {
  const triggerBottom = window.innerHeight * 0.9; // trigger a bit before fully in view
  fadeItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if(itemTop < triggerBottom){
      item.classList.add('show');
    }
  });
}

// Run on scroll and on page load
window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);


// Fade in products section on scroll
// Use Intersection Observer to trigger fade-in when section is in view
const productsSection = document.getElementById('products');

const observerOptions = {
  threshold: 0.2 // trigger when 20% of section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // stop observing after first reveal
    }
  });
}, observerOptions);

observer.observe(productsSection);
