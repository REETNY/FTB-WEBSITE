"use client"
import React from 'react'
import styleCast from "./castIndex.module.css"
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image2 from '@/components/ImageComponents/Image2';
import { tmdb_image_url2 } from '../someExports';
import Image01 from '@/components/ImageComponents/Image01';

export default function Cats_Index({Characters, id, type}: {Characters: any, id:string, type?:string}) {
    let few_cast = Characters;
    
    let few = 
    (!type)
    ? few_cast.map((item: any, index:number) => {
        if(index >= 8)return
        if(item?.profile_path == null || item?.name == null || item?.character == null || item.gender == null)return;
        return ( 
            <SwiperSlide key={index} className={styleCast.slides}>
                <div className={styleCast.slideItemContainer}>
                    <div className={styleCast.slide_item_hero}>
                        <Link href={""}>
                            <Image2 path1={tmdb_image_url2 + item?.profile_path} path2='' genderCode={item?.gender+1} name=''  />
                        </Link>
                    </div>
                    <div className={styleCast.slide_item_detz}>
                        <div className={styleCast.hero_name}>{item?.name}</div>
                        <div className={styleCast.hero_played}>{item?.character}</div>
                    </div>
                </div>
            </SwiperSlide>
        )
    })
    : 
    few_cast.map((item: any, index:number) => {
        if(index >= 8)return
        if(item?.character?.images?.jpg?.image_url == null)return;
        return ( 
            <SwiperSlide key={index} className={styleCast.slides}>
                <div className={styleCast.slideItemContainer}>
                    <div className={styleCast.slide_item_hero}>
                        <Link href={""}>
                            <Image01 path1={item?.character?.images?.jpg?.image_url} path2='' name=''  />
                        </Link>
                    </div>
                    <div className={styleCast.slide_item_detz}>
                        <div className={styleCast.hero_name}>{item?.character?.name}</div>
                        <div className={styleCast.hero_played}>{item?.role}</div>
                    </div>
                </div>
            </SwiperSlide>
        )
    })
    
  return (
    <div className={styleCast.cast_main_container}>
        <div className={styleCast.cont_head}>Cast</div>
        <div className={styleCast.character_slide}>
            <Swiper
                spaceBetween={10}
                slidesPerView={'auto'}
                className={styleCast.characterSlide}
            >
                {few}
            </Swiper>
        </div>
        <Link href={`${id}/cast`} className={styleCast.full_cast_view}>Full Cast & Crews</Link>
    </div>

  )
}
