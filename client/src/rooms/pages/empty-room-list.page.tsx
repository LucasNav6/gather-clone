import { EmptyState } from "@/shared/freamwork/components/wrappers/empty-state.wrapper"
import { ModalWrapper } from "@/shared/freamwork/components/wrappers/modal-wrapper"
import { Bird } from "lucide-react"
import React from "react"
import { useCreateRoom } from "../hooks/useCreateRoom"

export const EmptyRoomListPage = () => {
    const {isOpenModal,setIsOpenModal} = useCreateRoom()
    return (
        <React.Fragment>
            <EmptyState
                icon={<Bird size={64} />}
                title="Looks like you're all alone..."
                description="You don't have any rooms yet. Create one or join one to start chatting with others."
                callToActionLabel="Create Room"
                callToAction={() => setIsOpenModal(true)}
                secondaryActionLabel="Join Room"
                secondaryAction={() => console.log("Join Room clicked")}
            />
            <ModalWrapper isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
                <p></p>
            </ModalWrapper>
        </React.Fragment>
        
    )
}