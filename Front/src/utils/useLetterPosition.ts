import { useCallback } from "react";
import api from "../api";

export const useLetterPosition = () => {
  const getLetterIndex = useCallback(async (letter: string): Promise<number> => {
    try {
      const resp = await api.get<{ index: number }>("/users/position", {
        params: { q: letter },
      });
      return resp.data.index;
    } catch (error) {
      console.error("Error fetching letter position:", error);
      return 0;
    }
  }, []);

  return { getLetterIndex };
};
