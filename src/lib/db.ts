import { Ticket } from "./tickets";
import { Intent, Emotion, Priority } from "./detector";
import { Env } from "../types";

export async function saveConversation(
  env: Env,
  conversationId: string,
  metadata: object,
): Promise<void> {
  if (!env.DB) return;
  await env.DB.prepare(
    "INSERT OR IGNORE INTO conversations (id, metadata, created_at) VALUES (?, ?, ?)",
  ).bind(conversationId, JSON.stringify(metadata), new Date().toISOString()).run();
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
  if (!env.DB) return;
  // Ensure conversation row exists before inserting message (FK constraint)
  await env.DB.prepare(
    "INSERT OR IGNORE INTO conversations (id, metadata, created_at) VALUES (?, ?, ?)",
  ).bind(conversationId, "{}", new Date().toISOString()).run();

  await env.DB.prepare(
    `INSERT INTO messages
       (id, conversation_id, role, content,
        detected_intent, detected_emotion, priority, ticket_created, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    crypto.randomUUID(),
    conversationId,
    role,
    content,
    metadata?.detectedIntent ?? null,
    metadata?.detectedEmotion ?? null,
    metadata?.priority ?? null,
    metadata?.ticketCreated ? 1 : 0,
    new Date().toISOString(),
  ).run();
}

export async function saveTicket(env: Env, ticket: Ticket): Promise<void> {
  if (!env.DB) return;
  await env.DB.prepare(
    `INSERT INTO tickets
       (id, conversation_id, intent, emotion, priority, status, description, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    ticket.id,
    ticket.conversationId,
    ticket.intent,
    ticket.emotion,
    ticket.priority,
    ticket.status,
    ticket.description,
    ticket.createdAt,
  ).run();
}
