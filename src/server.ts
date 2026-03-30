import Fastify from "fastify";
import { querier } from "./database.js";


const app = Fastify({
  logger: true
});


app.get("/", async () => {
  const tables = await querier("sqlite_schema")
    .select("*");

  return tables;

});

app.listen({
  port: 3000,
  host: "localhost"
}).then(() => {
  console.log("HTTP server running on http://localhost:3000");
});
