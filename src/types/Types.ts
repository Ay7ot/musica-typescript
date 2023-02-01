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
    featuredPlaylists: mainPlaylistType[];
    recommendedPlaylists: recommendedSongType[],
    userPlaylist: userPlaylistType[]
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
        playlistPayload: mainPlaylistType[],
        recommendedPlaylistPayload: recommendedSongType[],
        userPlaylistPayload: userPlaylistType[],
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

export type recommendedSongType = {
    name:string;
    uri: string;
    image: string;
    artist: string;
    id: string;
}

export type userPlaylistType = {
    name:string;
    uri: string;
    image: string;
    id: string;
}

export type recommendedTracksType = {
    seeds: {
        afterFilteringSize: number,
        afterRelinkingSize: number,
        href: string,
        id: string,
        initialPoolSize: number,
        type: string
        }[]
    ,
    tracks: {
        album: {
            album_type: string,
            artists: {
                external_urls: {
                    spotify: string
                },
                href: string,
                id: string,
                name: string,
                type: string,
                uri: string
            }[],
            href: string,
            id: string,
            name: string,
            type: string,
            uri: string,
            external_urls: {
                spotify: string
            },
            available_markets: string[],
            release_date: string,
            release_date_precision: string
            total_tracks: string,
            images: {
                height:number,
                width: number,
                url: string
            }[]
        }
        artists: {
            external_urls: {
                spotify: string
            },
            href: string,
            id: string,
            name: string,
            type: string,
            uri: string
        }[],
        available_markets: string[],
        disc_number: number,
        duration_ms: number,
        explicit: boolean,
        external_urls: {
            spotify: string
        },
        href: string,
        id: string,
        is_playable: boolean,
        linked_from: {
            external_urls: {
            spotify: string
            },
            href: string,
            id: string,
            type: string,
            uri: string
        },
        restrictions: {
            reason: string
        },
        name: string,
        preview_url: string,
        track_number: number,
        type: string,
        uri: string,
        is_local: boolean
    }[]
}