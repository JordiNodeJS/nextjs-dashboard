# Comportamiento de redirect() en Next.js

## Explicación Técnica

La implementación actual es correcta a pesar de la aparente discrepancia de tipos debido a:

```typescript
export async function createInvoice(...): Promise<State> {
  // ...
  redirect('/dashboard/invoices'); // Lanza un error especial NEXT_REDIRECT
  return { ... }; // Nunca se ejecuta
}
```

## ¿Por qué funciona?

- `redirect()` de Next.js lanza un error especial que:
  - Es interceptado por el manejador de acciones del servidor de Next.js
  - Dispara una respuesta HTTP 303 (redirección)
  - Previene cualquier ejecución adicional de código
- El tipo de retorno `Promise<State>` solo importa para:
  - Errores de validación (retornados temprano)
  - Errores de base de datos (retornados en catch)
  - El camino exitoso nunca retorna State debido al redirect

## Mejores Prácticas

```typescript
// Opción A: Mantener la implementación actual (recomendado)
export async function createInvoice(...): Promise<State> {
  // ... código existente ...
}

// Opción B: Hacer los tipos más precisos
export async function createInvoice(...): Promise<State | never> {
  // ... código existente ...
}
```

La implementación actual es correcta y sigue las convenciones de Next.js. El sistema de tipos entiende que `redirect()` produce una situación de retorno "never", aunque no esté explícitamente tipado así en la firma de la función.