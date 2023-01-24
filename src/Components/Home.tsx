import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"
import Navbar from "./Navbar"

export default function Home() {
  
  const {dispatch} = useContext(AppContext)

  function Logout(){
    dispatch({type: "Logout"})
    window.location.assign('http://localhost:5173/')
    localStorage.clear()
  }
  return (
    <div className="bg-[#1E1E1E] min-h-screen p-6 font-quicksand">
      <Navbar />
      <button onClick={()=>Logout()} className='mt-6 bg-green-500 p-2 text-white rounded-md font-bold'>Logout</button>
    </div>
  )
}