import { AppContext } from "../Contexts/AppContext"
import { useContext } from 'react'

export default function TopTracks() {
    
    const { searchedArtistTopTracks } = useContext(AppContext)
    
    return (
        <div>
            {searchedArtistTopTracks.map(track=>{
                return (
                    <div key={track.id} className='h-[100px] flex items-center'>
                        <img src={track.image} className='w-[70px] h-[70px]'/>
                        
                    </div>
                )
            })}
        </div>
    )
}
