import { randomUUID } from "node:crypto";
import { z } from "zod";
import { querier } from "../database.js";
export async function transactionsRoutes(app) {
    app.get("/", async () => {
        const transactions = await querier("transactions").select("*");
        return { transactions };
    });
    app.get("/:id", async (request) => {
        const idSchema = z.object({
            id: z.string()
        });
        const params = idSchema.parse(request.params);
        const transactions = await querier("transactions")
            .where("id", params.id)
            .first();
        return { transactions };
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
            amount: type === "debit" ? amount * -1 : amount,
        });
        return reply.status(201).send({ ok: true });
    });
}
