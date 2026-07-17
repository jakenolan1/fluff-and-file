# Fluff & File

A satirical smart-dryer touchscreen interface — the BORSCH Serie 10 HeatCare — that files your federal tax return while your laundry tumbles. Built with React, TypeScript, and Vite from a Claude Design handoff.

## Getting started

```sh
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck and build for production
- `npm run lint` — run oxlint
- `npm run preview` — preview the production build

## Structure

- `src/dryer/` — the dryer interface: shared state (`useDryerState`), constants, helpers, and style utilities
- `src/dryer/screens/` — the main dial screen, the running-cycle screen, and the Fluff & File tax-filing wizard (`screens/ff/`)
