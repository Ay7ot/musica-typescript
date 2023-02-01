import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Contexts/AppContext"
import SpotifyWebApi from "spotify-web-api-js"
import { recommendedTracksType } from "../types/Types"
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function HomeBody() {
    
    const [seedGenre, setSeedGenre] = useState<string[]>([])
    const [seedTracks, setSeedTracks] = useState<string[]>([])
    
    const SpotifyApi = new SpotifyWebApi()
    SpotifyApi.setAccessToken(localStorage.getItem("access_token"))
    
    const { dispatch, recommendedPlaylists, userPlaylist } = useContext(AppContext)
    
    useEffect(() => {
        // SpotifyApi.getRecommendations({
        //     seed_genres: SpotifyApi.getUserPlaylists().then(res=>res.items.filter((playlist) => playlist.name.includes('genres')).map((playlist) => playlist.name.split(': ')[1])),
        //     seed_tracks: SpotifyApi.getMyTopTracks({ limit:5 }).then(data=>data.items.map(track=>track.id)),
        //     limit: 10
        // }).then(
        //     data=>console.log(data)
        // )
        SpotifyApi.getUserPlaylists()
            .then(data=>{
                setSeedGenre(data.items.filter(playlist=>playlist.name.includes('genres')).map(playlist=>playlist.name.split(': ')[1]))
            })
        SpotifyApi.getMyTopTracks({ limit:5 })
            .then(data=>{
                setSeedTracks(data.items.map(track=>track.id))
            })
    }, []);
    
    useEffect(()=>{
        SpotifyApi.getRecommendations({
            seed_genres: seedGenre,
            seed_tracks: seedTracks
        })
        .then((data)=>{
            const recommendedSongs = data.tracks.map(item=>{
                return {
                    name: item.name,
                    id:item.id,
                    image: item.album.images[0].url,
                    uri: item.uri,
                    artist: item.artists[0].name
                }
            })
           if(seedGenre.length === 0){
                dispatch({
                    type: 'setRecommendedPlaylists',
                    payload: {
                        recommendedPlaylistPayload: recommendedSongs
                    }
                })
           }else {
            return
           }
        })
    },[seedGenre])
    
    useEffect(()=>{
        SpotifyApi.getUserPlaylists()
            .then(data=>{
                console.log(data)
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
                <h2 className='font-bold font-quicksand text-[#808080] text-xl mb-4'>Recommended For you</h2>
                <div className={`overflow-x-scroll no-scrollbar flex gap-20 box-content sm:gap-[180px] md:gap-[70px] lg:gap-[30px] mt-10`}>
                        {recommendedPlaylists.map(playlist=>{
                            return (
                                <div className="w-[150px] lg:w-[200px]" key={playlist.id}>
                                    <img src={playlist.image} className='rounded-xl w-full min-w-[200px]'/>
                                    <p className="text-white font-bold mt-2 tracking-wide">{playlist.name}</p>
                                    <p className="text-gray-100 text-sm">{playlist.artist}</p>
                                </div>
                            )
                        })}
                </div>
            </div>
            <div>
                <h2 className='font-bold font-quicksand text-[#808080] text-xl mb-4'>Your Playlists</h2>
                <div className={`overflow-x-scroll no-scrollbar flex gap-20 box-content sm:gap-[180px] md:gap-[70px] lg:gap-[30px] mt-10`}>
                        {userPlaylist.map(playlist=>{
                            return (
                                <div className="w-[150px] lg:w-[200px]" key={playlist.id}>
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
