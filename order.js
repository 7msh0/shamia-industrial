// ===== MAP =====
const map = L.map('map').setView([34.8, 38.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

map.on('click', function(e) {
  if (marker) map.removeLayer(marker);
  marker = L.marker(e.latlng).addTo(map);
  document.getElementById('location').value =
    `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
});

// ===== AUTOFILL MODEL =====
const params = new URLSearchParams(window.location.search);
const modelFromURL = params.get("model");

if (modelFromURL) {
  const modelInput = document.querySelector('input[name="model"]');
  modelInput.value = modelFromURL;
  modelInput.readOnly = true;
}

// ===== WHATSAPP ORDER =====
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const city = form.city.value.trim();
  const model = form.model.value.trim();
  const material = form.material.value.trim();
  const notes = form.notes.value.trim() || "لا توجد ملاحظات";
  const location = form.location.value.trim() || "لم يتم تحديد الموقع";

  // Structured RTL-friendly message


// Build message lines
const messageLines = [
  "طلب حجز براد",
  "-------------------------",
  `الاسم: ${name}`,
  email ? `البريد الإلكتروني: ${email}` : "", // Only add if not empty
  `رقم الهاتف: ${phone}`,
  `المدينة: ${city}`,
  `موديل البراد: ${model}`,
  `نوع الأنابيب: ${material}`,
  `ملاحظات: ${notes}`,
  `الموقع: ${location}`,
  "",
  `شكراً لتواصلك معنا!`
];


  // Join lines with \n for proper line breaks
  const message = messageLines.join("\n");

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "+963945349776"; // رقمك
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappLink, "_blank");
});