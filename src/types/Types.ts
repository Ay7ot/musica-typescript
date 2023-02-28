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
    userPlaylist: userPlaylistType[],
    collections: {
        isLikedPlaylistActive: boolean,
        isLikedSongsActive: boolean
    },
    likedSongs: songType[],
    likedSongLength: number,
    likedAlbumsAndPlaylist: playlistAndAlbums[],
    playlistTracks: trackType[],
    uris: string[],
    searchedArtists: artistType[],
    searchedArtistTopTracks: songType[],
    searchedArtistAlbums: artistAlbums[]
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
        idPayload: string;
        descriptionPayload: string;
        playlistPayload: mainPlaylistType[],
        recommendedPlaylistPayload: recommendedSongType[],
        userPlaylistPayload: userPlaylistType[],
        likedSongPayload: songType[],
        likedSongLengthPayload: number,
        likedAlbumsAndPlaylistPayload: playlistAndAlbums[],
        playlistTracksPayload: trackType[],
        urisPayload: string[]
        searchedArtistsPayload: artistType[],
        SearchedArtistTopTracksPayload: songType[]
    }
}
export type artistType = {
    name: string;
    id: string;
    image: string;
    followers: string,
    bio: string
}

export type IconType =  {
    name: string;
    isActive: boolean;
    id: string
}[]

export type mainPlaylistType = {
    image: string;
    name: string;
    href: string;
    description: string | null,
    id: string;
    type: string
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
    type: string
}

export type tracks = {
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
}

export type playlistTrackType = {
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
        total_tracks: number,
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
    episode: boolean,
    explicit: boolean,
    external_urls: {
        spotify: string
    },
    external_ids: {
        isrc: string
    },
    href: string,
    id: string
    popularity: number,
    name: string,
    preview_url: string,
    track: boolean,
    track_number: number,
    type: string,
    uri: string,
    is_local: boolean
}

export type TrackObjectSimplifiedWithAlbum = tracks & { album: any };

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
        album?: {
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

export type songType = {
    name: string,
    uri: string,
    artist: string,
    id: string,
    image: string
}

export type trackType = {
    name: string,
    uri: string,
    artist: string,
    id: string,
    image: string,
    duration: number
}

export type playlistAndAlbums = {
    name: string,
    href: string,
    artist: string | undefined,
    id: string,
    image: string,
    type: string
}

export type artistAlbums = {
    name: string,
    href: string,
    artist: string | undefined,
    id: string,
    image: string,
    type: string,
    releaseDate: string
}