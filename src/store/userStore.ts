import { create } from "zustand";
import { type User } from "@/types/user.types";

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading:boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading:(loading:boolean)=>void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading:true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  setLoading:(isLoading)=>set({isLoading})
}));
