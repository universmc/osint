const fs = require('fs');

// Charger le fichier JSON contenant les maquettes du site web
const data = JSON.parse(fs.readFileSync('/SiteWebMakers/custum.json', 'utf-8'));

// Fonction pour générer des sections HTML à partir des maquettes JSON
function generateSection(section) {
  let sectionHTML = `<section id="${section.id}" class="section">`;

  sectionHTML += `<h2>${section.title}</h2>`;
  sectionHTML += `<p>${section.description}</p>`;

  section.components.forEach(component => {
    sectionHTML += generateComponent(component);
  });

  sectionHTML += `</section>`;
  return sectionHTML;
}

// Fonction pour générer chaque composant (article) HTML
function generateComponent(component) {
  let componentHTML = `<article id="${component.id}">`;

  componentHTML += `<header><h3>${component.content.header}</h3></header>`;
  componentHTML += `<p>${component.content.paragraph}</p>`;

  if (component.layout.grid) {
    componentHTML = `<div class="grid" style="grid-template-columns: repeat(${component.layout.columns}, 1fr);">${componentHTML}</div>`;
  }

  componentHTML += `</article>`;
  return componentHTML;
}

// Générer tout le HTML à partir du JSON et sauvegarder dans un fichier
function generateWebPageFromMaquettes() {
  let htmlContent = '';
  data.sections.forEach(section => {
    htmlContent += generateSection(section);
  });

  const outputFilePath = '/SiteWebMakers/generated_website.html';
  fs.writeFileSync(outputFilePath, htmlContent);
  console.log(`Le site web a été généré dans ${outputFilePath}`);
}

generateWebPageFromMaquettes();
