import { createNewRoomService } from "../services/createNewRoom";

export const createNewRoom = async ({ name, members, maxPersons }: { name: string, members?: string[], maxPersons?: number }):Promise<any[]> => {
    try {
        const serviceRes = await createNewRoomService({ name, members, maxPersons });
        if (!serviceRes.isSuccess) {
            throw new Error("No se pudo obtener las habitaciones asociadas");
        }
        return serviceRes.data
    } catch (err) {
        throw new Error("No se pudo obtener las habitaciones asociadas");
    }
};