import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AppContext'
import useWindowDimensions from '../Hooks/windowDimensions';
import SpotifyWebApi from 'spotify-web-api-js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaPlayCircle } from 'react-icons/fa';
import { RiPlayList2Fill, RiHeart2Fill } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css'
import 'swiper/css/autoplay'
import { mainPlaylistType } from '../types/Types';

export default function HomeHeader() {
    const SpotifyApi = new SpotifyWebApi();
    SpotifyApi.setAccessToken(localStorage.getItem('access_token'))
    
    const { width } = useWindowDimensions()
    const { dispatch, headerItem, featuredPlaylists, isLoggedIn } = useContext(AppContext);
    
    useEffect(() => {
        SpotifyApi.getFeaturedPlaylists()
            .then((data)=>{
                console.log(data)
                const neededPlaylistInfo = data.playlists.items[0]
                dispatch({
                    type: 'setHeaderMain',
                    payload: {
                        namePayload: neededPlaylistInfo.name,
                        hrefPayload: neededPlaylistInfo.href,
                        descriptionPayload: neededPlaylistInfo.description,
                        imagePayload: neededPlaylistInfo.images[0].url
                    }
                });
            },
            function(err) {
              console.error(err);
            }
        )
    }, [])
    
    
    useEffect(() => {
        SpotifyApi.getFeaturedPlaylists()
            .then(data=>{
               const newPlaylistArray = data.playlists.items.map(playlist=>{
                    return {
                        name: playlist.name,
                        href: playlist.href,
                        image: playlist.images[0].url,
                        description: playlist.description,

                    }
                })
                newPlaylistArray.map(playlist=>{
                    if(featuredPlaylists.includes(playlist)){
                        return
                    }else{
                        dispatch({
                            type: 'setFeaturedPlaylists',
                            payload: {
                                namePayload: playlist.name,
                                hrefPayload: playlist.href,
                                imagePayload: playlist.image,
                                descriptionPayload: playlist.description
                            }
                        })
                    }
                })
            },
            function(err){
                console.error(err)
            }    
        )
    }, [isLoggedIn])    
    
    
    return (
        <div className='lg:flex justify-between px-[1px]'>
            <div className='rounded-2xl sm:flex items-center lg:w-[60%]'>
                <LazyLoadImage src={headerItem.image} className='object-fill rounded-2xl h-[370px] w-full lg:w-[250px] lg:h-[250px]'/>
                <div className='sm:ml-5 sm:pt-[7rem] pt-4 md:max-w-[300px]'>   
                    <p className='text-[2rem] md:text-[2.3rem] lg:text-[1.5rem] font-bold text-[#A4C7C6]'>{headerItem.name}</p>
                    <p className='text-[0.9rem] font-semibold text-[#808080] lg:text-[0.8rem]'>{headerItem.description}</p>
                    <div className='grid grid-cols-2 sm:flex  sm:gap-0 gap-7 justify-between mt-3 sm:px-2 lg:px-0 lg:grid lg:grid-cols-2 lg:gap-1'>
                        <button className='bg-[#808080] flex p-2 items-center justify-center rounded-full'>
                            <i className='text-yellow-400 lg:text-[0.9rem]'><FaPlayCircle /></i>
                            <p className='ml-2 text-[0.8rem] lg:text-[0.5rem] xl:text-[0.7rem] font-semibold text-white'>Play All</p>
                        </button>
                        <button className='bg-[#808080] flex p-2 items-center justify-center rounded-full'>
                            <i className='text-yellow-400 lg:text-[0.9rem]'><RiPlayList2Fill /></i>
                            <p className='ml-2 text-[0.8rem] lg:text-[0.5rem] xl:text-[0.7rem] font-semibold text-white'>Add to Collection</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-12 lg:w-[50%]'>
                <h2 className='font-bold font-quicksand text-[#808080] text-xl mb-4'>Featured Playlists</h2>
                { 
                    width > 1024 ?
                    <Swiper 
                        direction='vertical'
                        modules={[Autoplay]}
                        autoplay={{delay:4000}}
                        slidesPerView={3}
                        spaceBetween={10}
                    >
                        {
                            featuredPlaylists.map(playlist=>{
                                return (
                                    <SwiperSlide key={playlist.name}>
                                        
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    :
                    <Swiper 
                        spaceBetween={50}
                        slidesPerView={1}
                        modules={[Autoplay]}
                        autoplay={{delay: 2500}}
                        breakpoints={{
                            600: {
                                slidesPerView: 2,
                                width: 600,
                                spaceBetween: 20
                            }
                        }}
                        loop={true}
                    >
                        {featuredPlaylists.map(playlist=>{
                            return (
                                <SwiperSlide key={playlist.name}>
                                    <div className='flex justify-between p-4 h-[300px] bg-[#1A1E1F] rounded-2xl'>
                                        <div className='w-[80%]'>
                                            <img 
                                                src={playlist.image}
                                                className='w-[150px] rounded-xl'
                                            />
                                            <h3 className='text-[1.1rem] text-white font-quicksand mt-4 tracking-wide'>
                                                {playlist.name}
                                            </h3>
                                            <p className='text-[0.88rem] text-[#808080] mt-4'>
                                                {playlist.description}
                                            </p>
                                        </div>
                                        <div className=''>
                                            <div className='border-2 p-2 rounded-full'>
                                                <i className='text-[1.5rem] text-[#afa6a6]'><RiHeart2Fill /></i>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                }
            </div>
        </div>
    )
}
