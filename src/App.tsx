import { useReducer, useState , useEffect} from "react"
import { Routes, Route } from 'react-router-dom'
import Login from "./Components/Login"
import { ActionInterface, AppContextInterface, IconType, mainHeaderType } from "./types/Types"
import { AppContext } from "./Contexts/AppContext"
import {nanoid} from 'nanoid'

function App() {
  
  const initialState: AppContextInterface = {
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
        name: "Collection",
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
      href: '',
      name: '',
      description: ''
    },
    featuredPlaylists: []
  }
  
  function reducer(state: AppContextInterface, action: ActionInterface) {
    switch(action.type){
      case 'Login':
        return {
          ...state,
          isLoggedIn: true
        }
      case 'Logout':
        return {
          ...state,
          isLoggedIn: false,
        } 
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
      case 'setHeaderMain':
        return {
          ...state,
          headerItem: {
            ...state.headerItem,
            description: action.payload.descriptionPayload,
            href: action.payload.hrefPayload,
            image: action.payload.imagePayload,
            name: action.payload.namePayload,
          }
        }
      case 'setFeaturedPlaylists':
        return {
          ...state,
          featuredPlaylists: [
            ...state.featuredPlaylists,
            {
              description: action.payload.descriptionPayload,
              href: action.payload.hrefPayload,
              image: action.payload.imagePayload,
              name: action.payload.namePayload,
            }
          ]
        }
      default :
        return state
    }
  }
  
  const [mainState, dispatch] = useReducer(reducer, initialState)

  console.log(mainState)
  const {isLoggedIn, accessToken, refreshToken, isSearchToggled, searchParameter, icons, navToggled, headerItem, featuredPlaylists} = mainState

  return (
    <AppContext.Provider 
        value={{
          isLoggedIn, dispatch, accessToken, refreshToken, isSearchToggled, searchParameter, icons, navToggled, headerItem, featuredPlaylists
        }}
      >
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
