import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { listWorkflows } from "@/features/workflows/data"

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center justify-between">
        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: "min-w-0",
                organizationSwitcherTrigger: "w-full",
              },
            }}
          />
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <WorkflowNav workflows={workflows} />
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:items-center">
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger:
                "w-full justify-start group-data-[collapsible=icon]:justify-center",
              userButtonOuterIdentifier: "group-data-[collapsible=icon]:hidden",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
