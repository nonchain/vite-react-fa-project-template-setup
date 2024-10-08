import { create } from "zustand";
import { persist } from "zustand/middleware";

import { StoreHook } from "@/lib/types/store.type";
import { User } from "@/lib/types/user.type";
import { NoData } from "@/lib/types/global.type";

export type AuthActions = {
  logout: () => void;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | NoData;
  user: User;
};

export type AuthStore = AuthState & AuthActions;

const authInitialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: {
    role: "",
  },
};

export const authStore = create(
  persist<AuthStore>(
    (set) => ({
      ...authInitialState,
      logout: () => set(() => ({ ...authInitialState })),
    }),
    { name: "YOUR_AUTH_STORE_NAME" }
  )
);

export const useAuthStore: StoreHook<AuthStore> = (selector) => authStore(selector);
