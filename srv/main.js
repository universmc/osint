const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const express = require('express');
const Groq = require('groq-sdk');
const Cluster = require('./heavy.js');

// Créer l'application Express
const server = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

server.use(express.json());

// Point d'entrée pour générer des réponses de chat avec GROQ
server.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: 'gemma2-9b-it', // Utilisez le modèle correct disponible
      messages: [
        { role: 'assistant', content: "welcom to eletron Pi" },
        { role: 'user', content: prompt }
      ],
    });

    const message = response.choices[0].message.content;
    res.json({ message });
  } catch (error) {
    console.error('Erreur lors de la requête GROQ:', error.message);
    res.status(500).json({ error: 'Erreur lors de la requête à l\'API GROQ.' });
  }
});

// Lancer le serveur Express
server.listen(1144, () => {
  console.log('Serveur Express démarré sur http://localhost:1144');
});

function createWindow() {
  const win = new BrowserWindow({
    width: 987,
    height: 610,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Charge le script de préchargement
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  win.loadFile('public/index.html');
}

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/clients');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
