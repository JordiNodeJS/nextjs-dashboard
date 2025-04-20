import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "This page displays customer information.",
  openGraph: {
    title: "Customers",
    description: "This page displays customer information.",
    images: ["/customers-opengraph-image.jpg"],
  },
  icons: { icon: "/customers-favicon.ico" },
};

export default function Page() {
  return <div>Customers Pages</div>;
}
