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

import { fetchCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";

export default async function Page() {
  const customers = await fetchCustomers();
  
  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}
