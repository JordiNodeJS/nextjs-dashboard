"use server";
/* 
El enrutamiento es automático - La función createInvoice definida con "use server" 
se convierte automáticamente en un endpoint interno
*/
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer 👏.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string().datetime(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Validate form data
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // Return early if form is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");

  // Note: redirect throws so this won't actually execute
  return { message: "Invoice created successfully" };
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.log("Database Error: Failed to Update Invoice.");
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string): Promise<void> {
  // throw new Error('Failed to Delete Invoice');

  // Delete invoices associated with the invoice
  try {
    await sql`
      DELETE FROM invoices
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Database Error: Failed to Delete Invoice.");
  }

  revalidatePath("/dashboard/invoices");
}

/**
 * Authenticates a user using credentials from form data.
 *
 * @param prevState - Previous state string, if any
 * @param formData - Form data containing credentials for authentication
 * @returns A string message if authentication fails, undefined if successful
 * @throws {Error} Re-throws any non-AuthError exceptions
 *
 * @example
 * ```ts
 * const result = await authenticate(undefined, formData);
 * if (result) {
 *   // Handle authentication error
 *   console.error(result);
 * }
 * ```
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const email = formData.get("email");
  console.log("authenticate(): called for email=", email);
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.error("authenticate() server action error:", error);
    // If signIn throws a Response (e.g. a redirect Response), rethrow it so the client can follow
    if (typeof Response !== "undefined" && error instanceof Response) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
