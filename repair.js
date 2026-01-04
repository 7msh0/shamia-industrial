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

// ===== WHATSAPP REPAIR =====
document.getElementById("repairForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const phone = form.phone.value;
  const notes = form.notes.value || "لا توجد ملاحظات";
  const location = form.location.value || "لم يتم تحديد الموقع";

  const messageLines = [
    "طلب صيانة ثلاجة",
    "-------------------------",
    `الاسم: ${name}`,
    `رقم الهاتف: ${phone}`,
    `وصف المشكلة: ${notes}`,
    `الموقع: ${location}`,
    "",
    "شكراً لتواصلك معنا! سنتصل بك في أقرب وقت ممكن."
  ];

  const message = encodeURIComponent(messageLines.join("\n"));
  const whatsappNumber = "+963945349776"; // رقمك
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappLink, "_blank");
});
