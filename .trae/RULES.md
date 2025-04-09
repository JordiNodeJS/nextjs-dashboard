# Reglas específicas para TRAE AI Editor

1. Ubicación preferida:
```bash
g:\DEV\learn-next\nextjs-dashboard\.trae\
```

2. Next.js Best Practices:
   - Always handle searchParams with proper TypeScript typing
   - Use async/await correctly for data fetching
   - Implement proper error boundaries and loading states
   - Follow component organization as shown in the invoices page structure
   - Maintain consistent prop destructuring patterns
   - Use Suspense for data loading states


   # Reglas específicas para TRAE AI Editor

2. Next.js Best Practices:
   - **Manejo de searchParams**: Siempre usar `await searchParams` con tipado TypeScript adecuado:
   ```typescript
   // Buen uso: await + destructuración con valores por defecto + tipado
   const { query = '', page = '' } = await searchParams || {};

   
Esta regla captura la esencia del problema y solución:
1. Requiere el uso de `await` con searchParams
2. Mantiene el tipado TypeScript apropiado
3. Incluye el patrón de destructuración con valores por defecto
4. Explica las consecuencias (renderizado dinámico)
5. Provee un ejemplo concreto del patrón correcto

El ejemplo está basado directamente en el código que resolvió tu error en <mcsymbol name="Page" filename="page.tsx" path="g:\DEV\learn-next\nextjs-dashboard\app\dashboard\invoices\page.tsx" startline="9" type="function"></mcsymbol>.