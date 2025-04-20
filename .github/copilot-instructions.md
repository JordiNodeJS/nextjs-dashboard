# Instrucciones para GitHub Copilot y AI en este repositorio

## 1. Ubicación y contexto de reglas

- Las reglas específicas para la IA están en `.trae/RULES.md` y `.trae/TRAE_RULES.md`.
- Las reglas generales de codificación están en `CODING_RULES.md`.

## 2. Componentes y Tipado

- Usa siempre componentes funcionales de React con TypeScript.
- Define interfaces para las props de los componentes.
- Mantén el orden y la organización de props y destructuración consistente.
- Nombra los componentes con PascalCase.

## 3. Estilos

- Utiliza Tailwind CSS como solución principal de estilos.
- Ordena las clases: posicionamiento > layout > box model > tipografía.

## 4. Manejo de datos y errores

- Usa utilidades como `formatCurrency` para formateo monetario.
- Implementa el patrón de manejo de errores con `console.error("Database Error:", error);` y nunca uses `console.log()` en producción.
- Los tipos de datos deben estar definidos en `/app/lib/definitions.ts`.

## 5. Next.js Best Practices

- Usa `async/await` para data fetching.
- Implementa boundaries de error y estados de loading.
- Usa `Suspense` para loading states.
- Siempre maneja `searchParams` con tipado TypeScript y destructuración con valores por defecto:
  ```typescript
  const { query = "", page = "" } = (await searchParams) || {};
  ```
- Sigue la organización de componentes y carpetas como en la página de invoices.

## 6. Prohibiciones

- No uses arrow functions como actions de formulario en Server Actions (usa `.bind()` o el patrón de input hidden).
- No uses `console.log()` en producción.

## 7. Accesibilidad

- Usa labels ocultos (`sr-only`) para screen readers:
  ```tsx
  <label htmlFor="search" className="sr-only">
    Search
  </label>
  ```

## 8. Organización

- Mantén la estructura de carpetas y componentes siguiendo el ejemplo de la página de invoices.

---

Estas instrucciones aseguran que la IA genere código alineado con las reglas y convenciones del repositorio.
