const fs = require("fs");
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const readline = require('readline');

// Fonction pour capturer la saisie de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function generateBilan() {
  console.log("Début de la génération du bilan...");

  try {
    // Utiliser l'API Groq pour créer un résumé basé sur des données récentes
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Phase 0: Initialisation du bilan de la conversation" },
        { role: "user", content: "Génère un bilan détaillé de notre conversation, avec les points clés abordés, les résumés des sujets et les prochaines étapes." }
      ],
      model: "gemma2-9b-it", // Utilisation du modèle pour générer un bilan
      temperature: 0.7,
      max_tokens: 2048,
    });

    // Contenu généré pour le bilan
    const bilanContent = completion.choices[0]?.message?.content;

    if (!bilanContent) {
      console.error("Aucun contenu généré pour le bilan.");
      return;
    }

    // Générer le fichier Markdown
    const fileName = `bilan_conversation_${new Date().toISOString().replace(/[-:TZ]/g, "")}.md`;
    fs.writeFileSync(fileName, bilanContent);
    console.log(`Le bilan a été enregistré sous ${fileName}`);
    
  } catch (error) {
    console.error("Une erreur s'est produite lors de la génération du bilan :", error);
  }
}

// Fonction principale pour écouter la commande "/bilan"
function startBilanCommand() {
  rl.question("Saisissez une commande : ", (command) => {
    if (command.trim() === '/bilan') {
      generateBilan();
    } else {
      console.log("Commande non reconnue. Tapez /bilan pour générer un bilan.");
    }
    rl.close();
  });
}

// Appel de la fonction principale pour écouter la commande "/bilan"
startBilanCommand();
