import Fastify from "fastify";
import { querier } from "./database.js";
import { randomUUID } from "node:crypto";

const app = Fastify({
  logger: true
});

app.get("/", async () => {
  const tables = await querier("sqlite_schema")
    .select("*");

  return tables;

});

app.post("/", async () => {
  const transaction = await querier("transactions").insert({
    id: randomUUID(),
    title: "Transação de teste",
    amount: 1500
  }).returning("*");

  return transaction;
});

app.listen({
  port: 3000,
  host: "localhost"
}, (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log(`HTTP server running at ${address}`);
});
