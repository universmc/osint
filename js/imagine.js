const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const Groq = require('groq-sdk');

// Créer l'application Express
const server = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

server.use(express.json());

// Point d'entrée pour générer des réponses de chat avec GROQ
server.post('/imagine', async (req, res) => {
  const { promptImagine } = req.body; // Remplacer prompt par promptImagine

  try {
    const response = await groq.chat.completions.create({
      model: 'gemma2-9b-it', // Modèle IA utilisé
      messages: [
        { role: 'assistant', content: "Welcome to IMAGINE+ by WebSiteMakers" },
        { role: 'user', content: promptImagine } // Utiliser promptImagine
      ],
    });

    const message = response.choices[0].message.content;
    res.json({ message });
  } catch (error) {
    console.error('Erreur lors de la requête GROQ:', error.message);
    res.status(500).json({ error: 'Erreur lors de la requête à l\'API GROQ.' });
  }
});

// Lancer le serveur Express sur la porte logique :3141
server.listen(3141, () => {
  console.log('Serveur Express démarré sur http://localhost:3141');
});

function createWindow() {
  const win = new BrowserWindow({
    width: 987,
    height: 610,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Script de préchargement
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // Charger la page index.html pour l'interface utilisateur
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Gérer la fermeture de toutes les fenêtres sous macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Réactiver l'application si elle est fermée
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
