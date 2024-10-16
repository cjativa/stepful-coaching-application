import React, { createContext } from "react";

import { ApiService, LocalStorageService } from "../services";

type User = {
  name: string;
  id: string;
  phoneNumber: string;
};

interface AuthenticationContextType {
  user: User | null;
  login: (
    username: string,
    type: "student" | "coach"
  ) => Promise<boolean | null>;
  logout: () => void;
}

const USER_KEY = "user";

export const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  login: async () => {
    return null;
  },
  logout: () => {},
});

export const AuthenticationProvider = ({ children }: { children: any }) => {
  // Fetch persisted user from Local Storage. Quick but dirty solution
  // for better user experience following page refreshes
  const localPersistedUser = LocalStorageService.getItem(USER_KEY) || null;
  const [user, setUser] = React.useState<User | null>(localPersistedUser);

  const login = async (
    tentativeUserName: string,
    type: "student" | "coach"
  ): Promise<boolean> => {
    try {
      const foundUser = await ApiService.handleUserLogin(
        tentativeUserName,
        type
      );

      LocalStorageService.setItem(USER_KEY, foundUser);
      setUser(foundUser);
      return true;
    } catch (error) {
      console.error(
        `[AuthenticationProvider][login] Failed to login user with name "${tentativeUserName}"`
      );
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    LocalStorageService.removeItem(USER_KEY);
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
