import { useReducer, useState } from "react"
import { Routes, Route } from 'react-router-dom'
import Login from "./Components/Login"
import { ActionInterface, AppContextInterface } from "./types/Types"
import { AppContext } from "./Contexts/AppContext"

function App() {
  
  const initialState: AppContextInterface = {
    isLoggedIn: false,
    dispatch: () => {},
    accessToken: '',
    refreshToken: '',
    isSearchToggled: false,
    searchParameter: ''
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
          isSearchToggled: !state.isSearchToggled
        }
      case 'setSearchParameter':
        return {
          ...state,
          searchParameter: action.payload.stringPayload
        }
      default :
        return state
    }
  }
  
  const [mainState, dispatch] = useReducer(reducer, initialState)
  
  console.log(mainState)
  const {isLoggedIn, accessToken, refreshToken, isSearchToggled, searchParameter} = mainState
  return (
    <AppContext.Provider value={{isLoggedIn, dispatch, accessToken, refreshToken, isSearchToggled, searchParameter}}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
