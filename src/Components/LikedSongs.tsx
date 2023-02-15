import React from 'react'
import { useContext, useEffect } from "react"
import { AppContext } from "../Contexts/AppContext"
import SpotifyWebApi from "spotify-web-api-js"

export default function LikedSongs() {
     
  const { dispatch, accessToken, likedSongs, likedSongLength } = useContext(AppContext)
  const SpotifyApi = new SpotifyWebApi()
  SpotifyApi.setAccessToken(accessToken)

  useEffect(()=>{
    SpotifyApi.getMySavedTracks()
      .then(data=>{
        dispatch({
          type: 'setLikedSongsLength',
          payload: {
            likedSongLengthPayload: data.total
          }
        })
      }, function (err){
        console.error(err)
      })
  },[])
  
  // All liked songs don't show yet. To be fixed later
  useEffect(() => {
    if (likedSongLength > 0 && likedSongs.length === 0) {
      let offset = 0;
      const retrieveTracks = () => {
        SpotifyApi.getMySavedTracks({ limit: 50, offset: offset })
          .then(data => {
            const likedSongsData = data.items.map(item => {
              return {
                name: item.track.name,
                uri: item.track.uri,
                id: item.track.id,
                artist: item.track.artists[0].name,
                image: item.track.album.images[0].url,
              };
            });
            dispatch({
              type: "setLikedSongs",
              payload: {
                likedSongPayload: likedSongsData,
              },
            });
    
            if (data.next) {
              offset += 50;
              retrieveTracks();
            }
          }, function (err) {
            console.error(err);
          });
      };
    
      retrieveTracks();
    }
  }, [likedSongLength]);
  
  
  return (
    <div className='mt-6 px-[1px]'>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {likedSongs.map(item=>{
          return (
            <div key={item.id}>
              <img src={item.image} className='rounded-lg md:w-[200px]'/>
              <p className='mt-4 text-gray-500 font-bold text-[0.8rem]'>{item.name}</p>
              <p className='text-gray-700 font-bold text-[0.7rem]'>{item.artist}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
