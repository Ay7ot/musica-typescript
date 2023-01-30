export interface AppContextInterface {
    isLoggedIn: boolean;
    dispatch: React.Dispatch<any>
    accessToken: string;
    refreshToken: string;
    isSearchToggled: boolean
    searchParameter: string,
    icons: IconType;
    navToggled: boolean
}

export interface ActionInterface {
    state: AppContextInterface;
    type: string;
    payload:{
        accessToken: string;
        refreshToken: string;
        stringPayload: string;
        iconId: string;
    }
}

export type IconType =  [
    {
        name: string,
        id: string,
        isActive: boolean
    },
    {
        name: string,
        id: string,
        isActive: boolean
    },
    {
        name: string,
        id: string,
        isActive: boolean
    },
    {
        name: string,
        id: string,
        isActive: boolean
    },
    {
        name: string,
        id: string,
        isActive: boolean
    },
    {
        name: string,
        id: string,
        isActive: boolean
    }
]