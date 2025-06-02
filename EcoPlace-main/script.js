const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-buttons button');
let currentIndex = 2; // Feed centered by default

function updateScreens(index) {
  screens.forEach((screen, i) => {
    screen.classList.toggle('active', i === index);
  });
  navButtons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.dataset.nav, 10);
    currentIndex = index;
    updateScreens(index);
  });
});
updateScreens(currentIndex);

// Energie comparateur
const compareBtn = document.getElementById('compareBtn');
const kwhDisplay = document.getElementById('kwh');
const savingsText = document.getElementById('savings');
const energyList = document.getElementById('energy-list');

if (compareBtn) {
  compareBtn.addEventListener('click', () => {
    // Simuler consommation actuelle
    const current = Math.floor(Math.random() * 300) + 100; // 100-400 kWh
    kwhDisplay.textContent = current + " kWh";

    // Simuler appareils plus performants
    const appareils = [
      { name: "Four à convection", eco: 30 },
      { name: "Four à micro-ondes", eco: 50 },
      { name: "Four à induction", eco: 45 },
      { name: "Four solaire", eco: 70 }
    ];

    // Calcul économies (en kWh et €)
    const meilleur = appareils.reduce((prev, curr) => prev.eco > curr.eco ? prev : curr);
    const economiseKwh = current * (meilleur.eco / 100);
    const economiseEuros = (economiseKwh * 0.15).toFixed(2); // prix kWh 0,15 €

    savingsText.textContent = `En passant à un ${meilleur.name}, vous pourriez économiser environ ${economiseEuros} € par mois.`;

    // Affichage liste
    energyList.innerHTML = appareils.map(app => 
      `<li>🔋 ${app.name} - économise environ ${app.eco}% d'énergie</li>`).join('');
  });
}

// Récompenses
let graines = 2000;
const seedsDisplay = document.getElementById('seeds');
const redeem10 = document.getElementById('redeem10');
const redeem20 = document.getElementById('redeem20');
const redeem50 = document.getElementById('redeem50');
const redeemMsg = document.getElementById('redeemMsg');

// Fonction pour ajouter une graine toutes les secondes
setInterval(() => {
  seeds++;
  updateSeeds();
}, 1000);

function updateSeedsDisplay() {
  seedsDisplay.textContent = graines;
  redeemMsg.textContent = "";
}
function tryRedeem(cost, reward) {
  if (graines >= cost) {
    graines -= cost;
    updateSeedsDisplay();
    redeemMsg.textContent = `Bravo ! Vous avez échangé ${cost} graines contre : ${reward}`;
  } else {
    redeemMsg.textContent = "Pas assez de graines pour ce bon d'achat.";
  }
}
if (redeem10) redeem10.addEventListener('click', () => tryRedeem(50, "10% de cashback chez NatureShop !"));
if (redeem20) redeem20.addEventListener('click', () => tryRedeem(100, "Souscription énergie verte chez Green Energy"));
if (redeem50) redeem50.addEventListener('click', () => tryRedeem(250, "20% de remboursé pour votre abonnement Velo City"));
updateSeedsDisplay();

// Mode sombre
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('change', () => {
  if(darkModeToggle.checked) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
});

// Langue fictive (juste changer label)
const languageSelect = document.getElementById('languageSelect');
languageSelect.addEventListener('change', () => {
  if(languageSelect.value === 'en') {
    alert('Switch to English (fictif)');
  } else {
    alert('Retour au Français (fictif)');
  }
});