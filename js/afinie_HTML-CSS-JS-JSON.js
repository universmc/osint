const fs = require('fs');
const OpenAI = require('openai');
const axios = require('axios');
const Groq = require('groq-sdk');
const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const subject = process.argv[2] || "développement et définition des objectifs S.M.A.R.T -IA";

async function generateWebPage(subject) {
  console.log("Démarrage de la génération de la page Web pour le sujet : ", subject);

  // Boucle 1: Génération du contenu basé sur le sujet/thème
  const content = await generateContent(subject);
  
  // Boucle 2: Génération de la structure HTML/CSS/JS et de l'image
  await generateStructure(content, subject);

  console.log(`Page Web générée avec succès pour le sujet : ${subject}`);
}

// Boucle 1: Génération du contenu basé sur le sujet/thème
async function generateContent(subject) {
  console.log("Génération du contenu pour le sujet :", subject);

  // Générer le texte via un modèle de langage (OpenAI/Groq)
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "user", content: `Génère un contenu détaillé pour une page Web sur le sujet : ${subject}` }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048
  });

  const contentText = chatCompletion.choices[0]?.message?.content || '';
  
  // Générer une image pour le sujet via OpenAI DALL-E
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
    size: "1792x1024"
  });

  const imageUrl = response.data[0].url;
  const imageFile = `src/img/image_${subject}_${new Date().toISOString()}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);

  console.log(`Image générée et sauvegardée sous ${imageFile}`);
  return imageFile;
}

// Boucle 2: Génération de la structure HTML/CSS/JS
async function generateStructure(content, subject) {
  console.log("Génération de la structure index.HTML, style.css CSS et pipeline.JS, pipeline.JSON");

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

  // Générer SCSS
  const scss = generateJavaScript(subject);
  const scssFile = `src/js/styles_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.scss`;
  fs.writeFileSync(scssFile, scss);
  console.log(`JavaScript sauvegardé dans ${scssFile}`);


  // Générer JS
  const js = generateJavaScript(subject);
  const jsFile = `src/js/pipeline_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.js`;
  fs.writeFileSync(jsFile, js);
  console.log(`JavaScript sauvegardé dans ${jsFile}`);

  // Générer JSON pour pipeline de données
  const json = generatePipelineJSON(subject);
  const jsonFile = `src/json/pipeline_${subject}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.json`;
  fs.writeFileSync(jsonFile, json);
  console.log(`Pipeline JSON sauvegardé dans ${jsonFile}`);
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
      <div id="sommaire"></div>
      <div id="content"></div>
    </div>
    <script src="src/json/pipeline_${subject}.js"></script>
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
  .sommaire-link {
    display: block;
    margin-bottom: 10px;
    color: #0056b3;
    text-decoration: none;
  }
  `;
}

// Générateur JavaScript
function generateJavaScript(subject) {
  return `
  document.addEventListener('DOMContentLoaded', function() {
    fetch('src/json/pipeline_${subject}.json')
        .then(response => response.json())
        .then(cours => {
            const sommaire = document.getElementById('sommaire');
            const contenuCours = document.getElementById('content');

            cours.forEach((section, index) => {
                let sommaireItem = document.createElement('a');
                sommaireItem.href = \`#section\${index}\`;
                sommaireItem.textContent = section.titre;
                sommaireItem.classList.add('sommaire-link');
                sommaire.appendChild(sommaireItem);

                let sectionDiv = document.createElement('div');
                sectionDiv.id = \`section\${index}\`;
                sectionDiv.classList.add('section');

                let titreSection = document.createElement('h2');
                titreSection.textContent = section.titre;
                sectionDiv.appendChild(titreSection);

                section.sousSections.forEach(sousSection => {
                    let sousSectionDiv = document.createElement('div');
                    sousSectionDiv.classList.add('sous-section');

                    let sousTitre = document.createElement('h3');
                    sousTitre.textContent = sousSection.sousTitre;
                    sousSectionDiv.appendChild(sousTitre);

                    if (sousSection.contenuMarkdown) {
                        fetch(sousSection.contenuMarkdown)
                            .then(responseMd => responseMd.text())
                            .then(markdown => {
                                let contenu = document.createElement('div');
                                contenu.className = 'markdown-contenu';
                                contenu.innerHTML = marked.parse(markdown);
                                sousSectionDiv.appendChild(contenu);
                            });
                    } else {
                        let contenu = document.createElement('p');
                        contenu.innerHTML = sousSection.contenu;
                        sousSectionDiv.appendChild(contenu);
                    }

                    sectionDiv.appendChild(sousSectionDiv);
                });

                contenuCours.appendChild(sectionDiv);
            });
        });
  });
  `;
}

// Générateur JSON pour pipeline
function generatePipelineJSON(subject) {
  const pipeline = [
    {
      titre: "Introduction",
      sousSections: [
        { sousTitre: "Contexte", contenu: "Description du contexte." },
        { sousTitre: "Objectifs", contenuMarkdown: "src/md/objectif.md" }
      ]
    },
    {
      titre: "Développement",
      sousSections: [
        { sousTitre: "Étape 1", contenuMarkdown: "src/md/etape1.md" },
        { sousTitre: "Étape 2", contenuMarkdown: "src/md/etape2.md" }
      ]
    }
    // Ajouter d'autres sections si nécessaire
  ];

  return JSON.stringify(pipeline, null, 2);
}

// Exécution principale
generateWebPage(subject);
