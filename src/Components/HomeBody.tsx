import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Contexts/AppContext"
import SpotifyWebApi from "spotify-web-api-js"
import { recommendedTracksType, TrackObjectSimplifiedWithAlbum, tracks } from "../types/Types"
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function HomeBody() {
    
    const [seedGenre, setSeedGenre] = useState<string[]>([])
    const [seedTracks, setSeedTracks] = useState<string[]>([])
    
    const { dispatch, recommendedPlaylists, userPlaylist,accessToken } = useContext(AppContext)
    
    const SpotifyApi = new SpotifyWebApi()
     SpotifyApi.setAccessToken(accessToken)
    
    
    useEffect(() => {
        if(accessToken !== ''){
            SpotifyApi.getUserPlaylists()
            .then(data=>{
                setSeedGenre(data.items.filter(playlist=>playlist.name.includes('genres')).map(playlist=>playlist.name.split(': ')[1]))
            })
            SpotifyApi.getMyTopTracks({ limit:5 })
                .then(data=>{
                setSeedTracks(data.items.map(track=>track.id))
            })
        }
    }, []);
    
    useEffect(()=>{
        if(seedGenre.length === 0 && recommendedPlaylists.length === 0 && accessToken !== ''){
            SpotifyApi.getRecommendations({
                seed_genres: seedGenre,
                seed_tracks: seedTracks
            })
            .then((data)=>{
                const recommendedSongs = data.tracks.map((item) =>{
                    const track = item as unknown as tracks;
                    return {
                        name: track.name,
                        id:track.id,
                        image: track.album.images[0].url,
                        uri: track.uri,
                        artist: track.artists[0].name
                    }
                })
               
                dispatch({
                    type: 'setRecommendedPlaylists',
                    payload: {
                        recommendedPlaylistPayload: recommendedSongs
                    }
                })
               
            })
        }
    },[seedGenre])
    
    useEffect(()=>{
        SpotifyApi.getUserPlaylists()
            .then(data=>{
                const yourPlaylists = data.items.map(item=>{
                    return {
                        name: item.name,
                        id:item.id,
                        image: item.images[0].url,
                        uri: item.uri
                    }
                })
                dispatch({
                    type:'setUserPlaylists',
                    payload: {
                        userPlaylistPayload: yourPlaylists

                    }
                })
            },
            function(err){
                console.error(err)
            })
    },[])
    
    return (
        <section className="mt-12 pb-[25%] sm:pb-[15%] lg:pb-[10%] 2xl:pb-[5%]">
            <div>
                <h2 className='font-bold font-quicksand text-[#808080] text-xl mb-0'>Recommended For you</h2>
                <div className={`overflow-x-scroll no-scrollbar flex gap-12 box-content sm:gap-[100px] md:gap-[30px] mt-10 md:mt-4`}>
                        {recommendedPlaylists.map(playlist=>{
                            return (
                                <div className="w-[200px] lg:w-[200px]" key={playlist.id}>
                                    <img src={playlist.image} className='rounded-xl w-full min-w-[200px]'/>
                                    <p className="text-white font-bold mt-2 tracking-wide">{playlist.name}</p>
                                    <p className="text-gray-100 text-sm">{playlist.artist}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
            <div className="mt-4">
                <h2 className='font-bold font-quicksand text-[#808080] text-xl mb-4'>Your Playlists</h2>
                <div className={`overflow-x-scroll no-scrollbar flex gap-12 box-content sm:gap-[100px] md:gap-[30px] mt-10 md:mt-4`}>
                        {userPlaylist.map(playlist=>{
                            return (
                                <div className="w-[200px] lg:w-[200px]" key={playlist.id}>
                                    <img src={playlist.image} className='rounded-xl w-full min-w-[200px]'/>
                                    <p className="text-white font-bold mt-2 tracking-wide">{playlist.name}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
        </section>
    )
}
