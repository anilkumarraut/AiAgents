import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface WorkflowShellProps {
  workflowId: string
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="30rem" className="flex flex-col">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel
            minSize="18rem"
            className="flex flex-col items-center justify-center gap-1"
          >
            <span className="text-sm text-muted-foreground">Canvas</span>
            <span className="text-xs text-muted-foreground/70">
              {workflowId}
            </span>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize="8rem"
            minSize="6rem"
            className="flex items-center justify-center"
          >
            <span className="text-sm text-muted-foreground">Logs</span>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize="16rem"
        minSize="14rem"
        maxSize="36rem"
        className="flex items-center justify-center"
      >
        <span className="text-sm text-muted-foreground">Inspector</span>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
