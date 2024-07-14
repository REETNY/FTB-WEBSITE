"use client"
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SemiCircle1, SemiCircle2, SemiCircle3 } from '../../_comp/styled_components/plane_shapes'
import OutsideClickHandler from 'react-outside-click-handler';
import { FaHeart, FaBookmark, FaList, FaStar, FaMinusCircle } from 'react-icons/fa'
import StarRatings from 'react-star-ratings';
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addHeared, addListed, addRating, addWatched_Read, clearRating } from '@/store/Slices/DataSlice';
import Link from 'next/link'
import { Manga } from '../page'
import Image01 from '@/components/ImageComponents/Image01'
import styles from "../mangaList.module.css"

export default function MangaData(mangaData: Manga) {
    const currentType = "manga"
    const router = useRouter();
    const dispatch = useDispatch();

    const MangaDB = useSelector((state: RootState) => state?.dataSlice?.manga);
    
    // each movie data from store
    const movies_rating = MangaDB.rating.find((item) => item.id == mangaData.mal_id);
    const movies_listed = MangaDB.list.find((item) => item.id == mangaData.mal_id);
    const movies_hearted = MangaDB.hearted.find((item) => item.id == mangaData.mal_id);
    const movies_booked = MangaDB.watched.find((item) => item.id == mangaData.mal_id)
    
    function CheckLoggedIn (){
        let isUserExist = JSON.parse(localStorage.getItem("userCookies") || "{}");
        if(isUserExist.loggedIn){
            return true
        }else{
            return true
        }
    }

    const imageStyls = {
        width: "100%",
        height: "100%"
    }

    const [movieSettings, setSettings] = useState({
        menuBtn: false,
        ratingMenu: false
    });

    const [rating, setRating] = useState({
        original: 0,
        dummy: 0
    })

    const dateFormater = (val:string) => {
        let rl = new Date(val);
        let year = rl.getFullYear();
        let months_of_year = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month_string = months_of_year[rl.getMonth()];
        let day = rl.getDate();
        return `${month_string} ${day}, ${year}`
    }

    const handleMenuBtn = () => {
        setSettings((obj) => ({...obj, menuBtn: !movieSettings.menuBtn}));
        if(movieSettings.ratingMenu){
            setSettings((obj) => ({...obj, ratingMenu: false}));
        }
    }

    const handleRatingMenu = () => {
        setSettings((obj) => ({...obj, ratingMenu: !movieSettings.ratingMenu}))
    }

    const handleRating = (rate: number, type:string, id: number) => {
        const isOnline = CheckLoggedIn();
        if(!isOnline)return;
        // [{movieId: number, rated: number}]
        dispatch(addRating({rate, type, id}))
        
    }

    const handleClearRating = (id: number, type: string) => {
        const isOnline = CheckLoggedIn();
        if(!isOnline)return;
        dispatch(clearRating({id, type}))
    }

    const handleList = (id: number, type: string ) => {
        const isOnline = CheckLoggedIn();
        if(!isOnline)return;
        dispatch(addListed({id, type}))
        // check if exist
        // it true remove from list else add to list and save
    }

    const handleHeart = (id: number, type: string) => {
        const isOnline = CheckLoggedIn();
        if(!isOnline)return;
       dispatch(addHeared({id, type}));
        // check if exist
        // it true remove from heart else add to heart and save
    }

    const handleBookmark = (id:number, type:string) => {
        const isOnline = CheckLoggedIn();
        if(!isOnline)return;
        dispatch(addWatched_Read({id, type}))
        // check if exist
        // it true remove from bookmark else add to bookmark and save
    }
    

    const score = parseFloat((mangaData.score || 0.0)?.toFixed(1)) * 10;
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

    const regExp = /[:\s-]/gi;
    const movieTitle = mangaData.title.replaceAll(":", "")
    const formattedTitle = movieTitle.replaceAll(regExp, "-");
    
  return (
    <OutsideClickHandler 
        onOutsideClick={() => setSettings((obj) => ({...obj, menuBtn: false, ratingMenu: false}))} 
    >
        <div className={styles.movieTab}>
            <div className={styles.movieTab1}>
                <div className={styles.movieControls}>

                    <div onClick={handleMenuBtn} className={styles.movieControlBtn}>
                        <span className={movieSettings.menuBtn ? styles.active : ""}></span>
                        <span className={movieSettings.menuBtn ? styles.active : ""}></span>
                    </div>

                    <div className={movieSettings.menuBtn ? `${styles.movieControlMenu} ${styles.sense}` : styles.movieControlMenu}>
                        <div className={styles.innerMenu}>

                            <div 
                                className={movies_listed ? `${styles.menuItems} ${styles.listed}` : styles.menuItems}
                                onClick={() => handleList(mangaData.mal_id, currentType)}
                            >   
                                <FaList /> List
                            </div>

                            <div 
                                className={movies_booked ? `${styles.menuItems} ${styles.booked}` : styles.menuItems}
                                onClick={() => handleBookmark(mangaData.mal_id, currentType)}
                            >
                                <FaBookmark /> WatchList
                            </div>

                            <div 
                                onClick={() => handleHeart(mangaData.mal_id, currentType)} 
                                className={movies_hearted ? `${styles.menuItems} ${styles.hearted}` : styles.menuItems}
                            >
                                <FaHeart /> Favourite
                            </div>

                            <div 
                                className={movies_rating ? `${styles.menuItems} ${styles.rated}` : styles.menuItems} 
                                onClick={handleRatingMenu}
                            >
                                <FaStar /> Rating
                            </div>

                        </div>
                    </div>

                    <div 
                        className={
                            (movieSettings.menuBtn && movieSettings.ratingMenu) 
                            ? `${styles.ratingInput} ${styles.active}` 
                            : styles.ratingInput
                        }  
                    >
                        <span onClick={() => handleClearRating(mangaData.mal_id, currentType)} className={styles.clearRating}><FaMinusCircle /></span>
                        <span className={styles.ratingStars}>
                            <StarRatings
                                rating={movies_rating?.rated || 0}
                                starRatedColor="rgb(255,215,0)"
                                changeRating={(val:number) => handleRating(val, currentType, mangaData.mal_id)}
                                starDimension='21px'
                                starEmptyColor='rgb(255,250,250)'
                                starHoverColor='rgb(255,215,0)'
                                starSpacing='3px'
                                numberOfStars={5}
                                name='rating'
                            />
                        </span>
                    </div>

                </div>
            </div>
            <Link href={`/manga/${mangaData.mal_id}_${formattedTitle}`}>
                <div className={styles.movieTab2}>
                    <div className={styles.movieHero}>
                       <Image01 
                            name={mangaData.title} 
                            path1={mangaData.images.webp.image_url} 
                            path2={mangaData.images.jpg.image_url} 
                        />
                    </div>
                    <div className={styles.movieRating}>
                        <div style={{background: `rgb(${colorDecode2})`}} className={styles.innerCircle}>
                            <SemiCircle1 $color={`rgb(${colorDecode})`} $score={parseFloat((mangaData.score || 0.0)?.toFixed(1))} />
                            <SemiCircle2 $color={`rgb(${colorDecode})`} $score={parseFloat((mangaData.score || 0.0)?.toFixed(1))} />
                            {mangaData.score > 5 
                                ? <SemiCircle3 $color={`rgb(${colorDecode2})`} $score={40} /> 
                                : <div className={styles.miniCircle} style={{background: `rgb(${colorDecode2})`}}></div>
                            }
                        </div>
                        <div className={styles.outerCircle}>
                            <span>{parseFloat((mangaData.score || 0.0)?.toFixed(1)) * 10}</span>
                            <sup>%</sup>
                        </div>
                    </div>
                    <div className={styles.movieDetails}>
                        <div className={styles.movieName}>{mangaData.title}</div>
                        <div className={styles.movieRelease}>{dateFormater(mangaData.published?.from)}</div>
                        <div className={styles.xsSynopsis}>{mangaData.synopsis?.slice(0, 50)}...</div>
                    </div>
                </div>
            </Link>
        </div>
    </OutsideClickHandler>
  )
}
