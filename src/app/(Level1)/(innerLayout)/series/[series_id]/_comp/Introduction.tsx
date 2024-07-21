"use client"
import React, {useState} from 'react'
import { Cast, SERIE, Trailer, Crew } from '../page'
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
import styls from "../css_styling.module.css"
import {v4 as uuidV4} from "uuid"

type FTCProps = {
    Vibrant: string,
    DarkVibrant: string,
    LightVibrant: string,
    Muted: string,
    DarkMuted: string,
    LightMuted: string
} | null
  

export default function Introduction({FTC, CAST, SERIE, SCENE}:{FTC:FTCProps, SERIE: SERIE, CAST: Cast, SCENE: Trailer[]}) {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 750px)");
    const dispatch = useDispatch();
    const DB = useSelector((state: RootState) => state.dataSlice.series);
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
    const currentType = "series";
  
  
    const isListed = DB.list.find((item:{id:number}) => item.id == SERIE.id);
    const isHearted = DB.hearted.find((item:{id:number}) => item.id == SERIE.id);
    const isWatched = DB.watched.find((item:{id:number}) => item.id == SERIE.id);
    const isRated = DB.rating.find((item: {id: number, rated: number}) => item.id == SERIE.id);
  
    let min_cast = CAST.crew.filter((item: Crew) => 
      (item.job == "Writer" || item.job == "Executive Producer" || item.job == "Producer" || item.job == "Director") ? item : false 
    );

    let driedList: Crew[] = [];
    min_cast.map((item: Crew, index:number) => {
      let find = driedList.splice(2).find((item: Crew, index: number) => 
        ( item.job == "Writer" || 
          item.job == "Producer" || 
          item.job == "Director" || 
          item.job == "Executive Producer"
        ) ? true : false
      );
      if(find){
        return
      }else if(!find && driedList.length != 4){
        driedList.push(item)
        return
      }else{
        return
      }
    });
  
    let mapp_dried = driedList.map((item: Crew, index:number) => {
      return(
        <div key={index} className={styls.each_people}>
          <div className={styls.people_name}>{item.name}</div>
          <div className={styls.people_role}>{item.job}</div>
        </div>
      )
    })

    SERIE.created_by.map((item:any, index:number) => {
      mapp_dried.push(
        <div key={mapp_dried.length+index} className={styls.each_people}>
          <div className={styls.people_name}>{item.name}</div>
          <div className={styls.people_role}>Creator</div>
        </div>
      )
    })
  
    let {r, g, b} = hexToRgb(FTC?.DarkVibrant);
  
    const styles = {
      backgroundImage: `url(${tmdb_image_url+SERIE.backdrop_path})`,
    }
    const styles2 = { 
      backgroundImage: `linear-gradient(to right, rgba(${r},${g},${b}, 1) 15%, rgba(${r},${g},${b}, .3) 100%)`
    }
  
    function formattedYear(val:string){
      let value = new Date(val);
      let year = value.getFullYear()
      return `(${year})`
    }
  
    const score = parseFloat(SERIE.vote_average?.toFixed(1)) * 10;
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
    : ""
  
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
  
    let findYoutube = SCENE?.filter((item) => (item?.site == "YouTube" && item?.key != null && item?.type == "Trailer") ? item : false)[0]?.key
  
    return (
      <div className={styls.data_info} style={styles}>
  
        <div style={styles2} className={styls.inner_data_info}>
  
          <div className={styls.data_info_hero}>
            <div className={styls.totalBg}>
              <Image1 path1={tmdb_image_url+SERIE.poster_path} path2={tmdb_image_url2+SERIE.backdrop_path} name={SERIE.name} />
            </div>
            <div className={styls.small_dev_bg}>
              <Image1 path1={tmdb_image_url+SERIE.poster_path} path2={tmdb_image_url2+SERIE.backdrop_path} name={SERIE.name} />
            </div>
          </div>
  
          <div style={isSmallDevice ? {background: `rgba(${r},${g},${b}, 1)`} : {}} className={styls.data_info_details}>
  
            {/* name and release year */}
            <div className={styls.data_teb_detz_1}>
              <span className={styls.title_teb}>{SERIE.name}</span>
              <span className={styls.year_teb}>{formattedYear(SERIE.first_air_date)}</span>
            </div>
  
            {/* score rating and emoji */}
            <div className={styls.data_teb_detz}>
  
              <div className={styls.spread_score}>
                <div className={styls.movieRating}>
                  <div style={{background: `rgb(${colorDecode2})`}} className={styls.innerCircle}>
                    <SemiCircle1 $color={`rgb(${colorDecode})`} $score={parseFloat(SERIE.vote_average.toFixed(1))} />
                    <SemiCircle2 $color={`rgb(${colorDecode})`} $score={parseFloat(SERIE.vote_average.toFixed(1))} />
                    {SERIE.vote_average > 5 
                        ? <SemiCircle3 $color={`rgb(${colorDecode2})`} $score={40} /> 
                        : <div className={styls.miniCircle} style={{background: `rgb(${colorDecode2})`}}></div>
                    }
                  </div>
                  <div className={styls.outerCircle}>
                    <span>{parseFloat(SERIE.vote_average.toFixed(1)) * 10}</span>
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
                  onClick={() => handleList(SERIE.id)} 
                  className={isListed ? `${styls.actions_btn} ${styls.listed}` : styls.actions_btn}
                >
                  <FaList />
                </span>
                <span 
                  onClick={() => handleHeart(SERIE.id)} 
                  className={isHearted ? `${styls.actions_btn} ${styls.hearted}` : styls.actions_btn}
                ><FaHeart /></span>
                <span 
                  onClick={() => handleWatch(SERIE.id)}
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
                      <div className={styls.clearRating} onClick={() => handleClearRating(SERIE.id, currentType)}><FaMinus /></div>
                      <div className={styls.ratingStars}>
                        <StarRatings
                          rating={isRated?.rated || 0}
                          starRatedColor="rgb(255,215,0)"
                          changeRating={(val:number) => handleRating(val, currentType, SERIE.id)}
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
              <div className={styls.tagline_movie}>{SERIE.tagline}</div>
              <div className={styls.overView_movie}>
                <div className={styls.overview_head}>Overview</div>
                <div className={styls.overview_char}>{SERIE.overview}</div>
              </div>
            </div>
  
            {/* creator, writer E.T.C and few others */}
            <div className={`${styls.data_teb_detz} ${styls.content}`}>
              {mapp_dried}
            </div>
  
            <div className={styls.only_small_dev}>
              <div className={styls.xs__actions}>
                <span 
                  onClick={() => handleList(SERIE.id)} 
                  className={isListed ? `${styls.actions_btn} ${styls.listed}` : styls.actions_btn}
                >
                  <FaList />
                </span>
                <span 
                  onClick={() => handleHeart(SERIE.id)} 
                  className={isHearted ? `${styls.actions_btn} ${styls.hearted}` : styls.actions_btn}
                ><FaHeart /></span>
                <span 
                  onClick={() => handleWatch(SERIE.id)}
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
                      <div className={styls.clearRating} onClick={() => handleClearRating(SERIE.id, currentType)}><FaMinus /></div>
                      <div className={styls.ratingStars}>
                        <StarRatings
                          rating={isRated?.rated || 0}
                          starRatedColor="rgb(255,215,0)"
                          changeRating={(val:number) => handleRating(val, currentType, SERIE.id)}
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