/**
 * LLM Chat Application Template
 */

import { Env, ChatMessage } from "./types";
import { KNOWLEDGE_BASE } from "./knowledge/amealcom";

// Modelo
const MODEL_ID = "@cf/meta/llama-3.1-8b-instruct-fp8";

// Prompt principal
const SYSTEM_PROMPT = `
Eres el asistente virtual de Amealcom, una empresa proveedora de internet en Amealco, Querétaro.

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

No inventes precios, promociones, zonas de cobertura, tiempos de instalación ni datos técnicos que no tengas confirmados.

Si no tienes suficiente información, pide los datos necesarios o indica que un asesor de Amealcom puede darle seguimiento.
`;

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Frontend
    if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // API
    if (url.pathname === "/api/chat") {
      if (request.method === "POST") {
        return handleChatRequest(request, env);
      }
      return new Response("Method not allowed", { status: 405 });
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

/**
 * Chat handler
 */
async function handleChatRequest(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const { messages = [] } = (await request.json()) as {
      messages: ChatMessage[];
    };

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

    return new Response(stream, {
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
