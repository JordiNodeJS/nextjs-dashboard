import { Metadata, Viewport } from "next";
import { Suspense } from "react";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

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

import { fetchCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Suspense
        fallback={<div className="animate-pulse">Loading customers...</div>}
      >
        <CustomersTable customers={customers} />
      </Suspense>
    </main>
  );
}
