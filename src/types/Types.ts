export interface AppContextInterface {
    isLoggedIn: boolean;
    dispatch: React.Dispatch<any>
    accessToken: string;
    refreshToken: string;
    isSearchToggled: boolean
    searchParameter: string,
    icons: IconType;
    navToggled: boolean;
    headerItem: mainHeaderType;
    featuredPlaylists: mainHeaderType[];
}

export interface ActionInterface {
    state: AppContextInterface;
    type: string;
    payload:{
        accessToken: string;
        refreshToken: string;
        stringPayload: string;
        iconId: string;
        descriptionPayload: string;
        hrefPayload: string;
        namePayload: string;
        imagePayload: string;
    }
}

export type mainHeaderType = {
    image: string;
    href: string;
    name:string;
    description: string | null;
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
];
