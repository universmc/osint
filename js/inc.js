import inquirer from 'inquirer';
import fs from 'fs';
import axios from 'axios';
import OpenAI from 'openai';
import Groq from 'groq-sdk';

const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const intents = JSON.parse(fs.readFileSync('src/js/json/inc.json', 'utf8'));

// Fonction principale pour démarrer l'interaction
async function main() {
  const subject = process.argv[2] || "Génération_site_web";
  
  const questions = [
    {
      type: 'list',
      name: 'section',
      message: 'Quelle section souhaitez-vous générer ?',
      choices: ['Frontend', 'Backend', 'API REST'],
    },
    {
      type: 'list',
      name: 'technology',
      message: 'Choisissez une technologie pour le Frontend:',
      choices: ['HTML/CSS','HTML/SCSS/JSON','HTML/CSS/JS/JSON','HTML/CSS/SVG','React'],
      when: (answers) => answers.section === 'Frontend',
    },
    {
      type: 'list',
      name: 'language',
      message: 'Choisissez un langage pour le Backend:',
      choices: ['Node.js', 'PHP','SQL','CVS', 'PHP/SQL','JS/JSON'],
      when: (answers) => answers.section === 'Backend',
    },
    {
      type: 'list',
      name: 'database',
      message: 'Choisissez une base de données pour le Backend:',
      choices: ['MySQL', 'firebase',],
      when: (answers) => answers.section === 'Backend',
    },
    {
      type: 'list',
      name: 'apiType',
      message: 'Choisissez un type d\'API REST:',
      choices: ['Express.js','swagger','phpmyadmin','package.js','Makefile','ThreeJs','electronJs','menu.sh',],
      when: (answers) => answers.section === 'API REST',
    },
  ];

  const answers = await inquirer.prompt(questions);
  
  console.log(`Vous avez choisi :
    - Section : ${answers.section}
    - Technologie ou Langage : ${answers.technology || answers.language || answers.apiType}
    - Base de données : ${answers.database || 'N/A'}
  `);

  // Génération du site en fonction des réponses
  await generateSite(answers, subject);
}

// Fonction pour générer le site web basé sur les réponses
async function generateSite(answers, subject) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: intents.system[answers.section] },
        { role: 'assistant', content: intents.assistant[answers.section] },
        { role: 'user', content: `Utilisateur a choisi la section ${answers.section} avec ${answers.technology || answers.language || answers.apiType}.` }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2048,
    });

    const generatedContent = completion.choices[0]?.message?.content || 'Aucune réponse générée';
    console.log("Complétion générée:", generatedContent);

    const filePath = `output/generation_${answers.section}_${subject}.md`;
    fs.writeFileSync(filePath, generatedContent);
    console.log(`Contenu généré sauvegardé dans ${filePath}`);

    // Si la section est le frontend, générer HTML/CSS/JS
    if (answers.section === 'Frontend') {
      await generateFrontend(answers, subject);
    }
    // Si la section est le backend, générer PHP/SQL/JS
    if (answers.section === 'Backend') {
      await generateBackend(answers, subject);
    }
    // Si la section est l'API REST, générer l'API REST
    if (answers.section === 'API REST') {
      await generateAPI(answers, subject);
    }
  } catch (error) {
    console.error("Erreur lors de la génération du site:", error.message);
  }
}

// Générateur Frontend (HTML/CSS/JS)
async function generateFrontend(answers, subject) {
  console.log("Génération du Frontend...");
  
  const content = await generateContent(subject);
  await generateStructure(content, subject);
  
  console.log(`Frontend généré pour le sujet : ${subject}`);
}

async function generateContent(subject) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'user', content: `Génère un contenu pour une page Web sur ${subject}.` }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048
  });
  
  const contentText = chatCompletion.choices[0]?.message?.content || '';
  const imageUrl = await generateImage(subject);
  
  return { text: contentText, image: imageUrl };
}

async function generateStructure(content, subject) {
  const html = generateHTML(content, subject);
  const htmlFile = `output/page_${subject}.html`;
  fs.writeFileSync(htmlFile, html);

  const css = generateCSS();
  const cssFile = `output/style_${subject}.css`;
  fs.writeFileSync(cssFile, css);

  const js = generateJavaScript(subject);
  const jsFile = `output/script_${subject}.js`;
  fs.writeFileSync(jsFile, js);

  console.log("Structure HTML/CSS/JS générée avec succès.");
}

// Générateur Backend (PHP/SQL)
async function generateBackend(answers, subject) {
  console.log("Génération du Backend...");

  // Implémenter la génération de fichiers PHP et SQL
  const phpFile = `output/backend_${subject}.php`;
  fs.writeFileSync(phpFile, "<?php echo 'Backend généré'; ?>");

  const sqlFile = `output/database_${subject}.sql`;
  fs.writeFileSync(sqlFile, "CREATE DATABASE `db_name`;");

  console.log(`Backend généré et sauvegardé dans ${phpFile} et ${sqlFile}`);
}

// Générateur API REST
async function generateAPI(answers, subject) {
  console.log("Génération de l'API REST...");

  const jsContent = `
  const express = require('express');
  const app = express();
  app.get('/api/${subject}', (req, res) => res.json({ message: 'API REST générée avec succès' }));
  app.listen(3000, () => console.log('API démarrée sur le port 3000'));
  `;
  const apiFile = `output/api_${subject}.js`;
  fs.writeFileSync(apiFile, jsContent);

  console.log(`API REST générée et sauvegardée dans ${apiFile}`);
}

// Générateur HTML/CSS/JS pour Frontend
function generateHTML(content, subject) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <link href="style_${subject}.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <h1>${subject}</h1>
      <img src="${content.image}" alt="Image descriptive de ${subject}">
      <div class="content">${content.text}</div>
    </div>
    <script src="script_${subject}.js"></script>
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
  `;
}

function generateJavaScript(subject) {
  return `
  document.addEventListener("DOMContentLoaded", function() {
    console.log('Page ${subject} chargée.');
  });
  `;
}

async function generateImage(subject) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Générer une image pour ${subject}`,
    n: 1,
    size: "1024x1024"
  });

  const imageUrl = response.data[0].url;
  const imageFile = `output/image_${subject}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);
  
  return imageFile;
}

main();
