import React from 'react'
import { useContext, useEffect } from "react"
import { AppContext } from "../Contexts/AppContext"
import SpotifyWebApi from "spotify-web-api-js"

export default function LikedSongs() {
     
  const { dispatch, accessToken, likedSongs } = useContext(AppContext)
  const SpotifyApi = new SpotifyWebApi()
  SpotifyApi.setAccessToken(accessToken)

  useEffect(()=>{
    const offset = 50
    SpotifyApi.getMySavedTracks({limit: 50})
    .then(data=>{
      console.log({data: data, length: data.total})
      const likedSongs = data.items.map(item=>{
        return {
          name: item.track.name,
          uri: item.track.uri,
          id: item.track.id,
          artist: item.track.artists[0].name,
          image: item.track.album.images[0].url
        }
      })
      dispatch({
        type: 'setLikedSongs',
        payload: {
          likedSongPayload: likedSongs
        }
      })
    }, function (err){
      console.error(err)
    })
  },[])
  
  return (
    <div className='mt-10'>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {likedSongs.map(item=>{
          return (
            <div>
              <img src={item.image} className='rounded-lg md:w-[200px]'/>
              <p className='mt-4 text-gray-500 font-bold text-[1.1rem]'>{item.name}</p>
              <p className='text-gray-700 font-bold'>{item.artist}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
