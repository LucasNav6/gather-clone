import ApiWithInterceptor from "@/shared/adapters/axios-interceptor";
import { API_ASSOCIATED_ROOMS_CREATION } from "@/shared/domain/api-url";
import type { ServiceResponse } from "@/shared/domain/interfaces/service";

interface GetAssociatedRooms {
    rooms: any[]
}

export const createNewRoomService = async ({ name, members, maxPersons }: { name: string, members?: string[], maxPersons?: number }): Promise<ServiceResponse<any>> => {
    try {
        const res = await ApiWithInterceptor.post<GetAssociatedRooms>(API_ASSOCIATED_ROOMS_CREATION, {
            name,
            members,
            maxPersons
        });
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