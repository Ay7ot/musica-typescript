import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"
import Navbar from "./Navbar"
import NavMobile from "./NavMobile"
import useWindowDimensions from "../Hooks/windowDimensions"
import HomeHeader from "./HomeHeader"
import HomeBody from "./HomeBody"

export default function Home() {
  
  const { dispatch , navToggled} = useContext(AppContext)
  const { width } = useWindowDimensions()

  function Logout(){
    dispatch({type: "Logout"})
    window.location.assign('http://localhost:5173/')
    localStorage.clear()
  }
  
  return (
    <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full">
      {navToggled ? 
        <>
          <NavMobile />
        </>:
        <>
        <Navbar/>
        <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4' :'mt-6'}`}>
          <HomeHeader />
          <HomeBody />
          <button onClick={()=>Logout()} className='mt-6 bg-green-500 p-2 text-white rounded-md font-bold'>Logout</button>
        </section>
        </>
      }
    </div>
  )
}