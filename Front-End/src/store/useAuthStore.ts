import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  role: "admin" | "user" | null;
  login: (username: string, role: "admin" | "user") => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      role: null,

      login: (username, role) =>
        set({
          isAuthenticated: true,
          user: username,
          role: role,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          role: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);