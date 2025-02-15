// Générateur de Titres Dynamiques (Basé sur AlgoGenesis)

const categories = [
    "Machine Learning",
    "Développement Web",
    "IA Conversationnelle",
    "Techniques Génératives",
    "Optimisation d'Algorithmes",
    "Big Data",
    "Formation IA",
    "Bootstrap Components"
  ];
  
  const actions = [
    "Apprendre",
    "Maîtriser",
    "Créer",
    "Découvrir",
    "Explorer",
    "Optimiser",
    "Automatiser",
    "Personnaliser"
  ];
  
  const focus = [
    "les bases",
    "des projets innovants",
    "des modèles avancés",
    "une interface utilisateur efficace",
    "une architecture robuste",
    "des pipelines automatisés",
    "les techniques modernes",
    "des solutions full-stack"
  ];
  
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  function genererTitre() {
    const categorie = getRandomElement(categories);
    const action = getRandomElement(actions);
    const sujet = getRandomElement(focus);
  
    return `${action} ${sujet} en ${categorie}`;
  }
  
  // Exemple d'utilisation
  console.log("Titre généré :", genererTitre());
  