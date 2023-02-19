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
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

export default function HomeHeader() {
    const SpotifyApi = new SpotifyWebApi();
    SpotifyApi.setAccessToken(localStorage.getItem('access_token'))
    
    const { width } = useWindowDimensions()
    const { dispatch, headerItem, featuredPlaylists, isLoggedIn } = useContext(AppContext);
    
    useEffect(() => {
        SpotifyApi.getFeaturedPlaylists()
            .then((data)=>{
                const neededPlaylistInfo = data.playlists.items[0]
                dispatch({
                    type: 'setHeaderMain',
                    payload: {
                        namePayload: neededPlaylistInfo.name,
                        hrefPayload: neededPlaylistInfo.href,
                        descriptionPayload: neededPlaylistInfo.description,
                        imagePayload: neededPlaylistInfo.images[0].url,
                        idPayload: neededPlaylistInfo.id
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
               const playlistItems = data.playlists.items
               if(featuredPlaylists.length === data.playlists.items.length){
                    return
               }else {
                    dispatch({
                        type: 'setFeaturedPlaylists',
                        payload: {
                            playlistPayload: playlistItems.map(playlist=>{
                                if(playlist.description){
                                    return {
                                        name: playlist.name,
                                        description: playlist.description.split('\n')[0],
                                        href: playlist.href,
                                        image: playlist.images[0].url,
                                        id: playlist.id,
                                        type: 'playlist'
                                    }
                                }
                            })
                        }
                    })
                }
            },
            function(err){
                console.error(err)
            }    
        )
    }, [isLoggedIn])
    
    function setPlaylistTracks(){
        dispatch({
            type: 'setPlaylistTracksNone'
        })
        dispatch({
            type: 'setIconNone'
        })
    }
    
    const slickSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        speed: 3000,
        arrows: false,
        zIndex: 0
    }
    
    return (
        <div className='lg:flex justify-between px-[1px] z-10'>
            <div className='rounded-2xl sm:flex sm lg:w-[60%]'>
                <LazyLoadImage src={headerItem.image} className='object-fill rounded-2xl w-full h-[350px] sm:max-w-[350px] lg:w-[300px] lg:h-[300px]'/>
                <div className='sm:ml-5 sm:pt-[7rem] pt-4 md:max-w-[300px] lg:pt-[4rem]'>   
                    <p className='text-[2rem] md:text-[2.3rem] lg:text-[1.5rem] font-bold text-[#A4C7C6]'>{headerItem.name}</p>
                    <p className='text-[0.9rem] font-semibold text-[#808080] lg:text-[0.8rem]'>{headerItem.description}</p>
                    <div className='grid grid-cols-2 sm:flex sm:gap-0 gap-7 justify-between mt-3 sm:px-2 md:px-0 lg:grid lg:grid-cols-2 lg:gap-1'>
                        <button className='bg-[#808080] flex p-2 items-center justify-center rounded-full'>
                            <i className='text-yellow-400 lg:text-[0.9rem]'><FaPlayCircle /></i>
                            <p className='ml-2 text-[0.8rem] lg:text-[0.6rem] xl:text-[0.7rem] font-semibold text-white'>Play All</p>
                        </button>
                        <button className='bg-[#808080] flex p-2 items-center justify-center rounded-full'>
                            <i className='text-yellow-400 lg:text-[0.9rem]'><RiPlayList2Fill /></i>
                            <p className='ml-2 text-[0.8rem] lg:text-[0.6rem] xl:text-[0.7rem] font-semibold text-white'>Add to Collection</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-12 lg:mt-0 lg:w-[40%] lg:pl-5 z-[1]'>
                <h2 className='font-bold font-quicksand text-[#808080] text-xl mb-4'>Featured Playlists</h2>
                { 
                    width >= 1024 ?
                    <Slider {...slickSettings}>
                        {
                            featuredPlaylists.map(playlist => {
                                return (
                                    <div className='h-[80px] bg-[#1A1E1F] rounded-2xl p-2 mb-2 z-[0]' key={playlist.name}>
                                        <div className='flex justify-between items-center'>
                                            <Link to='/viewAlbum' onClick={setPlaylistTracks} state={playlist}>
                                                <div className='flex w-[90%]'>
                                                    <img src={playlist.image} className='h-[64px] rounded-lg'/>
                                                    <div className='ml-2 flex flex-col'>
                                                        <p className='text-[1rem] text-[#d4d1d1] font-semibold'>
                                                            {playlist.name}
                                                        </p>
                                                        <p className='text-gray-500 text-[12px] ellipsis'>
                                                            {playlist.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className=''>
                                                <div className='p-1 rounded-full border-[1px] border-[#808080] text-[#808080] text-[0.9rem]'>
                                                    <i><RiHeart2Fill /></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  
                                )
                            })
                        }
                    </Slider>
                    :
                    <div className='z-[2]'>
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
                                        <div className='flex justify-between p-4 h-[280px] bg-[#1A1E1F] rounded-2xl'>
                                            <Link to='/viewAlbum' onClick={setPlaylistTracks} state={playlist}>
                                                <div className='w-[80%]'>
                                                    <img 
                                                        src={playlist.image}
                                                        className='w-[150px] rounded-xl'
                                                    />
                                                    <h3 className='text-[1.1rem] text-white font-quicksand mt-4 tracking-wide'>
                                                        {playlist.name}
                                                    </h3>
                                                    <p className='text-[1rem] text-[#808080] mt-2 ellipsis'>
                                                        {playlist.description}
                                                    </p>
                                            </div>
                                            </Link>
                                            <div className=''>
                                                <div className='border-[1px] p-2 rounded-full border-[#808080]'>
                                                    <i className='text-[1.2rem] text-[#afa6a6]'><RiHeart2Fill /></i>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                }
            </div>
        </div>
    )
}
