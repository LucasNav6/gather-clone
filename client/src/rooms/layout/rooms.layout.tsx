import { TopNavigation } from "@/shared/freamwork/components/organisms/TopNavigation"

export const RoomsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-screen h-screen space-y-8">
            <TopNavigation />
            {children}
        </main>
    )
}