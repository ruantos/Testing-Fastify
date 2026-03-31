import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_PATH: z.string(),
  PORT: z.number().default(3000),
});


export const env = envSchema.parse(process.env);