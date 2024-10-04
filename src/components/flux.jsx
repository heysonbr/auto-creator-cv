export async function enviarInformacionUsuario(userInfo) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ userInfo }),
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://localhost:3000/api/chat",
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Si la respuesta es un PDF, devolvemos un blob
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/pdf")) {
      const blob = await response.blob();
      return blob;
    }

    // Si no es un PDF, asumimos que es JSON
    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}
