export interface AppContextInterface {
    isLoggedIn: boolean;
    dispatch: React.Dispatch<any>
    accessToken: string;
    refreshToken: string;
}

export interface ActionInterface {
    state: AppContextInterface;
    type: string;
    payload:{
        accessToken: string;
        refreshToken: string;
    }
}