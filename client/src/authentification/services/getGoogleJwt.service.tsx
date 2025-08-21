import ApiWithInterceptor from "@/shared/adapters/axios-interceptor";
import { API_GOOGLE_AUTH_PROVIDER_JWT } from "@/shared/domain/api-url";
import type { ServiceResponse } from "@/shared/domain/interfaces/service";

interface GetGoogleJWTService {
    token: string
}

export const getGoogleJwtService = async (code:string): Promise<ServiceResponse<any>> => {
    try {
        const res = await ApiWithInterceptor.get<GetGoogleJWTService>(API_GOOGLE_AUTH_PROVIDER_JWT, {
            params: {
                code
            }
        });
        return {
            isSuccess: res.status === 200,
            data: res.data.token
        };
    }
    catch {
        return {
            isSuccess: false,
            data: null
        };
    }
}