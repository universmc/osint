const fs = require('fs');
const Groq = require('groq-sdk');
// Initialize the SDKs with API keys
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const introduction = `


`;

// Define the prompts and roles for each model

const promptingReadme = {
  context: "Utilizing GANs for data refinement  CTF emoji /mode Campagne.",
  role: "assistant",
  tasks: ["Data Generation", "Dynamic Modeling"],
  expectedOutcome: "Improved and adaptable data sets."
};

const promptingGROQ = {
  context: "Enhancing text generation using EXO.",
  role: "system",
  tasks: ["Text Generation", "Context Understanding"],
  expectedOutcome: "High-quality, coherent text output."
};

const promptingHTML = {
  context: "Enhancing text generation using EXO.",
  role: "system",
  tasks: ["Text Generation","HTML", "Context Understanding"],
  expectedOutcome: "High-quality, coherent text output."
};

const promptingJS = {
  context: "Enhancing text generation using EXO.",
  role: "system",
  tasks: ["Text Generation","HTML", "Context Understanding"],
  expectedOutcome: "High-quality, coherent text output."
};
const promptingJSON = {
  context: "Enhancing text generation using EXO.",
  role: "system",
  tasks: ["Text Generation","HTML", "Context Understanding"],
  expectedOutcome: "High-quality, coherent text output."
};


const promptingCSS = {
  context: "Enhancing text generation using EXO.",
  role: "system",
  tasks: ["Text Generation","CSS", "Context Understanding"],
  expectedOutcome: "High-quality, coherent text output."
};

const promptingSVG = {
  context: "Enhancing text generation using EXO.",
  role: "system",
  tasks: ["Text Generation","CSS", "Context Understanding"],
  expectedOutcome: "High-quality, coherent text output."
};
const promptingDrawIo = {
  context: "Enhancing text generation using EXO.",
  role: "system",
  tasks: ["Text Generation","CSS", "Context Understanding"],
  expectedOutcome: "High-quality, coherent text output."
};
const promptingGemini = {
  context: "Utilizing GANs for data refinement  CTF emoji /mode Campagne.",
  role: "assistant",
  tasks: ["Data Generation", "Dynamic Modeling"],
  expectedOutcome: "Improved and adaptable data sets."
};
const prompt = {
  groq: {
      description: 'Génération de texte cohérent et contextuel',
      promptGroq: {
          context: "Améliorer la génération de texte en utilisant EXO.",
          role: "système",
          taches: ["Génération de texte", "Compréhension contextuelle"],
          résultatAttendu: "Un texte de haute qualité et cohérent."
      }
  },
  gemini: {
      description: "Amélioration des données par le biais de GANs",
      promptGemini: {
          context: "Utilisation de GANs pour le raffinement des données  CTF emoji /mode Campagne.",
          role: "assistant",
          taches: ["Génération de données", "Modélisation dynamique"],
          résultatAttendu: "Des ensembles de données améliorés et adaptables."
      }
  }
};

// Function to execute and compare GROque and Gemini outputs
async function executeAndMatchAIModels() {

  const match = {README: null, GROQ: null, Gemini: null,HTML: null,CSS: null,JS: null,JSON: null,SVG: null,DRAWIO: null  }; // Initialize match results

  try {

    // Execute prompt --readme content generation task
    console.log("Starting Groq-html content generation task...");
    const ReadmeCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: JSON.stringify(promptingReadme) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const ReadmeContent = ReadmeCompletion.choices[0]?.message?.content;
    const ReadmeFilePath = `data/readme_${Date.now()}.md`;
    fs.writeFileSync(ReadmeFilePath, ReadmeContent || "No content generated.");
    console.log(`groq content saved to ${ReadmeFilePath}`);
    match.README = ReadmeContent ? "Success" : "Failure";

    // Execute promp --html content generation task
    console.log("Starting Groq-html content generation task...");
    const HTMLCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: JSON.stringify(promptingHTML) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const HTMLContent = HTMLCompletion.choices[0]?.message?.content;
    const HTMLFilePath = `src/html/HTML_output_${Date.now()}.html`;
    fs.writeFileSync(HTMLFilePath, HTMLContent || "No content generated.");
    console.log(`groq content saved to ${HTMLFilePath}`);
    match.HTML = HTMLContent ? "Success" : "Failure";

    // Execute prompt -css content generation task
    console.log("Starting Groq-html content generation task...");
    const CSSCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: JSON.stringify(promptingCSS) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const CSSContent = CSSCompletion.choices[0]?.message?.content;
    const CSSFilePath = `src/css/CSS_output_${Date.now()}.css`;
    fs.writeFileSync(CSSFilePath, CSSContent || "No content generated.");
    console.log(`groq content saved to ${CSSFilePath}`);
    match.CSS = CSSContent ? "Success" : "Failure";
    
    // Execute prompt --js content generation task
    console.log("Starting Groq-JS content generation task...");
    const JSCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: JSON.stringify(promptingJS) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const JSContent = JSCompletion.choices[0]?.message?.content;
    const JSFilePath = `src/js/JS_output_${Date.now()}.js`;
    fs.writeFileSync(JSFilePath, JSContent || "No content generated.");
    console.log(`groq content saved to ${JSFilePath}`);
    match.JS = JSContent ? "Success" : "Failure";


    // Execute prompt --js content generation task
    console.log("Starting Groq-JSON content generation task...");
    const JSONCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: JSON.stringify(promptingJSON) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const JSONContent = JSONCompletion.choices[0]?.message?.content;
    const JSONFilePath = `src/json/JSon_output_${Date.now()}.json`;
    fs.writeFileSync(JSONFilePath, JSONContent || "No content generated.");
    console.log(`groq JSON content saved to ${JSONFilePath}`);
    match.JSON = JSONContent ? "Success" : "Failure";
    
    // Execute prompt --svg content generation task
    console.log("Starting Groq-SVG content generation task...");
    const SVGCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: JSON.stringify(promptingSVG) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });
    
    const SVGContent = SVGCompletion.choices[0]?.message?.content;
    const SVGFilePath = `src/svg/svg_output_${Date.now()}.svg`;
    fs.writeFileSync(SVGFilePath, SVGContent || "No content generated.");
    console.log(`groq SVG content saved to ${SVGFilePath}`);
    match.SVG = SVGContent ? "Success" : "Failure";
       
    // Execute Groq content generation task
    console.log("Starting Groq content generation task...");
    const drawIoCompletion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: JSON.stringify(prompt) },
        { role: "user", content: JSON.stringify(promptingDrawIo) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const drawIoContent = drawIoCompletion.choices[0]?.message?.content;
    const drawIoFilePath = `src/drawio/drawio_output_${Date.now()}.drawio`;
    fs.writeFileSync(drawIoFilePath, drawIoContent || "No content generated.");
    console.log(`groq draw -io content saved to ${drawIoFilePath}`);
    match.DRAWIO = drawIoContent ? "Success" : "Failure";
    
    

    // Execute Groq content generation task
    console.log("Starting Groq content generation task...");
    const groqCompletion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: JSON.stringify(prompt) },
        { role: "user", content: JSON.stringify(promptingGROQ) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.7
    });

    const groqContent = groqCompletion.choices[0]?.message?.content;
    const groqFilePath = `models/groq_output_${Date.now()}.md`;
    fs.writeFileSync(groqFilePath, groqContent || "No content generated.");
    console.log(`groq content saved to ${groqFilePath}`);
    match.GROQ = groqContent ? "Success" : "Failure";



    // Execute Gemini data generation task
    console.log("Starting Gemini data generation task...");
    const geminiCompletion = await groq.chat.completions.create({
      messages: [
        { role: "assistant", content: `ConText for data Generation ${introduction} : Développement du modèle _GamlePlay_ Et entraînement par pair de l'abritre du Match entre les Utilisateur de la democratie2-0 sur les Les fonctionnalités du Web Sementique W3C initiales de > prompt --engine --help ++emoji intelligent` },
        { role: "user", content: JSON.stringify(promptingGemini) }
      ],
      model: "gemma2-9b-it",
      temperature: 0.6
    });

    const geminiContent = geminiCompletion.choices[0]?.message?.content;
    const geminiFilePath = `models/gemini_output_${Date.now()}.md`;
    fs.writeFileSync(geminiFilePath, geminiContent || "No content generated.");
    console.log(`Gemini content saved to ${geminiFilePath}`);
    match.Gemini = geminiContent ? "Success" : "Failure";

  } catch (error) {
    console.error("Error during AI model execution:", error);
  }

  // Log the match results
  console.log("Match Results:");
  console.log(`Documentation Generation: ${match.README}`);
  console.log(`Groq Generation: ${match.GROQ}`);
  console.log(`Gemini Generation: ${match.Gemini}`);
  console.log(`HTML Generation: ${match.HTML}`);
  console.log(`CSS Generation: ${match.CSS}`);
  console.log(`JS Generation: ${match.JS}`);
  console.log(`JSON Generation: ${match.JSON}`);
  console.log(`SVG Generation: ${match.SVG}`);
  console.log(`drawIo Generation: ${match.DRAWIO}`);

  return match;
}

// Main function to initiate the match and log results
async function main() {
  const matchResults = await executeAndMatchAIModels();
  console.log("Final Match Results:", matchResults);
}

main().catch(console.error);