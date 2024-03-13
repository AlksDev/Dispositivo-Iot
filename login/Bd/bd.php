<?php
$pdo = null;
$host = "localhost:3308";
$user = "root";
$password = "";
$bd = "login";

function conectar(){
    global $pdo, $host, $user, $password, $bd;
    try{
        $pdo = new PDO("mysql:host=$host;dbname=$bd", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e){
        print "Error!: No se pudo conectar a la base de datos $bd<br/>";
        print "\nError!: " . $e->getMessage() . "<br/>";
        die();
    }
}

function desconectar() {
    global $pdo;
    $pdo = null;
}

function metodoGet($query){
    global $pdo;
    try{
        conectar();
        $sentencia = $pdo->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        desconectar();
        return $sentencia;
    } catch(Exception $e){
        die("Error: " . $e->getMessage());
    }
}

function metodoPost($query, $queryAutoIncrement){
    global $pdo;
    try{
        conectar();
        $sentencia = $pdo->prepare($query);
        $sentencia->execute();
        $idAutoIncrement = metodoGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);
        $resultado = array_merge($idAutoIncrement, $_POST);
        $sentencia->closeCursor();
        desconectar();
        return $resultado;
    } catch(Exception $e){
        die("Error: " . $e->getMessage());
    }
}

function metodoPut($query){
    global $pdo;
    try{
        conectar();
        $sentencia = $pdo->prepare($query);
        $sentencia->execute();
        $resultado = array_merge($_GET, $_POST);
        $sentencia->closeCursor();
        desconectar();
        return $resultado;
    } catch(Exception $e){
        die("Error: " . $e->getMessage());
    }
}

function metodoDelete($query){
    global $pdo;
    try{
        conectar();
        $sentencia = $pdo->prepare($query);
        $sentencia->execute();
        $sentencia->closeCursor();
        desconectar();
        return $_GET['id'];
    } catch(Exception $e){
        die("Error: " . $e->getMessage());
    }
}
?>
