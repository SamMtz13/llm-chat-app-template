export type Intent =
  | "fallas_internet"
  | "internet_lento"
  | "pagos"
  | "cobertura"
  | "instalacion"
  | "humano"
  | "general";

export type Emotion = "enojado" | "frustrado" | "triste" | "neutral";

export type Priority = "alta" | "media" | "baja";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?¡!.,;:()\-_'"]/g, "");
}

export function detectIntent(message: string): Intent {
  const t = normalize(message);

  if (
    [
      "hablar con alguien", "agente", "persona", "humano", "asesor",
      "operador", "quiero hablar", "con una persona", "con un agente",
      "atencion humana", "quiero un asesor",
    ].some((kw) => t.includes(kw))
  )
    return "humano";

  if (
    [
      "no funciona", "no jala", "no sirve", "sin internet", "se fue el internet",
      "no tengo senal", "no me da internet", "se cayo", "no conecta",
      "no hay internet", "no tengo internet", "internet no funciona",
      "se cayo el internet", "no carga nada",
    ].some((kw) => t.includes(kw))
  )
    return "fallas_internet";

  if (
    [
      "lento", "muy lento", "tarda mucho", "se congela", "no carga",
      "va lento", "pesima velocidad", "va mal", "baja velocidad",
      "lentisimo", "tarda", "lag", "se traba",
    ].some((kw) => t.includes(kw))
  )
    return "internet_lento";

  if (
    ["pago", "factura", "cobro", "cargo", "recibo", "mensualidad", "precio"].some((kw) =>
      t.includes(kw),
    )
  )
    return "pagos";

  if (
    [
      "cobertura", "zona", "colonia", "llega el servicio", "disponible",
      "mi area", "tienen servicio en", "llegan a", "cubren", "mi zona",
    ].some((kw) => t.includes(kw))
  )
    return "cobertura";

  if (
    [
      "contratar", "nuevo servicio", "quiero internet", "me interesa",
      "cotizacion", "cuanto cuesta", "quiero el servicio", "dar de alta",
      "instalar", "fibra optica", "quiero contratar", "informacion del servicio",
      "precio", "paquete", "me dan servicio", "tienen servicio",
    ].some((kw) => t.includes(kw))
  )
    return "instalacion";

  return "general";
}

export function detectEmotion(message: string): Emotion {
  const t = normalize(message);

  if (
    [
      "sirve para el perro", "no sirve para nada", "estan mal", "pesimo servicio",
      "me tienen harto", "estoy harto", "que porqueria", "malisimo", "pesimo",
      "no funciona nada", "me canse", "son un fraude", "tonto", "idiotas",
      "basura", "estafa", "inaceptable", "terrible", "fatal", "horrible",
      "me regresa el dinero", "quiero cancelar", "son unos robadores",
    ].some((kw) => t.includes(kw))
  )
    return "enojado";

  if (
    [
      "otra vez lo mismo", "siempre pasa", "llevan dias", "no me resuelven",
      "nadie me ayuda", "ya no aguanto", "cuantas veces", "no es posible",
      "por que siempre", "llevo horas", "llevo dias", "desesperado",
      "no pueden", "nunca funciona", "siempre falla",
    ].some((kw) => t.includes(kw))
  )
    return "frustrado";

  if (
    ["triste", "decepcionado", "esperaba mas", "no esperaba esto"].some((kw) => t.includes(kw))
  )
    return "triste";

  return "neutral";
}

export function calculatePriority(intent: Intent, emotion: Emotion): Priority {
  if (emotion === "enojado" || emotion === "frustrado") return "alta";
  if (intent === "humano") return "alta";
  if (intent === "fallas_internet" || intent === "internet_lento") return "media";
  return "baja";
}

export function isLeadIntent(intent: Intent): boolean {
  return intent === "instalacion";
}
