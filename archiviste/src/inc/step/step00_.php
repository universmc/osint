<div class="step00_">
<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="7" aria-label="Slide 8"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="8" aria-label="Slide 1"></button>
</div>
  
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="carousel/carousel1.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="carousel/carousel2.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="carousel/carousel4.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="carousel/carousel5.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="carousel/carousel6.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="carousel/carousel7.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="carousel/carousel8.png" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    <article class="intro-sommaire">
        
        <!-- Ajouter ici un sommaire ou une introduction à l'étape -->
        <article class="P6-kanban">
        <h3>Analyse du Kanban</h3>
        <div class="plannification-de-taches">
            <div class="P6-step-content">
                <div class="P6-step1">Phase 1 : Récupérer dynamiquement les données des travaux via l’API</div>
                <div class="P6-step2">Phase 2 : Ajouter le tri des projets par catégorie dans la galerie</div>
                <div class="P6-step3">Phase 3 : Intégrer la page de connexion pour le site</div>
                <div class="P6-step4">Phase 4 : Ajouter la modale pour gérer les projets</div>
                <div class="P6-step5">Phase 5 : Créer le formulaire pour l’ajout de projet</div>
                <div class="P6-step6">Phase 6 : Faire la version 2 de l’API</div>
                <div class="P6-step7">Phase 7 : Designer la version mobile du site de l’Architecte</div>
                <div class="P6-step7">Phase 8 : RDV Client : Présentation de la version 1 du site avec administration des projets</div>
            </div>
        </div>
    </article>
        <!-- Bouton pour ouvrir la modal -->
<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Modal 1</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Show a second modal and hide this one with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Modal 2</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Hide this modal and show the first with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first</button>
      </div>
    </div>
  </div>
</div>
<button  style="border:0; background:0; font-size: 24px; cursor: pointer;" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">📱</button>
<h2>Étape 0 : Préparation de l'Environnement</h2>
<h2>Étape 1 : Initialisation du backend nodeJS swagger</h2>
<div class="P6-backend">
            <h4>Backend</h4>
            <!-- Détails sur la configuration du backend -->
            <video width="100%" height="960" controls>
                <source src="node-server.mp4" type=video/mp4>
            </video>
            <article class="nodejs-npm">
            <div class="make-install">
            <h3>Installation de Node.js et NPM start a partir du repertoire /backend</h3>
            <pre><code>
                // Commandes pour l'installation de Node.js et NPM
            </code></pre>
            <img src="assets/img/swager.png" alt="http://localhost:5678/api-docs/">
        </div>
<h2>Étape 2 : Initialisation du frontend github io page</h2>
</article>

    <article class="P6-mission-object">
        <h3>Objectifs de la Mission</h3>
        <p>
            <!-- Inclure le texte de présentation de la mission et éventuellement une image du mail reçu -->
        </p>
    </article>

    <article class="configuration-FS">
        <h3>Configuration</h3>
        <div class="P6-frontend">
            <h4>Frontend</h4>
            <span> depot github https://github.com/universmc/PorteFolio-architecte-SB/</span>
            <span> githubPage => https://universmc.github.io/PorteFolio-architecte-SB/ </span>
            <img src="gh-p.png" alt="githubpage">
            <!-- Détails sur la configuration du frontend -->
        </div>

        </article>
</div>
