import React from 'react'
import NavMobile from './NavMobile'
import Navbar from './Navbar'
import useWindowDimensions from '../Hooks/windowDimensions'
import { AppContext } from '../Contexts/AppContext'
import { useContext } from 'react'

export default function Collections() {
    const {width} = useWindowDimensions()
    
    const { navToggled } = useContext(AppContext)
    
    return (
        <div className="bg-[#100e0e] min-h-screen p-6 pt-0 font-quicksand w-full">
          {navToggled ? 
            <>
              <NavMobile />
            </>:
            <>
            <Navbar/>
            <section className={`${width > 768 ? 'relative left-[5rem] mt-[2.1rem] w-[85vw] sm:mt-4' :'mt-6'}`}>
              
            </section>
            </>
          }
    </div>
      )
}
