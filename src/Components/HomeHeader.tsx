import React, { useContext, useEffect } from 'react'
import { AppContext } from '../Contexts/AppContext'
import SpotifyWebApi from 'spotify-web-api-js';
import useWindowDimensions from '../Hooks/windowDimensions';
import { FaPlayCircle } from 'react-icons/fa';
import { RiPlayList2Fill, RiHeart2Fill } from 'react-icons/ri'
import Slider from 'react-slick'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function HomeHeader() {
    const SpotifyApi = new SpotifyWebApi();
    const { dispatch, accessToken, headerItem, featuredPlaylists } = useContext(AppContext);
    const { width } = useWindowDimensions();
    SpotifyApi.setAccessToken(accessToken);

    console.log(width)
    useEffect(() => {
        SpotifyApi.getFeaturedPlaylists()
            .then((data) => {
                const playlistNeededInfo = data.playlists.items[0]
                dispatch({
                    type: 'setHeaderMain', 
                    payload: {
                        descriptionPayload: playlistNeededInfo.description,
                        hrefPayload: playlistNeededInfo.href,
                        imagePayload: playlistNeededInfo.images[0].url,
                        namePayload: playlistNeededInfo.name,
                    }
                })
            }),
            function(err: string){
                console.error(err)
            }
    }, [])
    
    useEffect(() => {
        SpotifyApi.getFeaturedPlaylists()
            .then((data) => {
                data.playlists.items.map((item)=>(
                   dispatch({
                    type: 'setFeaturedPlaylists',
                    payload:  {
                        namePayload: item.name,
                        imagePayload: item.images[0].url,
                        hrefPayload: item.href,
                        descriptionPayload: item.description
                    }
                   })
                ))
            }),
            function(err: string){
                console.error(err)
            }
    }, [])
    
    return (
        <div className='lg:grid lg:grid-cols-12'>
            <div className='rounded-2xl sm:flex items-center w-[60vw]'>
                <LazyLoadImage src={headerItem.image} className='object-fill rounded-2xl h-[370px] w-full max-w-[370px]'/>
                <div className='sm:ml-5 sm:pt-[7rem] pt-4 md:max-w-[300px]'>   
                    <p className='text-[2rem] md:text-[2.3rem] font-bold text-[#A4C7C6]'>{headerItem.name}</p>
                    <p className='text-[0.9rem] font-semibold text-[#808080]'>{headerItem.description}</p>
                    <div className='grid grid-cols-2 sm:flex sm:gap-0 gap-7 justify-between mt-3 sm:px-2'>
                        <button className='bg-[#808080] flex p-2 items-center justify-center rounded-full'>
                            <i className='text-yellow-400'><FaPlayCircle /></i>
                            <p className='ml-2 text-[0.8rem] font-semibold text-white'>Play All</p>
                        </button>
                        <button className='bg-[#808080] flex p-2 items-center justify-center rounded-full'>
                            <i className='text-yellow-400'><RiPlayList2Fill /></i>
                            <p className='ml-2 text-[0.8rem] font-semibold text-white'>Add to Collection</p>
                        </button>
                    </div>  
                </div>
            </div>
            <div className='mt-12'>
                <h2 className='font-bold font-quicksand text-[#808080] text-xl mb-4'>Top Charts</h2>
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
                                    <SwiperSlide>
                                        <div className='flex justify-between'>
                                            <div></div>
                                            <div>
                                                <div>
                                                    <i className='mt'><RiHeart2Fill /></i>
                                                </div>
                                            </div>
                                        </div>
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
                        autoplay={{delay: 4000}}
                        breakpoints={{
                            600: {
                                slidesPerView: 2,
                                width: 600,
                                spaceBetween: 50
                            }
                        }}
                    >
                        {featuredPlaylists.map(playlist=>{
                            return (
                                <SwiperSlide>
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