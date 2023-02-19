import { useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"
import { playlistAndAlbums, mainPlaylistType, userPlaylistType, playlistTrackType } from '../types/Types'
import { FaEllipsisV } from "react-icons/fa"
import useWindowDimensions from "../Hooks/windowDimensions"
import SpotifyWebApi from "spotify-web-api-js"
import { AppContext } from "../Contexts/AppContext"
import { RiPlayListAddFill, RiPlayCircleFill, RiHeart2Fill } from 'react-icons/ri'

export default function AlbumComponent() {

  const {width} = useWindowDimensions()
  const location = useLocation()
  const data:  mainPlaylistType | userPlaylistType | playlistAndAlbums  = location.state
  const {dispatch, playlistTracks, accessToken} = useContext(AppContext)
    
  const SpotifyApi = new SpotifyWebApi()
  SpotifyApi.setAccessToken(accessToken)
  
  useEffect(()=>{
    if(data.type === 'playlist' && playlistTracks.length === 0){
      let offset = 0
      const retrieveTracks = () => {
        SpotifyApi.getPlaylistTracks(data.id, {offset: offset})
        .then(data =>{
          const dataItems = data.items.map(item=>{
            const neededItem = item.track as unknown as playlistTrackType
            return {
              name: neededItem.name,
              uri: neededItem.uri,
              artist: neededItem.artists[0].name,
              id: neededItem.id,
              image: neededItem.album.images[0].url,
              duration: neededItem.duration_ms
            }
          })
          dispatch({
            type: 'setPlaylistTracks',
            payload: {
              playlistTracksPayload: dataItems
            }
          })
          
          if(data.next){
            offset += 100
            retrieveTracks()
          }
        }, 
        function(err){
          console.error(err)
        })
      };
      retrieveTracks()
    } 
    else if(data.type === 'album' && playlistTracks.length === 0){
      const albumImage = data.image
      let offset = 0
      const retrieveTracks = () => {
        SpotifyApi.getAlbumTracks(data.id, {offset: offset})
        .then(data =>{
          console.log(data)
          const dataItems = data.items.map(item=>{
            return {
              name: item.name,
              uri: item.uri,
              artist: item.artists[0].name,
              id: item.id,
              image: albumImage,
              duration: item.duration_ms
            }
          })
          dispatch({
            type: 'setPlaylistTracks',
            payload: {
              playlistTracksPayload: dataItems
            }
          })
          
          if(data.next){
            offset += 20
            retrieveTracks()
          }
        }, 
        function(err){
          console.error(err)
        })
      };
      retrieveTracks()
    }
  },[])
  
  return (
    <div>
      <img src={data.image} className='rounded-xl h-[350px] w-full max-w-[350px]'/>
      <div className='lg:ml-7 lg:mt-[80px]'>
        <div className='lg:w-[500px]'>
          <h2 className='text-[#A4C7C6] text-[32px] font-bold mt-6'>{data.name}</h2>
          {
            //@ts-ignore
            data.description  && <p className='text-gray-400 text-sm'>{data.description}</p>
          }
          <p className='text-gray-500 text-sm mt-3'>{playlistTracks.length} Songs - 16 Hours</p>
        </div>
        <div className='flex justify-between mt-6 md:w-[500px] lg:w-[400px]'>
            <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[15px] py-[10px]'>
              <i className='mr-2 text-yellow-500'><RiPlayCircleFill /></i>
              <p className='text-white text-xs'>Play all</p>
            </div>
            <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[15px] py-[10px]'>
            <i className='mr-2 text-yellow-500'><RiPlayListAddFill /></i>
              <p className='text-white text-xs'>Add to Collection</p>
            </div>
            <div className='flex items-center cursor-pointer bg-[#424547] rounded-full px-[15px] py-[10px]'>
            <i className='mr-2 text-yellow-500'><RiHeart2Fill /></i>
                <p className='text-white text-xs'>Like</p>
            </div>
        </div>
      </div>
      {
        width >= 1024 ?
        <div className='mt-12'>
            {playlistTracks.map(item=>{
                return (
                    <div className='flex items-center justify-between bg-[#2c2f31] p-2 rounded-xl mb-4' key={item.id}>
                        <div className='flex items-center'>
                            <img src={item.image} className='min-w-[40px] h-[40px] rounded-lg'/>
                            <img src='trackHeart.png' className='hidden lg:block ml-5'/>
                        </div>
                        <div className='w-[300px] 2xl:w-[500px] flex justify-between'>
                          <p className='text-sm text-white font-thin tracking-wide mb-0'>{item.name}</p>
                          <p className='text-xs lg:text-sm text-white font-thin tracking-wider'>{item.artist}</p>
                        </div>
                        <div className='flex items-center lg:flex-row-reverse lg:items-center'>
                            <i className='text-yellow-500 mb-[6px]'><FaEllipsisV /></i>
                            <p className='text-sm font-thin text-white mr-20'>{(item.duration / 1000 / 60).toFixed(2)}</p>
                        </div>
                    </div>
                )
            })}
        </div> : 
        <div className='mt-6 px-[1px]'>
          {playlistTracks.map(item=>{
              return (
                  <div className='flex items-center justify-between bg-[#2c2f31] p-2 rounded-xl mb-4' key={item.id}>
                      <div className='flex items-center'>
                          <div className='flex items-center'>
                              <img src={item.image} className='w-[40px] h-[40px] rounded-lg'/>
                          </div>
                          <div className='ml-3 flex flex-col'>
                              <p className='text-sm text-white font-thin tracking-wide mb-[6px]'>{item.name}</p>
                              <p className='text-xs text-white font-thin tracking-wider'>{item.artist}</p>
                          </div>
                      </div>
                      <div className='flex-col flex items-center'>
                          <i className='text-yellow-500  mb-[6px]'><FaEllipsisV /></i>
                          <p className='text-sm font-thin text-white'>{(item.duration / 1000 / 60).toFixed(2)}</p>
                      </div>
                  </div>
              )
          })}
        </div>
      }
    </div>
  )
}
