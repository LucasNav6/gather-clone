import { getAssociatedRoomsService } from "../services/getAssociatedRooms";

export const getAssociatedRooms = async ():Promise<any[]> => {
    try {
        const serviceRes = await getAssociatedRoomsService();
        if (!serviceRes.isSuccess) {
            throw new Error("No se pudo obtener las habitaciones asociadas");
        }
        return serviceRes.data
    } catch (err) {
        throw new Error("No se pudo obtener las habitaciones asociadas");
    }
};