<div class="step02_">
<article class="affichage">
    <h3>Phase 2 : Ajouter le tri des projets par catégorie dans la galerie</h3>
    <h4>Gallery</h4>
    <div class="P6-btn-filtre-contenair">
			<button class="btn-filtres" id="btn-filtre-all">Tous</button>
			<button class="btn-filtres" id="btn-filtre-objects">objects</button>
			<button class="btn-filtres" id="btn-filtre-appartements">Appartements</button>
			<button class="btn-filtres" id="btn-filtre-hotel-restaurant">Hôtels & restaurants</button>
		</div>
    <div class="gallery">
    <!-- Les éléments de la galerie seront ajoutés ici dynamiquement via JavaScript -->
    </div>
</article>

<article class="explication-filtre">
    <h2>Explication du Script de Filtrage</h2>

    <h3>1. Récupération et Affichage Initial des Travaux</h3>
    <pre><code>
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            arrayWorks = data;
            addWorksToGallery(arrayWorks);
        })
        .catch(error => console.error('Erreur:', error));
    </code></pre>
    <p>Explication: Ce bloc de code utilise 'fetch' pour récupérer les travaux depuis l'API, les stocke dans 'arrayWorks', puis les affiche initialement dans la galerie.</p>
    <!-- Explications pour la Fonction d'ajout dans la Galerie -->
<h3>2. Fonction pour Ajouter les Travaux à la Galerie</h3>
<pre><code>
function addWorksToGallery(works) {
    gallery.innerHTML = '';
    works.forEach(work => {
        // ... code pour créer et ajouter chaque élément de travail
    });
}
</code></pre>
<p>Explication : Cette fonction vide d'abord la galerie, puis utilise une boucle 'forEach' pour créer et ajouter un élément HTML pour chaque travail dans 'works'.</p>

<!-- Explications pour la Fonction de Filtrage -->
<h3>3. Fonction pour Filtrer les Travaux par Catégorie</h3>
<pre><code>
function filterWorksByCategory(categoryId) {
    const filteredWorks = arrayWorks.filter(work => work.category.id === categoryId);
    addWorksToGallery(filteredWorks);
}
</code></pre>
<p>Explication : Cette fonction filtre 'arrayWorks' pour les travaux correspondant à l'ID de catégorie donné, puis met à jour la galerie avec ces travaux filtrés.</p>

<!-- Explications pour les Écouteurs d'Événements -->
<h3>4. Écouteurs d'Événements pour les Boutons</h3>
<pre><code>
btnAll.addEventListener('click', () => addWorksToGallery(arrayWorks));
// ... code pour les autres boutons
</code></pre>
<p>Explication : Des écouteurs d'événements sont ajoutés à chaque bouton. Lorsqu'un bouton est cliqué, il appelle la fonction correspondante pour filtrer et afficher les travaux.</p>
<!-- Explication de la Récupération Initiale des Travaux -->
<h3>5. Récupération et Affichage Initial des Travaux</h3>
<pre><code>
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        arrayWorks = data;
        addWorksToGallery(arrayWorks);
    })
    .catch(error => console.error('Erreur:', error));
</code></pre>
<p>Explication : Ce segment de code réalise une requête 'fetch' pour obtenir les données des travaux depuis l'API. Après avoir reçu les données, il les stocke dans 'arrayWorks' et appelle 'addWorksToGallery' pour afficher initialement tous les travaux dans la galerie.</p>

<!-- Conclusion -->
<p>Ces explications détaillent chaque étape du processus de filtrage des travaux de l'architecte dans la galerie, en commençant par la récupération des données, le traitement et l'affichage de ces données, et en finissant par la mise en place du système de filtrage par catégorie.</p>

    <!-- Continuez avec des explications similaires pour chaque partie du script -->
</article>

