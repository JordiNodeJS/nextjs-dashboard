import { NextRequest } from "next/server";
import { signIn } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const fd = new FormData();
    fd.append("email", email);
    fd.append("password", password);
    // call signIn and return a structured result
    const result = await signIn("credentials", fd);
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error("/api/debug/login POST error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
    });
  }
}
