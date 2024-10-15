import React from "react";
import { AuthenticationContext } from "../contexts";

export const useAuthentication = () => {
  return React.useContext(AuthenticationContext);
};
