<?php

include 'Bd/bd.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from usuarios where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from usuarios";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $usuario=$_POST['usuario'];
    $clave = password_hash($_POST['clave'], PASSWORD_DEFAULT);
    $nombre=$_POST['nombre'];
    $apellidos=$_POST['apellidos'];
    $idTipoUsuario =$POST['idTipoUsuario'];

    $query="insert into usuarios(usuario, clave, nombre, apellidos, idTipoUsuario) values ('$usuario', '$clave', '$nombre' , '$apellidos', '$idTipoUsuario')";
    $queryAutoIncrement="select MAX(id) as id from usuarios";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $usuario=$_POST['usuario'];
    $clave=$_POST['clave'];
    $nombre=$_POST['nombre'];
    $apellidos=$_POST['apellidos'];
    $idTipoUsuario =$POST['idTipoUsuario'];
    $query="UPDATE usuarios SET usuario='$usuario', clave='$clave', nombre='$nombre',apellidos='$apellidos', idTipoUsuario = '$idTipoUsuario' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM usuarios WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>