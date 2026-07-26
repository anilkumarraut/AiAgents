import { desc, relations, sql } from "drizzle-orm"
import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const workflowStatus = pgEnum("workflow_status", [
  "draft",
  "active",
  "archived",
])

export const runStatus = pgEnum("run_status", [
  "queued",
  "running",
  "succeeded",
  "failed",
  "canceled",
])

export const workflows = pgTable(
  "workflows",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // Clerk identifiers (`org_…` / `user_…`). Not foreign keys — Clerk owns
    // those records, we only mirror the ids to scope rows to a tenant.
    orgId: text("org_id").notNull(),
    createdBy: text("created_by").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    status: workflowStatus("status").notNull().default("draft"),
    definition: jsonb("definition")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  // Sidebar listing: one org's workflows, most recently touched first.
  // The `org_id` prefix also serves plain tenant-scoped lookups.
  (table) => [
    index("workflows_org_id_updated_at_idx").on(
      table.orgId,
      desc(table.updatedAt),
    ),
  ],
)

export const workflowRuns = pgTable(
  "workflow_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workflowId: uuid("workflow_id")
      .notNull()
      .references(() => workflows.id, { onDelete: "cascade" }),
    triggeredBy: text("triggered_by"),
    status: runStatus("status").notNull().default("queued"),
    result: jsonb("result").$type<Record<string, unknown>>(),
    error: text("error"),
    startedAt: timestamp("started_at", { withTimezone: true }),
    finishedAt: timestamp("finished_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  // Run history for one workflow, newest first.
  (table) => [
    index("workflow_runs_workflow_id_created_at_idx").on(
      table.workflowId,
      desc(table.createdAt),
    ),
  ],
)

export const workflowsRelations = relations(workflows, ({ many }) => ({
  runs: many(workflowRuns),
}))

export const workflowRunsRelations = relations(workflowRuns, ({ one }) => ({
  workflow: one(workflows, {
    fields: [workflowRuns.workflowId],
    references: [workflows.id],
  }),
}))

export type Workflow = typeof workflows.$inferSelect
export type NewWorkflow = typeof workflows.$inferInsert
export type WorkflowRun = typeof workflowRuns.$inferSelect
export type NewWorkflowRun = typeof workflowRuns.$inferInsert
