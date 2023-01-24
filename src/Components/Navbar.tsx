import { useContext } from 'react'
import useWindowDimensions from '../Hooks/windowDimensions'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { FaSearch } from 'react-icons/fa'
import { AppContext } from '../Contexts/AppContext'

export default function Navbar() {
    
    const {width} = useWindowDimensions()
    const {isSearchToggled, dispatch} = useContext(AppContext)
    
    
    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // dispatch({type: 'setSearchToggled'})
    }
    
    return (
        <>
            { width > 1024 ? 
                <nav>
                    
                </nav> 
                :
                <nav className='flex items-center justify-between'>
                   <div className='flex items-center sticky top-0'>
                        <div className='h-[0.8rem] flex flex-col justify-between mr-6'>
                            <div className='bg-[#808080] w-[1.3rem] h-[2px] rounded-sm'></div>
                            <div className='bg-[#808080] w-[1.3rem] h-[2px] rounded-sm'></div>
                        </div>
                        <LazyLoadImage 
                            src='logo.svg' 
                        />
                   </div>
                   <form className={`flex items-center ${isSearchToggled ? 'bg-[#dbd6d6]': ''} p-1 rounded-md`} onSubmit={handleSearch}>
                        <input 
                            type='text'
                            onChange={(e)=>{
                                dispatch({type: 'setSearchParameter', payload: {stringPayload: e.target.value}})
                            }}
                            className={`${isSearchToggled ? '' : 'hidden'} bg-transparent rounded-md text-black font-bold`}
                        />
                        <button onClick={()=>{isSearchToggled ? handleSearch : dispatch({type: 'setSearchToggled'})}} className='text-[#808080] text-[1.3rem] ml-2'><FaSearch /></button>
                   </form>
                </nav>
            }
        </>
    )
}
