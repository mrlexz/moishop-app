import {
  GetAuthStatusDocument,
  GetAuthStatusQuery,
} from "@/app/__generated__/graphql";
import { StorageKeys } from "@/constants/StorageKeys";
import { useLazyQuery, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type UserData = NonNullable<GetAuthStatusQuery["getAuthStatus"]>["user"];
type GlobalContextType = {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user?: UserData;
  logout: () => void;
};

const GlobalContext = createContext<GlobalContextType>({
  isLogged: false,
  setIsLogged: () => {},
  user: null,
  logout: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] =
    useState<NonNullable<GetAuthStatusQuery["getAuthStatus"]>["user"]>(null);
  const [getUserStatus, { called, loading }] = useLazyQuery(
    GetAuthStatusDocument
  );

  const logout = async () => {
    await AsyncStorage.removeItem(StorageKeys.TOKEN);
    setIsLogged(false);
    setUserData(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const userStatus = await getUserStatus();
        if (userStatus?.data?.getAuthStatus?.success) {
          setIsLogged(true);
          setUserData(userStatus?.data?.getAuthStatus?.user);
        }
      } catch (error) {}
    })();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user: userData,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
