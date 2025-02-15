    <!-- Section du héros avec le carrousel d'images -->
    <section class="hero-banner">
        <div class="carousel">
                <div class="carousel-images">
                    <?php
                    // Chemin vers le répertoire des images
                    $repertoireImages = 'data/img/hero-ban/';

                    // Ouvrir le répertoire
                    $dir = opendir($repertoireImages);

                    // Parcourir les fichiers du répertoire
                    while (($file = readdir($dir)) !== false) {
                        // Vérifier si le fichier est une image JPEG
                        if (pathinfo($file, PATHINFO_EXTENSION) === 'jpeg') {
                            // Afficher l'image
                            echo '<div class="slider">';
                            echo '<img src="' . $repertoireImages . $file . '" alt="Image">' . PHP_EOL;
                            echo '</div>';
                        }
                    }

                    // Fermer le répertoire
                    closedir($dir);
                    ?>
                </div>
            <!-- Insérez ici les images du carrousel depuis le répertoire database/rush/img/ -->
        </div>
        <button id="prevBtn">Précédent</button>
        <button id="nextBtn">Suivant</button>
    </section>