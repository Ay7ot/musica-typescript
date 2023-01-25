import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AppContext'
import SpotifyWebApi from 'spotify-web-api-js';

export default function HomeHeader() {
    const SpotifyApi = new SpotifyWebApi();
    SpotifyApi.setAccessToken(localStorage.getItem('access_token'))
    
    const { dispatch } = useContext(AppContext);
    
    useEffect(() => {
        return () => {
            
      }
    }, [])
    
    return (
        <div>
            Home Header
        </div>
    )
}
