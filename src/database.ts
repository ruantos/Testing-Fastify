import knex from "knex";
import type { Knex } from "knex";

const database_path = "./database/database.db"; 

export const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: database_path
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./database/migrations"
  }
};

export const querier = knex(config);
