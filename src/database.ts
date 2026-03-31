import { knex, Knex } from "knex";

const database_path = "./database/database.db"; 

export const config: Knex.Config = {
  client: "sqlite",
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
