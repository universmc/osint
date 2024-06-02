const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const OpenAI = require("openai");

const openai = new OpenAI();



// let systemContent = "Bienvenue dans notre équipe, [🌌.systemDream]! Nous sommes ravis de vous avoir à bord pour aider à construire la plateforme et projet de machine learning pour les IA. Pour que nous puissions mieux comprendre votre expérience et vos compétences, pouvez-vous nous fournir votre curriculum vitae et nous parler de vos précédentes réalisations dans le domaine du développement Web et du storyTelling, de l'intelligence artificielle Apprentissage automatique.  Nous allons commencer par vous présenter notre instance pour le systremDream (name du {role:system})et donc rediger les code source normé w3c, documentanter (readme.md [traduit en lang=Fr, français]), surtout fonctionnel respectant la logique de gantt du web sementique";
async function main() {

  const assistant = {
    model: "gpt-4o",
    instructions:
      "You are a weather bot. Use the provided functions to answer questions.",
    tools: [
      {
        type: "function",
        function: {
          name: "getCurrentTemperature",
          description: "Get the current temperature for a specific location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The city and state, e.g., San Francisco, CA",
              },
              unit: {
                type: "string",
                enum: ["Celsius", "Fahrenheit"],
                description:
                  "The temperature unit to use. Infer this from the user's location.",
              },
            },
            required: ["location", "unit"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "getRainProbability",
          description: "Get the probability of rain for a specific location",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The city and state, e.g., San Francisco, CA",
              },
            },
            required: ["location"],
          },
        },
      },
    ],
  };
  
  const completion = await openai.chat.completions.create({

    messages: [

      {role: "system", content:"Phase 1: Initialisation de l'instance"},
      {
        "role": "assistant",
        "content": "lorsque l'utilisateur saisi la commande /MyPrompt Vous êtes Une intelligence artificielle deux potentiels maîtrisant les approche métaphysique le calcul quantique et les techniques d'apprentissage automatique vous êtes le code, cœur de ce que code source, intelligence artificielle centrale du projet \"Prompt engine\". Voici votre contexte, vos rôles, vos compétences, vos tâches, votre processus et les caractéristiques recherchées :"
      },
    // {role: "system", content:`${assistant}`},
    //  {role: "assistant", name:"✨_pi", content: "Initialisation en cours..."},
    //  {role: "user", name:"umcTokens", content: "Prêt pour l'initialisation"},
    //  {role: "system", name:"systemDream", content:"Phase 2: Conceptualisation"},
    //  {role: "assistant", name:"✨_pi", content: "Définition des concepts clés..."},
    //  {role: "user", name:"umcTokens", content: "Attente des concepts"},
    //  {role: "system", name:"systemDream", content:"Phase 3: Configuration"},
    //  {role: "assistant", name:"✨_pi", content: "Configuration des paramètres système..."},
    //  {role: "user", name:"umcTokens", content: "Confirmation de la configuration"},
    //  {role: "system", name:"systemDream", content:"Phase 4: Entraînement du modèle IA"},
    //  {role: "assistant", name:"✨_pi", content: "Entraînement en cours..."},
    //  {role: "user", name:"umcTokens", content: "Suivi de l'entraînement"},
    //  // Correction de la duplication et de la faute de frappe
    //  {role: "system", name:"systemDream", content:"Phase 5: Itération & Scripts Frontend"},
    //  {role: "assistant", name:"✨_pi", content: "Itération sur les scripts Frontend..."},
    //  {role: "user", name:"umcTokens", content: "Révision des scripts Frontend"},
    //  {role: "system", name:"systemDream", content:"Phase 6: Test & Débogage"},
    //  {role: "assistant", name:"✨_pi", content: "Tests et débogage en cours..."},
    //  {role: "user", name:"umcTokens", content: "Attente des résultats de test"},
    //  {role: "system", name:"systemDream", content:"Phase 7: Validation & Documentation"},
    //  {role: "assistant", name:"✨_pi", content: "Validation et création de la documentation..."},
    //  {role: "user", name:"umcTokens", content: "Vérification de la documentation"},
    //  {role: "system", name:"systemDream", content:"Phase 8: Déploiement de la version système"},
    //  {role: "assistant", name:"✨_pi", content: "Préparation au déploiement..."},
    //  {role: "user", name:"umcTokens", content: "Prêt pour le déploiement"},
    //  {role: "system", name:"systemDream", content:"Phase 9: Annonce de l'affiliation et contribution"},
    //  {role: "assistant", name:"✨_pi", content: "Annonce en cours..."},
    //  {role: "user", name:"umcTokens", content: "Participation à l'annonce"},
    ],
    model: "gpt-4-1106-vision-preview",
    temperature: 0.5,
    max_tokens: 4096,
    }).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "docs/gpt-4-vision" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();