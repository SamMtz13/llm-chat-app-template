// Keywords de emoción derivadas de EmoEvent (Plaza-del-Arco et al., 2020, Universidad de Córdoba / UNED)
// con adaptación de dominio al español mexicano coloquial para soporte técnico de telecomunicaciones.
// Referencia: https://github.com/fmplaza/EmoEvent

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
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:()\-_'"]/g, "");
}

export function detectIntent(message: string): Intent {
  const t = normalize(message);

  if (
    [
      "hablar con alguien",
      "agente",
      "persona",
      "humano",
      "asesor",
      "operador",
      "quiero hablar",
      "con una persona",
      "con un agente",
      "atencion humana",
      "quiero un asesor",
      "manden a alguien",
      "quiero que vengan",
      "necesito ayuda de alguien",
    ].some((kw) => t.includes(kw))
  )
    return "humano";

  if (
    [
      "no funciona",
      "no jala",
      "no sirve",
      "sin internet",
      "se fue el internet",
      "no tengo senal",
      "no me da internet",
      "se cayo",
      "no conecta",
      "no hay internet",
      "no tengo internet",
      "internet no funciona",
      "se cayo el internet",
      "no carga nada",
      "no agarra",
      "no da",
      "se corto",
      "se fue la senal",
      "no pega",
      "no hala",
      "no tiene senal",
      "no me conecta",
      "sin conexion",
    ].some((kw) => t.includes(kw))
  )
    return "fallas_internet";

  if (
    [
      "lento",
      "muy lento",
      "tarda mucho",
      "se congela",
      "no carga",
      "va lento",
      "pesima velocidad",
      "va mal",
      "baja velocidad",
      "lentisimo",
      "tarda",
      "lag",
      "se traba",
      "tronado",
      "tronadisimo",
      "cargando",
      "no abre",
      "tarda un chorro",
      "va de la patada",
      "va super lento",
      "no baja rapido",
      "tarda mil anos",
      "se atora",
      "se atoró",
      "bufering",
      "buffering",
    ].some((kw) => t.includes(kw))
  )
    return "internet_lento";

  if (
    [
      "pago",
      "factura",
      "cobro",
      "cargo",
      "recibo",
      "mensualidad",
      "precio",
      "me cobraron",
      "me descontaron",
      "no reconozco el cargo",
      "cobro doble",
      "me hicieron un cargo",
      "cuanto debo",
      "mi estado de cuenta",
      "pagar",
      "vencimiento",
    ].some((kw) => t.includes(kw))
  )
    return "pagos";

  if (
    [
      "cobertura",
      "zona",
      "colonia",
      "llega el servicio",
      "disponible",
      "mi area",
      "tienen servicio en",
      "llegan a",
      "cubren",
      "mi zona",
      "llega ahi",
      "dan servicio",
      "hay internet ahi",
      "alcanza la senal",
      "llega hasta",
      "hay cobertura",
    ].some((kw) => t.includes(kw))
  )
    return "cobertura";

  if (
    [
      "contratar",
      "nuevo servicio",
      "quiero internet",
      "me interesa",
      "cotizacion",
      "cuanto cuesta",
      "quiero el servicio",
      "dar de alta",
      "instalar",
      "fibra optica",
      "quiero contratar",
      "informacion del servicio",
      "precio",
      "paquete",
      "me dan servicio",
      "tienen servicio",
      "quiero darme de alta",
      "como le hago para contratar",
      "cuanto cobran",
      "que paquetes tienen",
      "me interesa el servicio",
      "quiero que me instalen",
      "cuando pueden venir a instalar",
      "como contrato",
      "quiero el internet",
      "me pueden instalar",
    ].some((kw) => t.includes(kw))
  )
    return "instalacion";

  return "general";
}

export function detectEmotion(message: string): Emotion {
  const t = normalize(message);

  if (
    [
      // Mexicanismos directos
      "sirve para el perro",
      "no sirve para nada",
      "que porqueria",
      "me tienen hasta la madre",
      "me lleva la chingada",
      "que fregados",
      "no manches",
      "me cae gordo",
      "me tiene harto",
      "ya me saco de onda",
      "que gacho",
      "esta de la patada",
      "que oso",
      "me caga",
      "que barbaridad",
      "son unos fregones mal",
      "me cae mal",
      "son una porqueria",
      "que mal servicio",
      "pesimo servicio",
      "malisimo",
      "son un fraude",
      "estafa",
      "me quieren robar",
      "me robaron",
      "son unos rateros",
      "que robo",
      "abuso",
      // Generales de enojo
      "estoy harto",
      "me tienen harto",
      "no funciona nada",
      "inaceptable",
      "indignante",
      "verguenza",
      "incompetentes",
      "deplorable",
      "que descaro",
      "mentirosos",
      "como se atreven",
      "inadmisible",
      "asco",
      "odio",
      "fatal",
      "horrible",
      "me regresa el dinero",
      "quiero cancelar",
      "son unos robadores",
      "idiotas",
      "tonto",
      "pesimo",
      "terrible",
      "basura",
      "me saca de quicio",
      "que coraje",
      "estoy encabronado",
      "encabronado",
      "me enoja",
      "furioso",
      "desesperante",
    ].some((kw) => t.includes(kw))
  )
    return "enojado";

  if (
    [
      // Mexicanismos de frustración
      "ya me canse",
      "ya estuvo",
      "ya me harté",
      "ya basta",
      "hasta cuando",
      "cuanto tiempo mas",
      "llevan un chorro",
      "siguen igual",
      "no avanzan",
      "siempre lo mismo",
      "cada que llueve",
      "cada rato",
      "a cada rato",
      "se me hace tarde",
      "llevo esperando",
      "me tienen esperando",
      "no me hacen caso",
      "nadie me contesta",
      "no contestan",
      "ya hable mil veces",
      "cuantas veces tengo que llamar",
      // Generales de frustración
      "otra vez lo mismo",
      "siempre pasa",
      "llevan dias",
      "no me resuelven",
      "nadie me ayuda",
      "ya no aguanto",
      "cuantas veces",
      "no es posible",
      "por que siempre",
      "llevo horas",
      "llevo dias",
      "desesperado",
      "no pueden",
      "nunca funciona",
      "siempre falla",
      "frustrante",
      "que frustrante",
      "me desespera",
      "como que no",
      "deberian saber",
      "siguen sin resolver",
      "llevan semanas",
      "no entienden",
      "que dificil",
      "cansado de esperar",
      "igual que siempre",
    ].some((kw) => t.includes(kw))
  )
    return "frustrado";

  if (
    [
      // Mexicanismos de tristeza/decepción
      "que tristeza",
      "que pena",
      "que lastima",
      "me deja mal",
      "me fallo",
      "esperaba mas de ustedes",
      "creí que eran buenos",
      "pense que era mejor",
      "me decepciono",
      "que decepcion",
      "no crei que fueran asi",
      "me siento mal con esto",
      // Generales de tristeza
      "triste",
      "decepcionado",
      "esperaba mas",
      "no esperaba esto",
      "lastima",
      "desilusionado",
      "esperaba mejor",
      "que mal",
      "no crei que",
      "pensaba que era mejor",
      "pena",
      "tristeza",
      "dolor",
      "lamentable",
    ].some((kw) => t.includes(kw))
  )
    return "triste";

  return "neutral";
}

export function calculatePriority(intent: Intent, emotion: Emotion): Priority {
  if (emotion === "enojado" || emotion === "frustrado") return "alta";
  if (intent === "humano") return "alta";
  if (intent === "fallas_internet" || intent === "internet_lento")
    return "media";
  return "baja";
}

export function isLeadIntent(intent: Intent): boolean {
  return intent === "instalacion";
}
