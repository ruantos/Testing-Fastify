import { randomUUID } from "node:crypto";
import { z } from "zod";
import { querier } from "../database.js";
import { checkSessionId } from "../middlewares/check-session-id.js";
export async function transactionsRoutes(app) {
    app.get("/", { preHandler: [checkSessionId] }, async (request) => {
        const { sessionId } = request.cookies;
        const transactions = await querier("transactions")
            .where("session_id", sessionId)
            .select();
        return { transactions };
    });
    app.get("/:id", { preHandler: [checkSessionId] }, async (request) => {
        const { sessionId } = request.cookies;
        const idSchema = z.object({
            id: z.string()
        });
        const params = idSchema.parse(request.params);
        const transactions = await querier("transactions")
            .where({
            "id": params.id,
            "session_id": sessionId
        })
            .first();
        return { transactions };
    });
    app.get("/summary", { preHandler: [checkSessionId] }, async (request) => {
        const { sessionId } = request.cookies;
        const summary = await querier("transactions")
            .where({
            "session_id": sessionId
        })
            .sum("amount", { as: "amount" })
            .first();
        return { summary };
    });
    app.post("/", async (request, reply) => {
        const bodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(["credit", "debit"]),
        });
        const { title, amount, type } = bodySchema.parse(request.body);
        let sessionId = request.cookies.sessionId;
        if (!sessionId) {
            sessionId = randomUUID();
        }
        reply.cookie("sessionId", sessionId, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 dias
        });
        await querier("transactions").insert({
            id: randomUUID(),
            title: title,
            amount: type === "debit" ? amount * -1 : amount,
            session_id: sessionId
        });
        return reply.status(201).send({ ok: true });
    });
}
