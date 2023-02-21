import NavMobile from './NavMobile'
import Navbar from './Navbar'
import useWindowDimensions from '../Hooks/windowDimensions'
import { AppContext } from '../Contexts/AppContext'
import { useContext } from 'react'
import LikedPLaylists from './LikedPlaylists'
import LikedSongs from './LikedSongs'
import PlayerControl from './PlayerControl'

export default function Collections() {
  
    const {width} = useWindowDimensions()
    const { navToggled, collections, dispatch } = useContext(AppContext)
    
    return (
      <>
      <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full  pb-[25%] sm:pb-[15%] lg:pb-[7%]">
        {navToggled ? 
          <>
            <NavMobile />
          </>:
          <>
          <Navbar/>
          <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4 ' :'mt-6'}`}>
            <div className='grid grid-cols-2 gap-5 sm:flex sticky top-[65px] bg-[#100e0e] pb-4 pt-[2px]'>
              <button className={`p-2 text-[#949798] text-[14px] border-[1px] rounded-full md:px-4 ${collections.isLikedPlaylistActive ? 'bg-[#FACD66] border-[#FACD66] text-[#1D2123]' : ''}`} onClick={()=>dispatch({type: 'setToLikedPlaylist'})}>My Collections</button>
              <button className={`p-2 text-[#949798] text-[14px] border-[1px] rounded-full md:px-4  ${collections.isLikedSongsActive ? 'bg-[#FACD66] border-[#FACD66] text-[#1D2123]' : ''}`} onClick={()=>dispatch({type: 'setToLikedSongs'})}>My Likes</button>
            </div>
            {
              collections.isLikedPlaylistActive ? <LikedPLaylists /> : <LikedSongs />
            }
          </section>
          </>
        }
      </div>
      {/* {!navToggled && <PlayerControl />} */}
      </>
    )
}
