import { Knex } from "knex";

declare module "knex/types/tables" {
  interface Transaction {
    id: string;
    title: string;
    amount: number;
    created_at: string;
    session_id: string | null;
  }

  interface Tables {
    transactions: Knex.CompositeTableType<
      Transaction,
      Pick<Transaction, "id" | "title" | "amount" | "session_id">,
      Partial<Omit<Transaction, "id" | "created_at">>
    >;
  }
}
