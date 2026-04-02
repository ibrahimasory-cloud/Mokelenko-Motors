/* ===== MODALE VÉHICULE ===== */
function openModal(v) {
  const overlay = document.getElementById("vehicleModal");
  // Tag
  const tag = document.getElementById("modalTag");
  tag.textContent = v.type === "vente" ? "Vente" : "Location";
  tag.style.background = v.type === "vente" ? "#C9A84C" : "#0B5C4E";
  tag.style.color = v.type === "vente" ? "#083D34" : "white";
  // Titre
  document.getElementById("modalTitle").textContent = v.titre;
  // Specs
  const specs = [
    { label: "Marque", val: v.marque },
    { label: "Modèle", val: v.modele },
    { label: "Année", val: v.annee },
    { label: "Kilométrage", val: v.km },
    { label: "Carburant", val: v.carburant },
    { label: "Boîte", val: v.boite },
    { label: "Localisation", val: v.localisation },
  ];
  document.getElementById("modalSpecs").innerHTML = specs
    .map(
      (s) =>
        `<div class="modal-spec"><div class="modal-spec-label">${s.label}</div><div class="modal-spec-val">${s.val}</div></div>`,
    )
    .join("");
  // Prix
  document.getElementById("modalPrice").textContent = v.prix;
  document.getElementById("modalPriceNote").textContent = v.note || "";
  // Galerie
  const thumbsEl = document.getElementById("modalThumbs");
  thumbsEl.innerHTML = v.photos
    .map(
      (p, i) =>
        `<div class="modal-thumb ${i === 0 ? "active" : ""}" onclick="switchPhoto('${p}', this)">
        <img src="${p}&w=160" alt="Photo ${i + 1}">
      </div>`,
    )
    .join("");
  const mainImg = document.getElementById("modalMainImg");
  mainImg.src = v.photos[0];
  // Boutons
  document.getElementById("modalOrderBtn").onclick = () => {
    closeModal();
    openWhatsApp("Commander : " + v.titre);
  };
  document.getElementById("modalWaBtn").onclick = () => openWhatsApp(v.titre);
  // Ouvrir
  document.body.style.overflow = "hidden";
  overlay.classList.add("active");
}

function closeModal() {
  document.getElementById("vehicleModal").classList.remove("active");
  document.body.style.overflow = "";
}

function handleModalClick(e) {
  if (e.target === document.getElementById("vehicleModal")) closeModal();
}

function switchPhoto(src, thumb) {
  const mainImg = document.getElementById("modalMainImg");
  mainImg.style.opacity = "0";
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = "1";
  }, 200);
  document
    .querySelectorAll(".modal-thumb")
    .forEach((t) => t.classList.remove("active"));
  thumb.classList.add("active");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* Burger menu mobile */
function toggleMenu() {
  document.getElementById("burger").classList.toggle("open");
  document.getElementById("mobile-menu").classList.toggle("open");
}

function closeMenu() {
  document.getElementById("burger").classList.remove("open");
  document.getElementById("mobile-menu").classList.remove("open");
}

/* Navigation fluide */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* Filtre véhicules */
function filterVehicles(type, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".vehicle-card").forEach((card) => {
    card.style.display =
      type === "tous" || card.dataset.type === type ? "" : "none";
  });
}

/* Lien WhatsApp avec message pré-rempli */
function openWhatsApp(item) {
  const phone = "22462749682";
  const msg = item
    ? "Bonjour Mokelenko Motors, je suis intéressé(e) par : " + item
    : "Bonjour Mokelenko Motors, j'ai besoin d'informations.";
  window.open(
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg),
    "_blank",
  );
}
