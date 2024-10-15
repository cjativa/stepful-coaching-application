import React, { createContext } from "react";

import { ApiService } from "../services";

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

export const AuthenticationContext = createContext<AuthenticationContextType>({
  user: null,
  login: async () => {
    return null;
  },
  logout: () => {},
});

export const AuthenticationProvider = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = async (
    tentativeUserName: string,
    type: "student" | "coach"
  ): Promise<boolean> => {
    try {
      const foundUser = await ApiService.handleUserLogin(
        tentativeUserName,
        type
      );

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
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
