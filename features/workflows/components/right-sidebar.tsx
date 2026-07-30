import { PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResizablePanel } from "@/components/ui/resizable"

export function RightSidebar() {
  return (
    <ResizablePanel
      defaultSize="16rem"
      minSize="14rem"
      maxSize="36rem"
      className="flex items-center justify-center"
    >
      <Button>
        <PlayIcon />
        RUN
      </Button>
    </ResizablePanel>
  )
}
