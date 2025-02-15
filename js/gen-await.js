const fs = require('fs');

// Exemple de script qui génère le fichier await.json s'il n'existe pas
if (!fs.existsSync('await.json')) {
  const initData = {
    startTime: new Date().getTime(),
    elapsedTime: 0
  };
  fs.writeFileSync('await.json', JSON.stringify(initData, null, 2));
  console.log('Fichier await.json créé avec succès.');
} else {
  console.log('Le fichier await.json existe déjà.');
}
