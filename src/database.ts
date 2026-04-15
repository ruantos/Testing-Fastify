import "dotenv/config";
import knex from "knex";
import type { Knex } from "knex";
import { env } from "./env/index.js";


export const config: Knex.Config = {
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
