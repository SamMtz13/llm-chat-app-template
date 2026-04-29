// FUTURO: Integración con WhatsApp Business API
// Ruta prevista: POST /api/whatsapp
// Esta función recibirá mensajes del webhook de Meta y los procesará
// con la misma lógica de detección de intención y emoción.

import { Env } from "../types";

export async function handleWhatsAppWebhook(request: Request, env: Env): Promise<Response> {
  // TODO: Implementar verificación del webhook de Meta (GET)
  // TODO: Implementar recepción de mensajes (POST)
  // TODO: Reutilizar detectIntent, detectEmotion, createTicket
  // TODO: Responder via WhatsApp Business API
  throw new Error("WhatsApp integration not implemented yet");
}
