<?php
// Configura la conexión a la base de datos (reemplaza con tus propias credenciales)
$servidor = "localhost:3308";
$usuario = "root";
$password = "";
$bd = "login";

// Establece la conexión
$conn = new mysqli($servidor, $usuario, $password, $bd);

// Verifica la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Query para obtener datos de la tabla lecturas_ultrasonicas
$sql = "SELECT * FROM lecturas_ultrasonicas";
$result = $conn->query($sql);

// Prepara un array para almacenar los datos
$data = array();

// Obtiene los datos de la tabla y los agrega al array
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Convierte el array a formato JSON y lo imprime
echo json_encode($data);

// Cierra la conexión a la base de datos
$conn->close();
?>
