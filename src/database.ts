import knex from "knex";

const database_path = "./tmp/database.db"; 

export const querier = knex({
  client: "sqlite",
  connection: {
    filename: database_path
  }
});