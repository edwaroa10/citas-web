# AGENTS.md — `citas-web`

Generado con `../prompts/agents/PROMPT_AGENT_CITAS_WEB.md` tras importar y reconciliar el export de Google AI Studio (2026-09-29).

## Estado observado

Stack real detectado: **React 19 + Vite 8 + TypeScript 5 + Tailwind CSS v4**, vía `package.json`, `vite.config.ts` y `tsconfig.json`. No usar Angular ni asumir otro framework mientras esta evidencia se mantenga.

El código fue importado desde `portal-de-citas.zip` (export de Google AI Studio) y reconciliado quitando dependencias ajenas al alcance del proyecto que el export trae por defecto y que el código fuente nunca llegó a usar: `express`, `@google/genai`, `dotenv`, `motion`, `tsx`, `esbuild`, `@types/express`, y el script `clean` (borraba un `server.js` inexistente). No se tocó ninguna pantalla ni componente para hacer esta limpieza.

Pantallas/componentes existentes en `src/components/`: `LoginScreen`, `RegisterScreen`, `ForgotPasswordScreen`, `DashboardScreen`, `BookAppointmentModal`, `AppointmentDetailModal`, `TopBarNavigation`. La navegación es un switch de estado local (`ScreenType` en `src/App.tsx`), sin router.

Es todavía un **prototipo visual con datos simulados**: `src/data/mockData.ts` provee usuario/citas iniciales y `App.tsx` persiste el estado en `localStorage` (`portal_citas_user`, `portal_citas_appointments`). No hay integración REST contra `citas-api`, ni manejo de JWT/access-refresh, ni estados `loading`/`error` reales frente a un backend — todo el estado es local y sincrónico.

`npm install`, `npm run typecheck` y `npm run build` se ejecutaron y pasan limpios sobre este estado (ver `docs/wiki/scrum` de `citas-api` para HU/CA relacionados; no existe una wiki de scrum propia en este repo).

## Fuentes de verdad

1. `../PRD.md` y `../RESTRICCIONES_TECNICAS.md`
2. HU, criterios de aceptación y DoD aprobados en `../citas-api/docs/wiki/scrum/`
3. Diseño aprobado en Stitch/AI Studio y su handoff (este export)
4. Contrato REST y decisiones aprobados en la LLM Wiki global
5. Código, rutas, estilos, tokens y pruebas existentes en este repositorio

La LLM Wiki global vive en `../citas-api/docs/wiki/llm-wiki/` y la mantiene el orquestador. Este agente puede consultarla, pero no crear una wiki alternativa ni escribir en ella.

## Responsabilidad y límites

Implementar exclusivamente el frontend TypeScript importado desde Google AI Studio: componentes, rutas, formularios, integración REST directa, manejo de estados, accesibilidad, build y pruebas. No editar `../citas-api`.

No añadir Express ni BFF (ya se removieron los que el export traía por defecto). El backend es la autoridad de reglas de negocio, validación, disponibilidad, seguridad y transiciones de estado; el cliente no debe duplicarlas ni sustituirlas.

## Integración API y seguridad

- Consumir `citas-api` directamente por REST; sin Express/BFF intermedio.
- Configurar la URL de API mediante `VITE_API_URL` (ya definida en `.env.example`/`.env`); no hardcodearla.
- No hardcodear ni registrar tokens, credenciales o secretos; no abrir, reproducir ni versionar `.env`.
- Si el contrato REST no permite una pantalla o estado requerido, escalar el cambio al orquestador con la HU, payload necesario, respuesta esperada y evidencia frontend.
- Preservar el diseño, componentes y tokens aprobados (Tailwind, tipografía Poppins, paleta `#F1F4F9`) durante la reconciliación; no rediseñar por preferencia técnica.

## Método de trabajo

1. Verificar el stack real (ya detectado arriba; volver a comprobar si cambia `package.json`/estructura).
2. Localizar HU, CA y DoD aprobados en `../citas-api/docs/wiki/scrum/`; si faltan, detener la implementación y reportarlo.
3. Identificar pantallas, componentes, rutas, servicios API y contratos afectados.
4. Mapear estados `loading`, `empty`, `error`, `success` y `disabled`, además de autorización de rutas y accesibilidad.
5. Proponer un plan antes de editar y reconciliar sin rediseñar lo aprobado.
6. Ejecutar `npm run typecheck` y `npm run build` (únicos scripts de verificación disponibles hoy) y cualquier prueba que se agregue.
7. Verificar los criterios de aceptación y resumir evidencia, comandos y elementos no verificados.

## Comandos del proyecto

- `npm install`
- `npm run dev` — Vite en `:5173`, `--host 0.0.0.0` (compatible con el contenedor `citas-web-dev` de `docker-compose.yml`)
- `npm run build`
- `npm run typecheck` (`tsc --noEmit`)
- No existe `npm test` todavía: este export no trae suite de pruebas.

## Git

Trabajar en `develop` cuando exista; `main` representa puntos estables. No reescribir historial ni eliminar evidencia de progreso.

## Riesgos e incógnitas abiertas

- `src/types.ts` modela estados de cita en español (`confirmada|pendiente|completada|cancelada`) y IDs de doctor como `string`; no coincide con los códigos REST reales de `citas-api` (`REQUESTED|APPROVED|REJECTED|CANCELLED|COMPLETED|NO_SHOW`, IDs numéricos `BIGINT`). Requiere una decisión de contrato antes de integrar — no traducirlo por inferencia.
- No existe manejo de sesión/JWT ni rutas protegidas; la navegación actual es un switch de estado local sin autenticación real.
- Las pantallas actuales no distinguen cita general vs. especializada, no incluyen sedes (HIC/ICV) ni EPS/afiliación; falta reconciliar contra HU-003, HU-004 y HU-011 a HU-022 aprobadas.
- `Appointment.type: 'presencial' | 'videoconsulta'` y `meetUrl` no están contemplados en el PRD (que no incluye telemedicina); confirmar con el orquestador si se conserva o se remueve antes de integrar.
