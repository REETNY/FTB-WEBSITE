"use client";
import React from 'react';
import stylesRecommend from "./recommend_index.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import Image01 from '@/components/ImageComponents/Image01';
import { tmdb_image_url2 } from '../someExports';
import { FaCalendar } from 'react-icons/fa';


export default function Recommend_Index({RECOM, type}: {RECOM:any, type: string}) {

    let mappedKeys;
    if(type == "ms"){
        let keys = Object.keys(RECOM);
        mappedKeys = keys.map((item, index: number) => {
            let data = RECOM[item];
            let rating = (data.vote_average * 10).toFixed(0);
            if(data?.backdrop_path == null && data?.poster_path == null)return;
            return(
                <SwiperSlide key={index}
                    className={stylesRecommend.recommend_slide}
                >
                    <div className={stylesRecommend.recommend_data_cont}>
                        <div className={stylesRecommend.recommend_hero}>
                            <Image01 path1={tmdb_image_url2 + data?.backdrop_path} path2={tmdb_image_url2 + data?.poster_path} name='' />
                            <div className={stylesRecommend.movie_release}>
                                <span className={stylesRecommend.icon}><FaCalendar /></span>
                                <span className={stylesRecommend.relz}>{data?.release_date || data?.first_air_date}</span>
                            </div>
                        </div>
                        <div className={stylesRecommend.recommend_details}>
                            <div className={stylesRecommend.detailed_name}>{data.title || data.name}</div>
                            <div className={stylesRecommend.detailed_score}>{rating}%</div>
                        </div>
                    </div>
                </SwiperSlide>
            )
        })
    }else if(type == "am"){
        mappedKeys = RECOM.map((item: any, index: number) => {
            
            let rating = (item?.votes).toFixed(0);
            if(item?.entry?.images?.jpg?.image_url == null || item?.entry?.images?.webp?.image_url == null)return;
            return(
                <SwiperSlide key={index}
                    className={stylesRecommend.recommend_slide}
                >
                    <div className={stylesRecommend.recommend_data_cont}>
                        <div className={stylesRecommend.recommend_hero}>
                            <Image01 path1={item?.entry?.images?.jpg?.image_url} path2={item?.entry?.images?.webp?.image_url} name='' />
                            <div className={stylesRecommend.movie_release}>
                                <span className={stylesRecommend.icon}><FaCalendar /></span>
                                <span className={stylesRecommend.relz}>{}</span>
                            </div>
                        </div>
                        <div className={stylesRecommend.recommend_details}>
                            <div className={stylesRecommend.detailed_name}>{item?.entry?.title || item?.entry?.name}</div>
                            <div className={stylesRecommend.detailed_score}>{rating}%</div>
                        </div>
                    </div>
                </SwiperSlide>
            )
        })
    }

    if(!mappedKeys){
        return <div>No Recommneded Movie!</div>
    }
    if((RECOM.length == 0 && type == "am") || (Object.keys(RECOM).length == 0 && type == "ms")){
        return <div>No Recommneded Movie!</div>
    }

  return (
    <div className={stylesRecommend.recommendation_container}>
        <div className={stylesRecommend.recommendHeader}>Recommendations</div>
        <div className={stylesRecommend.recommended_data}>
            <Swiper 
                slidesPerView={"auto"}
                className={stylesRecommend.recommend_swiper}
                spaceBetween={10}
            >
                {mappedKeys}
            </Swiper>
        </div>
    </div>
  )
}
