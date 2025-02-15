document.addEventListener('DOMContentLoaded', function() {
    fetch('src/json/coursData.json')
        .then(response => response.json())
        .then(cours => {
            const sommaire = document.getElementById('sommaire');
            const contenuCours = document.getElementById('contenuCours');

            cours.forEach((section, index) => {
                // Créer le lien du sommaire
                let sommaireItem = document.createElement('a');
                sommaireItem.href = `#section${index}`;
                sommaireItem.textContent = section.titre;
                sommaireItem.classList.add('sommaire-link');
                sommaire.appendChild(sommaireItem);

                // Créer la section principale
                let sectionDiv = document.createElement('div');
                sectionDiv.id = `section${index}`;
                sectionDiv.classList.add('section');

                let titreSection = document.createElement('h2');
                titreSection.textContent = section.titre;
                sectionDiv.appendChild(titreSection);

                section.sousSections.forEach(sousSection => {
                    let sousSectionDiv = document.createElement('div');
                    sousSectionDiv.classList.add('sous-section');

                    let sousTitre = document.createElement('h3');
                    sousTitre.textContent = sousSection.sousTitre;
                    sousSectionDiv.appendChild(sousTitre);

                    if (sousSection.contenuMarkdown) {
                        fetch(sousSection.contenuMarkdown)
                            .then(responseMd => responseMd.text())
                            .then(markdown => {
                                let contenu = document.createElement('div');
                                contenu.className = 'markdown-contenu';
                                contenu.innerHTML = marked.parse(markdown);
                                sousSectionDiv.appendChild(contenu);
                            });
                    } else {
                        let contenu = document.createElement('p');
                        contenu.innerHTML = sousSection.contenu;
                        sousSectionDiv.appendChild(contenu);
                    }

                    sectionDiv.appendChild(sousSectionDiv);
                });

                contenuCours.appendChild(sectionDiv);
            });
        });
});
