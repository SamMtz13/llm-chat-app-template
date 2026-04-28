/**
 * LLM Chat Application Template
 *
 * A simple chat application using Cloudflare Workers AI.
 * This template demonstrates how to implement an LLM-powered chat interface with
 * streaming responses using Server-Sent Events (SSE).
 *
 * @license MIT
 */
import { Env, ChatMessage } from "./types";

// Model ID for Workers AI model
// https://developers.cloudflare.com/workers-ai/models/
const MODEL_ID = "@cf/meta/llama-3.1-8b-instruct-fp8";

// Default system prompt
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
  /**
   * Main request handler for the Worker
   */
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // Handle static assets (frontend)
    if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // API Routes
    if (url.pathname === "/api/chat") {
      // Handle POST requests for chat
      if (request.method === "POST") {
        return handleChatRequest(request, env);
      }

      // Method not allowed for other request types
      return new Response("Method not allowed", { status: 405 });
    }

    // Handle 404 for unmatched routes
    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

/**
 * Handles chat API requests
 */
async function handleChatRequest(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    // Parse JSON request body
    const { messages = [] } = (await request.json()) as {
      messages: ChatMessage[];
    };

    // Add system prompt if not present
    if (!messages.some((msg) => msg.role === "system")) {
      messages.unshift({ role: "system", content: SYSTEM_PROMPT });
    }

    const stream = await env.AI.run(
      MODEL_ID,
      {
        messages,
        max_tokens: 1024,
        stream: true,
      },
      {
        // Uncomment to use AI Gateway
        // gateway: {
        //   id: "YOUR_GATEWAY_ID", // Replace with your AI Gateway ID
        //   skipCache: false,      // Set to true to bypass cache
        //   cacheTtl: 3600,        // Cache time-to-live in seconds
        // },
      },
    );

    return new Response(stream, {
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache",
        connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}
