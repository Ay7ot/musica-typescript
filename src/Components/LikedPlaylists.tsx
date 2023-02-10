import React, { useEffect } from "react"
import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"
import SpotifyWebApi from "spotify-web-api-js"

export default function LikedPLaylists() {
    const { dispatch, accessToken } = useContext(AppContext)
    const SpotifyApi = new SpotifyWebApi()
    
    
    return (
        <div className="mt-10">
            Liked Playlists 
        </div>
    )
}