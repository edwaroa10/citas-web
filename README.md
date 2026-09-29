# citas-web

Repositorio frontend. El flujo esperado por estudiante:

1. diseñar su interfaz con la Skill `stitch-design-to-frontend`;
2. aprobar el diseño;
3. exportar/continuar en Google AI Studio;
4. elegir React o Angular;
5. importar el código generado en este repo;
6. reconciliar el resultado con el diseño aprobado;
7. integrar REST directamente contra `citas-api`.

No usar Express/BFF.

## Estado actual

Stack importado: React + Vite + TypeScript + Tailwind CSS. Prototipo visual con datos simulados (`src/data/mockData.ts`); todavía sin integración REST contra `citas-api`. Ver `AGENTS.md` para el detalle completo y las incógnitas abiertas.

## Ejecutar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build
```

La URL del backend se configura mediante `VITE_API_URL` (ver `.env.example`).
