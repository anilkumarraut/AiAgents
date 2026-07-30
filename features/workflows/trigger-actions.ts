"use server"

import { tasks } from "@trigger.dev/sdk"
import { auth } from "@clerk/nextjs/server"

// Type-only import: this pulls in the task's types for `tasks.trigger` without
// bundling the task's implementation into the Next.js server build.
import type { helloWorldTask } from "@/trigger/example"

export async function runHelloWorldAction(message: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  // The task id is passed as a string; the generic only supplies the payload
  // and output types, so the task code itself is never imported at runtime.
  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message,
  })

  return handle
}
