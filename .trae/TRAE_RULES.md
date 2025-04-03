# Reglas TRAE AI para Next.js Dashboard

## Relación con Reglas Generales
Estas reglas amplían y especializan: <mcfile name="CODING_RULES.md" path="g:\DEV\learn-next\nextjs-dashboard\CODING_RULES.md"></mcfile>

## Reglas Específicas para AI
1. **Componentes React**
```tsx
// Usar siempre functional components con TypeScript
interface BreadcrumbProps { // Seguir <mcsymbol name="Breadcrumb" filename="breadcrumbs.tsx" path="app/ui/invoices/breadcrumbs.tsx" startline="5" type="interface"></mcsymbol>
  label: string;
  href: string;
  active?: boolean;
}
Orden de clases: 
1. Posicionamiento (relative, absolute)
2. Layout (flex, grid)
3. Box model (w-full, p-4)
4. Tipografía (text-sm, font-medium)

### Ejemplos Requeridos
// Formateo monetario: <mcsymbol name="formatCurrency" filename="utils.ts" path="app/lib/utils.ts" startline="3" type="function"></mcsymbol>
${formatCurrency(123456)} → $1,234.56

### Patrones Prohibidos
- Usar console.log() en producción
+ Usar console.error() con prefijo identificador:
  console.error("Database Error:", error);