import { FastifyInstance } from "fastify";
import { querier } from "../database.js";

export function transactionsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const tables = await querier("transactions")
      .select("*");
    return tables;
  
  });

}
