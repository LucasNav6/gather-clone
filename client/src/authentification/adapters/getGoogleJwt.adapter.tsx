import { toast } from "sonner";
import { getGoogleJwtService } from "../services/getGoogleJwt.service";

export const getGoogleLoginJwt = async (code: string): Promise<string> => {
    if (!code) {
        toast.error("No se puede iniciar sesión con google")
        return ""
    }
    try {
        const serviceRes = await getGoogleJwtService(code);
        if (!serviceRes.isSuccess) {
            toast.error("No se pudo iniciar sessión con google")
            return ""
        }
        localStorage.setItem("ACCESS_TOKEN", serviceRes.data)
        return serviceRes.data
    } catch (err) {
        toast.error("No se pudo iniciar sessión con google")
        return '';
    }
};