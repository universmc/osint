<main>
<div class="galery">
<?php
$directory = "data/webp/"; // Remplacez par le chemin réel du répertoire d'images
$images = glob($directory . "*.webp"); // Cherche les fichiers .webp

foreach($images as $image) {
    $promptFile = str_replace(".webp", ".txt", $image); // Remplace l'extension .webp par .txt
    $prompt = file_exists($promptFile) ? file_get_contents($promptFile) : "Prompt non disponible";

    echo "<div class='image'>";
    echo "<img src='" . $image . "' alt='Image générée'>";
    echo "<p>" . htmlspecialchars($prompt) . "</p>"; // Affiche le prompt sous l'image
    echo "</div>";
}
?>
</div>
</main>
