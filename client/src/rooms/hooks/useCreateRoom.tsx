import { useState } from "react"

export const useCreateRoom = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return {isOpenModal, setIsOpenModal}
}