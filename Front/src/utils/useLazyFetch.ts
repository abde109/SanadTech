import { useCallback } from "react";
import api from "../api";
import { UserSet } from "../models/userModel";

export const useLazyFetch = () => {
  const getSlice = useCallback(async (offset: number, limit: number): Promise<UserSet> => {
    try {
      const response = await api.get<UserSet>("/users/lazy", {
        params: { offset, limit }
      });
      return response.data;
    } catch (err) {
      console.error("useLazyFetch error:", err);
      return { total: 0, data: [] };
    }
  }, []);
  return { getSlice };
};
