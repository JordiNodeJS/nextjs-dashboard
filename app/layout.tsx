import "@/app/ui/global.css";
import { font } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${font} antialiased`}>{children}</body>
    </html>
  );
}
