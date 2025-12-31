const translations = {
    fr: { 
        title: "Générateur Pro", length: "Longueur", lowercase: "Minuscules (abc)",
        uppercase: "Majuscules (ABC)", numbers: "Chiffres (0-9)", symbols: "Symboles (@#$!)",
        ambiguous: "Exclure ambigus (i, l, 1, 0, o)", btn: "Générer", history: "Historique", error: "Option requise"
    },
    en: { 
        title: "Pro Generator", length: "Length", lowercase: "Lowercase (abc)",
        uppercase: "Uppercase (ABC)", numbers: "Numbers (0-9)", symbols: "Symbols (@#$!)",
        ambiguous: "Exclude Ambiguous (i, l, 1, 0, o)", btn: "Generate", history: "History", error: "Option required"
    }
};

let currentLang = 'fr';
let passwordHistory = [];

// --- THÈME & TRADUCTION ---
const themeBtn = document.getElementById('dark-mode-btn');
const themeIcon = document.getElementById('theme-icon');

themeBtn.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    themeIcon.className = isDark ? 'bi bi-moon-stars' : 'bi bi-sun';
    localStorage.setItem('theme', newTheme);
};

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-bs-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';

document.getElementById('lang-btn').onclick = () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    const t = translations[currentLang];
    document.getElementById('ui-title').innerText = t.title;
    document.getElementById('ui-length').innerText = t.length;
    document.getElementById('ui-lowercase').innerText = t.lowercase;
    document.getElementById('ui-uppercase').innerText = t.uppercase;
    document.getElementById('ui-numbers').innerText = t.numbers;
    document.getElementById('ui-symbols').innerText = t.symbols;
    document.getElementById('ui-ambiguous').innerText = t.ambiguous;
    document.getElementById('ui-btn-text').innerText = t.btn;
    document.getElementById('ui-history').innerText = t.history;
    document.getElementById('lang-btn').innerText = currentLang === 'fr' ? 'EN' : 'FR';
};

// --- LOGIQUE CORE ---
function updateQR(text) {
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), { text: text, width: 128, height: 128 });
}

function addToHistory(pass) {
    passwordHistory.unshift(pass);
    if (passwordHistory.length > 5) passwordHistory.pop();
    const list = document.getElementById('history-list');
    list.innerHTML = passwordHistory.map(p => `
        <div class="history-item" onclick="navigator.clipboard.writeText('${p}')">
            <span class="text-truncate" style="max-width: 85%">${p}</span>
            <i class="bi bi-copy"></i>
        </div>
    `).join('');
}

function updateStrength(p) {
    const bar = document.getElementById('strength-bar');
    let s = p.length * 3;
    if (/[A-Z]/.test(p)) s += 20;
    if (/[0-9]/.test(p)) s += 20;
    if (/[^A-Za-z0-9]/.test(p)) s += 25;
    s = Math.min(s, 100);
    bar.style.width = s + "%";
    bar.className = "progress-bar " + (s < 45 ? "bg-danger" : s < 80 ? "bg-warning" : "bg-success");
}

const slider = document.getElementById('length-slider');
const display = document.getElementById('password-display');
slider.oninput = () => document.getElementById('length-val').innerText = slider.value;

document.getElementById('generate-btn').onclick = () => {
    const len = slider.value;
    let pool = "";
    if (document.getElementById('lowercase').checked) pool += "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById('uppercase').checked) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById('numbers').checked) pool += "0123456789";
    if (document.getElementById('symbols').checked) pool += "!@#$%^&*()_+";

    // FILTRE AMBIGUS
    if (document.getElementById('exclude-ambiguous').checked) {
        pool = pool.replace(/[ilLIoO01]/g, "");
    }

    if (!pool) {
        display.innerText = translations[currentLang].error;
        display.classList.add('text-danger');
        return;
    }

    display.classList.remove('text-danger');
    let password = "";
    for (let i = 0; i < len; i++) {
        password += pool.charAt(Math.floor(Math.random() * pool.length));
    }

    display.innerText = password;
    display.style.fontSize = password.length > 24 ? "0.9rem" : (password.length > 18 ? "1.1rem" : "1.25rem");
    
    updateQR(password);
    addToHistory(password);
    updateStrength(password);
};

document.getElementById('qr-toggle').onclick = () => document.getElementById('qr-container').classList.toggle('d-none');

document.getElementById('copy-btn').onclick = () => {
    if (display.innerText.includes('*') || display.innerText.length > 40) return;
    navigator.clipboard.writeText(display.innerText).then(() => {
        const icon = document.querySelector('#copy-btn i');
        icon.classList.replace('bi-clipboard', 'bi-check-lg');
        setTimeout(() => icon.classList.replace('bi-check-lg', 'bi-clipboard'), 1500);
    });

};
