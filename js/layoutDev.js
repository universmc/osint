const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const path = require('path'); // Pour la gestion des chemins de fichiers

// Charger le fichier custum.json
const maquettes = JSON.parse(fs.readFileSync('/SiteWebMakers/custum.json', 'utf-8'));

// Liste des sujets
const subjects = [
  "News",
  "intélligence_artificielle",
  "Machine_learning",
  "Google_for_Gemini"
];

// Fonction pour générer un fichier Markdown How-To
function generateMarkdown(subject) {
  return `## Comment [${subject}] - Un guide étape par étape\n\n**Introduction**:\n\nCe guide vous aidera à comprendre et à réaliser [${subject}]. Il est conçu pour les débutants et les utilisateurs intermédiaires qui souhaitent apprendre les bases de [${subject}].\n\n**Prérequis**:\n\n* Liste des prérequis nécessaires pour suivre ce guide.\n\n**Étapes**:\n\n1. **Étape 1:** Description de l'étape 1.\n2. **Étape 2:** Description de l'étape 2.\n3. **Étape 3:** Description de l'étape 3.\n\n**Conseils:** Ajoutez des conseils utiles.\n\n**Ressources supplémentaires:** Listez des liens utiles.`;
}

// Générer les fichiers Markdown pour chaque sujet
async function generateHowToGuides() {
  for (const subject of subjects) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: `Guide pour ${subject}` }
        ],
        model: "gemma2-9b-it",
        temperature: 0.7,
        max_tokens: 2048,
      });

      const mdContent = completion.choices[0]?.message?.content;
      const outputFilePath = `Sessions/Blog_${subject}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
      fs.writeFileSync(outputFilePath, mdContent);
      console.log(`Le How-To sur ${subject} a été enregistré dans ${outputFilePath}`);       
    } catch (error) {
      console.error("Une erreur s'est produite lors de la génération :", error);
    }
  }
}

// Fonction pour générer les pages web basées sur custum.json
function generateWebPageFromMaquettes() {
  let htmlContent = '';
  maquettes.sections.forEach(section => {
    htmlContent += generateSection(section);
  });

  const outputFilePath = '/SiteWebMakers/generated_website.html';
  fs.writeFileSync(outputFilePath, htmlContent);
  console.log(`Le site web a été généré dans ${outputFilePath}`);
}

// Appeler la génération des guides et des pages web
async function main() {
  console.log("Démarrage de la génération des guides How-To et des pages web...");

  // Générer les guides How-To
  await generateHowToGuides();

  // Générer la page web
  generateWebPageFromMaquettes();

  console.log("Génération terminée.");
}

main();
