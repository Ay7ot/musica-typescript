import { useReducer, useContext } from "react"
import { Routes, Route } from 'react-router-dom'
import Login from "./Components/Login"
import { ActionInterface, AppContextInterface, IconType } from "./types/Types"
import { AppContext } from "./Contexts/AppContext"
import {nanoid} from 'nanoid'
import Collections from "./Components/Collections"
import Radio from "./Components/Radio"
import Videos from "./Components/Videos"
import Profile from "./Components/Profile"
import Home from "./Components/Home"
import ViewAlbumPlaylist from "./Components/ViewAlbumPlaylist"
import PlayerControl from "./Components/PlayerControl"
import ArtistInfo from "./Components/ArtistInfo"

function App() {
  
  const initialState: AppContextInterface = useContext(AppContext)
  
  function reducer(state: AppContextInterface, action: ActionInterface) {
    switch(action.type){
      case 'Login':
        return {
          ...state,
          isLoggedIn: true
        }
      case 'Logout':
        return initialState 
      case 'setAccessAndRefreshTokens':
        return {
          ...state,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken
        }
      case 'setSearchToggled':
        return {
          ...state,
          isSearchToggled: true
        }
      case 'setSearchParameter':
        return {
          ...state,
          searchParameter: action.payload.stringPayload
        }
      case 'setNavToggled':
        return {
          ...state,
          navToggled: !state.navToggled
        }
      case 'setNavActive' :
        const newIcons: IconType = [...state.icons];
        newIcons.forEach(icon => {
          if (icon.id === action.payload.iconId) {
              icon.isActive = true;
          } else {
              icon.isActive = false;
          }
        });
        return {
          ...state,
          icons: newIcons
        }
        case 'setIconNone': 
        return {
          ...state,
          icons: state.icons.map(icon=>{
            return {
              ...icon,
              isActive: false
            }
          })
        }
      case 'setHeaderMain':
        return {
          ...state,
          headerItem: {
            image: action.payload.imagePayload,
            name: action.payload.namePayload,
            href: action.payload.hrefPayload,
            description: action.payload.descriptionPayload,
            id: action.payload.idPayload,
            type: 'playlist'
          }
        }
      case 'setFeaturedPlaylists': 
        return {
          ...state, 
          featuredPlaylists: action.payload.playlistPayload
        }
      case 'setRecommendedPlaylists':
        return {
          ...state,
          recommendedPlaylists: action.payload.recommendedPlaylistPayload
        }
      case 'setUserPlaylists':
        return {
          ...state,
          userPlaylist: action.payload.userPlaylistPayload
        }
      case 'setToLikedPlaylist':
        return {
          ...state,
          collections: {
            isLikedPlaylistActive: true,
            isLikedSongsActive: false
          }
        }
      case 'setToLikedSongs':
        return {
          ...state,
          collections: {
            isLikedPlaylistActive: false,
            isLikedSongsActive: true
          }
        }
      case 'setLikedSongs':
        return {
          ...state,
          likedSongs: [
            ...state.likedSongs,
            ...action.payload.likedSongPayload
          ]
        }
      case 'setLikedSongsLength':
        return {
          ...state,
          likedSongLength: action.payload.likedSongLengthPayload
        }
      case 'setlikedAlbumsAndPlaylist':
        return {
          ...state,
          likedAlbumsAndPlaylist: [
            ...state.likedAlbumsAndPlaylist,
            ...action.payload.likedAlbumsAndPlaylistPayload
          ]
        }
      case 'setPlaylistTracks':
        return {
          ...state,
          playlistTracks: [
            ...state.playlistTracks,
            ...action.payload.playlistTracksPayload
          ]
        }
      case 'setPlaylistTracksNone':
        return {
          ...state,
          playlistTracks: []
        }
      case 'setUris':
        return {
          ...state,
          uris: action.payload.urisPayload
        }
      case 'setSearchedArtists':
        return {
          ...state,
          searchedArtists: action.payload.searchedArtistsPayload
        }
      case 'setChosenArtist':
        return {
          ...state,
          searchedArtists: [],
          searchParameter: '',
          isSearchToggled: false
        }
      case 'setSearchedArtistTopTracks':
        return {
          ...state,
          searchedArtistTopTracks: action.payload.SearchedArtistTopTracksPayload
        }
      default :
        return state
    }
  }
  
  const [mainState, dispatch] = useReducer(reducer, initialState)
  
  console.log(mainState)
  const {isLoggedIn, accessToken, refreshToken, isSearchToggled, searchParameter, icons, navToggled, headerItem, featuredPlaylists, recommendedPlaylists, userPlaylist, collections, likedSongs, likedSongLength, likedAlbumsAndPlaylist, playlistTracks, uris, searchedArtists, searchedArtistTopTracks,searchedArtistAlbums } = mainState
  return (
    <AppContext.Provider value={{isLoggedIn, dispatch, accessToken, refreshToken, isSearchToggled, searchParameter, icons, navToggled, headerItem, featuredPlaylists, recommendedPlaylists, userPlaylist, collections, likedSongs, likedSongLength, likedAlbumsAndPlaylist, playlistTracks, uris, searchedArtists, searchedArtistTopTracks, searchedArtistAlbums }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Collections" element={<Collections />} />
        <Route path="/Radio" element={<Radio />} />
        <Route path="/Videos" element={<Videos />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/viewAlbum" element={<ViewAlbumPlaylist />} />
        <Route path="/viewArtist" element={<ArtistInfo />} />
      </Routes>
      {isLoggedIn && <PlayerControl />}
    </AppContext.Provider>
  )
}

export default App
