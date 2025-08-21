import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  LS_AUTH_JWT,
  LS_AUTH_PROVIDER,
  LS_GOOGLE_AUTH_PROVIDER,
} from "@/shared/domain/localstorage"
import { ROOM_ROUTE } from "@/shared/domain/routes-url"
import { logger } from "@/shared/useCases/logger.useCases"
import { getGoogleLoginJwt } from "../adapters/getGoogleJwt.adapter"

export const useAuthentificate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const authenticate = async () => {
      setIsLoading(true)

      try {

        const accessToken = localStorage.getItem(LS_AUTH_JWT)
        if (accessToken) {
          logger.info("Access token existente en localStorage. Usuario ya logueado.")
          navigate(ROOM_ROUTE, { replace: true })
          return
        }


        const params = new URLSearchParams(location.search)
        const code = params.get("code")
        if (!code) {
          logger.warn("No existe 'code' en la URL, no se puede continuar con el login.")
          return
        }

        const authProvider = localStorage.getItem(LS_AUTH_PROVIDER)
        if (!authProvider) {
          logger.error("No se encontró LS_AUTH_PROVIDER en localStorage.")
          return
        }

        switch (authProvider) {
          case LS_GOOGLE_AUTH_PROVIDER: {
            logger.trace("Iniciando login con Google usando code:", code)

            try {
              const token = await getGoogleLoginJwt(code)

              if (!token) {
                logger.error("El backend devolvió un token vacío o inválido.")
                return
              }

              localStorage.setItem(LS_AUTH_JWT, token)
              logger.info("Login con Google exitoso. Token guardado.")
              navigate(ROOM_ROUTE, { replace: true })
            } catch (err) {
              logger.error("Error obteniendo JWT de Google:", err)
            }
            break
          }

          default:
            logger.error("Auth provider inválido:", authProvider)
            return
        }
      } finally {
        setIsLoading(false)
      }
    }

    void authenticate()
  }, [location, navigate])

  return { isLoading }
}
