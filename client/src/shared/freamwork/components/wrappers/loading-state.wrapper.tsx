import { Alert, AlertDescription, AlertTitle } from "../../shadcn/ui/alert"
import { Loader2Icon } from "lucide-react"

interface LoadingStateProps {
    title: string
}

export const LoadingState = ({
    title
}: LoadingStateProps) => {
    return (
        <section className="w-screen h-screen bg-background flex items-center justify-center" >
            <div className="flex flex-col items-center p-4">
                <Alert>
                    <Loader2Icon className="animate-spin" />
                    <AlertTitle className="mb-2">{title}</AlertTitle>
                    <AlertDescription>
                        This might take a few seconds. Thanks for your patience!
                    </AlertDescription>
                </Alert>
            </div>
        </section >
    )
}
