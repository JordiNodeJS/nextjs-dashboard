# 🤖 Reglas para Agentes AI - Next.js Dashboard

> **Versión:** Next.js 16.0.6 | React 19 | TypeScript 5.7 | pnpm

Este documento define las reglas fundamentales que todo agente de IA debe seguir al trabajar con este proyecto.

---

## 📋 Índice

1. [Contexto del Proyecto](#contexto-del-proyecto)
2. [Tecnologías y Versiones](#tecnologías-y-versiones)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Reglas de Codificación](#reglas-de-codificación)
5. [Patrones Obligatorios](#patrones-obligatorios)
6. [Patrones Prohibidos](#patrones-prohibidos)
7. [Next.js 16 Específico](#nextjs-16-específico)
8. [Accesibilidad](#accesibilidad)
9. [Testing y Depuración](#testing-y-depuración)

---

## 🎯 Contexto del Proyecto

Este es un **dashboard de facturación** construido con Next.js App Router. Es el proyecto de ejemplo del curso oficial de Next.js.

**Funcionalidades principales:**

- Autenticación con NextAuth.js
- CRUD de facturas (invoices)
- Gestión de clientes (customers)
- Dashboard con métricas

---

## 🛠️ Tecnologías y Versiones

| Tecnología   | Versión    | Notas                              |
| ------------ | ---------- | ---------------------------------- |
| Next.js      | 16.0.6     | App Router, Turbopack por defecto  |
| React        | 19.2.0     | Server Components, Suspense        |
| TypeScript   | 5.7.3      | Estricto                           |
| pnpm         | 10+        | **Gestor de paquetes obligatorio** |
| Tailwind CSS | 3.4.17     | Estilos                            |
| NextAuth.js  | 5.0.0-beta | Autenticación                      |
| PostgreSQL   | -          | Base de datos (via postgres.js)    |
| Zod          | 3.24+      | Validación de esquemas             |

---

## 📁 Estructura del Proyecto

```
app/
├── layout.tsx          # Layout raíz (metadata, viewport, providers)
├── page.tsx            # Página principal
├── lib/
│   ├── actions.ts      # Server Actions ("use server")
│   ├── data.ts         # Funciones de fetch de datos
│   ├── definitions.ts  # Tipos e interfaces TypeScript
│   ├── utils.ts        # Utilidades (formatCurrency, etc.)
│   └── placeholder-data.ts
├── ui/
│   ├── fonts.ts        # Fuentes (next/font)
│   ├── global.css      # Estilos globales
│   ├── skeletons.tsx   # Loading skeletons
│   ├── search.tsx      # Componente de búsqueda
│   └── [feature]/      # Componentes por feature
├── dashboard/
│   ├── layout.tsx      # Layout del dashboard
│   ├── (overview)/     # Route group
│   ├── invoices/       # CRUD de facturas
│   └── customers/      # Lista de clientes
└── login/
    └── page.tsx        # Página de login
```

---

## ✅ Reglas de Codificación

### 1. Componentes React

```typescript
// ✅ CORRECTO: Componentes funcionales con TypeScript e interfaces
interface InvoiceProps {
  id: string;
  amount: number;
  status: "pending" | "paid";
}

export function Invoice({ id, amount, status }: InvoiceProps) {
  return <div>{/* ... */}</div>;
}

// ❌ INCORRECTO: Sin tipos, sin interfaces
export function Invoice(props) {
  return <div>{/* ... */}</div>;
}
```

### 2. Nombres y Convenciones

- **Componentes**: PascalCase (`InvoiceStatus`, `CustomersTable`)
- **Funciones**: camelCase (`fetchInvoices`, `formatCurrency`)
- **Archivos de componentes**: kebab-case (`invoice-status.tsx`)
- **Tipos/Interfaces**: PascalCase con sufijo descriptivo (`InvoiceFormState`)

### 3. Orden de Clases Tailwind

```tsx
// Orden: posicionamiento → layout → box model → tipografía → efectos
className = "relative flex w-full p-4 text-sm font-medium hover:bg-gray-100";
//         ────────  ────  ──────  ────  ─────────────────  ────────────────
//         position  layout  box    typo      effects
```

### 4. Importaciones

```typescript
// Orden de imports:
// 1. React/Next.js
import { Suspense } from "react";
import { Metadata, Viewport } from "next";

// 2. Librerías externas
import { z } from "zod";

// 3. Componentes locales (con alias @/)
import { Button } from "@/app/ui/button";

// 4. Utilidades y tipos locales
import { formatCurrency } from "@/app/lib/utils";
import type { Invoice } from "@/app/lib/definitions";
```

---

## 🔧 Patrones Obligatorios

### 1. SearchParams (Next.js 16 - ASYNC)

```typescript
// ✅ CORRECTO: await + destructuración + valores por defecto
export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const { query = "", page = "" } = (await searchParams) || {};
  const currentPage = Number(page) || 1;
  // ...
}

// ❌ INCORRECTO: Sin await (error en Next.js 16)
export default async function Page({ searchParams }) {
  const query = searchParams.query; // ❌ Error!
}
```

### 2. Params Dinámicos (Next.js 16 - ASYNC)

```typescript
// ✅ CORRECTO: params es Promise en Next.js 16
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

### 3. Server Actions

```typescript
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  customerId: z.string({ invalid_type_error: "Please select a customer." }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Amount must be greater than $0." }),
  status: z.enum(["pending", "paid"]),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// ✅ Retorno Promise<State> para useActionState
export async function createInvoice(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // ... lógica de base de datos

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// ✅ Retorno Promise<void> para actions simples (delete, etc.)
export async function deleteInvoice(id: string): Promise<void> {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to Delete Invoice.");
  }
  revalidatePath("/dashboard/invoices");
}
```

### 4. Manejo de Errores

```typescript
// ✅ CORRECTO: console.error con prefijo identificador
try {
  await sql`SELECT * FROM invoices`;
} catch (error) {
  console.error("Database Error:", error);
  throw new Error("Failed to fetch invoices.");
}

// ❌ INCORRECTO: console.log o sin prefijo
console.log(error); // ❌ No usar console.log
console.error(error); // ❌ Falta prefijo identificador
```

### 5. Suspense para Loading States

```typescript
// ✅ CORRECTO: Suspense con fallback apropiado
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";

export default async function Page() {
  return (
    <Suspense fallback={<InvoicesTableSkeleton />}>
      <InvoicesTable />
    </Suspense>
  );
}

// ⚠️ OBLIGATORIO: useSearchParams() DEBE estar en Suspense
<Suspense fallback={<div>Loading...</div>}>
  <ComponenteQueUsaUseSearchParams />
</Suspense>;
```

### 6. Metadata y Viewport (Next.js 16)

```typescript
import { Metadata, Viewport } from "next";

// ✅ Viewport separado de Metadata (obligatorio en Next.js 16)
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Invoices",
  description: "Manage your invoices",
  // ❌ NO incluir themeColor o viewport aquí
};
```

---

## 🚫 Patrones Prohibidos

### 1. console.log() en Producción

```typescript
// ❌ PROHIBIDO
console.log("data:", data);
console.log(error);

// ✅ PERMITIDO: Solo console.error con prefijo
console.error("Database Error:", error);
```

### 2. Arrow Functions como Form Actions

```typescript
// ❌ PROHIBIDO: Arrow function inline
<form action={() => deleteInvoice(id)}>

// ✅ CORRECTO: Usar .bind()
const deleteInvoiceWithId = deleteInvoice.bind(null, id);
<form action={deleteInvoiceWithId}>

// ✅ O usar hidden input
<form action={deleteInvoice}>
  <input type="hidden" name="id" value={id} />
</form>
```

### 3. any Type

```typescript
// ❌ PROHIBIDO
function processData(data: any) {}

// ✅ CORRECTO: Tipos específicos
function processData(data: Invoice[]) {}
// o unknown si necesario
function processData(data: unknown) {}
```

### 4. Middleware (Deprecado en Next.js 16)

```typescript
// ❌ DEPRECADO: middleware.ts
export const middleware = ...

// ✅ CORRECTO: proxy.ts
export const proxy = NextAuth(authConfig).auth;
```

---

## 🆕 Next.js 16 Específico

### Cambios Críticos

1. **Turbopack es el default** - No usar `--turbopack` flag
2. **middleware → proxy** - Renombrar archivo y export
3. **params/searchParams son Promises** - Siempre usar `await`
4. **themeColor/viewport** - Separar de metadata a export `viewport`
5. **Form actions** - Deben retornar `void` o `Promise<void>` (no objetos)

### Proxy (antes Middleware)

```typescript
// proxy.ts (NO middleware.ts)
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const proxy = NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
```

---

## ♿ Accesibilidad

### Labels para Screen Readers

```tsx
// ✅ OBLIGATORIO: Labels ocultos con sr-only
<label htmlFor="search" className="sr-only">
  Search
</label>
<input id="search" type="text" />
```

### Imágenes

```tsx
// ✅ OBLIGATORIO: alt descriptivo
<Image
  src={customer.image_url}
  alt={`${customer.name}'s profile picture`}
  width={28}
  height={28}
/>
```

---

## 🧪 Testing y Depuración

### Comandos

```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Producción
pnpm start
```

### MCP Next.js DevTools

Este proyecto soporta MCP (Model Context Protocol) para depuración avanzada:

```bash
# El servidor MCP está disponible automáticamente en Next.js 16
# Endpoint: /_next/mcp
```

### Errores Comunes

| Error                                               | Solución                                    |
| --------------------------------------------------- | ------------------------------------------- |
| `useSearchParams() should be wrapped in Suspense`   | Envolver componente en `<Suspense>`         |
| `params/searchParams needs await`                   | Agregar `await` al acceder                  |
| `Type 'Promise<{message}>'' not assignable to void` | Cambiar retorno de action a `Promise<void>` |
| `middleware is deprecated`                          | Renombrar a `proxy.ts`                      |

---

## 📚 Referencias

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [NextAuth.js Docs](https://authjs.dev)
- [Zod Docs](https://zod.dev)

---

> **Última actualización:** Diciembre 2025 - Next.js 16.0.6
