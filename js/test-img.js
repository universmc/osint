const fs = require('fs');
const OpenAI = require('openai');
const axios = require('axios');
const Groq = require('groq-sdk');
const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const subject = process.argv[2] || "HOWTO_BUILD_A_WEB_SITE_WITH_ML+AI";

// Objectif : Suivi des différentes phases du projet (comme un diagramme de Gantt)
const phases = {
  phase1: { name: "Conception", status: "not_started", progress: 0 },
  phase2: { name: "Développement", status: "not_started", progress: 0 },
  phase3: { name: "Test et Validation", status: "not_started", progress: 0 },
  phase4: { name: "Lancement", status: "not_started", progress: 0 }
};

async function runPhasedProject() {
  console.log("Lancement du projet avec phases...");
  await startPhase("phase1");
  await generateWebPage(subject);
  await completePhase("phase1");

  await startPhase("phase2");
  await implementDevelopment(subject);
  await completePhase("phase2");

  await startPhase("phase3");
  await testAndValidate(subject);
  await completePhase("phase3");

  await startPhase("phase4");
  await deployWebsite(subject);
  await completePhase("phase4");

  console.log("Projet complété !");
}

async function startPhase(phaseKey) {
  if (phases[phaseKey]) {
    phases[phaseKey].status = "in_progress";
    phases[phaseKey].progress = 0;
    console.log(`Phase: ${phases[phaseKey].name} a commencé...`);
  }
}

async function completePhase(phaseKey) {
  if (phases[phaseKey]) {
    phases[phaseKey].status = "completed";
    phases[phaseKey].progress = 100;
    console.log(`Phase: ${phases[phaseKey].name} complétée.`);
  }
}

async function generateWebPage(subject) {
  console.log("Génération de la page Web pour le sujet :", subject);
  const content = await generateContent(subject);
  await generateStructure(content, subject);
}

async function implementDevelopment(subject) {
  console.log("Développement du site Web...");
  // Simulate development steps here (backend, frontend)
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate some time
  console.log("Développement terminé.");
}

async function testAndValidate(subject) {
  console.log("Test et Validation en cours...");
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate testing
  console.log("Tests validés.");
}

async function deployWebsite(subject) {
  console.log("Déploiement du site Web...");
  // Simulate deployment
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log("Site Web déployé.");
}

// Gestion des contenus pour chaque phase
async function generateContent(subject) {
  console.log("Génération du contenu pour le sujet :", subject);
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "user", content: `Génère un contenu détaillé pour une page Web sur le sujet : ${subject}` }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048
  });

  const contentText = chatCompletion.choices[0]?.message?.content || '';
  const imageUrl = await generateImage(subject);

  return { text: contentText, image: imageUrl };
}

// Générer une image via OpenAI DALL-E
async function generateImage(subject) {
  console.log("Génération d'image pour le sujet :", subject);
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Une image descriptive pour le sujet : ${subject}`,
    n: 1,
    size: "1024x1024"
  });

  const imageUrl = response.data[0].url;
  const imageFile = `src/img/image_${subject}_${new Date().toISOString()}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);

  console.log(`Image générée et sauvegardée sous ${imageFile}`);
  return imageFile;
}

// Générer la structure du site web (HTML/CSS/JS)
async function generateStructure(content, subject) {
  console.log("Génération de la structure HTML, CSS et JS");

  // Générer HTML
  const html = generateHTML(content, subject);
  const htmlFile = `page_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.html`;
  fs.writeFileSync(htmlFile, html);
  console.log(`HTML sauvegardé dans ${htmlFile}`);

  // Générer CSS
  const css = generateCSS();
  const cssFile = `src/css/style_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.css`;
  fs.writeFileSync(cssFile, css);
  console.log(`CSS sauvegardé dans ${cssFile}`);

  // Générer JS
  const js = generateJavaScript(subject);
  const jsFile = `src/js/pipeline_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.js`;
  fs.writeFileSync(jsFile, js);
  console.log(`JavaScript sauvegardé dans ${jsFile}`);
}

function generateHTML(content, subject) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page sur ${subject}</title>
    <link href="src/css/style_${subject}.css" rel="stylesheet">
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
    <script src="src/js/pipeline_${subject}.js"></script>
  </body>
  </html>
  `;
}

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

function generateJavaScript(subject) {
  return `
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Page chargée pour le sujet : ${subject}");
  });
  `;
}

// Lancement de l'application avec phases
runPhasedProject();
