import {useContext} from 'react'
import NavMobile from "./NavMobile"
import Navbar from "./Navbar"
import useWindowDimensions from "../Hooks/windowDimensions"
import { AppContext } from "../Contexts/AppContext"
import AlbumComponent from './AlbumComponent'
import PlayerControl from './PlayerControl'


export default function ViewAlbumPlaylist(){
  const { navToggled } = useContext(AppContext)
  const {width} = useWindowDimensions()
    
  return (
    <>
    <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full  pb-[25%] sm:pb-[15%] lg:pb-[10%] 2xl:pb-[5%]">
      {navToggled ? 
        <>
          <NavMobile />
        </>:
        <>
        <Navbar/>
        <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4 ' :'mt-6'}`}>
          <AlbumComponent />
        </section>
        </>
      }
    </div>
    {!navToggled && <PlayerControl />}
    </>
  )
}