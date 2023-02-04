import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../Contexts/AppContext'
import { BiArrowBack } from 'react-icons/bi'
import useIcon from '../Hooks/useIcons'

export default function NavMobile() {
    
    const {dispatch, icons} = useContext(AppContext)
    
    return (
        <div className='pt-10'>
           <i onClick={()=>dispatch({type: 'setNavToggled'})} className='text-[#808080] font-extrabold text-[2.5rem]'><BiArrowBack /></i>
           <nav className='mt-10 h-[60vh] flex flex-col justify-between'>
                {icons.map((icon) => {
                    return (
                        <div className='flex items-center ml-10' key={icon.id} onClick={()=>dispatch({type: 'setNavActive', payload: {iconId: icon.id}})}>
                            <i className={`${icon.isActive ? 'text-yellow-400' : 'text-[#808080]'} text-[2rem]`}>{useIcon(icon.name)}</i>
                            <p className={`${icon.isActive ? 'text-white' : 'text-[#898983]'} text-[1.2rem] font-bold tracking-wide ml-3`}>{icon.name}</p>
                        </div>
                    )
                })}

           </nav>
        </div>
    )
}
