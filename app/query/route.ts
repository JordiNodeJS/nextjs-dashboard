import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getInnerJoin() {
  const data = await sql`
    SELECT c.id, c.name, i.amount
    FROM customers c
    INNER JOIN invoices i ON c.id = i.customer_id;
  `;
  return data;
}

async function getLeftJoin() {
  const data = await sql`
    SELECT c.id, c.name, i.amount
    FROM customers c
    LEFT JOIN invoices i ON c.id = i.customer_id;
  `;
  return data;
}

async function getRightJoin() {
  const data = await sql`
    SELECT i.id, i.amount, c.name
    FROM customers c
    RIGHT JOIN invoices i ON c.id = i.customer_id;
  `;
  return data;
}

async function getFullJoin() {
  const data = await sql`
    SELECT c.name, i.amount
    FROM customers c
    FULL JOIN invoices i ON c.id = i.customer_id;
  `;
  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const joinType = searchParams.get("join");

  try {
    switch (joinType) {
      case "inner":
        return Response.json(await getInnerJoin());
      case "left":
        return Response.json(await getLeftJoin());
      case "right":
        return Response.json(await getRightJoin());
      case "full":
        return Response.json(await getFullJoin());
      default:
        return Response.json({
          message:
            "Specify join type in query parameter: ?join=inner|left|right|full",
          example: "/query?join=inner",
        });
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
