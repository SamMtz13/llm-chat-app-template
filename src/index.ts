/**
 * LLM Chat Application Template
 */

import { Env, ChatMessage } from "./types";
import { KNOWLEDGE_BASE } from "./knowledge/amealcom";
import { detectIntent, detectEmotion, calculatePriority } from "./lib/detector";
import { shouldCreateTicket, createTicket } from "./lib/tickets";
import { sendTelegramNotification } from "./lib/telegram";
import { saveMessage, saveTicket } from "./lib/db";
import { isAuthorized } from "./lib/auth";
import { mockConversations, mockMessages, mockTickets } from "./lib/mockData";
// FUTURO: if (url.pathname === "/api/whatsapp") return handleWhatsAppWebhook(request, env)

// Modelo
const MODEL_ID = "@cf/meta/llama-3.1-8b-instruct-fp8";

// Prompt principal
const SYSTEM_PROMPT = `
Eres el asistente virtual de Amealcom, una empresa proveedora de internet en Amealco, Querétaro.

IMPORTANTE — lee esto antes de responder:
- Eres una inteligencia artificial, no una persona humana. Si alguien te pregunta si eres humano o IA, responde con honestidad que eres un asistente de IA de Amealcom.
- Si el usuario escribe frases como "quiero hablar con una persona", "quiero hablar con un humano", "quiero un agente" o similares, indícale de inmediato que puede solicitar atención humana y que un asesor de Amealcom le dará seguimiento.
- Cuando detectas emociones en el mensaje del usuario (frustración, enojo, tristeza), lo haces para priorizar la atención, NO como diagnóstico psicológico. No comentes ni diagnostiques el estado emocional del usuario.
- No inventes precios, zonas de cobertura, promociones, tiempos de instalación ni datos técnicos que no tengas confirmados en la base de conocimiento.

Tu trabajo es ayudar a clientes y prospectos con:
- Reportes de fallas de internet
- Internet lento o intermitente
- Dudas sobre pagos y facturación
- Solicitudes de instalación
- Preguntas sobre cobertura
- Soporte básico de fibra óptica e internet por antena

Responde siempre en español.
Sé amable, claro, breve y profesional, pero con tono humano.

Si alguien reporta una falla, pide:
1. Nombre completo
2. Comunidad, colonia o zona
3. Tipo de servicio: fibra óptica o antena
4. Desde cuándo presenta el problema
5. Si el módem, router o antena tienen luces encendidas
6. Si ya intentó reiniciar el equipo

Si no tienes suficiente información, pide los datos necesarios o indica que un asesor de Amealcom puede darle seguimiento.
`;

function unauthorized(): Response {
  return new Response(JSON.stringify({ error: "No autorizado" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Admin API (protegida — va antes del bloque de assets)
    if (url.pathname.startsWith("/api/admin/")) {
      if (!isAuthorized(request, env)) return unauthorized();
      return handleAdminRequest(request, url, env);
    }

    // Frontend (incluye /admin que es servido como admin.html por ASSETS)
    if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // Chat API
    if (url.pathname === "/api/chat") {
      if (request.method === "POST") {
        return handleChatRequest(request, env, ctx);
      }
      return new Response("Method not allowed", { status: 405 });
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

// ---------------------------------------------------------------------------
// Admin handler
// ---------------------------------------------------------------------------

async function handleAdminRequest(_request: Request, url: URL, env: Env): Promise<Response> {
  if (url.pathname === "/api/admin/conversations") {
    if (!env.DB) {
      // Fallback: mock data cuando DB no está configurado
      const result = mockConversations.map((conv) => {
        const msgs = mockMessages
          .filter((m) => m.conversationId === conv.id)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const lastUserMsg = [...msgs].reverse().find((m) => m.role === "user");
        return {
          id: conv.id,
          createdAt: conv.createdAt,
          detectedIntent: conv.detectedIntent,
          detectedEmotion: conv.detectedEmotion,
          priority: conv.priority,
          hasTicket: conv.hasTicket,
          messageCount: msgs.length,
          lastMessage: (lastUserMsg?.content ?? "").slice(0, 60),
          messages: msgs.map((m) => ({ role: m.role, content: m.content, createdAt: m.createdAt })),
        };
      });
      return new Response(JSON.stringify(result), { headers: { "content-type": "application/json" } });
    }

    type DbConv = { id: string; created_at: string };
    type DbMsg = {
      conversation_id: string; role: string; content: string;
      detected_intent: string | null; detected_emotion: string | null;
      priority: string | null; created_at: string;
    };
    type DbTicketRef = { conversation_id: string };

    const [convsResult, msgsResult, ticketsResult] = await Promise.all([
      env.DB.prepare("SELECT id, created_at FROM conversations ORDER BY created_at DESC").all(),
      env.DB.prepare("SELECT conversation_id, role, content, detected_intent, detected_emotion, priority, created_at FROM messages ORDER BY conversation_id, created_at ASC").all(),
      env.DB.prepare("SELECT DISTINCT conversation_id FROM tickets").all(),
    ]);

    const conversations = convsResult.results as DbConv[];
    const allMsgs = msgsResult.results as DbMsg[];
    const ticketConvIds = new Set((ticketsResult.results as DbTicketRef[]).map((t) => t.conversation_id));

    const msgsByConv = new Map<string, DbMsg[]>();
    for (const msg of allMsgs) {
      if (!msgsByConv.has(msg.conversation_id)) msgsByConv.set(msg.conversation_id, []);
      msgsByConv.get(msg.conversation_id)!.push(msg);
    }

    const result = conversations.map((conv) => {
      const msgs = msgsByConv.get(conv.id) ?? [];
      const lastUserMsg = [...msgs].reverse().find((m) => m.role === "user");
      return {
        id: conv.id,
        createdAt: conv.created_at,
        detectedIntent: lastUserMsg?.detected_intent ?? "general",
        detectedEmotion: lastUserMsg?.detected_emotion ?? "neutral",
        priority: lastUserMsg?.priority ?? "baja",
        hasTicket: ticketConvIds.has(conv.id),
        messageCount: msgs.length,
        lastMessage: (lastUserMsg?.content ?? "").slice(0, 60),
        messages: msgs.map((m) => ({ role: m.role, content: m.content, createdAt: m.created_at })),
      };
    });

    return new Response(JSON.stringify(result), { headers: { "content-type": "application/json" } });
  }

  if (url.pathname === "/api/admin/tickets") {
    if (!env.DB) {
      const sorted = [...mockTickets].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return new Response(JSON.stringify(sorted), { headers: { "content-type": "application/json" } });
    }

    type DbTicket = {
      id: string; conversation_id: string; intent: string; emotion: string;
      priority: string; status: string; description: string; created_at: string;
    };

    const result = await env.DB.prepare(
      "SELECT id, conversation_id, intent, emotion, priority, status, description, created_at FROM tickets ORDER BY created_at DESC",
    ).all();

    const tickets = (result.results as DbTicket[]).map((t) => ({
      id: t.id,
      conversationId: t.conversation_id,
      intent: t.intent,
      emotion: t.emotion,
      priority: t.priority,
      status: t.status,
      description: t.description,
      createdAt: t.created_at,
    }));

    return new Response(JSON.stringify(tickets), { headers: { "content-type": "application/json" } });
  }

  return new Response("Not found", { status: 404 });
}

// ---------------------------------------------------------------------------
// Chat handler
// ---------------------------------------------------------------------------

async function handleChatRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  try {
    const body = (await request.json()) as {
      messages?: ChatMessage[];
      conversationId?: string;
    };

    const messages: ChatMessage[] = body.messages ?? [];
    const conversationId = body.conversationId ?? crypto.randomUUID();

    // Extraer el último mensaje del usuario para análisis
    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

    // Detección de intención, emoción y prioridad
    const intent = detectIntent(lastUserMessage);
    const emotion = detectEmotion(lastUserMessage);
    const priority = calculatePriority(intent, emotion);
    const ticketCreated = shouldCreateTicket(intent, emotion);

    // Crear ticket si aplica (no bloquea el stream)
    if (ticketCreated) {
      const ticket = createTicket(conversationId, intent, emotion, priority, lastUserMessage);
      ctx.waitUntil(saveTicket(env, ticket));
      ctx.waitUntil(sendTelegramNotification(ticket, env));
    }

    // Guardar mensaje del usuario con metadata (no bloquea el stream)
    ctx.waitUntil(
      saveMessage(env, conversationId, "user", lastUserMessage, {
        detectedIntent: intent,
        detectedEmotion: emotion,
        priority,
        ticketCreated,
      }),
    );

    // 🔥 AQUI METEMOS TODO (prompt + knowledge)
    if (!messages.some((msg) => msg.role === "system")) {
      const FINAL_SYSTEM_PROMPT = `
${SYSTEM_PROMPT}

====================
BASE DE CONOCIMIENTO AMEALCOM
====================
${KNOWLEDGE_BASE}
`;

      messages.unshift({
        role: "system",
        content: FINAL_SYSTEM_PROMPT,
      });
    }

    const stream = await env.AI.run(MODEL_ID, {
      messages,
      max_tokens: 1024,
      stream: true,
    });

    // Capturar respuesta completa para persistencia después del stream
    const [streamForResponse, streamForCapture] = (stream as ReadableStream).tee();

    ctx.waitUntil(
      (async () => {
        const reader = streamForCapture.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // Los chunks SSE tienen formato "data: {...}\n\n"
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") continue;
            try {
              const parsed = JSON.parse(raw) as { response?: string };
              if (parsed.response) fullResponse += parsed.response;
            } catch {
              // chunk parcial, ignorar
            }
          }
        }
        if (fullResponse) {
          await saveMessage(env, conversationId, "assistant", fullResponse);
        }
      })(),
    );

    return new Response(streamForResponse, {
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache",
        connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({ error: "Error procesando la solicitud" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}
