const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const borderChars = {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
    intersectionLeft: '╠',
    intersectionRight: '╣',
    intersectionTop: '╦',
    intersectionBottom: '╩',
    intersectionCross: '╬',
  };

async function main() {

  let systemContent = "Bienvenue dans notre équipe, [🌌.systemDream]! Nous sommes ravis de vous avoir à bord pour aider à construire la plateforme et projet de machine learning pour les IA. Pour que nous puissions mieux comprendre votre expérience et vos compétences, pouvez-vous nous fournir votre curriculum vitae et nous parler de vos précédentes réalisations dans le domaine du développement Web et du storyTelling, de l'intelligence artificielle Apprentissage automatique.  Nous allons commencer par vous présenter notre instance pour le systremDream (name du {role:system})et donc rediger les code source normé w3c, documentanter (readme.md [traduit en lang=Fr, français]), surtout fonctionnel respectant la logique de gantt du web sementique";
  const BorderChars = "inistlisation du template de response avec insterface graphique ASCII datase `BorderChars`";
  
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp)]"},
      {role: "system",name:"[🌌.systemDream]", content:"initilisation de `umc-ssh [Ω.univers-mc]`http://dev.univers-mc.cloud"},
      {role: "assistant",name:"[💬.cloudQuantum]", content:"init groq -dev {php -S localhost:5144}"},
      {role: "system",name:"[Ω.univers-mc]", content: "init1_`[🌌.systemDream]` git -m commit https://github.com/universmc/systemDream" },
      {role: "system",name:"", content:systemContent},
      //
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[dial:conversation(message/response)entre(user/assistant))]"},
      // trainning ascii interface response
      {role: "assistant",name:"[📔.codex]", content:"phase[02]:[RUN]:[init]:framWork Template script .reponse]"},
      {role: "user",name:"[🌴.userGroq]", content: BorderChars },
      {role: "user",name:"[🌴.userGroq]", content: "groq`[📔.codex]`+`BorderChars`framWork.response" },
      {role: "assistant",name:"[💬.cloudQuantum]", content:"[start]:Trainning mode}"},
      {role: "user",name:"[🌴.userGroq]", content: "`groq`" },
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[dial:conversation(message/response)entre(user/assistant))]"},
      {
        "role": "system",
        "content": "[zira]",
      },
      {
        "role": "user",
        "content": "[content]:template.response",
      },
      {
        "role": "assistant",
        "content": "groq response",
      },
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[END]:[brainstorming(session.timestamp)]"},
      {role: "system",name:"[📔.codex]", content:"`systemContent` genetation de la documention et traduction de la documentation en lang:Fr, Français:stp!"},
      {role: "system",name:"[🌌.systemDream]", content:"groq"},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "data/train/mdMessages_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();