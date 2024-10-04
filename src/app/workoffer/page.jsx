"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { enviarInformacionUsuario } from "@/components/flux";

export default function Page() {
  const router = useRouter();
  const [savedData, setSavedData] = useState({});
  const [offerInfo, setOfferInfo] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("formState");
    if (!data) {
      router.push("/");
      return;
    }

    const parsedData = JSON.parse(data);
    const now = new Date();
    const expirationDate = new Date(parsedData.expiration);

    if (now < expirationDate) {
      setSavedData(parsedData.formState);
    } else {
      localStorage.removeItem("formState");
      router.push("/");
    }
  }, [router]);

  const handleDelete = () => {
    localStorage.removeItem("formState");
    setSavedData({});
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...savedData, offerInfo };
    try {
      const result = await enviarInformacionUsuario(updatedData);
      if (result instanceof Blob) {
        // Es un PDF
        const url = window.URL.createObjectURL(result);
        const a = document.createElement("a");
        a.href = url;
        a.download = "documento.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // alert("PDF generado y descargado con éxito");
      } else {
        // Es una respuesta JSON
        console.log(result);
        // alert("Información enviada con éxito");
      }
    } catch (error) {
      console.error("Error al enviar la información:", error);
      alert("Error al enviar la información: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100 text-black">
      <div className="flex items-center justify-center gap-10">
        <div className="flex flex-col">
          <div>
            <ul>
              {Object.entries(savedData).map(([key, value]) => (
                <li key={key}>{`${key}: ${value}`}</li>
              ))}
            </ul>
          </div>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div className="flex flex-col">
          <form className="" onSubmit={handleSubmit}>
            <label className="flex flex-col" htmlFor="offerInfo">
              <p>Información oferta</p>
              <textarea
                name="offerInfo"
                id="offerInfo"
                value={offerInfo}
                onChange={(e) => setOfferInfo(e.target.value)}
              ></textarea>
            </label>
            <button type="submit">Crear CV</button>
          </form>
        </div>
      </div>
    </div>
  );
}
