export interface AppContextInterface {
    isLoggedIn: boolean;
    dispatch: React.Dispatch<any>
    accessToken: string;
    refreshToken: string;
    isSearchToggled: boolean
    searchParameter: string,
    icons: IconType;
    navToggled: boolean,
    headerItem: mainPlaylistType;
    featuredPlaylists: mainPlaylistType[]
}

export interface ActionInterface {
    state: AppContextInterface;
    type: string;
    payload:{
        accessToken: string;
        refreshToken: string;
        stringPayload: string;
        iconId: string;
        hrefPayload: string;
        namePayload: string;
        imagePayload: string;
        descriptionPayload: string;
        playlistPayload: mainPlaylistType[]
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

export type mainPlaylistType = {
    image: string;
    name: string;
    href: string;
    description: string | null
}