"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [savedData, setSavedData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("formState");
    if (!data) {
      router.push("/");
      return;
    }

    const parsedData = JSON.parse(data);
    const now = new Date();
    const expirationDate = new Date(parsedData.expiration);

    // Si los datos no han expirado, actualiza el estado
    if (now < expirationDate) {
      setSavedData(parsedData.formState);
    } else {
      // Si los datos han expirado, elimínalos de localStorage
      localStorage.removeItem("formState");
      router.push("/");
    }
    console.log(data);
  }, [router]);

  const handleDelete = () => {
    localStorage.removeItem("formState");
    setSavedData({});
    router.push("/");
  };

  console.log(savedData);

  return (
    <div>
      <h2>{savedData.Nombre}</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
