import "server-only"

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Run `neon env pull` to write the linked branch's variables into .env.local.",
  )
}

// Pooled URL over HTTP: one round trip per query, no connection to keep warm.
// For interactive transactions, swap to the WebSocket `Pool` from
// `@neondatabase/serverless` with `drizzle-orm/neon-serverless`.
const sql = neon(process.env.DATABASE_URL)

export const db = drizzle({ client: sql, schema })

export * from "./schema"
