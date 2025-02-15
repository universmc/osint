const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

let sessionData = {};

// Charger la session existante ou initialiser une nouvelle session
function loadSession() {
  try {
    const data = fs.readFileSync('await.json');
    sessionData = JSON.parse(data);
    console.log('Session chargée:', sessionData);
  } catch (error) {
    console.log('Aucune session existante, initialisation...');
    sessionData = {
      startTime: new Date().getTime(),
      elapsedTime: 0
    };
    saveSession();
  }
}

// Sauvegarder la session actuelle dans await.json
function saveSession() {
  fs.writeFileSync('await.json', JSON.stringify(sessionData, null, 2));
}

// Démarrer le chronomètre
function startChronometer() {
  const interval = setInterval(() => {
    const now = new Date().getTime();
    sessionData.elapsedTime = now - sessionData.startTime;
    saveSession();
  }, 1000);
}

// Formater le temps écoulé en hh:mm:ss
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 1000 / 60) % 60;
  const hours = Math.floor(ms / 1000 / 60 / 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}

// Serveur Express pour afficher le chronomètre dans le navigateur
app.get('/', (req, res) => {
  res.sendFile(__dirname + './src/html/chronometre.html');
});

app.get('/session', (req, res) => {
  res.json({ elapsedTime: formatTime(sessionData.elapsedTime) });
});

// Lancer le serveur et démarrer le chronomètre
app.listen(port, () => {
  console.log(`Serveur actif sur http://localhost:${port}`);
  loadSession();
  startChronometer();
});
