<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Resultados del Catálogo - EcoRead (Parte Jenner Daniel Villarreal)</title>
</head>
<body>
    <!-- Parte realizada por: Jenner Daniel Villarreal Cascante -->
    <h1>Resultados de Búsqueda - EcoRead</h1>
    <h2>Responsable: Jenner Daniel Villarreal Cascante</h2>

    <?php
    // Capturamos los datos enviados por el formulario mediante variables
    $busqueda_titulo = isset($_GET['titulo']) ? trim($_GET['titulo']) : "";
    $filtro_categoria = isset($_GET['categoria']) ? $_GET['categoria'] : "";
    $filtro_condicion = isset($_GET['condicion']) ? $_GET['condicion'] : "";

    // Simulación del catálogo de libros y materiales disponibles
    $catalogo = [
        ["titulo" => "Programación Web con PHP", "categoria" => "Informatica", "condicion" => "Excelente", "autor" => "Carlos Pérez"],
        ["titulo" => "Matemáticas Discretas", "categoria" => "Matematicas", "condicion" => "Nuevo", "autor" => "Ana Gómez"],
        ["titulo" => "Estructuras de Datos", "categoria" => "Informatica", "condicion" => "Usado", "autor" => "Luis Rojas"],
        ["titulo" => "Cien Años de Soledad", "categoria" => "Literatura", "condicion" => "Excelente", "autor" => "Gabriel García Márquez"],
        ["titulo" => "Introducción a la Física", "categoria" => "Ciencias", "condicion" => "Nuevo", "autor" => "Marie Curie"]
    ];

    echo "<p>Criterios de búsqueda: <strong>" . ($busqueda_titulo == "" ? "Todos" : htmlspecialchars($busqueda_titulo)) . "</strong></p>";
    echo "<hr>";

    $contador_resultados = 0;

    foreach ($catalogo as $item) {
        $coincide_titulo = true;
        $coincide_categoria = true;
        $coincide_condicion = true;

        if ($busqueda_titulo != "") {
            if (stripos($item["titulo"], $busqueda_titulo) === false) {
                $coincide_titulo = false;
            }
        }

        if ($filtro_categoria != "") {
            if ($item["categoria"] !== $filtro_categoria) {
                $coincide_categoria = false;
            }
        }

        if ($filtro_condicion != "") {
            if ($item["condicion"] !== $filtro_condicion) {
                $coincide_condicion = false;
            }
        }

        if ($coincide_titulo && $coincide_categoria && $coincide_condicion) {
            $contador_resultados++;
            echo "<div>";
            echo "<h3>" . $item["titulo"] . "</h3>";
            echo "<p><strong>Autor:</strong> " . $item["autor"] . "<br>";
            echo "<strong>Categoría:</strong> " . $item["categoria"] . "<br>";
            echo "<strong>Condición:</strong> " . $item["condicion"] . "</p>";
            echo "</div><hr>";
        }
    }

    if ($contador_resultados == 0) {
        echo "<p>No se encontraron libros o materiales que coincidan con los filtros seleccionados.</p>";
    } else {
        echo "<p>Se encontraron $contador_resultados resultado(s).</p>";
    }
    ?>

    <br>
    <a href="catalogo.html">Realizar otra búsqueda</a>
</body>
</html>
