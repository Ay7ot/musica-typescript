import NavMobile from './NavMobile'
import Navbar from './Navbar'
import useWindowDimensions from '../Hooks/windowDimensions'
import { AppContext } from '../Contexts/AppContext'
import { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa'

export default function SearchPage() {
  
    const {width} = useWindowDimensions()
    const { navToggled, searchedArtists, dispatch } = useContext(AppContext)
    const navigate = useNavigate()
    
    function goBack(){
        return navigate(-1)
    }
    
    if(searchedArtists.length === 0){
        return <Navigate to='/Home' />
    }
    
    return (
      <>
      <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full pb-[150px] sm:pb-[20%] lg:pb-[7%]">
        {navToggled ? 
          <>
            <NavMobile />
          </>:
          <>
          <Navbar/>
          <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4 ' :'mt-6'}`}>
            <i onClick={goBack} className='text-[1.5rem] text-gray-500'><FaBackward /></i>
            {searchedArtists.length > 0 && 
                    <div className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4' :'mt-6'}`}>
                        {searchedArtists.map(artist=>{
                            return (
                                <Link to='/viewArtist' state={artist} key={artist.id}>
                                    <div className='p-2 flex items-center bg-slate-700 mb-6 gap-5 rounded-lg' onClick={()=>dispatch({type: 'setChosenArtist'})}>
                                        <img src={artist.image} className='rounded-full w-[55px] h-[55px]'/>
                                        <div>
                                            <p className='font-bold text-zinc-200 tracking-wide text-[1.1rem]'>{artist.name}</p>
                                            <p className='text-white'>{artist.followers} Followers</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                }
          </section>
          </>
        }
      </div>
      </>
    )
}
