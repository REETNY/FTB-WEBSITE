"use client"
import React from 'react'
import stylesMedia from "./media_index.module.css"
import { useState } from 'react';
import Videos from './Videos';
import Posters from './Posters';
import Backdrops from './Backdrops';
import { Trailer } from '../../movie/[movie_id]/page';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image01 from '@/components/ImageComponents/Image01';
import { FaPlay } from 'react-icons/fa';
import 'swiper/css';
import TrailerPlay from '../TrailerPlay/TrailerPlay';
import { tmdb_image_url2 } from '../someExports';
import {v4 as uuidV4} from "uuid"
import { usePathname } from 'next/navigation';

// aspect_ratio: 0.667,
//       height: 3000,
//       iso_639_1: 'en',
//       file_path: '/xkt4YBiFxpTRijrdXWtksHgRlnH.jpg',
//       vote_average: 5.246,
//       vote_count: 2,
//       width: 2000

// iso_639_1: 'en',
// iso_3166_1: 'US',
// name: 'Teaser Trailer',
// key: 'VWavstJydZU',
// site: 'YouTube',
// size: 2160,
// type: 'Trailer',
// official: true,
// published_at: '2023-11-09T13:59:01.000Z',
// id: '654ce86241a561336b7a5a0d'

export default function Media_Index({SCENE, THUMBS, type}: {SCENE: any, THUMBS: any, type?:boolean}) {

    const [media, setMedia] = useState("Popular");
    const [trailer, setTrailer] = useState({
        trail_key: '',
        trail_isPlaying: false
    })
    const handleMedia = (val:string) => {
        setMedia(val)
    };
    const openTrailer = () => {
        setTrailer((obj) => ({...obj, trail_isPlaying: !trailer.trail_isPlaying}))
    }
    function setKey(val:string){
        setTrailer((obj) => ({...obj, trail_key: val, trail_isPlaying: true}))
    }
    const locate = usePathname();

    const Media_Videos = SCENE?.map((item: any, index:number) => {
        if(index >= 7)return
        return(
        <SwiperSlide
            className={stylesMedia.media_videos}
            key={index}
        >
            <Videos SETKEY={setKey} key={index} trailerKey={item.key} url={`https://img.youtube.com/vi/${item.key}/maxresdefault.jpg`} />
        </SwiperSlide>
        )
    }) || [];
    let Media_Backdrops = THUMBS?.backdrops?.map((item: any, index: number) => {
        if(index >= 7)return
        return (
            <SwiperSlide 
                className={stylesMedia.media_backdrop}
                key={index}
            >
                <Backdrops url={!type ? tmdb_image_url2 + item.file_path: item?.file_path} />
            </SwiperSlide>
        )
    }) || [];
    let Media_Posters = THUMBS?.posters?.map((item: any, index: number) => {
        if(index >= 7)return
        return (
            <SwiperSlide 
                className={stylesMedia.media_posters}
                key={index}
            >
                <Posters url={!type ? tmdb_image_url2 + item.file_path: item?.file_path} />
            </SwiperSlide>
        )
    }) || [];
    const Media_Popular = [
        Media_Videos.length > 0 && Media_Videos[0],
        Media_Backdrops.length > 0 && Media_Backdrops[0],
        Media_Posters.length > 0 && Media_Posters[0]
    ].map((item:any) => {
        if(item == false)return
        return {...item, key: uuidV4()}
    }
    )


  return (
    <>
        <div className={stylesMedia.media_index_container}>
            <div className={stylesMedia.media_index_header}>
                <div className={stylesMedia.media_header}>Media</div>
                <div className={stylesMedia.media_header_nav}>
                    <span 
                        onClick={() => handleMedia("Popular")}
                        className={media == "Popular" ? `${stylesMedia.header_nav_tab} ${stylesMedia.active}`: stylesMedia.header_nav_tab}
                    >
                        Most Popular
                    </span>
                    {(!locate.includes("/manga/")) && <span 
                        onClick={() => handleMedia("Videos")}
                        className={media == "Videos" ? `${stylesMedia.header_nav_tab} ${stylesMedia.active}`: stylesMedia.header_nav_tab}
                    >
                        Videos
                    </span>}
                    <span 
                        onClick={() => handleMedia("Backdrops")}
                        className={media == "Backdrops" ? `${stylesMedia.header_nav_tab} ${stylesMedia.active}`: stylesMedia.header_nav_tab}
                    >
                        Backdrops
                    </span>
                    <span 
                        onClick={() => handleMedia("Posters")}
                        className={media == "Posters" ? `${stylesMedia.header_nav_tab} ${stylesMedia.active}`: stylesMedia.header_nav_tab}
                    >
                        Posters
                    </span>
                </div>
                <div className={stylesMedia.media_header_link}>
                    {
                        media == "Popular"
                        ? ""
                        : `View All ${media}`
                    }
                </div>
            </div>
            <div className={stylesMedia.media_index_content}>
            <Swiper
                className={stylesMedia.mySwiper}
                slidesPerView={"auto"}
                spaceBetween={0}
            >
                    {
                        media == "Popular"
                        ? 
                        (
                            Media_Popular.length == 0 
                            ?  <SwiperSlide 
                            className={stylesMedia.media_backdrop}
                            >
                                <div>Nothing to show in here!</div>
                            </SwiperSlide>
                            : Media_Popular
                        )
                        : media == "Videos"
                        ? 
                        (
                            Media_Videos.length == 0 
                            ?  <SwiperSlide 
                            className={stylesMedia.media_backdrop}
                            >
                                <div>Nothing to show in here!</div>
                            </SwiperSlide>
                            : Media_Videos
                        )
                        : media == "Backdrops"
                        ? 
                        (
                            Media_Backdrops.length == 0 
                            ?  <SwiperSlide 
                            className={stylesMedia.media_backdrop}
                            >
                                <div>Nothing to show in here!</div>
                            </SwiperSlide>
                            : Media_Backdrops
                        )
                        : media == "Posters"
                        ? 
                        (
                            Media_Posters.length == 0 
                            ?  <SwiperSlide 
                            className={stylesMedia.media_backdrop}
                            >
                                <div>Nothing to show in here!</div>
                            </SwiperSlide>
                            : Media_Posters
                        )
                        : ``
                    }
            </Swiper>
            </div>
        </div>
        <TrailerPlay PTB={openTrailer} SOURCE={trailer.trail_key} PTBool={trailer.trail_isPlaying} />
    </>
  )
}
