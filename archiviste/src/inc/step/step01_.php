<div class="step02_">
<article class="phase1">
<h3>phase 1 - Récupérer dynamiquement les données des travaux via l’API avec flecth</h3>

        <div class="request-backend">
        <h2>Présentation des Travaux de l'Architecte</h2>
        
            <h4>Requête Fetch :</h4>
            <p>Utilisez la méthode fetch pour envoyer une requête HTTP à l'API. Par exemple, pour récupérer les travaux depuis http://localhost:5678/api-docs/#/default/get_works, votre code ressemblera à ceci :</p>
<pre><code>
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Traitez les données ici
    })
    .catch(error => console.error('Erreur:', error));
</code></pre>
<h4>Traitement des Données :</h4>
<p>Dans .then(data => {...}), traitez les données reçues de l'API. Par exemple, vous pouvez les afficher sur votre page web ou les utiliser pour d'autres opérations.</p>
<h4>Gestion des Erreurs :</h4>
<p>Utilisez .catch(error => {...}) pour gérer les erreurs qui pourraient survenir lors de la requête.</p>
</article>

</div>