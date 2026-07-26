import { defineConfig } from "drizzle-kit"

// drizzle-kit runs outside Next.js, so nothing loads `.env.local` for us.
process.loadEnvFile(".env.local")

// Migrations need a direct connection — PgBouncer (the `-pooler` host) can't
// hold the session state that DDL and advisory locks rely on.
const url = process.env.DATABASE_URL_UNPOOLED

if (!url) {
  throw new Error(
    "DATABASE_URL_UNPOOLED is not set. Run `neon env pull` to write the linked branch's variables into .env.local.",
  )
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dbCredentials: { url },
  strict: true,
  verbose: true,
})
