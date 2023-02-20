import { useContext } from "react"
import { AppContext } from "../Contexts/AppContext"
import SpotifyPlayer from 'react-spotify-web-playback'

export default function PlayerControl() {
      
  const { dispatch, accessToken, uris } = useContext(AppContext)
   
    return (
      <div className="fixed bottom-0 w-full backdrop-blur-md z-[999999] p-3">      
        <SpotifyPlayer 
          token={accessToken}
          showSaveIcon
          styles={{
            bgColor: 'rgba(255, 255, 255, 0.0)',
            sliderColor: '#FACD66',
            sliderHandleColor: '#FACD66',
            color: '#FACD66',
            trackNameColor: '#EFEEE0'
          }}
          autoPlay={false}
          play={true}
          uris={uris}
        />
    </div>
    )
}
