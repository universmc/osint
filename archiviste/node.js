// Fonction pour exécuter une commande Bash depuis JavaScript
function executeBashCommand(command) {
    // Utiliser une bibliothèque comme 'child_process' pour exécuter des commandes système
    const { exec } = require('child_process');
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de la commande : ${error}`);
        return;
      }
      console.log(`stdout : ${stdout}`);
      console.error(`stderr : ${stderr}`);
    });
  }
  
  // Exemples d'utilisation :
  
  // Ouvrir un fichier dans Vim
  executeBashCommand('vim build.sh');
  
  // Exécuter un script Bash
  executeBashCommand('./build.sh');
  
  // Créer un raccourci personnalisé (simulé en JavaScript, car spécifique à Vim)
  // Dans votre fichier .vimrc, ajoutez : map <F5> :!make<CR>
  
  // Simuler un mapping de clé pour exécuter une commande Bash depuis Vim
  // (Ceci nécessite une interface avec Vim, ce qui est hors du cadre de ce code)
  // function executeVimMapping(mapping) {
  //   // ... (Code pour simuler l'appui sur une touche dans Vim)
  // }
  // executeVimMapping('<F5>');