const fs = require('fs');
const OpenAI = require('openai');
const axios = require('axios');
const Groq = require('groq-sdk');
const puppeteer = require('puppeteer');

const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const subject = process.argv[2] || "QUESTOR.js_RESPONSE";

// Fonction principale pour générer le backend, le frontend et le README
async function generateFullStack(subject) {
  console.log("Démarrage de la génération pour le sujet : ", subject);

  // Boucle 1: Génération des fichiers backend (PHP/SQL)
  await generateBackendCode(subject);

  // Boucle 2: Génération de la page frontend (HTML/CSS/JS)
  await generateWebPage(subject);

  // Boucle 3: Génération du README.md pour le projet
  await generateReadMe(subject);

  console.log(`Backend, Frontend, et README générés avec succès pour le sujet : ${subject}`);
}

// Fonction de génération Backend (PHP/SQL/JS/JSON)
async function generateBackendCode(subject) {
  console.log("Démarrage de la génération du backend pour le sujet : ", subject);

  // Génération des fichiers PHP/SQL
  const backendFiles = await generateBackendFiles(subject);

  // Génération du fichier JS pour les appels API
  const jsFile = generateJSForAPI(subject);

  // Génération des fichiers JSON pour la configuration
  const jsonFile = generateJSONForConfig(subject);

  console.log(`Backend généré avec succès pour le sujet : ${subject}`);
}

// Génération des fichiers PHP/SQL
async function generateBackendFiles(subject) {
  console.log("Génération des fichiers PHP et SQL pour le sujet :", subject);

  const phpContent = await generatePHP(subject);
  const phpFile = `output/backend_${subject}.php`;
  fs.writeFileSync(phpFile, phpContent);
  console.log(`Fichier PHP généré et sauvegardé dans ${phpFile}`);

  const sqlContent = await generateSQL(subject);
  const sqlFile = `output/database_${subject}.sql`;
  fs.writeFileSync(sqlFile, sqlContent);
  console.log(`Fichier SQL généré et sauvegardé dans ${sqlFile}`);

  return { phpFile, sqlFile };
}

// Générateur PHP
async function generatePHP(subject) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: `Crée un fichier PHP pour gérer les requêtes API du sujet : ${subject}` }],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048,
  });

  const phpContent = chatCompletion.choices[0]?.message?.content;
  return phpContent;
}

// Générateur SQL
async function generateSQL(subject) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: `Crée un fichier SQL pour créer une base de données et des tables pour le sujet : ${subject}` }],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048,
  });

  const sqlContent = chatCompletion.choices[0]?.message?.content;
  return sqlContent;
}

// Génération du fichier JS pour les appels API
function generateJSForAPI(subject) {
  console.log("Génération du fichier JavaScript pour les appels API");

  const jsContent = `
  document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "backend_${subject}.php";
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log("Données récupérées depuis le backend :", data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  });
  `;

  const jsFile = `output/api_${subject}.js`;
  fs.writeFileSync(jsFile, jsContent);
  console.log(`Fichier JS généré et sauvegardé dans ${jsFile}`);

  return jsFile;
}

// Génération du fichier JSON pour la configuration du backend
function generateJSONForConfig(subject) {
  console.log("Génération du fichier JSON pour la configuration");

  const jsonContent = {
    subject: subject,
    database: "mysql",
    api_endpoints: [
      { endpoint: `/api/${subject}/getData`, method: "GET" },
      { endpoint: `/api/${subject}/postData`, method: "POST" }
    ],
    metadata: {
      version: "1.0.0",
      created: new Date().toISOString()
    }
  };

  const jsonFile = `output/config_${subject}.json`;
  fs.writeFileSync(jsonFile, JSON.stringify(jsonContent, null, 2));
  console.log(`Fichier JSON généré et sauvegardé dans ${jsonFile}`);

  return jsonFile;
}

// Fonction pour la génération du frontend (HTML/CSS/JS)
async function generateWebPage(subject) {
  console.log("Démarrage de la génération de la page Web pour le sujet : ", subject);

  // Génération du contenu basé sur le sujet/thème
  const content = await generateContent(subject);
  
  // Génération de la structure HTML/CSS/JS et de l'image
  await generateStructure(content, subject);

  console.log(`Page Web générée avec succès pour le sujet : ${subject}`);
}

// Génération du contenu basé sur le sujet/thème
async function generateContent(subject) {
  console.log("Génération du contenu pour le sujet :", subject);

  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: `Génère un contenu détaillé pour une page Web sur le sujet : ${subject}` }],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048,
  });

  const contentText = chatCompletion.choices[0]?.message?.content || '';
  const imageUrl = await generateImage(subject);

  return { text: contentText, image: imageUrl };
}

// Génération de l'image via OpenAI DALL-E
async function generateImage(subject) {
  console.log("Génération d'image pour le sujet :", subject);

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Une image descriptive pour le sujet : ${subject}`,
    n: 1,
    size: "1024x1024",
  });

  const imageUrl = response.data[0].url;
  const imageFile = `output/image_${subject}_${new Date().toISOString()}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);

  console.log(`Image générée et sauvegardée sous ${imageFile}`);
  return imageFile;
}

// Génération de la structure HTML/CSS/JS
async function generateStructure(content, subject) {
  console.log("Génération de la structure HTML, CSS et JS");

  const html = generateHTML(content, subject);
  const htmlFile = `output/page_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.html`;
  fs.writeFileSync(htmlFile, html);
  console.log(`HTML sauvegardé dans ${htmlFile}`);

  const css = generateCSS();
  const cssFile = `output/style_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.css`;
  fs.writeFileSync(cssFile, css);
  console.log(`CSS sauvegardé dans ${cssFile}`);

  const js = generateJavaScript(subject);
  const jsFile = `output/script_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.js`;
  fs.writeFileSync(jsFile, js);
  console.log(`JavaScript sauvegardé dans ${jsFile}`);
}

// Générateur HTML
function generateHTML(content, subject) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page sur ${subject}</title>
    <link href="style_${subject}.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1 class="title">${subject}</h1>
      <div class="image">
        <img src="${content.image}" alt="Image descriptive de ${subject}">
      </div>
      <div class="content">
        ${content.text}
      </div>
    </div>
    <script src="script_${subject}.js"></script>
  </body>
  </html>
  `;
}

// Générateur CSS
function generateCSS() {
  return `
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
  }
  .container {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
  }
  .title {
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
  }
  .image {
    margin-bottom: 20px;
    text-align: center;
  }
  .image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .content {
    font-size: 1.2em;
    line-height: 1.6;
    color: #555;
  }
  `;
}

// Générateur JavaScript
function generateJavaScript(subject) {
  return `
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Page chargée pour le sujet : ${subject}");
  });
  `;
}

// Générateur README.md
async function generateReadMe(subject) {
  console.log("Génération du fichier README.md");

  const readmeContent = `
  # Projet : ${subject}

  ## Description
  Ce projet contient une structure backend (PHP/SQL) et frontend (HTML/CSS/JS) pour gérer des données sur le sujet : **${subject}**.

  ## Fichiers générés

  - **Backend**
    - PHP : \`backend_${subject}.php\`
    - SQL : \`database_${subject}.sql\`
    - API JS : \`api_${subject}.js\`
    - Configuration JSON : \`config_${subject}.json\`

  - **Frontend**
    - Page HTML : \`page_${subject}.html\`
    - Style CSS : \`style_${subject}.css\`
    - Script JS : \`script_${subject}.js\`

  - **Image**
    - \`image_${subject}.webp\`

  ## Instructions
  1. Utilisez les fichiers SQL pour créer les bases de données.
  2. Déployez le backend avec le fichier PHP pour gérer les requêtes.
  3. Intégrez le frontend généré pour visualiser les données.
  
  ## Répertoires GitHub
  Ce projet est hébergé sur GitHub, vous pouvez le consulter à l'adresse suivante : 
  - [GitHub - Backend Repository](https://github.com/universmc/backend_${subject})
  - [GitHub - Frontend Repository](https://github.com/universmc/frontend_${subject})
  `;

  const readmeFile = `output/README_${subject}.md`;
  fs.writeFileSync(readmeFile, readmeContent);
  console.log(`README généré et sauvegardé dans ${readmeFile}`);
}

// Fonction pour analyser une preuve
async function analysePreuves(preuve) {
  const prompt = `
  Enquêteur IA, veuillez analyser les éléments de preuve suivants :
  - Preuve: ${preuve.parnom}
  - Code: ${preuve.parcode}
  - Dossier RNA: ${preuve.Identif_RNA_num}

  Quel est le statut actuel de l'enquête sur cette entité et quelles actions recommandez-vous pour avancer ?
  `;

  const completion = await groq.chat.completions.create({
    model: "gemma2-9b-it",
    messages: [
      { role: "system", content: "Phase 1: Analyse des preuves" },
      { role: "user", content: prompt }
    ],
    max_tokens: 1500
  });

  const aiResponse = completion.choices[0]?.message?.content;

  const outputFilePath = `AnalysePreuves_${preuve.parcode}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
  fs.writeFileSync(outputFilePath, aiResponse);
  console.log(`Résultat de l'analyse pour ${preuve.parnom} enregistré dans ${outputFilePath}`);
}

// Fonction pour itérer à travers toutes les preuves
async function processAllPreuves() {
  for (const preuve of Preuves) {
    await analysePreuves(preuve);
  }
}

// Fonction principale pour traiter toutes les preuves et générer le projet
async function main() {
  console.log("Initialisation de l'analyse des preuves...");
  await processAllPreuves();
  await generateFullStack(subject);
  console.log("Analyse terminée et projet généré.");
}

main();
