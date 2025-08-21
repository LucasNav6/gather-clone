import { useEffect, useState } from "react";
import { getAssociatedRooms } from "../adapters/getAssosiatedRooms";
import { logger } from "@/shared/useCases/logger.useCases";

export const useGetAssociatedRooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false)

  const getRooms = async () => {
    try {
      const response = await getAssociatedRooms();
      setRooms(response)
    } catch (err) {
      logger.error(err);
      setRooms([]);
      setHasError(true)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return {
    rooms,
    isLoading,
    hasError
  };
};
