import { createContext, useState, FC, Dispatch, SetStateAction } from "react";
export const authContext = createContext(null);
export const setAuthContext = createContext<Dispatch<SetStateAction<string>>>(
  () => undefined
);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const [auth, setAuth] = useState<string>(null);

  return (
    <authContext.Provider value={auth}>
      <setAuthContext.Provider value={setAuth}>
        {props.children}
      </setAuthContext.Provider>
    </authContext.Provider>
  );
};
