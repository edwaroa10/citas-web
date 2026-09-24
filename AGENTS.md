# AGENTS.md — `citas-web`

## Estado observado

Este repositorio no contiene todavía una aplicación frontend: no existen `package.json`, código TypeScript, rutas, componentes, estilos, tokens, pruebas ni documentación de diseño aprobada. La rama actual es `main` y no tiene commits.

El framework todavía no está decidido. No asumir React ni Angular, ni crear o cambiar de framework hasta que el código aprobado de Stitch/Google AI Studio haya sido importado y el stack pueda verificarse mediante `package.json` y la estructura real.

## Fuentes de verdad

1. `../PRD.md` y `../RESTRICCIONES_TECNICAS.md`
2. HU, criterios de aceptación y DoD aprobados en `../citas-api/docs/wiki/scrum/`
3. Diseño aprobado en Stitch/AI Studio y su handoff
4. Contrato REST y decisiones aprobados en la LLM Wiki global
5. Código, rutas, estilos, tokens y pruebas existentes

La LLM Wiki global está en `../citas-api/docs/wiki/llm-wiki/` y la mantiene el orquestador. Este agente puede consultarla, pero no crear una wiki alternativa ni escribir en ella.

## Responsabilidad y límites

Implementar exclusivamente el frontend TypeScript importado desde Google AI Studio: componentes, rutas, formularios, integración REST directa, manejo de estados, accesibilidad, build y pruebas. No editar `../citas-api`.

No añadir Express ni BFF. El backend es la autoridad de reglas de negocio, validación, disponibilidad, seguridad y transiciones de estado; el cliente no debe duplicarlas ni sustituirlas.

## Integración API y seguridad

- Consumir `citas-api` directamente por REST.
- Configurar la URL de API mediante environment; no hardcodearla.
- No hardcodear ni registrar tokens, credenciales o secretos; no abrir, reproducir ni versionar `.env`.
- Si el contrato REST no permite una pantalla o estado requerido, escalar el cambio al orquestador con la HU, payload necesario, respuesta esperada y evidencia frontend.
- Preservar el diseño, componentes y tokens correctos aprobados durante la reconciliación; no rediseñar por preferencia técnica.

## Método de trabajo

1. Verificar el stack real: `package.json`, estructura, rutas, estilos/tokens, tests y handoff de diseño.
2. Localizar HU, CA y DoD aprobados; si faltan, detener la implementación y reportarlo.
3. Identificar pantallas, componentes, rutas, servicios API y contratos afectados.
4. Mapear estados `loading`, `empty`, `error`, `success` y `disabled`, además de autorización de rutas y accesibilidad.
5. Proponer un plan antes de editar y reconciliar sin rediseñar lo aprobado.
6. Ejecutar build, typecheck, lint y pruebas que existan en el stack importado.
7. Verificar los criterios de aceptación y resumir evidencia, comandos y elementos no verificados.

## Git

Trabajar en `develop` cuando exista; `main` representa puntos estables. No reescribir historial ni eliminar evidencia de progreso.

## Actualización requerida

Cuando se importe el frontend desde Stitch/Google AI Studio, actualizar este archivo contra el stack real: framework, comandos del proyecto, estructura de rutas, ubicación de estilos/tokens, cliente HTTP, estrategia de sesión y herramientas de prueba.
