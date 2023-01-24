import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"

export default function Home() {
  
  const {dispatch} = useContext(AppContext)

  function Logout(){
    dispatch({type: "Logout"})
    window.location.assign('http://localhost:5173/')
    localStorage.clear()
  }
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center">
        <p className="text-white font-bold text-[1.1rem] tracking-wider">Hello</p>
        <button onClick={()=>Logout()} className='bg-green-500 p-2 text-white font-bold rounded-md mt-6'>
          Log Out
        </button>
    </div>
  )
}