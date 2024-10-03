import OpenAI from "openai";
import { jsPDF } from "jspdf";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { userInfo } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Eres un asistente especializado en la creación de currículums personalizados. Genera únicamente el contenido del currículum en formato profesional con base en la información proporcionada. No incluyas explicaciones ni texto adicional.`,
        },
        {
          role: "user",
          content: `Información del usuario: ${JSON.stringify(userInfo)}`,
        },
      ],
    });

    const resumeContent = completion.choices[0].message.content;

    // Crear una instancia de jsPDF
    const doc = new jsPDF();

    // Agregar estilos al PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Currículum Vitae", 105, 20, null, null, "center");

    // Dibujar una línea horizontal debajo del título
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Agregar el contenido del currículum con estilo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Dividir el contenido en líneas para que no se salga del margen
    const lines = doc.splitTextToSize(resumeContent, 180);

    // Añadir el contenido del currículum a partir de una posición específica
    doc.text(lines, 10, 40);

    // Agregar más estilos (pie de página)
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Generado automáticamente por AI", 105, 290, null, null, "center");

    // Convertir el PDF a ArrayBuffer
    const pdfArrayBuffer = doc.output("arraybuffer");

    // Convertir el ArrayBuffer a Buffer
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    // Configurar la respuesta como PDF
    res.setHeader("Content-Type", "application/pdf");
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Error comunicando con OpenAI:", error);
    res.status(500).json({
      message: "Error comunicando con OpenAI",
      details: error.message,
    });
  }
}
