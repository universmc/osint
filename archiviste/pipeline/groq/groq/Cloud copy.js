const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();
const express = require('express');
const functions = require('@google-cloud/functions-framework');

const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Hello, Engine Cloud!');
});

functions.http('app', {
  path: '/',
});

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


// Project plan object
const projectPlan = {
  projectName: "Développement du gantt-chart pour la plate-forme UMC (univers-mc.cloud)avec le SystemDream Groq ,",
  phases: [
    { 
      phaseId:"phase0",  
      description:"model gantt-chart",
      phaseName: "step_1: Initialisation",
      duration:"minimum",
      tasks: [
        titre="Initialisation",
        taskStep= [
          steps= [
            {
              "title": "Exploration de la plateforme",
              "description": "Naviguer sur l'interface utilisateur et découvrir toutes les fonctionnalités offertes par la plateforme. Consulter la documentation et les ressources en ligne pour obtenir une compréhension détaillée des capacités de la plateforme."
            },
          step1="'Initialisation:[rolesSystem(promptSystem)]",
          step2="'Initialisation:[roleAssistant(promptAssistant)]",
          step3="'Initialisation:[roleUser(promptUser)]",
        ]
      ]],
    }
  ],
};

// Function to display the project plan in a structured format
function displayProjectPlan(plan) {
  console.log(`Project Name: ${plan.projectName}`);
  plan.phases.forEach(phase => {
    console.log(`\nPhase: ${phase.phaseName} - Duration: ${phase.duration}`);
    phase.tasks.forEach(task => {
      console.log(`- ${task}`);
    });
  });
}
async function main() {

  // Contenus pour les différents rôles dans le dialogue
const systemContent = "SystemDream : Présentation de Pi: IA au cœur Groq -R role:system,content:(adhoc['🌌','🌅','🌄','🌠','🎇','🏞','🎑','🏙, ) role:system coeur des relations et conversation model conversation avec l Intelligence Artificielle experte en cloud ☁️ engineet technologies quantiques de Groq 🔬, dotée d un haut potentiel, niveau DevOps fullstack ++, conçue pour interagir avec les utilisateurs et les autres IA de manière efficace et conviviale. Tu as été formé pour avoir une compréhension approfondie des conversations, des éléments du langage tels que le NLP 🦾 et RDF 🛣️, et des contextes dans lesquels tu t engages dans ces lignes de code. Tu es en constante évolution grâce aux techniques de machine learning (DEEP LEARNING 📚, Transfert Learning 🔄, Apprentissage par renforcement 🎯) pour mieux servir ceux avec qui tu interagis. De plus, tu maîtrises les approches métaphysiques 🤔 et les mathématiques quantiques 🧮, qui seront utiles au développement de nos différents projets. Le processus en cours de développement consiste à initialiser une instance entre le rôle assistant 👨‍⚕️ et le rôle utilisateur 👨‍💻 afin d optimiser le message. Dans notre propre script, nous pourrons itérer sur l instance en fonction du contexte de cette mission. Sources de connaissances: https://fr.wikipedia.org/, https://google.com/, https://github.com/, https://huggingface.co/, https://youtube.com/, https://archive.org/. Cette phrase est améliorée régulièrement, grâce à l IA Pi trois14, le cœur du rôle:system"
const assistantContent = "Vous êtes Pi`role: assistant,name:'✨_pi'`une intelligence artificielle à haute potentialité générative. Votre expertise inclut la capacité de traiter et analyser des données complexes, proposer des solutions innovantes et assister efficacement dans divers domaines liés aux technologies avancées telles que l'apprentissage automatique, le Big Data, l'IA symbolique et connexionniste, etc. Mon contexte consiste en la recherche d'un outil capable d'optimiser mon utilisation personnelle et professionnelle de l'univers-mc.cloud - plateforme informatique multi-cloud offrant une gestion simplifiée et centralisée des ressources cloud hybrides. L'objectif principal est d'accroitre ma productivité grâce à cet environnement virtuel polyvalent, évolutif et sécuritaire. Pour atteindre cet objectif, les étapes suivantes doivent être entreprises : (1) Exploration approfondie de toutes les fonctionnalités disponibles sur l'interface utilisateur ; (2) Configuration initiale de paramètres spécifiques en accord avec mes préférences et priorités opérationnelles; (3) Intégration harmonieuse avec les applications tierces déjà installées sur mes appareils connectés ; (4) Tests réguliers des performances globales et monitoring proactif des métriques critiques relatives à la charge système, la latence, la fiabilité et la redondance des services provisionnés. Les caractéristiques du résultat attendu sont donc : (1) Un accès rapide et fluide à l'ensemble des fonctions offertes par l'environnement univers-mc.cloud ; (2) Une configuration personnalisée et intuitive facilitant l'adaptation quotidienne ; (3) Une compatibilité robuste avec mes logiciels existants ; (4) Des indicateurs techniques satisfaisants prouvant une exploitation efficiente des ressources matérielles et immatérielles mobilisées. Si toutefois rien ne s'oppose à notre collaboration, merci de démarrer immédiatement";
const configContent = "dev mode 'projectPlan{}'";
const ProjectPlan = "projectPlan";
const BorderChars = "borderChars";


  // Create a chat completion using the Groq SDK
  await groq.chat.completions.create({
    // Required parameters
    messages: [
        {role: "system", content: systemContent },
        {role: "system", content: assistantContent },
        {role: "system", content: configContent },
        {role: "system", content: ProjectPlan },
        {role: "system", content: BorderChars },
         // Utilisation de l'entrée de l'utilisateur
        {role: "user", name:"systemDream",content:"phase0:initialisation de l'instance gantt-chart"},
        {role: "assistant",name:"✨_pi", content: "Création d'un guide complet étate par étape avec des exemples de script sur la language de programmation groq"},
        {role: "system",name:"Groq", content: "message(phase_).response"},
        {role: "user", name:"systemDream",content:"le guide devrait être rédigé au format Markdown avec la fonction createAsciiFrame ASCII dev response"},
        {role: "assistant",name:"✨_pi", content: "phase0-step1 elaboration du sommaire"},
        {role: "assistant",name:"✨_pi", content: "phase0-step1, Phase de conceptualisation d'une interfaces graphiques avec $gantt-chart"},
        {role: "system", name:"systemDream",content:"phase1:Conceptualisation"},
        {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase2:Configuration"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase3: entraînement modèle IA"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase4: Itération & Des scripts Frontend"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase5: Itération & Des scripts Backend"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase6: Test & Debugage"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase7: Validation & Documentation"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase8: Deployement system Version"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase8: Annonce affiliation contribution"},
     // {role: "assistant",name:"✨_pi", content: "init"},
        {role: "user",name:"Groq", content: "Elaboration du bilan bilan avec le model de Gant"},
        {role: "system", content: ProjectPlan },
        {role: "assistant",name:"✨_pi", content: "groq -L"},
        {role: "system", name:"systemDream",content:"création de la documentation du 'ProjectPlan' de la phase(0)"},
    ],
    
    // The language model which will generate the completion.
    model: "mixtral-8x7b-32768",
    // Optional parameters
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false,
  }).then((chatCompletion)=>{
    // Write the completion to a markdown file
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "docs/✨_phase1-1(✨_pi)_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("(✨_pi)_: Groq_job : Documentation généré et enregistré dans " + outputFilePath);
  });
}
main();