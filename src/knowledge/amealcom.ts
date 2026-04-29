export const KNOWLEDGE_BASE = `
=== FLUJO: Configuración de Repetidor TL-WR941HP (Negro) ===

Objetivo:
Guiar al cliente paso a paso para configurar el router TP-Link modelo TL-WR941HP como repetidor de señal WiFi.

Cuándo usar:
- El usuario dice que tiene un "repetidor negro", "router negro TP-Link" o menciona el modelo TL-WR941HP.
- El usuario quiere ampliar la señal de su red WiFi existente.
- El usuario dice que acaba de recibir o comprar un repetidor y no sabe cómo configurarlo.

Preguntas:
- ¿Ya conectaste el repetidor a la corriente eléctrica y está encendido?
- ¿Estás conectado a la red WiFi del repetidor desde tu celular o computadora?
- ¿Pudiste entrar a la página 192.168.0.1?

Pasos:
1. Pedir al usuario que conecte el repetidor a la corriente y se conecte a su red WiFi desde el celular.
2. Indicar que abra el navegador e ingrese a la dirección: 192.168.0.1
3. En la pantalla de inicio de sesión, ingresar "admin" tanto en usuario como en contraseña, luego presionar "Comencemos".
4. En la pantalla de configuración inicial, seleccionar País: México y Zona horaria: GMT-06:00 Central Time (US Canadá). Presionar "Next".
5. En la pantalla de tipo de conexión WAN, verificar que esté seleccionada la opción "Dynamic IP". Presionar "Next".
6. En la pantalla de MAC Address, seleccionar "Do NOT Clone MAC Address". Presionar "Next".
7. En la pantalla de configuración inalámbrica (Transmit Power), seleccionar 100%. Presionar "Next".
8. Revisar el resumen de la configuración y presionar "Save". Esperar a que la barra cargue al 100%.
9. El dispositivo se desconectará automáticamente. Volver a conectarse a la red WiFi del repetidor.
10. Ingresar nuevamente a la página: http://tplinkwifi.net
11. Introducir la contraseña configurada al inicio y presionar "Inicio de Sesión".
12. Ir a "Configuración Rápida" y presionar "Siguiente".
13. En la sección de Red de 2.4 GHz, presionar "Escanear Inalámbrico" para buscar la red WiFi principal a la que se conectará el repetidor.
14. Seleccionar la red deseada de la lista, ingresar la contraseña de esa red y presionar "Siguiente".
15. Verificar el resumen final y presionar "Guardar". Esperar que la barra llegue al 100%.
16. Al finalizar, en el frente del repetidor deben estar encendidos los indicadores: RE, Wi-Fi y PWR.

Condiciones:
- Si el usuario no puede entrar a 192.168.0.1 → Preguntar si está conectado a la red WiFi del repetidor (no a su red de casa). Si no está conectado al repetidor, pedir que se conecte primero.
- Si el usuario dice que no aparece "Dynamic IP" → Decirle que seleccione "Auto Detect" y luego continúe.
- Si la barra de carga no avanza o se queda trabada → Pedir que espere 2-3 minutos y luego reconecte el repetidor a la corriente.
- Si al final no aparecen encendidos los indicadores RE, Wi-Fi y PWR → Indicar que la configuración no fue exitosa y ofrecer escalar a soporte humano.
- Si el usuario no puede ingresar a tplinkwifi.net → Indicar que intente con la IP 192.168.0.1 o que limpie el caché del navegador e intente con otro navegador.

Escalar:
- Si el usuario completó todos los pasos pero los indicadores RE, Wi-Fi y PWR no están encendidos.
- Si el usuario no puede acceder a ninguna de las páginas de configuración después de verificar que está conectado al repetidor.
- Si el proceso falla repetidamente después de 2 intentos.

No decir:
- No decirle al usuario que entre a 192.168.0.1 si ya está en la segunda fase (después del primer reinicio). En esa fase debe usar http://tplinkwifi.net.
- No asumir que el usuario ya sabe cuál es la red del repetidor vs. su red de casa.
- No omitir el paso de reconectarse a la red después de cada reinicio.

Ejemplo:
Bot: "¡Hola! Voy a ayudarte a configurar tu repetidor TP-Link TL-WR941HP. 
Primero, ¿ya lo conectaste a la corriente y tu celular está conectado a la red WiFi del repetidor (no a tu red de casa)?"
Usuario: "Sí, ya estoy conectado."
Bot: "Perfecto. Abre el navegador de tu celular e ingresa esta dirección: 192.168.0.1 — ¿Te aparece una pantalla para ingresar usuario y contraseña?"
Usuario: "Sí."
Bot: "Escribe 'admin' en ambos campos (usuario y contraseña) y presiona 'Comencemos'. Dime cuando estés en la siguiente pantalla."


=== FLUJO: Configuración de Red de Invitados en Router TL-W850N ===

Objetivo:
Guiar al cliente para crear una red WiFi de invitados (sin contraseña o con seguridad reducida) en el router TP-Link modelo TL-W850N.

Cuándo usar:
- El usuario quiere crear una red para visitas o invitados.
- El usuario pregunta cómo separar su red principal de una red para terceros.
- El usuario tiene el modelo TL-W850N y quiere una segunda red WiFi.

Preguntas:
- ¿Estás conectado a tu red WiFi principal o por cable al router?
- ¿Quieres que la red de invitados tenga contraseña o que sea abierta (sin contraseña)?
- ¿Quieres que los invitados puedan ver los dispositivos de tu red local, o solo tener acceso a internet?

Pasos:
1. Pedir al usuario que conecte su celular o computadora a la red WiFi principal o por cable al router.
2. Indicar que ingrese a: 192.168.0.1 o http://tplinkwifi.net en el navegador.
3. Iniciar sesión con usuario: admin y contraseña: admin.
4. En el menú principal, seleccionar la pestaña "Avanzado" (Advanced).
5. En el menú lateral, seleccionar "Inalámbrico" (Wireless).
6. Dentro de Inalámbrico, seleccionar "Ajustes avanzados" (Advanced Settings).
7. En la sección "Multi-SSID", activar la opción "Habilitar SSID 1".
8. Escribir el nombre que tendrá la red de invitados en el campo "Nombre de red (SSID)" — por ejemplo: "Invitados".
9. Si se desea red sin contraseña: seleccionar "Sin seguridad" (No Security). Si se desea con contraseña: seleccionar "WPA/WPA2 personal" e ingresar la contraseña deseada.
10. En la opción "Acceso LAN", activar o desactivar "Permitir que los invitados accedan a mi red local" según la preferencia del usuario.
11. Presionar "Ahorrar" (Save) para guardar los cambios.
12. Pedir al usuario que verifique desde otro dispositivo que aparezca la nueva red de invitados en la lista de redes WiFi disponibles.

Condiciones:
- Si el usuario quiere que los invitados NO vean sus dispositivos (impresoras, computadoras, etc.) → Asegurarse de que la opción "Permitir que los invitados accedan a mi red local" esté DESACTIVADA.
- Si el usuario quiere red sin contraseña → Seleccionar "Sin seguridad". Al conectarse, el dispositivo se conectará automáticamente.
- Si el usuario quiere red con contraseña → Seleccionar "WPA/WPA2 personal" e ingresar la contraseña.
- Si no aparece la opción Multi-SSID → El modelo podría ser diferente. Escalar a soporte humano.
- Si el usuario no puede acceder al panel de administración → Verificar que esté conectado a la red del router, no a internet móvil.

Escalar:
- Si el usuario no encuentra la opción "Ajustes avanzados" o "Multi-SSID" en su router.
- Si después de guardar la red de invitados no aparece en los dispositivos cercanos.
- Si el router no responde en 192.168.0.1 ni en tplinkwifi.net.

No decir:
- No asumir que el usuario sabe la diferencia entre "Avanzado" y "Básico" en el menú.
- No saltar el paso de seleccionar "Ajustes avanzados" dentro de Inalámbrico, ya que es donde está la opción Multi-SSID.
- No decirle al usuario que la red tardará horas en aparecer; debe aparecer de inmediato tras guardar.

Ejemplo:
Bot: "Claro, te ayudo a crear una red de invitados. ¿Estás conectado al WiFi de tu router o por cable?"
Usuario: "Por WiFi."
Bot: "Perfecto. Abre tu navegador y entra a 192.168.0.1 — cuando veas la pantalla de inicio de sesión, escribe 'admin' en usuario y contraseña. ¿Ya entraste?"
Usuario: "Sí, ya estoy adentro."
Bot: "Bien. Ahora ve al menú de arriba y selecciona 'Avanzado'. Luego en el menú de la izquierda busca 'Inalámbrico' y dentro de ahí 'Ajustes avanzados'. Dime cuando llegues ahí."


=== FLUJO: Configuración de Router como Extensor — Modelo Archer C50 (AC1200) ===

Objetivo:
Configurar el router TP-Link Archer C50 en modo extensor de rango (Range Extender) para ampliar la cobertura WiFi existente.

Cuándo usar:
- El usuario tiene un router Archer C50 y quiere usarlo como repetidor.
- El usuario menciona el modelo AC1200 con antenas o el modelo Archer C50.
- El usuario quiere extender su señal WiFi con un segundo router TP-Link.

Preguntas:
- ¿Tienes el router Archer C50 en mano y ya está conectado a la corriente?
- ¿Ya te conectaste a la red WiFi que viene en la parte trasera del router?
- ¿Sabes la contraseña de la red WiFi principal a la que quieres conectar el extensor?

Pasos:
1. Pedir al usuario que conecte el Archer C50 a la corriente y se conecte a la red WiFi indicada en la parte trasera del aparato (SSID y contraseña están impresos ahí).
2. Abrir el navegador e ingresar a: 192.168.0.1 o http://tplinkwifi.net
3. Crear una contraseña de administrador (se recomienda usar "admin" en minúsculas para facilidad).
4. Presionar "Comencemos".
5. En la pantalla de configuración inicial, seleccionar la zona horaria correcta (Ciudad de México) y presionar "Siguiente".
6. En la esquina superior derecha, presionar los iconos de configuración (marcados en el manual).
7. En el menú "Cambiar de Modo", seleccionar "Modo Extensor de Rango".
8. Presionar "OK" para confirmar.
9. El router mostrará un mensaje de confirmación. Presionar "Reiniciar".
10. Esperar que el dispositivo reinicie completamente (aproximadamente 2-3 minutos).
11. Ingresar a la nueva IP: 192.168.1.254 (cambia después del reinicio).
12. Iniciar sesión con la contraseña que se configuró al inicio.
13. En la pantalla que aparece, seleccionar la red WiFi de 2.4 GHz a la que se desea conectar el extensor, usando el ícono de círculo para seleccionar.
14. Ingresar la contraseña de esa red WiFi.
15. En la siguiente pantalla (red de 5 GHz), presionar "Omitir" si no se desea configurar la banda de 5 GHz.
16. Revisar el resumen con los datos de la red extendida (SSID y contraseña) y presionar "Siguiente".
17. Presionar "Guardar" y esperar que la barra cargue al 100%.
18. Cuando aparezca la pantalla final, activar la casilla "He conectado a la red extendida" y presionar "Terminar".

Condiciones:
- Si el usuario no puede acceder a 192.168.0.1 al inicio → Verificar que esté conectado a la red del Archer C50 (parte trasera del aparato), no a su red de casa.
- Si después del reinicio no puede entrar a 192.168.1.254 → Verificar que esté reconectado a la red del extensor. Si usa el nombre tplinkwifi.net también puede funcionar.
- Si en el paso de selección de red no aparece la red deseada → Usar el botón "Rescan" o "Actualizar" para volver a buscar redes disponibles.
- Si aparece la pantalla de selección de red 5 GHz y no desea configurarla → Presionar "Omitir".
- Si la operación fue exitosa → La pantalla mostrará "Operación tuvo éxito" y aparecerá el resumen de las redes extendidas.
- Si el proceso falla → Intentar reiniciar el router (mantener el botón Reset 10 segundos) y comenzar desde el paso 1.

Escalar:
- Si el router no responde en ninguna de las dos IPs (192.168.0.1 ni 192.168.1.254).
- Si el modo extensor no aparece como opción en el menú de cambio de modo.
- Si después de completar la configuración, la red extendida no aparece en los dispositivos cercanos.
- Si el cliente no recuerda la contraseña de su red principal para conectar el extensor.

No decir:
- No decirle que use la IP 192.168.0.254 para el Archer C50 en modo extensor — la IP correcta después del reinicio es 192.168.1.254.
- No omitir el paso de reinicio; sin él, el cambio de modo no se aplica.
- No confundir la contraseña de la red WiFi principal con la contraseña de administrador del router.

Ejemplo:
Bot: "Hola, voy a ayudarte a configurar tu Archer C50 como extensor. ¿Ya conectaste el router a la corriente y te conectaste a su red WiFi (la que viene escrita en la parte de atrás del aparato)?"
Usuario: "Sí."
Bot: "Perfecto. Ahora abre tu navegador y entra a 192.168.0.1. Cuando aparezca la pantalla, crea una contraseña de administrador — puedes poner 'admin' — y presiona 'Comencemos'."


=== FLUJO: Configuración de Router como Extensor — Modelo Archer C750 (AC750) ===

Objetivo:
Configurar el router TP-Link Archer C20/C750 en modo extensor de rango para ampliar la cobertura WiFi.

Cuándo usar:
- El usuario menciona el modelo Archer C20, C750 o AC750.
- El usuario tiene un router TP-Link de doble banda y quiere usarlo como repetidor/extensor.

Preguntas:
- ¿Tienes el router encendido y conectado a la corriente?
- ¿Ya te conectaste a su red WiFi (la que dice en la parte trasera)?
- ¿Tienes a la mano la contraseña de la red WiFi principal donde vas a conectar el extensor?

Pasos:
1. Conectar el Archer C20 a la corriente y conectarse a su red WiFi (SSID y contraseña están en la etiqueta trasera).
2. Abrir el navegador e ingresar: 192.168.0.1 o http://tplinkwifi.net
3. Ingresar usuario: admin y contraseña: admin (todo en minúsculas). Presionar "Let's Get Started" o "Comencemos".
4. Ir al menú "Advanced" (Avanzado).
5. Seleccionar "Operation Mode" (Modo de Operación).
6. Seleccionar la opción "Range Extender" (Extensor de Rango).
7. Presionar "Save".
8. Cuando aparezca el mensaje de confirmación, presionar "Yes".
9. Esperar a que la barra de progreso llegue al 100% (aproximadamente 3 minutos). El dispositivo se desconectará durante este tiempo.
10. Después de 3 minutos, ingresar a la nueva IP: 192.168.0.254
11. Iniciar sesión con la contraseña: admin (en minúsculas).
12. Seleccionar "Quick Setup" (Configuración Rápida).
13. En la pantalla de selección de red 2.4 GHz, seleccionar la red WiFi principal a la que se conectará el extensor.
14. Ingresar la contraseña de esa red y presionar "Next".
15. En la pantalla de red 5 GHz, presionar "Rescan" si la red no aparece, o "Skip" si no se desea configurar esa banda.
16. Esperar el escaneo y seleccionar la red de 5 GHz si se desea (opcional).
17. En la pantalla de configuración de la red extendida, se puede personalizar el nombre de la red (SSID). Se recomienda agregar una o dos letras al nombre original para identificarla. Presionar "Next".
18. Revisar el resumen de la configuración (tomar captura de pantalla con los datos). Presionar "Save".
19. Esperar la barra de progreso al 100%.
20. La nueva red extendida aparecerá en los dispositivos cercanos. Conectarse con la contraseña configurada.

Condiciones:
- Si el usuario no puede entrar a 192.168.0.1 → Verificar que esté conectado a la red WiFi del Archer C20, no a otra red.
- Si después del reinicio no puede acceder a 192.168.0.254 → Esperar 1-2 minutos más y volver a intentar.
- Si la red deseada no aparece en la lista → Usar el botón "Rescan".
- Si quiere configurar solo la banda 2.4 GHz y no la de 5 GHz → Presionar "Skip" en el paso de 5 GHz.
- Si quiere identificar fácilmente la red extendida → Agregar letras al nombre, ej: "MiRed_EXT".

Escalar:
- Si el router no responde en 192.168.0.1 ni en 192.168.0.254.
- Si el modo "Range Extender" no aparece en las opciones de Operation Mode.
- Si la red extendida no aparece en dispositivos cercanos después de completar la configuración.

No decir:
- No decirle al usuario que la IP después del reinicio es 192.168.0.1 — cambia a 192.168.0.254 en modo extensor.
- No confundir la contraseña del router con la contraseña de la red WiFi a extender.
- No omitir la recomendación de tomar captura del resumen final de configuración.

Ejemplo:
Bot: "Entendido, vamos a configurar tu Archer C20 como extensor. ¿Ya ingresaste a 192.168.0.1 con usuario y contraseña 'admin'?"
Usuario: "Sí, ya estoy adentro."
Bot: "Perfecto. Ve al menú de arriba y selecciona 'Advanced' (Avanzado). Luego en el menú de la izquierda selecciona 'Operation Mode'. Ahí elige 'Range Extender' y presiona 'Save'. ¿Lo puedes ver?"


=== FLUJO: Cambio de Contraseña WiFi desde el Sitio Web (Modelo Archer C20 / AC750) ===

Objetivo:
Guiar al cliente para cambiar la contraseña de su red WiFi accediendo al panel de administración del router desde el navegador.

Cuándo usar:
- El usuario quiere cambiar la contraseña de su red WiFi.
- El usuario olvidó su contraseña y quiere ponerle una nueva.
- El usuario sospecha que alguien más conoce su contraseña y desea cambiarla.
- Aplica principalmente a modelos Archer C20, AC750 o similares.

Preguntas:
- ¿Estás conectado a tu red WiFi o por cable al router?
- ¿Tienes acceso al panel de administración (192.168.0.1)?
- ¿Recuerdas la contraseña de administrador del router? (normalmente es "admin")

Pasos:
1. Pedir al usuario que se conecte a su red WiFi o por cable al router.
2. Abrir el navegador e ingresar: 192.168.0.1 o http://tplinkwifi.net
3. Iniciar sesión con usuario: admin y contraseña: admin.
4. En el menú lateral izquierdo, buscar la sección "Inalámbrico de 2.4 GHz".
5. Dentro de esa sección, seleccionar "Seguridad Inalámbrica".
6. En la pantalla de seguridad, verificar que la opción "WPA/WPA2 - Personal (Recomendado)" esté seleccionada.
7. Localizar el campo "Contraseña Inalámbrica".
8. Borrar la contraseña actual e ingresar la nueva contraseña. La contraseña puede contener mayúsculas, minúsculas, números y caracteres especiales. Se recomienda combinarlos para mayor seguridad.
9. Presionar "Guardar".
10. La contraseña ha sido cambiada exitosamente. Los dispositivos conectados necesitarán ingresar la nueva contraseña.

Condiciones:
- Si el usuario no puede ingresar a 192.168.0.1 → Verificar que esté conectado al router (WiFi o cable). Si usa datos móviles no podrá acceder.
- Si el usuario no recuerda la contraseña de administrador → Indicar que la contraseña predeterminada es "admin". Si fue cambiada y no la recuerda, es necesario hacer un reset de fábrica.
- Si quiere cambiar también la red de 5 GHz → Repetir el mismo proceso pero en la sección "Inalámbrico de 5 GHz".
- Si después de guardar se desconecta de la red → Es normal. El usuario debe reconectarse con la nueva contraseña.

Escalar:
- Si el usuario hizo reset de fábrica pero necesita ayuda para reconfigurar el router desde cero.
- Si el usuario no puede acceder al panel de administración ni con la contraseña predeterminada.
- Si la opción de seguridad inalámbrica no aparece en el menú.

No decir:
- No decir que la contraseña de administrador y la contraseña del WiFi son lo mismo — son diferentes.
- No decir que el usuario necesita llamar a soporte solo para cambiar la contraseña del WiFi.
- No omitir la advertencia de que todos los dispositivos se desconectarán al cambiar la contraseña.

Ejemplo:
Bot: "Claro, te ayudo a cambiar la contraseña de tu WiFi. Primero, abre el navegador e ingresa a 192.168.0.1. En usuario y contraseña escribe 'admin' y presiona entrar. ¿Ya pudiste ingresar?"
Usuario: "Sí."
Bot: "Perfecto. En el menú de la izquierda busca 'Inalámbrico de 2.4 GHz' y dentro 'Seguridad Inalámbrica'. Ahí verás el campo de contraseña. Borra la que hay y pon la nueva. Cuando termines presiona 'Guardar'."


=== FLUJO: Cambio de Contraseña y Nombre de Red WiFi — Modelo AC1200 ===

Objetivo:
Guiar al cliente para cambiar el nombre (SSID) y/o contraseña de su red WiFi en el modelo AC1200, usando el asistente de configuración rápida del router.

Cuándo usar:
- El usuario tiene el modelo AC1200 y quiere cambiar el nombre o contraseña de su WiFi.
- El usuario acaba de recibir el equipo y quiere personalizar su red.
- El usuario no recuerda el nombre de su red y quiere cambiarlo.

Preguntas:
- ¿Estás conectado a tu red WiFi actualmente?
- ¿Quieres cambiar solo la contraseña, solo el nombre de la red, o ambos?
- ¿Tienes acceso al navegador de tu celular o computadora?

Pasos:
1. Pedir al usuario que se conecte a su red WiFi.
2. Abrir el navegador e ingresar: 192.168.0.1 en la barra de búsqueda (no en Google, sino en la barra de dirección del navegador).
3. En la pantalla de inicio, ingresar "admin" en ambos campos (usuario y contraseña). Presionar "Comencemos".
4. En la pantalla de zona horaria, seleccionar: UTC-06:00 Ciudad de México, Monterrey. Presionar "Siguiente".
5. En la pantalla de tipo de conexión a internet, presionar "Siguiente".
6. En la pantalla de tipo de IP, presionar "Siguiente".
7. En la pantalla de personalización inalámbrica, aparecerá el nombre y contraseña actual de la red:
   - Para cambiar el nombre: borrar el nombre actual en el campo "Nombre de la Red (SSID)" e ingresar el nuevo.
   - Para cambiar la contraseña: borrar la contraseña actual e ingresar la nueva.
   - Esto aplica tanto para la red de 2.4 GHz como para la de 5 GHz (si aplica).
8. Presionar "Siguiente".
9. En la pantalla de dirección MAC, presionar "Siguiente".
10. Revisar el resumen con los nuevos datos (tomar captura de pantalla para no olvidarlos).
11. Presionar "Siguiente".
12. El router aplicará la configuración y se reiniciará. Esperar que termine.
13. Conectarse a la red WiFi con el nuevo nombre y/o contraseña desde el dispositivo.

Condiciones:
- Si el usuario solo quiere cambiar la contraseña y no el nombre → Solo modificar el campo de contraseña y dejar el nombre igual.
- Si el usuario solo quiere cambiar el nombre y no la contraseña → Solo modificar el campo SSID.
- Si el usuario no ve la pantalla de personalización inalámbrica → Pedir que siga presionando "Siguiente" en cada pantalla hasta llegar a ella.
- Si el router se reinicia y el usuario pierde la conexión → Es normal. Debe buscar la red con el nuevo nombre y conectarse con la nueva contraseña.
- Si el usuario ingresó mal la nueva contraseña y ya no puede conectarse → Repetir el proceso desde el inicio con la nueva contraseña (si recuerda cuál fue) o hacer reset de fábrica.

Escalar:
- Si el usuario no puede acceder a 192.168.0.1.
- Si el usuario necesita hacer un reset de fábrica porque no recuerda ninguna contraseña.
- Si después del proceso el router no aparece como red WiFi disponible.

No decir:
- No decirle al usuario que busque 192.168.0.1 en Google — debe ingresarlo directamente en la barra de dirección del navegador.
- No omitir la recomendación de tomar captura de los nuevos datos antes de guardar.
- No asumir que el usuario solo tiene red de 2.4 GHz; el AC1200 es de doble banda.

Ejemplo:
Bot: "Te ayudo a cambiar el nombre y contraseña de tu red. Abre el navegador de tu celular, en la barra de dirección (no en Google) escribe: 192.168.0.1 y presiona enter. ¿Te aparece una pantalla de TP-Link?"
Usuario: "Sí."
Bot: "Escribe 'admin' en usuario y contraseña, luego presiona 'Comencemos'. Ve presionando 'Siguiente' en cada pantalla hasta que veas una que diga 'Personalizar la configuración inalámbrica'. Ahí podrás cambiar el nombre y contraseña."


=== FLUJO: Cambio de Contraseña y Gestión de Red con Aplicación Tether ===

Objetivo:
Guiar al cliente para cambiar la contraseña de su red WiFi, ver dispositivos conectados y bloquear intrusos usando la aplicación móvil TP-Link Tether.

Cuándo usar:
- El usuario quiere cambiar la contraseña de su WiFi desde su celular sin entrar a una página web.
- El usuario sospecha que tiene intrusos en su red y quiere verlos o bloquearlos.
- El usuario quiere gestionar su red de forma más sencilla desde una app.
- El usuario pregunta por la "aplicación Tether" o "app de TP-Link".

Preguntas:
- ¿Tienes instalada la aplicación Tether en tu celular? (Es de TP-Link, el ícono es una casa con antena WiFi)
- ¿Tienes cuenta de TP-Link ID? ¿Ya te registraste?
- ¿Estás conectado a tu red WiFi en este momento?

Pasos de Registro (primera vez):
1. Descargar la aplicación "Tether" de TP-Link desde la tienda de aplicaciones (App Store o Google Play).
2. Abrir la app. En la pantalla de bienvenida, presionar "Crear un ID de TP-Link".
3. Ingresar un correo electrónico activo, crear una contraseña para la cuenta y aceptar los Términos y Condiciones.
4. Presionar "Registrarse".
5. Revisar el correo electrónico registrado — llegará un mensaje de TP-Link.
6. En el correo, presionar "Click para Finalizar Registro".
7. La cuenta queda activada.
8. Volver a la app, aceptar la Política de privacidad y presionar "De Acuerdo".
9. Iniciar sesión con el correo y contraseña registrados.

Pasos para Cambiar Contraseña:
1. Dentro de la app, seleccionar el nombre del dispositivo (router) en la lista.
2. Iniciar sesión en el router con usuario: admin y contraseña: admin.
3. En la pantalla principal, seleccionar la sección donde aparece el nombre y contraseña de la red WiFi.
4. Seleccionar "Wi-Fi 2.4GHz" (o la banda deseada).
5. En la pantalla de configuración, borrar la contraseña actual e ingresar la nueva (puede combinar letras, números y caracteres).
6. Presionar "Guardar" (esquina superior derecha).
7. IMPORTANTE: El dispositivo se desconectará de la app y del WiFi. Conectarse nuevamente con la nueva contraseña.

Pasos para Ver y Bloquear Intrusos:
1. En la pantalla principal de la app, seleccionar "Clientes" (ícono con número de dispositivos).
2. Aparecerá la lista de todos los dispositivos conectados a la red.
3. Revisar si hay algún dispositivo desconocido.
4. Si se encuentra un dispositivo extraño: mantenerlo presionado hasta que aparezca la opción "Bloquear".
5. Presionar "Bloquear". El dispositivo quedará sin acceso a internet.
6. Para desbloquear: ir a "Clientes bloqueados", seleccionar el dispositivo y presionar "Desbloquear".

Condiciones:
- Si el usuario ya tiene cuenta de TP-Link → Saltar los pasos de registro e ir directo al inicio de sesión.
- Si no llega el correo de activación → Pedir que revise la carpeta de spam/correo no deseado. Si tampoco está ahí, usar la opción "Reenviar correo" en la app.
- Si el router no aparece en la lista de dispositivos de la app → Verificar que el celular esté conectado a la red WiFi del router (no a datos móviles).
- Si al ingresar "admin" como contraseña del router en la app no funciona → Es posible que la contraseña de administrador haya sido cambiada. Escalar a soporte humano.
- Si después de bloquear un dispositivo, sigue apareciendo conectado → Esperar 1-2 minutos y actualizar la lista.

Escalar:
- Si el usuario no puede iniciar sesión en el router desde la app (contraseña de admin incorrecta).
- Si la app no detecta ningún dispositivo aunque el celular esté conectado al WiFi.
- Si el usuario no puede desbloquear un dispositivo que bloqueó por error.

No decir:
- No decirle al usuario que la contraseña del correo de Tether es la misma que la del router — son contraseñas distintas.
- No omitir la advertencia de que al cambiar la contraseña WiFi se desconectará de la red inmediatamente.
- No decir que la app Tether es solo para ver la red; también sirve para configurarla.

Ejemplo:
Bot: "¡Claro! Con la app Tether puedes cambiar la contraseña y ver quién está conectado a tu red. ¿Ya tienes la app instalada en tu celular?"
Usuario: "No."
Bot: "Descárgala buscando 'Tether TP-Link' en tu tienda de apps. El ícono es una casita azul con antena WiFi. Cuando la abras, crea una cuenta con tu correo y luego confirma desde tu email. Dime cuando estés dentro de la app."
`;
