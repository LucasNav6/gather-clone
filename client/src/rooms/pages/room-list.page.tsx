import { useGetAssociatedRooms } from "../hooks/useGetAssociatedRooms"
import { EmptyRoomListPage } from "./empty-room-list.page"
import { RoomListErrorPage } from "./error-room.page"
import { LoadingRooms } from "./loading-room.page"

export const RoomListPage = () => {
    const { isLoading: isRoomsLoading, hasError: hasRoomError, rooms } = useGetAssociatedRooms()

    if(hasRoomError) return <RoomListErrorPage />
    if(isRoomsLoading) return <LoadingRooms />
    if(rooms.length === 0) return <EmptyRoomListPage />
    return (
        <p>Holiss</p>
    )
}