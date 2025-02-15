const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Fonction principale pour générer HTML et CSS de manière asynchrone
async function generateHTMLAndCSS() {
  try {
    // Générer HTML
    const htmlContent = await generateHTML();
    // Générer CSS
    const cssContent = await generateCSS();
    console.log("HTML et CSS générés avec succès.");
  } catch (error) {
    console.error("Erreur lors de la génération HTML/CSS:", error);
  }
}

// Générateur HTML
async function generateHTML() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      { role: "system", name: "[🌌_system]", content: "clean /mode" },
      { role: "assistant", name: "[📔_codex]", content: "[📔.codex]_Phase[01]:[RUN]:[HTML_Generator[.Template.]]" },
      { role: "user", name: "[🌴_Groq]", content: "[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!" }
    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 2048,
  });

  const htmlContent = chatCompletion.choices[0]?.message?.content;
  const outputFilePath = "output/page_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
  fs.writeFileSync(outputFilePath, htmlContent);
  console.log("Fichier HTML généré et enregistré dans", outputFilePath);

  return htmlContent;
}

// Générateur CSS
async function generateCSS() {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      { role: "system", name: "[🌌_system]", content: "clean /mode" },
      { role: "assistant", name: "[📔_codex]", content: "[📔.codex]_Phase[01]:[RUN]:[CSS_Generator[.Style.]]" },
      { role: "user", name: "[🌴_Groq]", content: "[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!" }
    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 2048,
  });

  const cssContent = chatCompletion.choices[0]?.message?.content;
  const outputFilePath = "output/style_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".css";
  fs.writeFileSync(outputFilePath, cssContent);
  console.log("Fichier CSS généré et enregistré dans", outputFilePath);

  return cssContent;
}

// Exécution du module HTML/CSS
generateHTMLAndCSS();
