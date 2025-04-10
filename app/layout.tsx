import "@/app/ui/global.css";
import { font } from "./ui/fonts";
import ThemeToggle from "./ui/theme-toggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${font} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
