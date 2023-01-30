import { useContext } from 'react'
import useWindowDimensions from '../Hooks/windowDimensions'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaSearch } from 'react-icons/fa'
import { AppContext } from '../Contexts/AppContext'
import SpotifyWebApi from 'spotify-web-api-js'
import useIcon from '../Hooks/useIcons'

export default function Navbar() {
    
    const {width} = useWindowDimensions()
    const {isSearchToggled, dispatch, icons} = useContext(AppContext)
    
    // Come Back to build the search function and page for the site
    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // dispatch({type: 'setSearchToggled'})
    }
    
    return (
        <>
            { width > 768 ? 
                <>
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
                                    <i onClick={()=>dispatch({type: 'setNavActive', payload: {iconId: icon.id}})} className={`${icon.isActive? 'text-yellow-300' : 'text-[#595757]'} text-[1.5rem]`} key={icon.id}>{useIcon(icon.name)}</i>
                                )
                            }
                           })}
                        </div>
                        <div className='bg-[#1D2123] mt-5 px-3 py-6 h-[8rem] flex flex-col justify-between bg-[1A1E1F] rounded-full'>
                            {icons.map((icon, index)=>{
                                if(index >= 4){
                                    return (
                                        <i onClick={()=>dispatch({type: 'setNavActive', payload: {iconId: icon.id}})} className={`${icon.isActive? 'text-yellow-300' : 'text-[#595757]'} text-[1.5rem]`} key={icon.id}>{useIcon(icon.name)}</i>
                                    )
                                }
                           })}
                        </div>
                    </nav>
                </> 
                :
                <nav className='flex items-center pb-4 pt-4 justify-between sticky top-0 bg-[#0a0a0a] z-[9999] border-[0px]'>
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
