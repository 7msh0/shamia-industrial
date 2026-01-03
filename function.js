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
function createSnowflake() {
  const snowContainer =
    document.getElementById("snow-container");

  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄";

  const size = Math.random() * 20 + 10; // 10–30px
  snowflake.style.fontSize = size + "px";

  snowflake.style.left =
    Math.random() * window.innerWidth + "px";

  snowflake.style.animationDuration =
    (Math.random() * 3 + 3) + "s"; // 3–6s

  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// Trigger snow when the "عرض المنتجات" button is clicked
const productsButton =
  document.querySelector("#home .cta-btn");

productsButton.addEventListener("click", () => {
  const interval =
    setInterval(createSnowflake, 550);

  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
});
