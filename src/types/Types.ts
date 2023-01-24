export interface AppContextInterface {
    isLoggedIn: boolean;
    dispatch: React.Dispatch<any>
    accessToken: string;
    refreshToken: string;
    isSearchToggled: boolean
    searchParameter: string
}

export interface ActionInterface {
    state: AppContextInterface;
    type: string;
    payload:{
        accessToken: string;
        refreshToken: string;
        stringPayload: string;
    }
}