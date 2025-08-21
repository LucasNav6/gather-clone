import { useState } from "react";
import { getGoogleLoginUrl } from "../adapters/getGoogleUrl.adapter";
import { logger } from "@/shared/useCases/logger.useCases";
import { LS_AUTH_PROVIDER, LS_GOOGLE_AUTH_PROVIDER } from "@/shared/domain/localstorage";

export const useGoogleProvider = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGoogleProviderLogin = async () => {
        logger.trace("Ejecutando el proveedor de Google para obtener la URL.");
        setIsLoading(true);

        try {
            const googleLoginUrl = await getGoogleLoginUrl();
            if (!googleLoginUrl) {
                logger.error(
                    "Intentando obtener la URL de redireccionamiento, devolvió un string vacío o falsy. Retornando."
                );
                return;
            }

            logger.trace("Redirigiendo a Google URL:", googleLoginUrl);
            localStorage.setItem(LS_AUTH_PROVIDER, LS_GOOGLE_AUTH_PROVIDER);

            window.location.href = googleLoginUrl;

        } catch (err) {
            logger.error("Error en handleGoogleProviderLogin:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleGoogleProviderLogin };
};
