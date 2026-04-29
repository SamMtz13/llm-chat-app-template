import { Intent, Emotion, Priority } from "./detector";

export type Ticket = {
  id: string;
  conversationId: string;
  intent: Intent;
  emotion: Emotion;
  priority: Priority;
  status: "abierto" | "en_proceso" | "cerrado";
  description: string;
  createdAt: string;
};

export function shouldCreateTicket(intent: Intent, emotion: Emotion): boolean {
  if (intent === "fallas_internet" || intent === "internet_lento" || intent === "humano")
    return true;
  if (emotion === "enojado" || emotion === "frustrado") return true;
  return false;
}

export function createTicket(
  conversationId: string,
  intent: Intent,
  emotion: Emotion,
  priority: Priority,
  description: string,
): Ticket {
  return {
    id: crypto.randomUUID(),
    conversationId,
    intent,
    emotion,
    priority,
    status: "abierto",
    description,
    createdAt: new Date().toISOString(),
  };
}
