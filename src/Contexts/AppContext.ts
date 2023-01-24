import { createContext } from "react";
import { AppContextInterface } from "../types/Types";

export const AppContext = createContext<AppContextInterface>({
    isLoggedIn: false,
    dispatch: () => {},
    accessToken: '',
    refreshToken: '',
    isSearchToggled: false,
    searchParameter: ''
});