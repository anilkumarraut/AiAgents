"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

import { createWorkflow } from "@/features/workflows/data"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  // The workflow list lives in the dashboard sidebar, so the layout above the
  // page has to be revalidated for the new row to show up.
  revalidatePath("/", "layout")

  // `redirect` throws, so it stays outside of anything that could catch it.
  redirect(`/workflows/${workflow.id}`)
}
