import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../Contexts/AppContext'
import { BiArrowBack } from 'react-icons/bi'
import useIcon from '../Hooks/useIcons'
import { Link } from 'react-router-dom'

export default function NavMobile() {
    
    const { dispatch, icons } = useContext(AppContext)
    
    function navigationFunctionality(id: string){
        dispatch({
            type: 'setNavActive',
            payload: {
                iconId: id
            }
        })
        dispatch({
            type: 'setNavToggled'
        })
    }
    
    function Logout(){
        dispatch({type: "Logout"})
        localStorage.clear()
    }
    
    return (
        <div className='pt-10'>
           <i onClick={()=>dispatch({type: 'setNavToggled'})} className='text-[#808080] font-extrabold text-[2.5rem]'><BiArrowBack /></i>
           <nav className='mt-10 h-[60vh] flex flex-col justify-between'>
                {icons.map((icon) => {
                    if(icon.name === 'Logout'){
                        return (
                            <div className='flex items-center ml-10' key={icon.id} onClick={()=>Logout()}>
                                <i className={`${icon.isActive ? 'text-yellow-400' : 'text-[#808080]'} text-[2rem]`}>{useIcon(icon.name)}</i>
                                <p className={`${icon.isActive ? 'text-white' : 'text-[#898983]'} text-[1.2rem] font-bold tracking-wide ml-3`}>{icon.name}</p>
                            </div>
                        )
                    }else {
                        return (
                            <Link to={`/${icon.name}`} key={icon.id}>
                                <div className='flex items-center ml-10' onClick={()=>navigationFunctionality(icon.id)}>
                                    <i className={`${icon.isActive ? 'text-yellow-400' : 'text-[#808080]'} text-[2rem]`}>{useIcon(icon.name)}</i>
                                    <p className={`${icon.isActive ? 'text-white' : 'text-[#898983]'} text-[1.2rem] font-bold tracking-wide ml-3`}>{icon.name}</p>
                                </div>
                            </Link>
                        )
                    }
                })}
           </nav>
        </div>
    )
}
