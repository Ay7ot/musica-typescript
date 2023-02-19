import { useContext, useEffect } from "react"
import { AppContext } from "../Contexts/AppContext"
import Navbar from "./Navbar"
import NavMobile from "./NavMobile"
import useWindowDimensions from "../Hooks/windowDimensions"
import HomeHeader from "./HomeHeader"
import HomeBody from "./HomeBody"
import PlayerControl from "./PlayerControl"
import SpotifyWebApi from "spotify-web-api-js"

export default function Home() {
  
  const { dispatch , navToggled, accessToken, uris } = useContext(AppContext)
  const SpotifyApi = new SpotifyWebApi
  SpotifyApi.setAccessToken(accessToken)
  const { width } = useWindowDimensions()
  
  useEffect(() => {
    if(uris.length === 0){
      SpotifyApi.getMyRecentlyPlayedTracks()
        .then(data=>{
          const uriData = data.items.map(item=>{
            return item.track.uri
          })
          console.log(data)
          dispatch({
            type: 'setUris',
            payload: {
              urisPayload: uriData
            }
          })
        }, function (err){
          console.error(err)
        })
    }
  }, [])
  
  return (
    <>
    <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full  pb-[25%] sm:pb-[15%] lg:pb-[10%] 2xl:pb-[5%]">
      {navToggled ? 
        <>
          <NavMobile />
        </>:
        <>
        <Navbar/>
        <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4' :'mt-6'}`}>
          <HomeHeader />
          <HomeBody />
        </section>
        </>
      }
    </div>
    {!navToggled && <PlayerControl />}
    </>
  )
}