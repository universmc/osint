// Importation des modules nécessaires
const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Argument pour le sujet (défaut : 'readme')
const subject = process.argv[2] || 'readme';

/**
 * Génère un contenu Markdown structuré pour un sujet donné.
 * @param {string} subject - Le sujet à documenter.
 * @returns {string} - Contenu Markdown formaté.
 */
function generateMarkdown(subject) {
  return `## 🌟 Guide: **${subject}** - Étape par Étape\n\n` +
    `### 📝 Introduction :\n\n` +
    `Ce guide vous aidera à comprendre et réaliser **${subject}**. ` +
    `Il est conçu pour les débutants et utilisateurs intermédiaires.\n\n` +
    `### 📋 Prérequis :\n` +
    `* Avoir les connaissances de base en JavaScript.\n` +
    `* Disposer d'un éditeur de code (comme VSCode).\n\n` +
    `### 🚀 Étapes à suivre :\n` +
    `1. **Configuration du projet :**\n   * Installez les dépendances nécessaires via \`npm install\`.\n   * Créez un fichier \`config.json\` avec vos clés API.\n` +
    `2. **Exécution :**\n   * Lancez le script avec \`node script.js [subject]\`.\n   * Le fichier généré sera enregistré automatiquement.\n\n` +
    `### 💡 Conseils :\n` +
    `* Vérifiez toujours les dépendances dans \`package.json\` avant de lancer un script.\n` +
    `* Relisez les guides générés pour ajuster les détails contextuels.\n\n` +
    `### 🔗 Ressources Supplémentaires :\n` +
    `* [Groq-SDK Documentation](https://groq.dev/docs)\n` +
    `* [Exemples Markdown sur GitHub](https://github.com/markdown-it/markdown-it)\n\n` +
    `✨ Bon apprentissage avec **${subject}** !`;
}

/**
 * Fonction principale pour générer un guide Markdown pour une liste de sujets.
 */
async function main() {
  const subjects = [
    "how-to-build_intro",
    "how-to-build_objectifs_SMART",
    "how-to-build_Model_IA"

    ];

  for (const subject of subjects) {
    try {
      // Appel à l'API Groq pour générer des prompts enrichis (si nécessaire)
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: `Génération d'un guide pour : ${subject}` },
        ],
        model: "gemma2-9b-it",
        temperature: 0.5,
        max_tokens: 4096,
      });

      // Génération du fichier Markdown
      const mdContent = generateMarkdown(subject);
      const outputFilePath = `guides/${subject}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
      fs.writeFileSync(outputFilePath, mdContent);

      console.log(`✅ Guide généré avec succès : ${outputFilePath}`);
    } catch (error) {
      console.error("❌ Une erreur s'est produite :", error);
    }
  }
}

main();
