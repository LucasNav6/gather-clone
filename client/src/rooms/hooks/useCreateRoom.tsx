import { useState } from "react"
import { createNewRoom } from "../adapters/createNewRoom";

export const useCreateRoom = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleCreateRoom = async ({
        name, members, maxPersons
    }: {
        name: string, members?: string[], maxPersons?: number
    }) => {
        try {
            const newRoom = await createNewRoom({ name, members, maxPersons });
            console.log("Room created:", newRoom);
            setIsOpenModal(false);
        }
        catch (error) {
            console.error("Error creating room:", error);
        }
    }

    return { isOpenModal, setIsOpenModal, handleCreateRoom }
}