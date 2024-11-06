import { createContext, useContext, useState } from "react";

interface UserRoleProps {
  user: string;
}

//create context
const CheckUserRoleContext = createContext<UserRoleProps | undefined>(
  undefined
);

//use this to call whereever wanted
export const useUserRoleChecker = () => {
  const context = useContext(CheckUserRoleContext);
  if (!context) {
    throw new Error("Check User Context Provider must be within the context");
  }
  return;
};

//usethis for  provider
export const UserRoleCheckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState("");

  return (
    <CheckUserRoleContext.Provider value={{ user }}>
      {children}
    </CheckUserRoleContext.Provider>
  );
};
