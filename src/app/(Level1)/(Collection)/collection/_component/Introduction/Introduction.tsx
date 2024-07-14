"use client"
import React, { useState } from 'react'
import { tmdb_image_url2, tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';
import Image1 from '@/components/ImageComponents/Image1';
import { useMediaQuery } from "@uidotdev/usehooks";
import { SemiCircle1, SemiCircle2, SemiCircle3 } from '@/app/(Level1)/(IndexPage)/_comp/styled_components/plane_shapes';
import { FaBookmark, FaHeart, FaList, FaMinus, FaPlay, FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { addHeared, addListed, addWatched_Read, addRating, clearRating } from '@/store/Slices/DataSlice';
import StarRatings from 'react-star-ratings';
import OutsideClickHandler from 'react-outside-click-handler';
import TrailerPlay from '@/app/(Level1)/(innerLayout)/_comp/TrailerPlay/TrailerPlay';
import styls from "./introduction.module.css"

type FTCProps = {
    Vibrant: string,
    DarkVibrant: string,
    LightVibrant: string,
    Muted: string,
    DarkMuted: string,
    LightMuted: string
  } | null

export default function Introduction({FTC, MOVIE}: {FTC:FTCProps, MOVIE: any}) {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 750px)");
    const DB = useSelector((state: RootState) => state.dataSlice.movies);
    function hexToRgb(hex?:string) {
      // Remove the hash if it's included
      hex = hex?.replace('#', '');
  
      // Parse hexadecimal value to RGB
      var r = parseInt((hex || "#FFF").substring(0, 2), 16);
      var g = parseInt((hex || "#FFF").substring(2, 4), 16);
      var b = parseInt((hex || "#FFF").substring(4, 6), 16);
  
      // Return RGB values as an object
      return { r, g, b };
    } 
    let {r, g, b} = hexToRgb(FTC?.DarkVibrant);
    const styles = {
      backgroundImage: `url(${tmdb_image_url+MOVIE.backdrop_path})`,
    }
    const styles2 = { 
      backgroundImage: `linear-gradient(to right, rgba(${r},${g},${b}, 1) 15%, rgba(${r},${g},${b}, .3) 100%)`
    }
    let MR = 0;
    MOVIE?.parts?.map((item:any, index:number) => {
        if(MOVIE?.parts?.length - 1 == index){
            MR += (item?.vote_average)
            MR = MR / (index + 1)
        }else{
            MR += (item?.vote_average)
        }
    })
    const score = parseFloat(MR?.toFixed(1)) * 10;
    const colorDecode = score <= 25 
    ? "209,19,2"
    : (score > 25 && score <= 50) 
    ? "242,140,15"
    : (score > 50 && score <= 75)
    ? "245,241,2"
    : (score > 75)
    ? "28,199,51"
    : ""
    const colorDecode2 = score <= 25 
    ? "130, 13, 3"
    : (score > 25 && score <= 50) 
    ? "173, 99, 7"
    : (score > 50 && score <= 75)
    ? "161, 158, 6"
    : (score > 75)
    ? "11, 110, 24"
    : "";

    console.log(FTC);
    
    
   
  return (
    <div className={styls.data_info} style={styles}>

        <div style={styles2} className={styls.inner_data_info}>

            <div className={styls.data_info_hero}>
                <div className={styls.totalBg}>
                <Image1 path1={tmdb_image_url+MOVIE.poster_path} path2={tmdb_image_url2+MOVIE.backdrop_path} name={MOVIE.title} />
                </div>
                <div className={styls.small_dev_bg}>
                <Image1 path1={tmdb_image_url+MOVIE.poster_path} path2={tmdb_image_url2+MOVIE.backdrop_path} name={MOVIE.title} />
                </div>
            </div>

            <div style={isSmallDevice ? {background: `rgba(${r},${g},${b}, 1)`} : {}} className={styls.data_info_details}>

                {/* name and release year */}
                <div className={styls.data_teb_detz_1}>
                <span className={styls.title_teb}>{MOVIE.name}</span>
                </div>

                {/* score rating and emoji */}
                <div className={styls.data_teb_detz}>

                <div className={styls.spread_score}>
                    <div className={styls.movieRating}>
                    <div style={{background: `rgb(${colorDecode2})`}} className={styls.innerCircle}>
                        <SemiCircle1 $color={`rgb(${colorDecode})`} $score={score / 10} />
                        <SemiCircle2 $color={`rgb(${colorDecode})`} $score={score / 10} />
                        {(score / 10) > 5 
                            ? <SemiCircle3 $color={`rgb(${colorDecode2})`} $score={40} /> 
                            : <div className={styls.miniCircle} style={{background: `rgb(${colorDecode2})`}}></div>
                        }
                    </div>
                    <div className={styls.outerCircle}>
                        <span>{score}</span>
                        <sup>%</sup>
                    </div>
                    </div>
                    <div className={styls.user_score_movie}>User Score</div>
                </div>

                </div>
                
                
                {/* overview and tagline */}
                <div className={styls.data_teb_detz_over}>
                <div className={styls.tagline_movie}>{MOVIE.tagline}</div>
                <div className={styls.overView_movie}>
                    <div className={styls.overview_head}>Overview</div>
                    <div className={styls.overview_char}>{MOVIE.overview}</div>
                </div>
                </div>

                {/*  */}
                <div className={styls.collection_info}>
                    <div className={styls.div_collect}>
                        <span className={styls.left_div}>Number of Movies:</span>
                        <span className={styls.right_div}>{MOVIE?.parts?.length}</span>
                    </div>
                </div>

            </div>

        </div>

    </div>
  )
}
