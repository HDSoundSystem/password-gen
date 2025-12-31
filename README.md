
---

# 🛡️ Password Generator Pro (Advanced Edition)

A high-performance, secure, and user-friendly web application for generating robust passwords. The interface features an optimized **dual-column layout** designed for seamless security management.

---

## 🚀 Key Features

### 1. 🔑 High-Security Generation

* **Total Control**: Custom inclusion of lowercase, uppercase, numbers, and symbols.
* **Precision Slider**: Adjustable length from **8 to 32 characters**.
* **Ambiguity Exclusion**: Option to remove hard-to-read characters (`i`, `l`, `1`, `L`, `o`, `0`, `O`) to prevent manual entry errors.

### 2. 📊 Analysis & Transfer

* **Dynamic Strength Bar**: Real-time evaluation of password entropy (Red = Weak, Yellow = Medium, Green = Strong).
* **QR Code Generator**: Instantly display a QR code to transfer your password to a smartphone without using the internet.
* **Auto-Scaling Text**: Font size automatically adjusts so that 32-character passwords always stay on **a single line**.

### 3. 🎨 User Experience (UX)

* **Dual-Column Interface**: The generator occupies the main section while the history remains accessible on the right (on desktop).
* **5-Item History**: Quick access to the last 5 generated passwords for instant copying.
* **Dark Mode**: Elegant toggle with preference memory via `localStorage`.
* **Bilingual**: Interface available in both English and French.

---

## 🛠️ Technical Stack

| Technology | Role |
| --- | --- |
| **HTML5** | Semantic structure and responsive layout. |
| **CSS3** | Dynamic theming, variables, and Grid/Flexbox layout. |
| **JavaScript (ES6+)** | Generation logic, character filtering, and state management. |
| **Bootstrap 5.3** | Framework for modern design and interactive components. |
| **QRCode.js** | Lightweight library for instant text-to-image conversion. |

---

## 📂 File Structure

```text
/
├── index.html   # Structure, CDNs, and dual-column layout
├── style.css    # Themes (Light/Dark) and history styling
└── script.js    # Generation engine and application logic

```

---

## ⚙️ Quick Start

1. **Copy** the three files (`index.html`, `style.css`, `script.js`) into a local folder.
2. **Launch** `index.html` in your web browser.
* *Note: No server or dependency installation is required.*



---

## 🔒 Security & Privacy

* **100% Client-Side**: Passwords are generated locally within your browser.
* **Zero Tracking**: No data ever leaves your computer. The QR code transfer is purely visual and local.
* **Ephemeral**: The history is stored in temporary memory; it is cleared whenever the tab is closed to ensure your privacy.

---
