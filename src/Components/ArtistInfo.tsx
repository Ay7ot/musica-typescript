import { useLocation } from "react-router-dom"
import { AppContext } from "../Contexts/AppContext"
import { useContext, useEffect, useState } from 'react'
import NavMobile from "./NavMobile"
import Navbar from "./Navbar"
import useWindowDimensions from "../Hooks/windowDimensions"
import { artistType } from "../types/Types"
import SpotifyWebApi from "spotify-web-api-js"
import TopTracks from "./TopTracks"

export default function ArtistInfo() {
    const location = useLocation()
    const artist: artistType = location.state
    const { dispatch, navToggled, accessToken } = useContext(AppContext)
    const {width} = useWindowDimensions()
    const SpotifyApi = new SpotifyWebApi();
    SpotifyApi.setAccessToken(accessToken)
    const [artistInfo, setArtistInfo] = useState<artistType | null>()
    
    useEffect(()=>{
      SpotifyApi.getArtist(artist.id)
        .then(data=>{
          console.log(data)
          
          // setArtistInfo()
        }, function(err){
          console.error(err)
        })
    },[])
    
    useEffect(() => {
        let offset = 0;
        const retrieveTracks = () => {
          SpotifyApi.getArtistAlbums(artist.id)
            .then(data => {
              const albums = data.items.map(item => {
                return {
                  name: item.name,
                  href: item.href,
                  artist: artist.name,
                  image: item.images[0].url,
                  type: 'album',
                  // releaseDate: item.release_date
                };
              });
      
              if (data.next) {
                retrieveTracks();
              }
            }, function (err) {
              console.error(err);
            });
        };
      
        retrieveTracks();
  
    }, []);
        
    
    useEffect(()=>{
      SpotifyApi.getArtistTopTracks(artist.id, 'US')
        .then(data=>{
          console.log(data)
          const artistTopTracks = data.tracks.map(track=>{
            return {
              name: track.name,
              uri: track.uri,
              artist: track.artists[0].name,
              id: track.id,
              image: track.album.images[0].url,
            }
          })
          dispatch({
            type: 'setSearchedArtistTopTracks',
            payload: {
              SearchedArtistTopTracksPayload: artistTopTracks
            }
          })
        }, function (err){
          console.error(err)
        })
    },[])
    
    return (
      <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full pb-[150px] sm:pb-[20%] lg:pb-[7%]">
        {navToggled ? 
          <>
            <NavMobile />
          </>:
          <>
          <Navbar/>
          <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4 ' :'mt-6'}`}>
            <div className="text-center">
              <img src={artist.image} className='rounded-full'/>
              <h1 className="text-white font-bold text-[2.5rem] mt-4">{artist.name}</h1>
              <p className="text-zinc-500 font-semibold text-[1.2rem]">{artist.followers} Followers</p>
            </div>
            <TopTracks />
          </section>
          </>
        }
      </div>
    )
}
