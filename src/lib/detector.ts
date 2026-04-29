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
    .replace(/[̀-ͯ]/g, "");
}

export function detectIntent(message: string): Intent {
  const t = normalize(message);

  if (
    ["hablar con alguien", "agente", "persona", "humano", "asesor", "operador"].some(
      (kw) => t.includes(kw),
    )
  )
    return "humano";

  if (
    [
      "no tengo internet",
      "sin internet",
      "se cayo",
      "no conecta",
      "no jala",
      "sin senal",
      "no hay conexion",
    ].some((kw) => t.includes(kw))
  )
    return "fallas_internet";

  if (
    ["lento", "tarda", "lentisimo", "baja velocidad", "no carga", "se congela", "lag"].some(
      (kw) => t.includes(kw),
    )
  )
    return "internet_lento";

  if (
    ["pago", "factura", "cobro", "cargo", "recibo", "mensualidad", "precio"].some((kw) =>
      t.includes(kw),
    )
  )
    return "pagos";

  if (
    ["cobertura", "zona", "colonia", "llega", "disponible", "mi area"].some((kw) =>
      t.includes(kw),
    )
  )
    return "cobertura";

  if (
    ["instalar", "instalacion", "nuevo servicio", "contratar", "dar de alta"].some((kw) =>
      t.includes(kw),
    )
  )
    return "instalacion";

  return "general";
}

export function detectEmotion(message: string): Emotion {
  const t = normalize(message);

  if (
    [
      "molesto",
      "enojado",
      "furioso",
      "hartado",
      "pesimo",
      "terrible",
      "inaceptable",
      "no sirve",
      "basura",
      "estafa",
    ].some((kw) => t.includes(kw))
  )
    return "enojado";

  if (
    [
      "frustrado",
      "desesperado",
      "harto",
      "ya no aguanto",
      "siempre pasa",
      "otra vez",
      "llevo dias",
      "llevo horas",
    ].some((kw) => t.includes(kw))
  )
    return "frustrado";

  if (
    ["triste", "decepcionado", "esperaba mas", "no esperaba esto"].some((kw) =>
      t.includes(kw),
    )
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
