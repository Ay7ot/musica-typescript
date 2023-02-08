import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"
import useWindowDimensions from "../Hooks/windowDimensions"
import SpotifyPlayer from 'react-spotify-web-playback'


export default function PlayerControl() {
    
    const { dispatch, accessToken } = useContext(AppContext)
   
    return (
        <div className="fixed bottom-0 w-[100vw] backdrop-blur-md">
        
        <SpotifyPlayer 
          token={accessToken}
          showSaveIcon
          styles={{
            bgColor: 'rgba(255, 255, 255, 0.1)',
            sliderColor: '#FACD66',
            sliderHandleColor: '#FACD66',
            color: '#FACD66',
            trackNameColor: '#EFEEE0'
          }}
          autoPlay={true}
          // offset={50000}
        />
    </div>
    )
}
