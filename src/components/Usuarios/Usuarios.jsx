import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

function Usuarios() {
  const baseUrl = "http://localhost:80/login/index.php";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    id: "",
    usuario: "",
    clave: "",
    nombre: "",
    apellidos: "",
    idTipoUsuario: ""
  });

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
    setFrameworkSeleccionado({
      id: '',
      usuario: '',
      clave: '',
      nombre: '',
      apellidos: '',
      idTipoUsuario: ''
    });
  };

  const peticionGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPost = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", frameworkSeleccionado.nombre);
      formData.append("apellidos", frameworkSeleccionado.apellidos);
      formData.append("usuario", frameworkSeleccionado.usuario);
      formData.append("clave", frameworkSeleccionado.clave);
      formData.append("idTipoUsuario", frameworkSeleccionado.idTipoUsuario);
      formData.append("METHOD", "POST");

      const response = await axios.post(baseUrl, formData);
      setData([...data, response.data]);
      abrirCerrarModalInsertar();
    } catch (error) {
      console.log(error);
    }
  };

  const peticionPut = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", frameworkSeleccionado.nombre);
      formData.append("apellidos", frameworkSeleccionado.apellidos);
      formData.append("usuario", frameworkSeleccionado.usuario);
      formData.append("clave", frameworkSeleccionado.clave);
      formData.append("idTipoUsuario", frameworkSeleccionado.idTipoUsuario);
      formData.append("METHOD", "PUT");

      await axios.post(baseUrl, formData, { params: { id: frameworkSeleccionado.id } });

      setData(data.map((framework) =>
        framework.id === frameworkSeleccionado.id
          ? { ...framework, ...frameworkSeleccionado }
          : framework
      ));
      abrirCerrarModalEditar();
    } catch (error) {
      console.log(error);
    }
  };

  const peticionDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("METHOD", "DELETE");

      await axios.post(baseUrl, formData, { params: { id: frameworkSeleccionado.id } });

      setData(data.filter((framework) => framework.id !== frameworkSeleccionado.id));
      abrirCerrarModalEliminar();
    } catch (error) {
      console.log(error);
    }
  };

  const seleccionarFramework = (framework, caso) => {
    setFrameworkSeleccionado(framework);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    peticionGet();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <button className="btn btn-success" onClick={abrirCerrarModalInsertar}>
        Insertar
      </button>

      <br /> <br />
      <div className="table-responsive">
        <table className="table table-striped" style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Tipo de Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((framework) => (
              <tr key={framework.id}>
                <td>{framework.id}</td>
                <td>{framework.usuario}</td>
                <td>{framework.clave}</td>
                <td>{framework.nombre}</td>
                <td>{framework.apellidos}</td>
                <td>{framework.idTipoUsuario}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => seleccionarFramework(framework, "Editar")}>
                    Editar
                  </button>{" "}
                  <button className="btn btn-danger" onClick={() => seleccionarFramework(framework, "Eliminar")}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalInsertar}>
  <ModalHeader>Insertar nuevo usuario</ModalHeader>
  <ModalBody>
    <div className="form-group">
      <label>Usuario:</label>
      <br />
      <input
        type="text"
        className="form-control"
        name="usuario"
        onChange={handleChange}
        value={''}
      />
      <label>Clave:</label>
      <br />
      <input
        type="password"
        className="form-control"
        name="clave"
        onChange={handleChange}
        value={''}
      />
      <label>Nombre:</label>
      <br />
      <input
        type="text"
        className="form-control"
        name="nombre"
        onChange={handleChange}
        value={''}
      />
      <label>Apellidos:</label>
      <br />
      <input
        type="text"
        className="form-control"
        name="apellidos"
        onChange={handleChange}
        value={''}
      />
        <label>Tipo de Usuario:</label>
      <br />
      <input
        type="number"
        className="form-control"
        name="idTipoUsuario"
        onChange={handleChange}
        value={''}
      />
    </div>
  </ModalBody>
  <ModalFooter>
    <button className="btn btn-primary" onClick={() => peticionPost()}>
      Insertar
    </button>{" "}
    <button
      className="btn btn-danger"
      onClick={() => abrirCerrarModalInsertar()}
    >
      Cancelar
    </button>
  </ModalFooter>
</Modal>

      {/* Resto del código para los modales */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Usuario:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="usuario"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.usuario}
            />
            <br />
            <label>Clave:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="clave"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.clave}
            />
            <br />
            <label>Nombre:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.nombre}
            />
            <br />
            <label>Apellidos:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="apellidos"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.apellidos}
            />
            <br />
            <label>ID Tipo de Usuario:</label>
            <br />
            <input
              type="number"
              className="form-control"
              name="idTipoUsuario"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.idTipoUsuario}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            Guardar cambios
          </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estas seguro de elimar el registro {frameworkSeleccionado && frameworkSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()} >SI</button>
          <button className="btn btn-secondary" onClick={() => abrirCerrarModalEliminar()}>NO</button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Usuarios;
