import ApiWithInterceptor from "@/shared/adapters/axios-interceptor";
import { API_GOOGLE_AUTH_PROVIDER_URL } from "@/shared/domain/api-url";
import type { ServiceResponse } from "@/shared/domain/interfaces/service";

interface GetGoogleUrlService {
    url: string
}

export const getGoogleUrlService = async (): Promise<ServiceResponse<string>> => {
    try {
        const res = await ApiWithInterceptor.get<GetGoogleUrlService>(API_GOOGLE_AUTH_PROVIDER_URL);
        return {
            isSuccess: res.status === 200,
            data: res.data.url
        };
    }
    catch {
        return {
            isSuccess: false,
            data: ""
        };
    }
}