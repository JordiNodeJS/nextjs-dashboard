## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

Para entender el comportamiento de `redirect()` en acciones de servidor, ver [redirect-behavior.md](./redirect-behavior.md).

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

The line you're asking about is creating a new `URLSearchParams` object from the current search parameters:

```typescript
const params = new URLSearchParams(searchParams)
```

Here's what it does:

1. `useSearchParams()` is a Next.js hook that returns the current URL's query parameters (the part after `?` in the URL)
2. `new URLSearchParams(searchParams)` creates a mutable copy of these parameters that you can modify
3. This is necessary because:
   - The original `searchParams` from the hook is read-only
   - We need to modify the parameters (set/delete) based on user input
   - We'll use this modified version to update the URL later

This pattern is common when you want to update URL search parameters without losing existing ones. The next lines in your code then modify these params based on the search input value (either setting a new 'search' parameter or removing it if empty).

The modified `params` object is then used to update the URL with the router's replace method:

```typescript
router.replace(`${pathname}?${params.toString()}`)
```

This implementation:
1. Uses `useRouter()` from Next.js to get access to the navigation methods
2. Uses `usePathname()` to get the current path without query parameters
3. Combines the current path with the updated search parameters
4. Updates the URL without causing a full page reload (client-side navigation)
5. Preserves the browser history (users can navigate back/forward)

This pattern creates a seamless search experience where the URL updates instantly as the user types, making the search state shareable and bookmarkable while maintaining application performance.