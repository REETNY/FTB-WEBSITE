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
import styls from "../css_styling.module.css";
import { useInView } from 'react-intersection-observer';
import { Doughnut, Line } from "react-chartjs-2"

type FTCProps = {
    Vibrant: string,
    DarkVibrant: string,
    LightVibrant: string,
    Muted: string,
    DarkMuted: string,
    LightMuted: string
} | null

export default function Introduction({ANIME, FTC, CAST}: {ANIME: any, FTC: FTCProps, CAST: any}) {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 750px)");
    const dispatch = useDispatch();
    const DB = useSelector((state: RootState) => state.dataSlice.anime);
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

    const [rating, setRating] = useState(false);
    const [trailer, setTrailer] = useState(false)
    const currentType = "anime";


    const isListed = DB.list.find((item:{id:number}) => item.id == ANIME.mal_id);
    const isHearted = DB.hearted.find((item:{id:number}) => item.id == ANIME.mal_id);
    const isWatched = DB.watched.find((item:{id:number}) => item.id == ANIME.mal_id);
    const isRated = DB.rating.find((item: {id: number, rated: number}) => item.id == ANIME.mal_id);

    let {r, g, b} = hexToRgb(FTC?.DarkVibrant);

  const styles = {
    backgroundImage: `url(${ANIME?.images?.webp?.image_url})`,
  }
  const styles2 = { 
    backgroundImage: `linear-gradient(to right, rgba(${r},${g},${b}, 1) 15%, rgba(${r},${g},${b}, .3) 100%)`
  }

  function formattedYear(val:string){
    let value = new Date(val);
    let year = value.getFullYear()
    return `(${year})`
  }

  const score = parseFloat(ANIME.score?.toFixed(1)) * 10;
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

  const handleList = (id:number) => {
    // check if logged in first
    dispatch(addListed({type: currentType, id: id}))
  }

  const handleHeart = (id:number) => {
    // check if logged in first
    dispatch(addHeared({type: currentType, id: id}))
  }

  const handleWatch = (id:number) => {
    // check if logged in first
    dispatch(addWatched_Read({type: currentType, id: id}))
  }

  const handleRating = (rate: number, type:string, id: number) => {
    // const isOnline = CheckLoggedIn();
    // if(!isOnline)return;
    // [{movieId: number, rated: number}]
    dispatch(addRating({rate, type, id}))
    
  }

  const handleClearRating = (id: number, type: string) => {
    // const isOnline = CheckLoggedIn();
    // if(!isOnline)return;
    dispatch(clearRating({id, type}))
  }

  const playTrailer = () => {
    setTrailer((bool) => !bool)
  }

    let findYoutube = ANIME?.trailer?.youtube_id

    const xsDevStopper = {
        background: "red",
        width: "100%",
        height: "22px"
    }

    const mapp_dried = CAST?.map((item: any, index:number) => {
        return(
          <div key={index} className={styls.each_people}>
            <div className={styls.people_name}>{item?.person?.name}</div>
            <div className={styls.people_role}>{item?.positions[0]}</div>
          </div>
        )
    }) || [];

    return (
        <div className={styls.data_info} style={styles}>

        <div style={styles2} className={styls.inner_data_info}>

            <div className={styls.data_info_hero}>
            <div className={styls.totalBg}>
                <Image1 path1={ANIME.images.webp.image_url} path2={ANIME.images.jpg.image_url} name={ANIME.title} />
            </div>
            <div className={styls.small_dev_bg}>
                <Image1 path1={ANIME?.images?.webp?.image_url} path2={ANIME?.images?.jpg?.image_url} name={ANIME?.title} />
            </div>
            </div>

            <div style={isSmallDevice ? {background: `rgba(${r},${g},${b}, 1)`} : {}} className={styls.data_info_details}>

            {/* name and release year */}
            <div className={styls.data_teb_detz_1}>
                <span className={styls.title_teb}>{ANIME.title}</span>
                <span className={styls.year_teb}>{formattedYear(ANIME?.aired?.from)}</span>
            </div>

            {/* score rating and emoji */}
            <div className={styls.data_teb_detz}>

                <div className={styls.spread_score}>
                <div className={styls.movieRating}>
                    <div style={{background: `rgb(${colorDecode2})`}} className={styls.innerCircle}>
                    <SemiCircle1 $color={`rgb(${colorDecode})`} $score={parseFloat(ANIME?.score.toFixed(1))} />
                    <SemiCircle2 $color={`rgb(${colorDecode})`} $score={parseFloat(ANIME?.score.toFixed(1))} />
                    {ANIME.score > 5 
                        ? <SemiCircle3 $color={`rgb(${colorDecode2})`} $score={40} /> 
                        : <div className={styls.miniCircle} style={{background: `rgb(${colorDecode2})`}}></div>
                    }
                    </div>
                    <div className={styls.outerCircle}>
                    <span>{parseFloat(ANIME?.score.toFixed(1)) * 10}</span>
                    <sup>%</sup>
                    </div>
                </div>
                <div className={styls.user_score_movie}>User Score</div>
                </div>

                <div onClick={playTrailer} className={styls.playTrailerBtn}>
                    <span><FaPlay /></span>
                    <span>Play Trailer</span>
                </div>

            </div>
            
            {/* action btns for rating ... etc and playing trailer */}
            <div className={styls.only_large_dev}>

                <div className={styls.movie_actions}>
                <span 
                    onClick={() => handleList(ANIME.mal_id)} 
                    className={isListed ? `${styls.actions_btn} ${styls.listed}` : styls.actions_btn}
                >
                    <FaList />
                </span>
                <span 
                    onClick={() => handleHeart(ANIME.mal_id)} 
                    className={isHearted ? `${styls.actions_btn} ${styls.hearted}` : styls.actions_btn}
                ><FaHeart /></span>
                <span 
                    onClick={() => handleWatch(ANIME.mal_id)}
                    className={isWatched ? `${styls.actions_btn} ${styls.booked}` : styls.actions_btn}
                ><FaBookmark /></span>
                <span 
                    onClick={() => setRating((bool) => !bool)}
                    className={styls.actions_btn}
                >
                    <span className={isRated ? styls.rated : ''}>
                    <FaStar />
                    </span>
                    <OutsideClickHandler onOutsideClick={() => setRating(false)}>
                    <span className={rating ? `${styls.ratingInput} ${styls.active}` : styls.ratingInput}>
                        <div className={styls.clearRating} onClick={() => handleClearRating(ANIME.mal_id, currentType)}><FaMinus /></div>
                        <div className={styls.ratingStars}>
                        <StarRatings
                            rating={isRated?.rated || 0}
                            starRatedColor="rgb(255,215,0)"
                            changeRating={(val:number) => handleRating(val, currentType, ANIME.mal_id)}
                            starDimension='21px'
                            starEmptyColor='rgb(255,250,250)'
                            starHoverColor='rgb(255,215,0)'
                            starSpacing='3px'
                            numberOfStars={5}
                            name='rating'
                        />
                        </div>
                    </span>
                    </OutsideClickHandler>
                </span>
                </div>

                <div onClick={playTrailer} className={styls.playTrailerBtn}>
                    <span><FaPlay /></span>
                    <span>Play Trailer</span>
                </div>

            </div>
            
            {/* overview and tagline */}
            <div className={styls.data_teb_detz_over}>
                <div className={styls.tagline_movie}>{ANIME?.background}</div>
                <div className={styls.overView_movie}>
                <div className={styls.overview_head}>Overview</div>
                <div className={styls.overview_char}>{ANIME?.synopsis}</div>
                </div>
            </div>

            {/* creator, writer E.T.C and few others */}
            <div className={`${styls.data_teb_detz} ${styls.content}`}>
                {mapp_dried}
            </div>

            <div className={styls.only_small_dev}>
                <div className={styls.xs__actions}>
                <span 
                    onClick={() => handleList(ANIME.mal_id)} 
                    className={isListed ? `${styls.actions_btn} ${styls.listed}` : styls.actions_btn}
                >
                    <FaList />
                </span>
                <span 
                    onClick={() => handleHeart(ANIME.mal_id)} 
                    className={isHearted ? `${styls.actions_btn} ${styls.hearted}` : styls.actions_btn}
                ><FaHeart /></span>
                <span 
                    onClick={() => handleWatch(ANIME.mal_id)}
                    className={isWatched ? `${styls.actions_btn} ${styls.booked}` : styls.actions_btn}
                ><FaBookmark /></span>
                <span 
                    onClick={() => setRating((bool) => !bool)}
                    className={styls.actions_btn}
                >
                    <span className={isRated ? styls.rated : ''}>
                    <FaStar />
                    </span>
                    <OutsideClickHandler onOutsideClick={() => setRating(false)}>
                    <span className={rating ? `${styls.ratingInput} ${styls.active}` : styls.ratingInput}>
                        <div className={styls.clearRating} onClick={() => handleClearRating(ANIME.mal_id, currentType)}><FaMinus /></div>
                        <div className={styls.ratingStars}>
                        <StarRatings
                            rating={isRated?.rated || 0}
                            starRatedColor="rgb(255,215,0)"
                            changeRating={(val:number) => handleRating(val, currentType, ANIME.mal_id)}
                            starDimension='21px'
                            starEmptyColor='rgb(255,250,250)'
                            starHoverColor='rgb(255,215,0)'
                            starSpacing='3px'
                            numberOfStars={5}
                            name='rating'
                        />
                        </div>
                    </span>
                    </OutsideClickHandler>
                </span>
                </div>
            </div>

            </div>

        </div>

        <TrailerPlay PTB={playTrailer} SOURCE={findYoutube} PTBool={trailer} />

        </div>
    )
}
