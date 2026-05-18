import { ChatMessage } from "../types";
import { Lead } from "./telegram";

function normLower(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function extractLeadFromHistory(messages: ChatMessage[], conversationId: string): Lead {
  let nombre = "No proporcionado";
  let telefono = "No proporcionado";
  let colonia = "No proporcionado";
  let tipoServicio = "No proporcionado";

  try {
    const turns = messages.filter((m) => m.role === "user" || m.role === "assistant");

    for (let i = 0; i < turns.length - 1; i++) {
      const msg = turns[i];
      if (msg.role !== "assistant") continue;
      const t = normLower(msg.content);
      const next = turns[i + 1];
      if (!next || next.role !== "user") continue;
      const answer = next.content.trim();

      if (t.includes("nombre completo")) {
        nombre = answer;
      } else if (t.includes("telefono") || t.includes("numero de telefono") || t.includes("numero de contacto")) {
        telefono = answer;
      } else if (t.includes("colonia") || t.includes("municipio")) {
        colonia = answer;
      } else if (t.includes("tipo de servicio") || t.includes("fibra optica") || t.includes("inalambrico")) {
        tipoServicio = answer;
      }
    }
  } catch {
    // silencioso — retorna con lo extraído hasta el momento
  }

  return {
    nombre,
    telefono,
    colonia,
    tipoServicio,
    conversationId,
    fechaHora: new Date().toISOString(),
  };
}
