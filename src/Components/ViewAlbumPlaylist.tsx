import {useContext} from 'react'
import { useLocation } from "react-router-dom"
import NavMobile from "./NavMobile"
import Navbar from "./Navbar"
import useWindowDimensions from "../Hooks/windowDimensions"
import { AppContext } from "../Contexts/AppContext"
import App from '../App'

export default function ViewAlbumPlaylist(){
    const location = useLocation()
    const { navToggled } = useContext(AppContext)
    const {width} = useWindowDimensions()
    
    return (
        <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full  pb-[25%] sm:pb-[15%] lg:pb-[10%] 2xl:pb-[5%]">
          {navToggled ? 
            <>
              <NavMobile />
            </>:
            <>
            <Navbar/>
            <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4 ' :'mt-6'}`}>
              hello world
            </section>
            </>
          }
        </div>
    )
}