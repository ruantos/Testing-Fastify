import { FastifyInstance } from "fastify";
import { querier } from "../database.js";
import { randomUUID } from "node:crypto";
import { z } from "zod";


export async function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {

    const tables = await querier("transactions")
      .select("*");
    return tables;
  
  });


  app.post("/", async (request, reply) => {

    const bodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = bodySchema.parse(request.body);

    await querier("transactions").insert({
      id: randomUUID(),
      title: title,
      amount: type === "debit" ? amount : (amount * -1)

    });
  
    return reply.status(201).send({ ok: true });

  });
}

