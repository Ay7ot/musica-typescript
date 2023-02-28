import { createContext } from "react";
import { AppContextInterface } from "../types/Types";
import { nanoid } from 'nanoid'

export const AppContext = createContext<AppContextInterface>({
    isLoggedIn: false,
    dispatch: () => {},
    accessToken: '',
    refreshToken: '',
    isSearchToggled: false,
    searchParameter: '',
    icons: [
        {
            name: "Home",
            id: nanoid(),
            isActive: true
        },
        {
            name: "Collections",
            id: nanoid(),
            isActive: false
        },
        {
            name: "Radio",
            id: nanoid(),
            isActive: false
        },
        {
            name: "Videos",
            id: nanoid(),
            isActive: false
        },
        {
            name: "Profile",
            id: nanoid(),
            isActive: false
        },
        {
            name: "Logout",
            id: nanoid(),
            isActive: false
        }
    ],
    navToggled: false,
    headerItem: {
        image: '',
        name: '',
        description: '',
        href: '',
        id: '', 
        type: ''
    },
    featuredPlaylists: [],
    recommendedPlaylists: [],
    userPlaylist: [],
    collections: {
        isLikedPlaylistActive: true,
        isLikedSongsActive: false
    },
    likedSongs: [],
    likedSongLength: 0,
    likedAlbumsAndPlaylist: [],
    playlistTracks: [],
    uris: [],
    searchedArtists: [],
    searchedArtistTopTracks: [],
    searchedArtistAlbums: []
});