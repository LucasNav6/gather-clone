import { toast } from "sonner";
import { getGoogleUrlService } from "../services/getGoogleUrl.service";

export const getGoogleLoginUrl = async (): Promise<string> => {
    try {
        const serviceRes = await getGoogleUrlService();
        if (!serviceRes.isSuccess) toast.error("No se pudo iniciar sessión con google")
        return serviceRes.data
    } catch (err) {
        toast.error("No se pudo iniciar sessión con google")
        return '';
    }
};