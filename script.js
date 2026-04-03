/* ============================================================
   MOKELENKO MOTORS — main.js
   Toutes les fonctions JavaScript du site
   ============================================================ */

/* ===================================================
   1. MODALE DÉTAILS VÉHICULE
   =================================================== */

function openModal(v) {
  const overlay = document.getElementById("vehicleModal");

  // Tag vente / location
  const tag = document.getElementById("modalTag");
  tag.textContent = v.type === "vente" ? "Vente" : "Location";
  tag.style.background = v.type === "vente" ? "#C9A84C" : "#0B5C4E";
  tag.style.color = v.type === "vente" ? "#083D34" : "white";

  // Titre
  document.getElementById("modalTitle").textContent = v.titre;

  // Grille de specs
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
        `<div class="modal-spec">
          <div class="modal-spec-label">${s.label}</div>
          <div class="modal-spec-val">${s.val}</div>
        </div>`,
    )
    .join("");

  // Prix
  document.getElementById("modalPrice").textContent = v.prix;
  document.getElementById("modalPriceNote").textContent = v.note || "";

  // Galerie : thumbnails avec src immédiat
  const thumbsEl = document.getElementById("modalThumbs");
  thumbsEl.innerHTML = v.photos
    .map(
      (p, i) =>
        `<div class="modal-thumb ${i === 0 ? "active" : ""}" onclick="switchPhoto('${p}', this)">
          <img src="${p}" alt="Photo ${i + 1}" loading="eager">
        </div>`,
    )
    .join("");

  // Image principale
  const mainImg = document.getElementById("modalMainImg");
  mainImg.src = v.photos[0];
  mainImg.style.opacity = "1";

  // Bouton unique "Commander" → ouvre WhatsApp
  document.getElementById("modalOrderBtn").onclick = function () {
    closeModal();
    openWhatsApp("Commander : " + v.titre);
  };

  // Bloquer le scroll et afficher la modale
  document.body.style.overflow = "hidden";
  overlay.classList.add("active");
}

function closeModal() {
  document.getElementById("vehicleModal").classList.remove("active");
  document.body.style.overflow = "";
}

function handleModalClick(e) {
  if (e.target === document.getElementById("vehicleModal")) {
    closeModal();
  }
}

function switchPhoto(src, thumb) {
  const mainImg = document.getElementById("modalMainImg");
  mainImg.style.opacity = "0";
  setTimeout(function () {
    mainImg.src = src;
    mainImg.style.opacity = "1";
  }, 200);
  document.querySelectorAll(".modal-thumb").forEach(function (t) {
    t.classList.remove("active");
  });
  thumb.classList.add("active");
}

// Fermer la modale avec la touche Echap
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

/* ===================================================
   2. BURGER MENU MOBILE
   =================================================== */

function toggleMenu() {
  document.getElementById("burger").classList.toggle("open");
  document.getElementById("mobile-menu").classList.toggle("open");
}

function closeMenu() {
  document.getElementById("burger").classList.remove("open");
  document.getElementById("mobile-menu").classList.remove("open");
}

/* ===================================================
   3. NAVIGATION FLUIDE (scroll smooth)
   =================================================== */

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

/* ===================================================
   4. FILTRE VÉHICULES (Tous / Vente / Location)
   =================================================== */

function filterVehicles(type, btn) {
  document.querySelectorAll(".filter-btn").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");

  document.querySelectorAll(".vehicle-card").forEach(function (card) {
    if (type === "tous" || card.dataset.type === type) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

/* ===================================================
   5. WHATSAPP — ouverture avec message pré-rempli
   =================================================== */

function openWhatsApp(item) {
  const phone = "22462749682";
  const msg = item
    ? "Bonjour Mokelenko Motors, je suis interesse(e) par : " + item
    : "Bonjour Mokelenko Motors, j'ai besoin d'informations.";
  window.open(
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg),
    "_blank",
  );
}

/* ===================================================
   6. FORMULAIRE CONTACT — feedback visuel
   =================================================== */

function handleFormSubmit(btn) {
  btn.textContent = "Message envoye !";
  btn.style.background = "#2E9B6A";
  setTimeout(function () {
    btn.textContent = "Envoyer la demande";
    btn.style.background = "var(--green)";
  }, 3000);
}
