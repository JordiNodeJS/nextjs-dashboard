# Reglas de Codificación para Next.js Dashboard

1. **Estructura de Proyecto**
   - Componentes UI en `/app/ui` organizados por funcionalidad
   - Datos mock en `/app/lib/placeholder-data.ts`
   - Componentes de página en directorios `app/dashboard`

2. **Convenciones de Componentes**
   - Usar componentes funcionales de React con TypeScript
   - Interfaces para props: 
     ```typescript
     interface Breadcrumb {
       label: string;
       href: string;
       active?: boolean;
     }
     ```
   - Nombrar componentes con PascalCase (ej. `InvoiceStatus`)

3. **Estilos**
   - Tailwind CSS como principal solución de estilos
   - Orden de clases: positioning > layout > visual > typography
     ```tsx
     className="relative flex flex-1 flex-shrink-0"
     ```

4. **Manejo de Datos**
   - Tipos definidos en `/app/lib/definitions.ts`
   - Formateo consistente con utilidades:
     ```typescript
     export const formatCurrency = (amount: number) => {
       return (amount / 100).toLocaleString('en-US', {
         style: 'currency',
         currency: 'USD',
       });
     };
     ```

5. **Prácticas Específicas**
   - Componentes de búsqueda deben ser client-side ('use client')
   - Tablas responsivas con versión móvil y desktop
   - Iconos de @heroicons/react con tamaño consistente (h-5 w-5)

6. **Accesibilidad**
   - Labels ocultos para screen readers:
     ```tsx
     <label htmlFor="search" className="sr-only">
       Search
     </label>
     ```

7. **Manejo de Errores**
   - Patrón de error consistente en data fetching:
     ```typescript
     try {
       //... 
     } catch (error) {
       console.error("Database Error:", error);
       throw new Error("Failed to fetch invoice.");
     }
     ```