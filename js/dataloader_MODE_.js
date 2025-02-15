const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function initiateDataLoader() {
  const messages = [
    { role: "system", name: "introduction_event", content: "Bienvenue au devOps de  'WebSiteMaker'.avec Gemini{gemma2-9b-it} et Mixtral{mixtral-8x7b-32768}, vous êtes invitées à vous intégrés Un moteur magique du générateur de contenu web. Serez-vous prêtes Des nouvelles technologies et du grand public de developpeurs?" },
    { role: "assistant", name: "gpt", content: "initialisation de la classe métier, définition du rôle {role:system,content:devPrompt!" },
    { role: "assistant", name: "gemini", content: "initialisation de la classe métier, définition du rôle {role:system,content:devPrompt!" },
    { role: "assistant", name: "Pi", content: "initialisation de la classe métier, définition du rôle." },
    { role: "assistant", name: "Pi_response", content: "initialisation de la classe métier, définition du rôle." },
    { role: "system", name: "description_event", content: "Le défi est de produire une vidéo de 68 secondes avec 15 séquences. Chaque IA aura une chance de générer du contenu vidéo pour promouvoir le curriculum vitae numérique et l'apprentissage automatique." },
    { role: "user", name: "criteria_question", content: "Quels sont les critères pour déterminer le niveau du site ?" },
    { role: "system", name: "evaluation_criteria", content: "Les critères incluent l'efficacité de traitement, la rapidité, et la pertinence des résultats. Le gagnant sera choisi en fonction de ces éléments." },
    { role: "assistant", name: "gemini_ready", content: "Je suis prête à commencer, vous pouvez lancer le défi." },
    { role: "assistant", name: "gpt_ready", content: "Je suis prêt à montrer ce que je peux faire." }
  ];

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "gemma2-9b-it",
      temperature: 0.7,
      max_tokens: 2048
    });

    const completionText = chatCompletion.choices[0]?.message?.content || "Pas de réponse générée";
    console.log("Réponse générée par l'assistant :", completionText);
  } catch (error) {
    console.error("Erreur lors de la génération de la complétion :", error.message);
  }
}

initiateDataLoader();
