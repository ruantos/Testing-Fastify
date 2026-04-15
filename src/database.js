import "dotenv/config";
import knex from "knex";
import { env } from "./env/index.js";
export const config = {
    client: "sqlite3",
    connection: {
        filename: env.DATABASE_PATH
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./database/migrations"
    }
};
export const querier = knex(config);
