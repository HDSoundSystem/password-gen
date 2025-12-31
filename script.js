// --- 1. Traductions ---
const translations = {
    fr: { title: "Générateur de MDP", length: "Longueur", numbers: "Chiffres (0-9)", symbols: "Symboles (@#$!)", btn: "Générer", alert: "Copié !" },
    en: { title: "Password Generator", length: "Length", numbers: "Numbers (0-9)", symbols: "Symbols (@#$!)", btn: "Generate", alert: "Copied!" }
};

let currentLang = 'fr';

// --- 2. Fonctions de Traduction & UI ---
function translateApp() {
    const t = translations[currentLang];
    document.getElementById('ui-title').innerText = t.title;
    document.getElementById('ui-length').innerText = t.length;
    document.getElementById('ui-numbers').innerText = t.numbers;
    document.getElementById('ui-symbols').innerText = t.symbols;
    document.getElementById('ui-btn-text').innerText = t.btn;
    document.getElementById('lang-btn').innerText = currentLang === 'fr' ? 'EN' : 'FR';
}

document.getElementById('lang-btn').onclick = () => {
    currentLang = (currentLang === 'fr') ? 'en' : 'fr';
    translateApp();
};

// --- 3. Mode Sombre ---
document.getElementById('dark-mode-btn').onclick = () => {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('bi-moon-stars', 'bi-sun');
    } else {
        icon.classList.replace('bi-sun', 'bi-moon-stars');
    }
};

// --- 4. Logique du Générateur ---
const slider = document.getElementById('length-slider');
const display = document.getElementById('password-display');

slider.oninput = () => document.getElementById('length-val').innerText = slider.value;

document.getElementById('generate-btn').onclick = () => {
    let pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById('numbers').checked) pool += "0123456789";
    if (document.getElementById('symbols').checked) pool += "!@#$%^&*()_+";
    
    let password = "";
    for (let i = 0; i < slider.value; i++) {
        password += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    display.innerText = password;
    display.style.color = "var(--accent)";
};

// --- 5. Bouton Copie ---
document.getElementById('copy-btn').onclick = () => {
    if (display.innerText.includes('*')) return;
    navigator.clipboard.writeText(display.innerText);
    
    const icon = document.querySelector('#copy-btn i');
    icon.classList.replace('bi-clipboard', 'bi-check-lg');
    setTimeout(() => icon.classList.replace('bi-check-lg', 'bi-clipboard'), 1500);
};