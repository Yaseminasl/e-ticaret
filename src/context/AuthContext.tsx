"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/types/user";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type UpdateProfileInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (input: UpdateProfileInput) => Promise<void>;
};

type AuthResponse = {
  user: User | null;
  message?: string;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

async function parseAuthResponse(response: Response) {
  const data = (await response.json()) as AuthResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "İşlem sırasında bir hata oluştu.");
  }

  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await parseAuthResponse(response);
        setUser(data.user);
      } finally {
        setIsLoading(false);
      }
    }

    void loadCurrentUser();
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const data = await parseAuthResponse(response);
    setUser(data.user);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const data = await parseAuthResponse(response);
    setUser(data.user);
  }, []);

  const updateProfile = useCallback(async (input: UpdateProfileInput) => {
    const response = await fetch("/api/auth/me", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const data = await parseAuthResponse(response);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      register,
      login,
      logout,
      updateProfile,
    }),
    [user, isLoading, register, login, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
