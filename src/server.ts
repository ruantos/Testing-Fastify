import Fastify from "fastify";
import { querier } from "./database.js";
import { randomUUID } from "node:crypto";
import { env } from "../env/index.js";
import { transactionsRoutes } from "./routes/transactions.js";



const app = Fastify({
  logger: true
});

app.register(transactionsRoutes);

app.post("/", async () => {
  const transaction = await querier("transactions").insert({
    id: randomUUID(),
    title: "Transação de teste",
    amount: 1500
  }).returning("*");

  return transaction;
});

app.listen({
  port: env.PORT,
  host: "localhost"
}, (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log(`HTTP server running at ${address}`);
  console.log("Smile more! :)");
});
