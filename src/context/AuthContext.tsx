"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
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

type StoredUser = User & {
  password: string;
};

type AuthContextValue = {
  user: User | null;
  register: (input: RegisterInput) => void;
  login: (input: LoginInput) => void;
  logout: () => void;
};

const USERS_STORAGE_KEY = "users";
const SESSION_STORAGE_KEY = "sessionUserId";

export const AuthContext = createContext<AuthContextValue | null>(null);

function getStorageSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  return [
    window.localStorage.getItem(USERS_STORAGE_KEY) ?? "[]",
    window.localStorage.getItem(SESSION_STORAGE_KEY) ?? "",
  ].join("|");
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
}

function getStoredUsers(): StoredUser[] {
  const storedUsers = window.localStorage.getItem(USERS_STORAGE_KEY);

  if (!storedUsers) {
    return [];
  }

  return JSON.parse(storedUsers) as StoredUser[];
}

function setStoredUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  window.dispatchEvent(new StorageEvent("storage", { key: USERS_STORAGE_KEY }));
}

function setSessionUserId(userId: string | null) {
  if (userId) {
    window.localStorage.setItem(SESSION_STORAGE_KEY, userId);
  } else {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  window.dispatchEvent(
    new StorageEvent("storage", { key: SESSION_STORAGE_KEY }),
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const storageSnapshot = useSyncExternalStore(
    subscribeToStorage,
    getStorageSnapshot,
    () => "",
  );

  const user = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    storageSnapshot;

    const users = getStoredUsers();
    const sessionUserId = window.localStorage.getItem(SESSION_STORAGE_KEY);
    const currentUser = users.find(
      (storedUser) => storedUser.id === sessionUserId,
    );

    if (!currentUser) {
      return null;
    }

    const { password, ...publicUser } = currentUser;
    password;

    return publicUser;
  }, [storageSnapshot]);

  const register = useCallback((input: RegisterInput) => {
    const users = getStoredUsers();
    const normalizedEmail = input.email.trim().toLocaleLowerCase("tr-TR");
    const existingUser = users.find(
      (userItem) => userItem.email === normalizedEmail,
    );

    if (existingUser) {
      throw new Error("Bu e-posta adresi zaten kayıtlı.");
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      email: normalizedEmail,
      password: input.password,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    setStoredUsers([...users, newUser]);
    setSessionUserId(newUser.id);
  }, []);

  const login = useCallback((input: LoginInput) => {
    const users = getStoredUsers();
    const normalizedEmail = input.email.trim().toLocaleLowerCase("tr-TR");

    const existingUser = users.find(
      (userItem) =>
        userItem.email === normalizedEmail &&
        userItem.password === input.password,
    );

    if (!existingUser) {
      throw new Error("E-posta veya şifre hatalı.");
    }

    setSessionUserId(existingUser.id);
  }, []);

  const logout = useCallback(() => {
    setSessionUserId(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
    }),
    [user, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
