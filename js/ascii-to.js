const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();


const constitution68 = `grief/Affaire_910-ref-légal_dalloz.json`

  const borderCharsPV = {topLeft: '╔',topRight: '╗',bottomLeft: '╚',bottomRight: '╝',horizontal: '═',vertical: '║',intersectionLeft: '╠',intersectionRight: '╣',intersectionTop: '╦',intersectionBottom: '╩',intersectionCross: '╬',
  };

  const TensorWindows="╔╗╚╝═║╠╣╦╩╬";

  const tensorReplie = '├┤┬┴┼╠╣╩';
  
  const tensorRendu = '─│·:░▒▓█';
  
  const TensorAscii = `${TensorWindows}+${tensorReplie}+${tensorRendu}`

  const items = `${TensorAscii}`

    async function main() {

    const chatCompletion = await groq.chat.completions.create({

    "messages": [
      {role: "system",name:"[📔.codex]", content:"phase[01]:[RUN]:[brainstorming(session.timestamp).ascii]"},
      {role: "assistant",name:"[📔.codex]", content:"phase[01]:[RUN]:[draw > ascii_art()]"},
      {role: "user",name:"[📔.codex]", content:items,},
      {role: "system",name:"[📔.codex]", content:`
        Theme for the ASCII art! For example:
`},
      {role: "assistant",name:"[📔.codex]", content:`phase[02]:[groq --prompt --ascii_art(${TensorAscii})`}

    ],
    model: "gemma2-9b-it",
    temperature: 0.5,
    max_tokens: 2024,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "starter_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();