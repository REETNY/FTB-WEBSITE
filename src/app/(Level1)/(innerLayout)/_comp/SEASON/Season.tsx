"use client"
import React from 'react'
import styles from "./season.module.css"
import Image01 from '@/components/ImageComponents/Image01';
import ImageData from "../../../../../../public/images/Error_Image.jpg"
import { tmdb_image_url } from '../someExports';
import { FaDotCircle } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';

const MONTH = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDate(val:string){
  let date = new Date(val);
  let year = date?.getFullYear();
  let month = date?.getMonth();
  let day = date?.getDate();
  return `${MONTH[month]} ${day}, ${year}`
}

export default function Season({SEASON, type, SERIE_ID}:{SEASON:any, type:string, SERIE_ID: string}) {
  let seasons = SEASON?.seasons || [];
  let season_item;

  let link = `/tv/${SERIE_ID}/season/`;

  if(type == "movie_serie"){
    season_item = seasons?.map((item:any, index:number) => {
      let image = item?.poster_path != null ? tmdb_image_url + item?.poster_path : `/images/Error_Image.jpg`;
      return(
        <div key={index} className={styles.Season_Data}>

          <div className={styles.season_hero}>
            <Link href={link+item?.season_number}>
              <Image01 name='' path1={image} path2={image} />
            </Link>
          </div>

          <div className={styles.season_detail}>
            <div className={styles.season_name}>
              <Link style={{color: "black"}} href={link+item?.season_number}>
                {item?.name}
              </Link>
            </div>

            <div className={styles.season_rezz}>
              <div className={styles.season_rate}><FaStar /> {parseInt(Math.floor(item?.vote_average).toString())*10}%</div>
              <div className={styles.rezz}>
                <span className={styles.rel_year}>{new Date(item?.air_date).getFullYear()}</span>
                <span className={styles.circle}><FaDotCircle /> </span>
                <span className={styles.episode_count}>{item?.episode_count} Episodes</span>
              </div>
            </div>

            <div className={styles.season_information}>Season {item?.season_number} of {item?.name} premiered on {getDate(item?.air_date)}.</div>
          </div>

        </div>
      )
    })
  }

  
  
  return (
    <div className={styles.Series_Season}>
      {season_item}
    </div>
  )
}
