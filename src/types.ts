/**
 * Type definitions for the LLM chat application.
 */

export interface Env {
	AI: Ai;
	ASSETS: { fetch: (request: Request) => Promise<Response> };
	TELEGRAM_BOT_TOKEN?: string;
	TELEGRAM_CHAT_ID?: string;
	DB?: D1Database;
}

export interface ChatMessage {
	role: "system" | "user" | "assistant";
	content: string;
}
