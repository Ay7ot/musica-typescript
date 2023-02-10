import NavMobile from './NavMobile'
import Navbar from './Navbar'
import useWindowDimensions from '../Hooks/windowDimensions'
import { AppContext } from '../Contexts/AppContext'
import { useContext } from 'react'
import LikedPLaylists from './LikedPlaylists'
import LikedSongs from './LikedSongs'

export default function Collections() {
    const {width} = useWindowDimensions()
    
    const { navToggled, collections, dispatch } = useContext(AppContext)
    
    return (
        <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full">
          {navToggled ? 
            <>
              <NavMobile />
            </>:
            <>
            <Navbar/>
            <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4' :'mt-6'}`}>
              <div className='grid grid-cols-2 gap-5 sm:flex'>
                <button className={`p-2 text-[#949798] text-[14px] border-[1px] rounded-full ${collections.isLikedPlaylistActive ? 'bg-[#FACD66] border-[#FACD66] text-[#1D2123]' : ''}`} onClick={()=>dispatch({type: 'setToLikedPlaylist'})}>My Collections</button>
                <button className={`p-2 text-[#949798] text-[14px] border-[1px] rounded-full  ${collections.isLikedSongsActive ? 'bg-[#FACD66] border-[#FACD66] text-[#1D2123]' : ''}`} onClick={()=>dispatch({type: 'setToLikedSongs'})}>My Likes</button>
              </div>
              {
                collections.isLikedPlaylistActive ? <LikedPLaylists /> : <LikedSongs />
              }
            </section>
            </>
          }
    </div>
      )
}
