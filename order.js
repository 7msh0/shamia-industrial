const map = L.map('map').setView([34.8, 38.0], 7);



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

map.on('click', function(e) {
  if (marker) map.removeLayer(marker);
  marker = L.marker(e.latlng).addTo(map);
  document.getElementById('location').value =
    `${e.latlng.lat}, ${e.latlng.lng}`;
});

emailjs.init("YOUR_PUBLIC_KEY");

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    this
  ).then(() => {
    alert("تم إرسال الطلب بنجاح");
    this.reset();
    if (marker) map.removeLayer(marker);
  }, () => {
    alert("حدث خطأ أثناء الإرسال");
  });
});

// ===== Autofill model from URL =====
const params = new URLSearchParams(window.location.search);
const modelFromURL = params.get("model");

if (modelFromURL) {
  const modelInput = document.querySelector('input[name="model"]');
  modelInput.value = modelFromURL;
  modelInput.readOnly = true; // اختياري: يمنع التعديل
}