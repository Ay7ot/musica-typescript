import { AppContext } from "../Contexts/AppContext"
import { useContext } from 'react'

export default function TopTracks() {
    
    const { searchedArtistTopTracks } = useContext(AppContext)
    
    return (
        <div className="mt-6 pt-6">
            <h2 className="text-gray-500 font-bold text-[1.7rem]">Top Tracks</h2>
            {searchedArtistTopTracks.map((track, index)=>{
                if(index < 5){
                    return (
                        <div key={track.id} className='h-[80px] flex gap-5 items-center'>
                            <img src={track.image} className='w-[50px] h-[50px]'/>
                            <div className="w-[90%]">
                                <p className="font-semibold text-[1rem] tracking-wide text-white">{track.name}</p>
                                <p className="text-slate-700 text-[0.9rem]">{track.artist}</p>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
