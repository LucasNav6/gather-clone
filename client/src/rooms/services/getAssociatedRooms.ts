import ApiWithInterceptor from "@/shared/adapters/axios-interceptor";
import { API_ASSOCIATED_ROOMS } from "@/shared/domain/api-url";
import type { ServiceResponse } from "@/shared/domain/interfaces/service";

interface GetAssociatedRooms {
    rooms: any[]
}

export const getAssociatedRoomsService = async (): Promise<ServiceResponse<Array<any>>> => {
    try {
        const res = await ApiWithInterceptor.get<GetAssociatedRooms>(API_ASSOCIATED_ROOMS);
        console.log(res)
        return {
            isSuccess: res.status === 200,
            data: res.data.rooms
        };
    }
    catch {
        return {
            isSuccess: false,
            data: []
        };
    }
}