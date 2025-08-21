import { Card, CardDescription, CardTitle } from "@/shared/freamwork/shadcn/ui/card"
import { useGetAssociatedRooms } from "../hooks/useGetAssociatedRooms"
import { EmptyRoomListPage } from "./empty-room-list.page"
import { RoomListErrorPage } from "./error-room.page"
import { LoadingRooms } from "./loading-room.page"
import { BuildingIcon, Users } from "lucide-react"
import { Button } from "@/shared/freamwork/shadcn/ui/button"
import { Fragment } from "react"

export const RoomListPage = () => {
    const { isLoading: isRoomsLoading, hasError: hasRoomError, rooms } = useGetAssociatedRooms()

    if (hasRoomError) return <RoomListErrorPage />
    if (isRoomsLoading) return <LoadingRooms />
    if (rooms.length === 0) return <EmptyRoomListPage />
    return (
        <section className="w-full max-w-3xl mx-auto space-y-4">
            {rooms.map((room) => (
                <article key={room._uuid} className="p-2 border-b last:border-0 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-md">
                            <BuildingIcon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div className="-space-y-1">
                            <div className="text-lg font-semibold">{room.name}</div>
                            <p className="text-muted-foreground text-sm">
                                Members: {room.members.length} | Maps: {room.maps.length}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => console.log("View room", room._uuid)}
                    >
                        View room →
                    </Button>
                </article>
            ))}
        </section>
    )
}