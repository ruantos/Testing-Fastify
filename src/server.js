import Fastify from "fastify";
import cookie from "@fastify/cookie";
import { env } from "./env/index.js";
import { transactionsRoutes } from "./routes/transactions.js";
const app = Fastify({
    logger: true
});
app.register(cookie);
app.register(transactionsRoutes, {
    prefix: "transactions",
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
