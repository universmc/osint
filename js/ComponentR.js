const fs = require("fs");
const Groq = require('groq-sdk');
const { Telegraf } = require('telegraf');
const axios = require('axios');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const componentReact = process.argv[2] || 'EcoSystem-_node'; //  Obtenir le sujet via l'argument de ligne de commande

const components = [
   "Next_Js",
  // "composants-header_react",
  // "composants-mainContent_react",
  // "composants-bouton_react",
  // "composants-card_react",
  // "composants-formulaire_react",
  // "composants-sliders_react",
  // "composants-table_react",
  // "composants-class_react",

];

async function main() {
  for (const componentReact of components) {
    try {
      const completion = await groq.chat.completions.create({
      messages: [
        //{role: "system", content:"Phase 0: initialisation"},
        { role: "user", content: `${components}`  },
         {role: "system", content:"Créez le code source en javascipt pour un `{header}_react. Il doit afficher un titre {{Titre}} et un contenu {{Contenu}}. Incluez des propriétés `title` et `content` pour personnaliser le titre et le contenu lors de l'utilisation du composant. Assurez-vous que le composant est fonctionnel, exporté par défaut et prêt à être utilisé dans une application React existante."},
      ],
      model: "gemma2-9b-it", //
      temperature: 0.6,
      max_tokens: 4096,
    }).then((chatCompletion) => {
      const mdContent = chatCompletion.choices[0]?.message?.content;
      const outputFilePath = `Composants/howTo_${componentReact}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
fs.writeFileSync(outputFilePath, mdContent);
      console.log(`Le How-To sur ${componentReact} a été enregistrée sur github dans ${outputFilePath}`);       
    });
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}
}
main(); 
