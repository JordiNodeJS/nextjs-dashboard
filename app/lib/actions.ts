"use server";
/* 
El enrutamiento es automático - La función createInvoice definida con "use server" 
se convierte automáticamente en un endpoint interno
*/
import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from 'next/cache';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
   id: z.string(),
   customerId: z.string(),
   amount: z.coerce.number(),
   status: z.enum(['pending', 'paid'], {
      required_error: 'Status is required.'
   }),
 date: z.string().datetime()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const { customerId, amount, status } = CreateInvoice.parse(data); ;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    const invoice = { customerId, amount: amountInCents, status, date };

    // await sql`
    // INSERT INTO invoices ${sql(invoice)}`;
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;	
    
    // Revalidate the invoices page to show the new invoice
    revalidatePath('/dashboard/invoices');
}