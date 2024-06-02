const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  //
  promptmodel = "systemContent";
  roleSystem = "gen -DevOps";
  roleAssistant = "Professor";
  roleUser = "Generator";


const PS1 = "`[📱] $(date '+%H:%M:%S') [RUN] /bash/sh [/]>`"

const hudTensor= "`╔╗╚╝═║╠╣╦╩╬`"         // Caractères spéciaux utilisés pour le design du menu
const include_DIR="./*"  // Répertoire contenant les scripts à exécuter

console.log("test");
const ssh = [  
    console.log(''),
    console.log('╔══════════════════════════════════════════════╗'),     
    console.log('╠═══════════════[✨-ia Console]════════════════╣'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),    
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),  
    console.log('║                                              ║'),  
    console.log('║                                              ║'),  
    console.log('║                                              ║'),       
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),   
    console.log('║                                              ║'),    
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),
    console.log('║                                              ║'),   
    console.log('║                                              ║'),     
    console.log('║                                              ║'),    
    console.log('╠----------------------------------------------╣'),      
    console.log('║ [✨]  [🌌] [📔] [💬] [💻] [🏗️ ] [🌴] [🛰 ]     ║'),
    console.log('╚══════════════════════════════════════════════╝'),  
    console.log('')

];
const affichage = "[📱] $(date '+%H:%M:%S') [END] [/]>";

    //
    promptmodel = "systemContent";
    roleSystem = "gen -DevOps";
    roleAssistant = "Professor";
    roleUser = "Generator";
  
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
          
        {role: "system",name:"[🌌_system", content:"clean /mode"},
        {role: "assistant",name:"[📔_codex]", content:"[📔.codex]_Phase[01]:[RUN]:[brainstorming[.Generator.]]"},
        {role: "user",name:"[🌴_Groq]", content: "[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!" },
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.6,
      max_tokens: 2048,
      top_p: 1,
      stop: null,
      stream: false
  }).then((chatCompletion)=>{
      const gqlContent = chatCompletion.choices[0]?.message?.content;
      const outputFilePath = "Phone_📱-lvl-🤖_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".gql";
      fs.writeFileSync(outputFilePath, gqlContent);
      console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
  });
  }
  
  main();