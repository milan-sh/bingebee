import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { apiClient } from "@/api/index.api";

export const useInitAuth = () => {
  const { setUser, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await apiClient.get("/users/me");
        setUser(data.data.user);
      } catch (err) {
        const status = (err as Error & { status?: number }).status;
        if (status !== 401) {
          clearUser();
        } else {
          try {
            const { data } = await apiClient.post("/users/refresh-token");
            setUser(data.data.user);
          } catch {
            clearUser();
          }
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);
};
