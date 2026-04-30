// TODO: Agregar en wrangler.jsonc:
// "d1_databases": [{ "binding": "DB", "database_name": "amealcom", "database_id": "TU_ID" }]
// Variables de entorno requeridas en el dashboard de Cloudflare:
// TELEGRAM_BOT_TOKEN
// TELEGRAM_CHAT_ID
// ADMIN_PASSWORD

import { Ticket } from "./tickets";
import { Intent, Emotion, Priority } from "./detector";
import { Env } from "../types";

export async function saveConversation(
  env: Env,
  conversationId: string,
  metadata: object,
): Promise<void> {
  // D1: INSERT INTO conversations (id, metadata, created_at) VALUES (?, ?, ?)
}

export async function saveMessage(
  env: Env,
  conversationId: string,
  role: string,
  content: string,
  metadata?: {
    detectedIntent?: Intent;
    detectedEmotion?: Emotion;
    priority?: Priority;
    ticketCreated?: boolean;
  },
): Promise<void> {
  // D1:
  // INSERT INTO messages (id, conversation_id, role, content, detected_intent, detected_emotion, priority, ticket_created, created_at)
  // VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
}

export async function saveTicket(env: Env, ticket: Ticket): Promise<void> {
  // D1: INSERT INTO tickets (id, conversation_id, intent, emotion, priority, status, description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
}
