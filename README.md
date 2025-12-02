# Next.js Dashboard - Tutorial Oficial

Este proyecto es parte del **[Tutorial oficial de Next.js App Router](https://nextjs.org/learn/dashboard-app)** de Vercel.

## 📚 Recursos del Tutorial

- **Tutorial completo**: [Next.js Learn - Dashboard App](https://nextjs.org/learn/dashboard-app)
- **Capítulo inicial**: [Getting Started](https://nextjs.org/learn/dashboard-app/getting-started)
- **Repositorio starter del curso**: [vercel/next-learn/dashboard/starter-example](https://github.com/vercel/next-learn/tree/main/dashboard/starter-example)
- **Documentación de Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

## 🎯 Comando para crear el proyecto

```bash
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

## 🚀 Descripción

Esta es una aplicación de dashboard construida siguiendo el curso oficial de Next.js. El proyecto demuestra las características principales del App Router de Next.js 14+:

- **App Router** - Sistema de rutas basado en el sistema de archivos
- **Server Components** - Componentes renderizados en el servidor por defecto
- **Server Actions** - Mutaciones de datos del lado del servidor
- **Streaming** - Carga progresiva de UI con Suspense
- **Autenticación** - Implementación con NextAuth.js
- **Base de datos** - Integración con PostgreSQL

## 🛠️ Tecnologías

- [Next.js 14+](https://nextjs.org/)
- [React 18+](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)

## 📖 Notas del Proyecto

Para entender el comportamiento de `redirect()` en acciones de servidor, ver [redirect-behavior.md](./redirect-behavior.md).

### Patrón de URLSearchParams

El proyecto utiliza el siguiente patrón para manejar parámetros de búsqueda:

```typescript
const params = new URLSearchParams(searchParams);
```

Este patrón:

1. Crea una copia mutable de los parámetros de búsqueda actuales
2. Permite modificar parámetros sin perder los existentes
3. Se combina con `router.replace()` para actualizar la URL sin recargar la página

## 👤 Usuario Demo

- **Email**: user@nextmail.com
- **Password**: 123456

## 🔗 Enlaces Útiles

- [Curso Next.js Learn](https://nextjs.org/learn)
- [Documentación App Router](https://nextjs.org/docs/app)
- [Documentación Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
