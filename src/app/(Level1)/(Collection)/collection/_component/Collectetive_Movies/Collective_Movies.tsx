"use client";
import React from 'react';
import styles from "./collective_movies.module.css"
import Image01 from '@/components/ImageComponents/Image01';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';



const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];

const getDate = (val:string) => {
    let date = new Date(val);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return `${months[month]} ${day}, ${year}`
}


function Collective_Movies({DATAS}:{DATAS:any}) {
    
    const mapped_movies = DATAS?.map((item:any, index:number) => {
        return (
            <div key={index} className={styles.collect_mov_cont}>
                <div className={styles.collect_movie_hero}>
                    <Image01 path1={tmdb_image_url+item?.backdrop_path} path2={tmdb_image_url+item?.poster_path} name='' />
                </div>
                <div className={styles.collect_movie_detz}>
                    <div className={styles.collect_div_name}>{item?.title}</div>
                    <div className={styles.collect_div_release}>{getDate(item?.release_date)}</div>
                    <div className={styles.collect_div_overview}>{item?.overview.length > 100 ? item?.overview.slice(0,100)+"..." : item?.overview}</div>
                </div>
            </div>
        )
    })
    
    
  return (
    <div className={styles.collective_movie}>
        <div className={styles.collective_head_head}>{DATAS?.length} Movies</div>
        <div className={styles.collective_movies_mapper}>
            {mapped_movies}
        </div>
    </div>
  )
}

export default Collective_Movies