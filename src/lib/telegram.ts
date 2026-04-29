import { Ticket } from "./tickets";
import { Env } from "../types";

export async function sendTelegramNotification(ticket: Ticket, env: Env): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  const text =
    `🚨 Nuevo Ticket Amealcom\n\n` +
    `🆔 ID: ${ticket.id}\n` +
    `📋 Intención: ${ticket.intent}\n` +
    `😤 Emoción: ${ticket.emotion}\n` +
    `⚡ Prioridad: ${ticket.priority}\n` +
    `📝 Descripción: ${ticket.description}\n` +
    `🕐 Creado: ${ticket.createdAt}`;

  try {
    await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
      },
    );
  } catch (err) {
    console.error("Error enviando notificación a Telegram:", err);
  }
}
