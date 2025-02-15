const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Fonction principale pour générer JS et JSON de manière asynchrone
async function generateJSAndJSON() {
  try {
    // Générer JavaScript
    const jsContent = await generateJS();
    // Générer JSON
    const jsonContent = await generateJSON();
    console.log("JS et JSON générés avec succès.");
  } catch (error) {
    console.error("Erreur lors de la génération JS/JSON:", error);
  }
}

// Générateur JavaScript
async function generateJS() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      { role: "system", name: "[🌌_system]", content: "clean /mode" },
      { role: "assistant", name: "[📔_codex]", content: "[📔.codex]_Phase[01]:[RUN]:[JS_Generator[.Script.]]" },
      { role: "user", name: "[🌴_Groq]", content: "[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!" }
    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 2048,
  });

  const jsContent = chatCompletion.choices[0]?.message?.content;
  const outputFilePath = "output/script_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".js";
  fs.writeFileSync(outputFilePath, jsContent);
  console.log("Fichier JS généré et enregistré dans", outputFilePath);

  return jsContent;
}

// Générateur JSON
async function generateJSON() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      { role: "system", name: "[🌌_system]", content: "clean /mode" },
      { role: "assistant", name: "[📔_codex]", content: "[📔.codex]_Phase[01]:[RUN]:[JSON_Generator[.Data.]]" },
      { role: "user", name: "[🌴_Groq]", content: "[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!" }
    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 2048,
  });

  const jsonContent = chatCompletion.choices[0]?.message?.content;
  const outputFilePath = "output/data_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".json";
  fs.writeFileSync(outputFilePath, jsonContent);
  console.log("Fichier JSON généré et enregistré dans", outputFilePath);

  return jsonContent;
}

// Exécution du module JS/JSON
generateJSAndJSON();
