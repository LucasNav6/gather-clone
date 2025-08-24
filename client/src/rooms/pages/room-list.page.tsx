import { useGetAssociatedRooms } from "../hooks/useGetAssociatedRooms"
import { EmptyRoomListPage } from "./empty-room-list.page"
import { RoomListErrorPage } from "./error-room.page"
import { LoadingRooms } from "./loading-room.page"
import { BuildingIcon } from "lucide-react"
import { Button } from "@/shared/freamwork/shadcn/ui/button"
import { useNavigate } from "react-router-dom"

export const RoomListPage = () => {
    const { isLoading: isRoomsLoading, hasError: hasRoomError, rooms } = useGetAssociatedRooms()
    const navigate = useNavigate()

    if (hasRoomError) return <RoomListErrorPage />
    if (isRoomsLoading) return <LoadingRooms />
    if (rooms.length === 0) return <EmptyRoomListPage />
    return (
        <section className="w-full max-w-3xl mx-auto space-y-6 p-2">
            <header className="flex items-center justify-between">
                <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight text-balance">
                    Your Rooms
                </h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        Join Room
                    </Button>
                    <Button variant="default">
                        Create Room
                    </Button>
                </div>
            </header>
            {rooms.map((room) => (
                <article key={room._uuid} className="border p-2 rounded-md bg-muted flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-md">
                            <BuildingIcon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div className="-space-y-1">
                            <div className="text-lg font-semibold">{room.name}</div>
                            <p className="text-muted-foreground text-xs">
                                Members: {room.members.length} | Maps: {room.maps.length}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/room/${room._uuid}`)}
                    >
                        View room →
                    </Button>
                </article>
            ))}
        </section>
    )
}