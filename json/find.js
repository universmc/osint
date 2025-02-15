const fs = require('fs');
const path = require('path');

// Fonction pour explorer un répertoire et ses sous-répertoires
function exploreDirectory(directory) {
    let results = [];

    // Lire le contenu du répertoire
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // Si c'est un sous-dossier, on l'explore récursivement
            results = results.concat(exploreDirectory(filePath));
        } else {
            // Ajouter les métadonnées du fichier à l'inventaire
            results.push({
                name: file,
                path: filePath,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime,
                type: path.extname(file)
            });
        }
    });

    return results;
}

// Fonction pour générer un inventaire complet
function generateInventory() {
    const directories = ['./.setup', './models','./app','./build','./items','./src','./srv','./data'];
    let inventory = {};

    directories.forEach((directory) => {
        const dirName = path.basename(directory);
        inventory[dirName] = exploreDirectory(directory);
    });

    // Sauvegarder l'inventaire dans un fichier JSON
    const jsonFilePath = './inventory.json';
    fs.writeFileSync(jsonFilePath, JSON.stringify(inventory, null, 2));

    console.log(`Inventaire généré et sauvegardé dans ${jsonFilePath}`);
}

// Fonction de recherche dans l'inventaire
function searchInventory(keyword) {
    const inventory = JSON.parse(fs.readFileSync('./inventory.json', 'utf-8'));
    let results = [];

    // Parcourir les répertoires et fichiers pour trouver les correspondances
    for (let dir in inventory) {
        results = results.concat(inventory[dir].filter((file) => file.name.includes(keyword)));
    }

    console.log(`Résultats de recherche pour "${keyword}":`);
    console.log(results);
}

// Générer l'inventaire
generateInventory();

// Exemple de recherche (peut être adapté selon tes besoins)
searchInventory('Pibot');  // Recherche tous les fichiers contenant 'bot' dans leur nom