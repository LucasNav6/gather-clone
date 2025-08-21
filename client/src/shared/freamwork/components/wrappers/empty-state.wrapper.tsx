import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/ui/card"
import { Button } from "../../shadcn/ui/button"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  callToActionLabel: string
  callToAction: () => void
  secondaryActionLabel?: string
  secondaryAction?: () => void
}

export const EmptyState = ({
  icon,
  title,
  description,
  callToActionLabel,
  callToAction,
  secondaryActionLabel,
  secondaryAction,
}: EmptyStateProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Card className="border-none shadow-none w-full max-w-sm p-0">
        <CardHeader className="flex flex-col gap-4 p-0">
          <div>{icon}</div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-2 p-0">
          <Button className="w-full" onClick={callToAction}>
            {callToActionLabel}
          </Button>

          {secondaryActionLabel && secondaryAction && (
            <button
              className="text-sm text-primary underline mt-1"
              onClick={secondaryAction}
            >
              {secondaryActionLabel}
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
