import React, { useEffect } from "react"
import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"
import SpotifyWebApi from "spotify-web-api-js"
import { Link } from "react-router-dom"

export default function LikedPLaylists() {
    const { dispatch, accessToken, likedAlbumsAndPlaylist } = useContext(AppContext)
    const SpotifyApi = new SpotifyWebApi()
    SpotifyApi.setAccessToken(accessToken)
    
    useEffect(()=>{
        if (likedAlbumsAndPlaylist.length === 0) {
            SpotifyApi.getMySavedAlbums({limit: 50})
            .then(data=>{
                const item = data.items.map(item=>{
                    return {
                        name: item.album.name,
                        href: item.album.href,
                        image: item.album.images[0].url,
                        id: item.album.id,
                        artist: item.album.artists[0].name                
                    } 
                })
                dispatch({
                    type: 'setlikedAlbumsAndPlaylist',
                    payload: {
                        likedAlbumsAndPlaylistPayload: item.filter(playlistorAlbum=>likedAlbumsAndPlaylist.includes(playlistorAlbum)===false)
                    }
                })
            }, function (err){
                console.error(err)
            })
        }
    },[])
    
    useEffect(()=>{
                
        if(likedAlbumsAndPlaylist.length === 0){
            SpotifyApi.getUserPlaylists()
            .then(data=>{
                const item =  data.items.map(item=>{
                    return {
                        name: item.name,
                        href: item.href,
                        image: item.images[0].url,
                        id: item.id,
                        artist: item.owner.display_name                
                    }
                })
                dispatch({
                    type: 'setlikedAlbumsAndPlaylist',
                    payload: {
                        likedAlbumsAndPlaylistPayload: item.filter(playlistorAlbum=>likedAlbumsAndPlaylist.includes(playlistorAlbum) === false)
                    }
                })
            }, function (err){
                console.error(err)
            })
        }
    },[])
    
    function setViewwAlbumNoIcon(){
        dispatch({
            type: 'setIconNone'
        })
    }
    
    return (
        <div className='mt-6 px-[1px]'>
            <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {likedAlbumsAndPlaylist.map(item=>{
                    return (
                        <div key={item.id}>
                            <Link to='/viewAlbum' state={item} onClick={setViewwAlbumNoIcon}>
                                <img src={item.image} className='rounded-lg md:w-[200px]'/>
                                <p className='mt-4 text-gray-500 font-bold text-[0.8rem]'>{item.name}</p>
                                <p className='text-gray-700 font-bold text-[0.7rem]'>{item.artist}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}