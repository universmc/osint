const fs = require("fs");
const { Telegraf } = require('telegraf');
const axios = require('axios');
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// _GAN_ modèles d'IA
const GanModel = {
  "Mistral": {
    "model": "mixtral-8x7b-32768",
    "temperature": 0.5,
    "max_tokens": 4096,
    "top_p": 1,
    "stream": "True",
    "stop": "None"
  },
  "llma": {
    "model": "llama3-8b-8192",
    "temperature": 0.5,
    "max_tokens": 4096,
    "top_p": 1,
    "stream": "True",
    "stop": "None"
  }
};

const TOPIC = process.argv[2] || 'Vidéo_algorithmique_Deep Learning'; // Obtenir le sujet via l'argument de ligne de commande

const ressource = {
  "theme": "Vidéo algorithmique sur l'intelligence artificielle et le deep learning",
  "duration": "14 minutes",
  "description": "Cette vidéo algorithmique explore les techniques d'intelligence artificielle, de deep learning, et les méthodes d'apprentissage automatique. L'objectif est de présenter ces concepts à travers des exemples concrets en utilisant le GROQ-SDK, et de mettre en évidence les implications et les avantages de ces technologies.",
  "segments": [
    {
      "titre": "Introduction à l'IA et au Deep Learning",
      "description": "Présentation des concepts de base de l'intelligence artificielle et du deep learning, ainsi que de leurs applications."
    },
    {
      "titre": "Techniques d'Apprentissage Automatique",
      "description": "Discussion sur les différentes techniques d'apprentissage automatique, y compris l'apprentissage supervisé, non supervisé et par renforcement."
    },
    {
      "titre": "Utilisation du GROQ-SDK",
      "description": "Présentation du GROQ-SDK et de son rôle dans l'optimisation des modèles d'IA pour les applications concrètes."
    },
    {
      "titre": "Cas d'Usage et Démonstration",
      "description": "Exemples pratiques de modèles de deep learning appliqués à des problématiques réelles, illustrant les avantages de ces technologies."
    }
  ],
  "updateLocation": "Mise à jour quotidienne sur GitHub (https://github.com/universmc/Chronique_EMP)"
};

const chapitres = [
  {
    "titre": "Introduction à l'IA et au Deep Learning",
    "sections": [
      {
        "titre": "Concepts de Base",
        "segments": [
          {
            "timestamp": "00:00:10",
            "description": "Présentation des concepts de base de l'intelligence artificielle et de ses principales applications."
          },
          {
            "timestamp": "00:01:30",
            "description": "Introduction au deep learning et aux réseaux neuronaux."
          }
        ]
      }
    ]
  },
  {
    "titre": "Techniques d'Apprentissage Automatique",
    "sections": [
      {
        "titre": "Apprentissage Supervisé et Non Supervisé",
        "segments": [
          {
            "timestamp": "00:03:00",
            "description": "Explication des techniques d'apprentissage supervisé et non supervisé."
          }
        ]
      },
      {
        "titre": "Apprentissage par Renforcement",
        "segments": [
          {
            "timestamp": "00:05:00",
            "description": "Présentation de l'apprentissage par renforcement et de ses applications."
          }
        ]
      }
    ]
  },
  {
    "titre": "Utilisation du GROQ-SDK",
    "sections": [
      {
        "titre": "Optimisation des Modèles d'IA",
        "segments": [
          {
            "timestamp": "00:07:00",
            "description": "Présentation du GROQ-SDK et comment il aide à optimiser les modèles d'IA."
          }
        ]
      }
    ]
  },
  {
    "titre": "Cas d'Usage et Démonstration",
    "sections": [
      {
        "titre": "Exemples Pratiques",
        "segments": [
          {
            "timestamp": "00:09:00",
            "description": "Démonstration d'un modèle de deep learning appliqué à la reconnaissance d'image."
          }
        ]
      }
    ]
  }
];

const TOPICS = [
  "Vidéo_algorithmique_IA",
  "Apprentissage_Automatique_DeepLearning",
  "Introduction_GROQ_SDK",
  "Applications_Pratiques_IA",
  "Techniques_Du_Machine_Learning"
  // Ajoutez autant de sujets que vous le souhaitez
];

function generateMarkdown(subject) {
  return `## Comment [${subject}] - Un guide étape par étape

**Introduction**:

Ce guide vous aidera à comprendre et à réaliser [${subject}]. Il est conçu pour les débutants et les utilisateurs intermédiaires qui souhaitent apprendre les bases de [${subject}].

${ressource.description}

**Chapitres**:

${chapitres.map(chapitre => `### ${chapitre.titre}

${chapitre.sections.map(section => `#### ${section.titre}

${section.segments.map(segment => `- **${segment.timestamp}**: ${segment.description}`).join('\n')}`).join('\n\n')}`).join('\n\n')}

**Prérequis**:

* [Liste des prérequis nécessaires pour suivre ce guide, par exemple: une connexion internet, un compte sur une plateforme spécifique, etc.]

**Étapes**:

1. **[Étape 1]:**
   * Décrivez en détail l'étape 1, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

2. **[Étape 2]:**
   * Décrivez en détail l'étape 2, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

3. **[Étape 3]:**
   * Décrivez en détail l'étape 3, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

**Conseils**:

* [Ajoutez des conseils utiles pour réaliser [${subject}] avec succès.]

**Ressources supplémentaires**:

* [Listez des liens vers des ressources supplémentaires, telles que des tutoriels, des articles de blog ou des forums, qui peuvent être utiles aux utilisateurs.]`;
}

async function main() {
  for (const TOPIC of TOPICS) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "Vous êtes deux IA collaboratives. Mistral et Llma, vous allez générer une vidéo de 14 minutes présentant un sujet donné sous forme de chronique algorithmique sur l'intelligence artificielle, le deep learning, et les techniques d'apprentissage automatique en utilisant le GROQ-SDK." },
          { role: "user", content: `Sujets: ${TOPICS}` },
          { role: "system", content: `${JSON.stringify(ressource)}` },
          { role: "assistant", content: "Imaginez une vidéo qui explore les techniques d'intelligence artificielle, de deep learning, et de machine learning en utilisant des exemples concrets. Décomposez la vidéo en séquences pour une meilleure compréhension." },
          { role: "user", content: TOPIC },
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 406
      });
      const mdContent = completion.choices[0]?.message?.content;
      const outputFilePath = `build/Chronique_${TOPIC}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
      fs.writeFileSync(outputFilePath, mdContent);
      console.log(`Le How-To sur ${TOPIC} a été enregistré sur GitHub dans ${outputFilePath}`);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }
}

main();