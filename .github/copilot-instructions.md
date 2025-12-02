# Copilot / AI Quick Instructions — nextjs-dashboard

Purpose: Give AI coding agents immediate, actionable rules and repo-specific patterns. Read `.github/AI_RULES.md` first — it is the full policy.

- **Key files:** `app/` (pages/components), `app/lib/` (data, actions, utils, definitions), `app/ui/` (reusable UI + skeletons), `proxy.ts` (auth proxy), `next.config.ts`, `tailwind.config.ts`, `CODING_RULES.md`.

- **Commands:** Use `pnpm`.

  - Dev: `pnpm dev`
  - Build: `pnpm build`
  - Lint: `pnpm lint`

- **Next.js 16 / React 19 patterns (CRITICAL):**

  - `params` and `searchParams` are Promises — always `await` them:
    ```ts
    const { query = "" } = (await searchParams) || {};
    const { id } = await params;
    ```
  - Use `Suspense` for components that call `useSearchParams()` or rely on client-side transitions (see `app/(overview)/loading.tsx` and `app/ui/skeletons.tsx`).
  - Export `viewport` separately from `metadata` in pages/layouts.

- **Server Actions & Forms:**

  - Server actions live in `app/lib/actions.ts` and use `"use server"`.
  - Form `action` must not be an inline arrow function. Use `.bind()` or hidden inputs. Example:
    ```tsx
    const deleteWithId = deleteInvoice.bind(null, id);
    <form action={deleteWithId}>...</form>
    // or
    <form action={deleteInvoice}><input type="hidden" name="id" value={id} /></form>
    ```

- **Styling & UI conventions:**

  - Tailwind CSS is used; class order: positioning → layout → box → typography → effects.
  - Reusable UI components are under `app/ui/` (e.g., `sidenav.tsx`, `skeletons.tsx`, `search.tsx`).

- **Data, types and helpers:**

  - Types/interfaces: `app/lib/definitions.ts`.
  - Data fetching helpers: `app/lib/data.ts`.
  - Utilities (formatCurrency, etc.): `app/lib/utils.ts`.

- **Prohibitions & hard rules:**

  - Do not add `console.log()` in production code — use `console.error("Database Error:", err)` for errors.
  - Do not use `any`. Prefer precise `interface` or `unknown` then narrow.
  - Do not add `middleware.ts`; use `proxy.ts` (Next.js 16 pattern in this repo).

- **Imports order & style:** follow `AI_RULES.md`: React/Next → external libs → local components (`@/`) → utils/types.

- **Where to look for examples:**
  - Invoices: `app/dashboard/invoices/*` and `app/ui/invoices/*` show patterns for server actions, forms, and routing.
  - Authentication: `proxy.ts` and `auth.config.ts` show auth integration.
  - Routes and seeding: `app/seed/route.ts`, `app/query/route.ts` illustrate API route patterns.

If behavior is unclear, open the files above and mirror the existing patterns. Ask if you want the same content translated or expanded.

---

Estas instrucciones son un resumen conciso; para reglas completas y ejemplos extensos, lee `./.github/AI_RULES.md`.
