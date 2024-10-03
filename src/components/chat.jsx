"use client";
import React, { useState } from "react";

function ResumeForm() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [educacion, setEducacion] = useState("");
  const [informacionAdicional, setInformacionAdicional] = useState("");
  const [nombreDeLaEmpresa, setNombreDeLaEmpresa] = useState("");
  const [cargoOfrecido, setCargoOfrecido] = useState("");
  const [requisitosDelPuesto, setRequisitosDelPuesto] = useState("");
  const [palabrasClave, setPalabrasClave] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInfo = {
      nombre,
      direccion,
      telefono,
      correoElectronico,
      linkedin,
      habilidades,
      experiencia,
      educacion,
      informacionAdicional,
      nombreDeLaEmpresa,
      cargoOfrecido,
      requisitosDelPuesto,
      palabrasClave,
    };

    console.log(userInfo);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ userInfo }),
    };

    fetch("/api/chat", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Error al generar el currículum");
        }
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resume.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre completo:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>
      <label>
        Dirección:
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </label>
      <label>
        Correo electrónico:
        <input
          type="email"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
        />
      </label>
      <label>
        LinkedIn:
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </label>
      <label>
        Habilidades:
        <input
          type="text"
          value={habilidades}
          onChange={(e) => setHabilidades(e.target.value)}
        />
      </label>
      <label>
        Experiencia laboral:
        <textarea
          value={experiencia}
          onChange={(e) => setExperiencia(e.target.value)}
        />
      </label>
      <label>
        Educación:
        <textarea
          value={educacion}
          onChange={(e) => setEducacion(e.target.value)}
        />
      </label>
      <label>
        Información adicional:
        <textarea
          value={informacionAdicional}
          onChange={(e) => setInformacionAdicional(e.target.value)}
        />
      </label>
      <label>
        Nombre de la empresa:
        <input
          type="text"
          value={nombreDeLaEmpresa}
          onChange={(e) => setNombreDeLaEmpresa(e.target.value)}
        />
      </label>
      <label>
        Cargo ofrecido:
        <input
          type="text"
          value={cargoOfrecido}
          onChange={(e) => setCargoOfrecido(e.target.value)}
        />
      </label>
      <label>
        Requisitos del puesto:
        <textarea
          value={requisitosDelPuesto}
          onChange={(e) => setRequisitosDelPuesto(e.target.value)}
        />
      </label>
      <label>
        Palabras clave:
        <input
          type="text"
          value={palabrasClave}
          onChange={(e) => setPalabrasClave(e.target.value)}
        />
      </label>
      <button type="submit">Generar currículum</button>
    </form>
  );
}

export default ResumeForm;
