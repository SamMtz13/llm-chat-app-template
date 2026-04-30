// MOCK DATA — Reemplazar con queries D1 cuando se configure el binding DB
// Ver sql/schema.sql para el schema completo
// Ver src/lib/db.ts para las funciones stub

import { Ticket } from "./tickets";

export type Conversation = {
  id: string;
  createdAt: string;
  detectedIntent: string;
  detectedEmotion: string;
  priority: string;
  hasTicket: boolean;
};

export type Message = {
  id: string;
  conversationId: string;
  role: string;
  content: string;
  createdAt: string;
};

export const mockConversations: Conversation[] = [
  {
    id: "c1a2b3c4-0001-0001-0001-000000000001",
    createdAt: "2026-04-28T09:15:00.000Z",
    detectedIntent: "fallas_internet",
    detectedEmotion: "enojado",
    priority: "alta",
    hasTicket: true,
  },
  {
    id: "c1a2b3c4-0002-0002-0002-000000000002",
    createdAt: "2026-04-28T10:30:00.000Z",
    detectedIntent: "internet_lento",
    detectedEmotion: "frustrado",
    priority: "alta",
    hasTicket: true,
  },
  {
    id: "c1a2b3c4-0003-0003-0003-000000000003",
    createdAt: "2026-04-27T14:20:00.000Z",
    detectedIntent: "pagos",
    detectedEmotion: "neutral",
    priority: "baja",
    hasTicket: false,
  },
  {
    id: "c1a2b3c4-0004-0004-0004-000000000004",
    createdAt: "2026-04-27T16:45:00.000Z",
    detectedIntent: "cobertura",
    detectedEmotion: "triste",
    priority: "baja",
    hasTicket: false,
  },
  {
    id: "c1a2b3c4-0005-0005-0005-000000000005",
    createdAt: "2026-04-26T11:00:00.000Z",
    detectedIntent: "instalacion",
    detectedEmotion: "neutral",
    priority: "baja",
    hasTicket: false,
  },
  {
    id: "c1a2b3c4-0006-0006-0006-000000000006",
    createdAt: "2026-04-29T08:05:00.000Z",
    detectedIntent: "humano",
    detectedEmotion: "enojado",
    priority: "alta",
    hasTicket: true,
  },
  {
    id: "c1a2b3c4-0007-0007-0007-000000000007",
    createdAt: "2026-04-25T17:30:00.000Z",
    detectedIntent: "general",
    detectedEmotion: "neutral",
    priority: "baja",
    hasTicket: false,
  },
];

export const mockMessages: Message[] = [
  // Conv 1: fallas_internet + enojado
  {
    id: "m1000001",
    conversationId: "c1a2b3c4-0001-0001-0001-000000000001",
    role: "user",
    content: "No tengo internet desde hace 3 horas, esto es inaceptable. Llevo pagando puntual y el servicio es pésimo.",
    createdAt: "2026-04-28T09:15:00.000Z",
  },
  {
    id: "m1000002",
    conversationId: "c1a2b3c4-0001-0001-0001-000000000001",
    role: "assistant",
    content: "Entiendo tu molestia, lamento mucho lo que estás viviendo. Para ayudarte lo antes posible, ¿me puedes decir tu nombre completo, la colonia o zona donde vives, y si tu módem o antena tiene luces encendidas?",
    createdAt: "2026-04-28T09:15:45.000Z",
  },
  {
    id: "m1000003",
    conversationId: "c1a2b3c4-0001-0001-0001-000000000001",
    role: "user",
    content: "Me llamo Carlos Ramírez, vivo en El Lindero. La antena tiene una luz roja. Ya reinicié el equipo dos veces.",
    createdAt: "2026-04-28T09:17:00.000Z",
  },
  {
    id: "m1000004",
    conversationId: "c1a2b3c4-0001-0001-0001-000000000001",
    role: "assistant",
    content: "Gracias Carlos. La luz roja en la antena indica un problema de señal. Voy a registrar tu reporte para que un técnico de Amealcom te contacte en la brevedad. ¿Tienes servicio de fibra óptica o antena?",
    createdAt: "2026-04-28T09:17:30.000Z",
  },

  // Conv 2: internet_lento + frustrado
  {
    id: "m2000001",
    conversationId: "c1a2b3c4-0002-0002-0002-000000000002",
    role: "user",
    content: "Mi internet está lentísimo desde ayer. Ya no aguanto, siempre pasa lo mismo cada semana.",
    createdAt: "2026-04-28T10:30:00.000Z",
  },
  {
    id: "m2000002",
    conversationId: "c1a2b3c4-0002-0002-0002-000000000002",
    role: "assistant",
    content: "Qué frustración, entiendo perfectamente. Vamos a revisar qué está pasando. ¿Puedes decirme en qué colonia vives y qué tipo de servicio tienes: fibra óptica o antena?",
    createdAt: "2026-04-28T10:30:40.000Z",
  },
  {
    id: "m2000003",
    conversationId: "c1a2b3c4-0002-0002-0002-000000000002",
    role: "user",
    content: "Estoy en San Ildefonso, tengo fibra óptica. La velocidad que contrato es de 30 Mbps y ahorita apenas llega a 2.",
    createdAt: "2026-04-28T10:32:00.000Z",
  },
  {
    id: "m2000004",
    conversationId: "c1a2b3c4-0002-0002-0002-000000000002",
    role: "assistant",
    content: "Gracias. Con esa diferencia tan grande es necesario que un técnico revise tu enlace. Voy a crear un reporte para que te contacten. ¿Tu nombre completo, por favor?",
    createdAt: "2026-04-28T10:32:30.000Z",
  },

  // Conv 3: pagos + neutral
  {
    id: "m3000001",
    conversationId: "c1a2b3c4-0003-0003-0003-000000000003",
    role: "user",
    content: "¿Cuándo es la fecha límite de pago de mi mensualidad?",
    createdAt: "2026-04-27T14:20:00.000Z",
  },
  {
    id: "m3000002",
    conversationId: "c1a2b3c4-0003-0003-0003-000000000003",
    role: "assistant",
    content: "La fecha de pago depende de tu fecha de contratación. Para darte el dato exacto, un asesor de Amealcom puede confirmarlo. ¿Necesitas también el número de cuenta o las formas de pago disponibles?",
    createdAt: "2026-04-27T14:20:30.000Z",
  },
  {
    id: "m3000003",
    conversationId: "c1a2b3c4-0003-0003-0003-000000000003",
    role: "user",
    content: "Sí, ¿cómo puedo pagar? ¿Tienen pago en línea?",
    createdAt: "2026-04-27T14:21:30.000Z",
  },
  {
    id: "m3000004",
    conversationId: "c1a2b3c4-0003-0003-0003-000000000003",
    role: "assistant",
    content: "Para conocer todos los métodos de pago disponibles te recomiendo contactar directamente con Amealcom. Un asesor podrá indicarte las opciones de pago en efectivo, transferencia o en línea según lo que manejen actualmente.",
    createdAt: "2026-04-27T14:22:00.000Z",
  },

  // Conv 4: cobertura + triste
  {
    id: "m4000001",
    conversationId: "c1a2b3c4-0004-0004-0004-000000000004",
    role: "user",
    content: "¿Tienen cobertura en la colonia Agua Zarca? Me decepcionó mucho saber que donde vivo no llega el servicio.",
    createdAt: "2026-04-27T16:45:00.000Z",
  },
  {
    id: "m4000002",
    conversationId: "c1a2b3c4-0004-0004-0004-000000000004",
    role: "assistant",
    content: "Entiendo lo difícil que es eso. En este momento no tengo confirmación de cobertura en esa zona, pero Amealcom está expandiendo su red constantemente. Te recomiendo contactar directamente para que puedan verificar disponibilidad en tu dirección exacta.",
    createdAt: "2026-04-27T16:45:30.000Z",
  },
  {
    id: "m4000003",
    conversationId: "c1a2b3c4-0004-0004-0004-000000000004",
    role: "user",
    content: "¿Y cuándo podría llegar a mi zona? No esperaba esto.",
    createdAt: "2026-04-27T16:46:30.000Z",
  },
  {
    id: "m4000004",
    conversationId: "c1a2b3c4-0004-0004-0004-000000000004",
    role: "assistant",
    content: "No tengo información sobre fechas de expansión para no darte datos incorrectos. Lo mejor es que contactes a Amealcom directamente para registrar tu interés — eso ayuda a priorizar la cobertura en tu área.",
    createdAt: "2026-04-27T16:47:00.000Z",
  },

  // Conv 5: instalacion + neutral
  {
    id: "m5000001",
    conversationId: "c1a2b3c4-0005-0005-0005-000000000005",
    role: "user",
    content: "Quiero contratar el servicio de internet, ¿cómo puedo dar de alta una nueva instalación?",
    createdAt: "2026-04-26T11:00:00.000Z",
  },
  {
    id: "m5000002",
    conversationId: "c1a2b3c4-0005-0005-0005-000000000005",
    role: "assistant",
    content: "¡Con gusto! Para solicitar una instalación necesito verificar que tenemos cobertura en tu zona. ¿En qué colonia o comunidad vives?",
    createdAt: "2026-04-26T11:00:30.000Z",
  },
  {
    id: "m5000003",
    conversationId: "c1a2b3c4-0005-0005-0005-000000000005",
    role: "user",
    content: "Vivo en el centro de Amealco, cerca de la plaza principal.",
    createdAt: "2026-04-26T11:01:30.000Z",
  },
  {
    id: "m5000004",
    conversationId: "c1a2b3c4-0005-0005-0005-000000000005",
    role: "assistant",
    content: "El centro de Amealco tiene cobertura. Un asesor puede darte información sobre planes disponibles y agendar la visita de instalación. ¿Quieres que registre tu solicitud?",
    createdAt: "2026-04-26T11:02:00.000Z",
  },

  // Conv 6: humano + enojado
  {
    id: "m6000001",
    conversationId: "c1a2b3c4-0006-0006-0006-000000000006",
    role: "user",
    content: "Quiero hablar con una persona, no con un bot. Esto es una estafa, llevo días sin internet.",
    createdAt: "2026-04-29T08:05:00.000Z",
  },
  {
    id: "m6000002",
    conversationId: "c1a2b3c4-0006-0006-0006-000000000006",
    role: "assistant",
    content: "Tienes toda la razón en pedir atención humana. Soy una IA y entiendo que en situaciones así necesitas hablar con alguien de Amealcom. He registrado tu caso como urgente para que un asesor te contacte lo antes posible. ¿Puedes dejarme tu nombre y número para que te llamen?",
    createdAt: "2026-04-29T08:05:30.000Z",
  },
  {
    id: "m6000003",
    conversationId: "c1a2b3c4-0006-0006-0006-000000000006",
    role: "user",
    content: "Me llamo Pedro Sánchez, mi número es 442-123-4567.",
    createdAt: "2026-04-29T08:06:30.000Z",
  },
  {
    id: "m6000004",
    conversationId: "c1a2b3c4-0006-0006-0006-000000000006",
    role: "assistant",
    content: "Listo Pedro, tu caso está registrado con prioridad alta. Un asesor de Amealcom te llamará al 442-123-4567 a la brevedad. Gracias por tu paciencia.",
    createdAt: "2026-04-29T08:07:00.000Z",
  },

  // Conv 7: general + neutral
  {
    id: "m7000001",
    conversationId: "c1a2b3c4-0007-0007-0007-000000000007",
    role: "user",
    content: "¿Cuál es el horario de atención de Amealcom?",
    createdAt: "2026-04-25T17:30:00.000Z",
  },
  {
    id: "m7000002",
    conversationId: "c1a2b3c4-0007-0007-0007-000000000007",
    role: "assistant",
    content: "No tengo el horario exacto de atención para no darte información incorrecta. Te recomiendo contactar directamente a Amealcom para confirmarlo. ¿Hay algo más en lo que pueda ayudarte?",
    createdAt: "2026-04-25T17:30:30.000Z",
  },
];

export const mockTickets: Ticket[] = [
  {
    id: "t9a8b7c6-0001-0001-0001-000000000001",
    conversationId: "c1a2b3c4-0001-0001-0001-000000000001",
    intent: "fallas_internet",
    emotion: "enojado",
    priority: "alta",
    status: "abierto",
    description: "No tengo internet desde hace 3 horas, esto es inaceptable. Llevo pagando puntual y el servicio es pésimo.",
    createdAt: "2026-04-28T09:15:05.000Z",
  },
  {
    id: "t9a8b7c6-0002-0002-0002-000000000002",
    conversationId: "c1a2b3c4-0002-0002-0002-000000000002",
    intent: "internet_lento",
    emotion: "frustrado",
    priority: "alta",
    status: "en_proceso",
    description: "Mi internet está lentísimo desde ayer. Ya no aguanto, siempre pasa lo mismo cada semana.",
    createdAt: "2026-04-28T10:30:05.000Z",
  },
  {
    id: "t9a8b7c6-0003-0003-0003-000000000003",
    conversationId: "c1a2b3c4-0006-0006-0006-000000000006",
    intent: "humano",
    emotion: "enojado",
    priority: "alta",
    status: "abierto",
    description: "Quiero hablar con una persona, no con un bot. Esto es una estafa, llevo días sin internet.",
    createdAt: "2026-04-29T08:05:05.000Z",
  },
];
