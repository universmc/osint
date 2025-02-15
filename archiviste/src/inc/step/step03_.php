<div class="step03_">
    
    <section class="sommaire">
        
        <!-- Ici, nous introduirons dynamiquement le sommaire à partir de script-section.js -->
    </section>
    <section>
    <article class="login">
    <article class="login-page">
    <h2>Phase 3 : Intégrer la page de connexion pour le site</h2>
    <p>Intégration du formulaire de connexion en suivant le design de la maquette.</p>
    <div class="P6-body-content">
    <div class="P6-main">
        <form class="login-form">
            <h2>Login</h2>
            <label for="mail" id="e-mail">e-mail</label>
            <input type="email">
            <label for="pwd" id="pwd">Mot de passe</label>
            <input type="password">
            <div class="error-message" style="display: none;"></div>
            <input type="submit" value="se connecter">
            <a class="forget" href="#">Mot de passe oublié?</a>
        </form>
        
    </div>
</article>
    <h3>Authentification de l’utilisateur</h3>
    <p>Mise en place de l'authentification utilisateur en utilisant AJAX pour envoyer les données du formulaire via une requête POST.</p>
</article>
<article class="login-explication">
    <h3>Explication en détail du script.js</h3>
    <p>En cas de succès de la connexion, redirection vers la page d'accueil et stockage du token. Affichage d'un message d'erreur en cas de données incorrectes.</p>
    <p>Validation du formulaire avant envoi pour une meilleure expérience utilisateur.</p>
</article>

</div>
<script src="PorteFolio-architecte-SB/assets/login.js"></script>
</section>
</div>