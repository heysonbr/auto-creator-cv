"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const router = useRouter();

  const labels = [
    { name: "Nombre", type: "text", required: "required" },
    { name: "Correo", type: "email", required: "required" },
    { name: "Telefono", type: "tel", required: "required" },
    { name: "Direccion", type: "text" },
    { name: "LinkedIn", type: "url" },
    { name: "Habilidades", type: "text" },
    { name: "Experiencia laboral", type: "textarea" },
    { name: "Educación", type: "textarea" },
    { name: "Información adicional", type: "textarea" },
  ];

  const [formState, setFormState] = useState({});

  const handleChange = (e, labelName) => {
    setFormState({
      ...formState,
      [labelName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guarda el estado y la hora de expiración en localStorage
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 4); // Expire después de 4 horas
    const dataToStore = {
      formState,
      expiration: expirationDate.toISOString(),
    };
    localStorage.setItem("formState", JSON.stringify(dataToStore));

    console.log(formState);
    router.push("/workoffer");
  };

  //   useEffect(() => {
  //     const savedData = JSON.parse(localStorentiage.getItem("formState"));
  //     if (savedData) {
  //       const now = new Date();
  //       const expirationDate = new Date(savedData.expiration);

  //       // Si los datos no han expirado, actualiza el estado
  //       if (now < expirationDate) {
  //         setFormState(savedData.formState);
  //       } else {
  //         // Si los datos han expirado, elimínalos de localStorage
  //         localStorage.removeItem("formState");
  //       }
  //     }
  //   }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-10 ">User Info</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        {labels.map((label, index) => (
          <label
            className="my-2 flex flex-col justify-center items-center"
            key={index}
          >
            <p className="mb-1 font-semibold  "> {label.name}:</p>

            {label.type === "textarea" ? (
              <textarea
                className="border-2 border-black rounded-lg pl-2 h-20"
                value={formState[label.name] || ""}
                onChange={(e) => handleChange(e, label.name)}
                required={label.required}
              />
            ) : (
              <input
                className="border border-black rounded-lg pl-2"
                type={label.type}
                value={formState[label.name] || ""}
                onChange={(e) => handleChange(e, label.name)}
                required={label.required}
                // placeholder={label.name}
              />
            )}
          </label>
        ))}
        <div className="flex justify-center items-center ">
          {" "}
          <button
            className="mt-5 font-bold text-2xl border rounded-lg border-black py-1 px-2"
            type="submit"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}
