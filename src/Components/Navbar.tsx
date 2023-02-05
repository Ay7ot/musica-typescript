import { useContext } from 'react'
import useWindowDimensions from '../Hooks/windowDimensions'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaSearch } from 'react-icons/fa'
import { AppContext } from '../Contexts/AppContext'
import SpotifyWebApi from 'spotify-web-api-js'
import useIcon from '../Hooks/useIcons'
import { Link } from 'react-router-dom'

export default function Navbar() {
    
    const { width } = useWindowDimensions()
    const {isSearchToggled, dispatch, icons} = useContext(AppContext)
    
    // Come Back to build the search function and page for the site
    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // dispatch({type: 'setSearchToggled'})
    }
    
    function navigationFunctionality(id: string){
        dispatch({
            type: 'setNavActive',
            payload: {
                iconId: id
            }
        })
    }
    
    function Logout(){
        dispatch({type: "Logout"})
        localStorage.clear()
    }
    
    return (
        <>
            { width >= 768 ? 
                <div className='sticky top-0 py-4 bg-[#100e0e] z-[999999]'>
                    <div className='flex items-center ml-1 lg:ml-4'>
                        <LazyLoadImage 
                            src='logo.svg'
                        />
                        <div className='flex ml-10 items-center'>
                            <i className='text-gray-500 mr-4 text-sm'><FaSearch /></i>
                            <input
                                className='bg-transparent searchInput text-gray-400 font-semibold'
                                type='text'
                                onChange={(e)=>{
                                    dispatch({type: 'setSearchParameter', payload: {stringPayload: e.target.value}})
                                }}
                                placeholder='Search artists'
                            />
                        </div>
                    </div>
                    <nav className='absolute mt-6 w-[5%] flex flex-col justify-between items-center p-2'>
                        <div className='bg-[#1D2123] px-3 py-6 h-[14rem] flex flex-col justify-between bg-[1A1E1F] rounded-full'>
                           {icons.map((icon, index)=>{
                            if(index < 4){
                                return (
                                    <Link to={`/${icon.name}`}> 
                                        <i onClick={()=>navigationFunctionality(icon.id)} className={`${icon.isActive? 'text-yellow-300' : 'text-[#595757]'} text-[1.5rem]`} key={icon.id}>{useIcon(icon.name)}</i>
                                    </Link>
                                )
                            }
                           })}
                        </div>
                        <div className='bg-[#1D2123] mt-5 px-3 py-6 h-[8rem] flex flex-col justify-between bg-[1A1E1F] rounded-full'>
                            {icons.map((icon, index)=>{
                                if(index >= 4){
                                   if(icon.name === 'Logout'){
                                        return (
                                            <i onClick={()=>Logout()} className={`${icon.isActive? 'text-yellow-300' : 'text-[#595757]'} text-[1.5rem]`} key={icon.id}>{useIcon(icon.name)}</i>
                                        )
                                   } else {
                                        return (
                                            <Link to={`/${icon.name}`}> 
                                                <i onClick={()=>navigationFunctionality(icon.id)} className={`${icon.isActive? 'text-yellow-300' : 'text-[#595757]'} text-[1.5rem]`} key={icon.id}>{useIcon(icon.name)}</i>
                                            </Link>
                                        )
                                   }
                                }
                           })}
                        </div>
                    </nav>
                </div> 
                :
                <nav className='flex items-center justify-between sticky top-0 bg-[#100e0e] py-4 z-[9999]'>
                   <div className='flex items-center sticky top-0'>
                        <div className='h-[0.8rem] flex flex-col justify-between mr-6' onClick={()=>dispatch({type: 'setNavToggled'})}>
                            <div className='bg-[#808080] w-[1.3rem] h-[2px] rounded-sm'></div>
                            <div className='bg-[#808080] w-[1.3rem] h-[2px] rounded-sm'></div>
                        </div>
                        <LazyLoadImage 
                            src='logo.svg' 
                        />
                   </div>
                   <form className={`flex items-center ${isSearchToggled ? 'bg-[#6b6868]': ''} p-1 rounded-md ${isSearchToggled ? 'border-2': ''} transition-all delay-200`} onSubmit={handleSearch}>
                        <input 
                            type='text'
                            onChange={(e)=>{
                                dispatch({type: 'setSearchParameter', payload: {stringPayload: e.target.value}})
                            }}
                            placeholder='Search artists'
                            className={`${isSearchToggled ? '' : 'hidden'} bg-transparent searchInput rounded-md text-white font-bold`}
                        />
                        <button onClick={()=>{isSearchToggled ? handleSearch : dispatch({type: 'setSearchToggled'})}} className={`${isSearchToggled ? 'text-[#251d1d]' : 'text-[#808080]'} text-[1.3rem] ml-2`}><FaSearch /></button>
                   </form>
                </nav>
            }
        </>
    )
}

