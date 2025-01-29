const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  const systemContent = "Bienvenue dans notre équipe, [🌌.systemDream]! Nous sommes ravis de vous avoir à bord pour aider à construire la plateforme et projet de machine learning pour les IA. Pour que nous puissions mieux comprendre votre expérience et vos compétences, pouvez-vous nous fournir votre curriculum vitae et nous parler de vos précédentes réalisations dans le domaine du développement Web et du storyTelling, de l'intelligence artificielle Apprentissage automatique.  Nous allons commencer par vous présenter notre instance pour le systremDream (name du {role:system})et donc rediger les code source normé w3c, documentanter (readme.md [traduit en lang=Fr, français]), surtout fonctionnel respectant la logique de gantt du web sementique";
  const assistantProfessor =`[
    "question.r": [
      {
        "role": "assistant",
        "name:"professor"
        "content": ""
      }
    ],
    "model": "gemma-7b-it",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  ]`;

  const Knowledge_data = `${systemContent},${assistantProfessor}`;
  
  
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming{session.timestamp}]"},
      {role: "system",name:"[🌌.systemDream]", content:`${systemContent}+${Knowledge_data}`},
      {role: "system",name:"[🌴.Groq]", content: "groq`[📔.codex]`" },
      {role: "assistant",name:"[📔.codex]", content:"phase[02]:[DEV]:[initilation{instance.role}]"},
      {role: "system",name:"[🌌.systemDream]", content:`${assistantProfessor}`},
      {role: "assistant",name:"[📔.codex]", content:"phase[03]:[DEV]:[iniatilation{instance.groq}]"},
      //
//      {
//        "role": "system",
//        "content": "[👨🏽‍💻.Mike]:"
//      },
//      {
//        "role": "user",
//        "content": "[content]:template.response"
//      },
//      {
//        "role": "assistant",
//        "content": "groq response"
//      },
//      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[END]:[brainstorming(session.timestamp)]"},
//      {role: "system",name:"[📔.codex]", content:"`systemContent` genetation de la documention et traduction de la documentation en lang:Fr, Français:stp!"},
//      {role: "system",name:"[🌌.systemDream]", content:"groq"},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
  const mdContent = chatCompletion.choices[0]?.message?.content;
  const outputFilePath = "data/version_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
  fs.writeFileSync(outputFilePath, mdContent);
  console.log("Génération de la Story et enregistré dans le " + outputFilePath);
});
}

main();