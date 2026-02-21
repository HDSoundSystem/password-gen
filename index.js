const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,          // Taille adaptée à un générateur
    height: 600,
    resizable: true,    // Empêche l'utilisateur de déformer ton interface
    maximizable: true,  // Désactive le bouton d'agrandissement
    center: true,        // Centre la fenêtre au démarrage
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Utile si tu débutes pour faciliter l'accès aux fonctions Node
    }
  });

  // OPTION 1 : Masquer totalement la barre de menu (Fichier, Aide, etc.)
  Menu.setApplicationMenu(null); 

  // OPTION 2 (Alternative) : Si tu veux juste la cacher mais la laisser accessible via "Alt"
  // win.setMenuBarVisibility(false);

  win.loadFile('index.html');
}

// Gestion de la fermeture propre sur macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(createWindow);