import { pgTable, varchar, serial } from "drizzle-orm/pg-core";

import { sql } from "@vercel/postgres";

import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const todoTable = pgTable("todo2", {
  id: serial("id").primaryKey(),
  task: varchar("task").notNull(),
});

export type Todo = InferSelectModel<typeof todoTable>;
export type NewTodo = InferInsertModel<typeof todoTable>;

export const db = drizzle(sql);
