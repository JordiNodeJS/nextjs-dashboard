import { Inter, Lusitana } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});
export const font = inter.className;

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
