"use client"
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { FaCaretDown, FaCaretRight, FaCopy } from 'react-icons/fa';
import styleHead from "./innerHeader.module.css"
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import {v4 as uuidV4} from "uuid";
import { getDataVidById } from '@/actions/level2/anime/getDataVidById';
import delayTimer from '@/actions/level2/timerDelay';

interface VideoNav{
    name:string,
    value:string,
    for: string[]
}

export default function InnerHeader() {
    const [link_state, setLink] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    let pathname = usePathname();
    const linker = window?.location?.href;
    const [copy, setCopied] = useState(false);
    const [video_nav, setVideo_Nav] = useState<VideoNav[]> ([]);

    let url = pathname.includes("anime")
    ? "https://api.jikan.moe/v4/anime/"
    : pathname.includes("manga")
    ? "https://api.jikan.moe/v4/manga/"
    : pathname.includes("series")
    ? "https://api.themoviedb.org/3/tv/"
    : pathname.includes("movie")
    ? "https://api.themoviedb.org/3/movie/"
    : "";

    const tester = pathname;
    let ID:number;
    const nav_type = pathname.includes("movie")
    ? "movie"
    : pathname.includes("series")
    ? "series"
    : pathname.includes("anime")
    ? "anime"
    : pathname.includes("manga")
    ? "manga"
    : ""
    let boolCheck = (nav_type == "manga" || nav_type == "anime") ? false : true
    let checkSlash: {item:string, ind:number}[] = []
    tester.split("").map((item:string,index:number) => {
        if(item != "/")return
        checkSlash.push({item, ind: index});
    })
    if(checkSlash.length > 2){
        let unformatted = tester.slice(checkSlash[1].ind + 1, checkSlash[2].ind);
        ID = parseInt(unformatted.split("_")[0])
    }else{
        let unformatted = tester.slice(checkSlash[1].ind+1, tester.length)
        ID = parseInt(unformatted.split("_")[0])
    }; 

    const fetch_video_navigator = async(url:string, id:number, type: string, bool:boolean) => {
        await delayTimer(1000)
        if(type == "manga")return;
        let fetched = await getDataVidById(url, id, bool)
        let data_nav = fetched?.results || fetched?.data;
        let mapped_nav:string[];
        let nav_video;
        if(type == "movie" || type == "series"){
            mapped_nav = data_nav?.map((item:any) => item?.type.replaceAll(" ", "_"));
            mapped_nav = mapped_nav.reduce((accumulator:string[], currentVal:string) => {
                if(!accumulator.includes(currentVal)){
                    accumulator.push(currentVal)
                }
                return accumulator
            }, [])
            nav_video = mapped_nav.map((item:string) => ({name: item, value: item.toLowerCase(), for: [type.toLowerCase()]}));
            setVideo_Nav(nav_video)
        }else if(type == "anime"){
            mapped_nav = Object.keys(data_nav);
            nav_video = mapped_nav.map((item:string) => ({name:item, value: item.toLowerCase(), for:[type]}));
            setVideo_Nav(nav_video);
        }else if(type == "manga"){
            setVideo_Nav([])
        }
        
    }
    
    useEffect(() => {
        fetch_video_navigator(url, ID, nav_type, boolCheck);
    }, [ID, boolCheck, nav_type, url])

    
    function spliter(val:string){
        let sp = val.split("");
        let ind: {item:string, index: number}[] = []
        sp.map((item, index) => {
            if(item == "/"){
                ind.push({item, index})
            }
        })
        let str = ""
        if (ind.length >= 3){
            str = pathname.substring(0, ind[2].index)
            return str;
        }else{
            return pathname
        }
    
    }

    const path_finder = pathname.includes("movie")
    ? "movie"
    : pathname.includes("series")
    ? "series"
    : pathname.includes("anime")
    ? "anime"
    : pathname.includes("manga")
    ? "manga"
    : "";

    const handleShareLink = (val: boolean) => {
        setLink(() => val)
    }

    const copyTimer = () => {
        console.log('data');
        
       new Promise((resolve) => resolve(setTimeout(() => setCopied(false), 5000)))
    }

    const handleCopy = () => {
        let value = inputRef?.current?.value;
        navigator.clipboard.writeText(value || '')
        setCopied(() => true);
        copyTimer()
    }



    const overviewData: {
        name: string;
        value: string;
        for: string[];
    }[] = [
        {name: "Main", value: "main", for: ["movie", "series", "anime", "manga"]},
        {name: "Alternative Titles", value: "titles", for: ["movie", "series", "anime", "manga"]},
        {name: "Casts & Crews", value: "cast", for: ["movie", "series", "anime", "manga"]},
        {name: "Release Dates", value: "releases", for: ["movie", "anime", "manga"]},
        {name: "Translations", value: "translations", for: ["movie", "series"]},
        {name: "Episode Group", value: "episodes_group", for: ["series"]},
        {name: "Seasons", value: "seasons", for: ["series"]}
    ];
    const mediaData = [
        {name: "Backdrops", value: "backdrops", for: ["movie", "series", "anime", "manga"]},
        {name: "Logos", value: "logos", for: ["series", "movie", "anime", "manga"]},
        {name: "Posters", value: "posters", for: ["series", "movie", "anime", "manga"]},
        {name: "Videos", value: "videos", for: ["series", "movie", "anime"]},
    ];
    const videoData = [
        ...video_nav
    ];
    const fandomData = [
        {name: "Review", value: "review", for: ["series", "movie", "anime", "manga"]}
    ];
    const shareData = [
        {name: "Share Link", value: ``, for: ["series", "movie", "anime", "manga"]},
        {name: "Facebook", value: ``, for: ["series", "movie", "anime", "manga"]},
        {name: "Twitter", value: ``, for: ["series", "movie", "anime", "manga"]},
    ];

    // movie, series, anime, manga

    const ovd = overviewData.map((item) => {
        if(item.for.includes(path_finder) && item.name == "Main"){
            return <Link key={uuidV4()} href={`${spliter(pathname)}`}>{item.name}</Link>
        }else if(item.for.includes(path_finder)){
            return <Link key={uuidV4()} href={`${spliter(pathname)}/${item.value}`}>{item.name}</Link>
        }
        else{
            return
        }
    });
    const vd = videoData.map((item) => {
        if(item.for.includes(path_finder)){
            return <Link key={uuidV4()} href={spliter(pathname)+'/video/'+item.value}>{item.name}</Link>
        }else{
            return
        }
    });
    const md = mediaData.map((item) => {
        if(item.for.includes(path_finder) && item.name != "Videos"){
           return <Link key={uuidV4()} href={`${spliter(pathname)}/${item.value}`}>{item.name}</Link>
        }else if(item.for.includes(path_finder) && item.name == "Videos"){
            return(
                <div key={uuidV4()} className={styleHead.openVideoHead}>
                    <div className={styleHead.vidHead}>Videos <FaCaretRight /></div>
                    <div className={styleHead.vidMenu}>
                        {vd}
                    </div>
                </div>
            )
        }else{
            return
        }
    });
    const fd = fandomData.map((item) => {
        if(item.for.includes(path_finder)){
            return <Link key={uuidV4()} href={spliter(pathname) + '/' + item.value}>{item.name}</Link>
        }else{
            return
        }
    });
    const sd = shareData.map((item) => {
        if(item.for.includes(path_finder) && item.name == "Share Link"){
            return <button key={uuidV4()} onClick={() => handleShareLink(true)}>{item.name}</button>
        }else if(item.for.includes(path_finder)){
            return <Link key={uuidV4()} href={""} >{item.name}</Link>
        }else{
            return
        }
    })

  return (
    <div className={styleHead.innerHeadCont}>

        <div className={styleHead.eachHeadLink}>
            <div className={styleHead.head_link}>
                Overview 
                <span className={styleHead.smallIcons}><FaCaretDown /></span>
            </div>
            <div className={styleHead.head_menu}>
                {ovd}
            </div>
        </div>

        <div className={styleHead.eachHeadLink}>
            <div className={styleHead.head_link}>
                Media 
                <span className={styleHead.smallIcons}><FaCaretDown /></span>
            </div>
            <div className={styleHead.head_menu}>
                {md}
            </div>
        </div>

        <div className={styleHead.eachHeadLink}>
            <div className={styleHead.head_link}>
                Fandom 
                <span className={styleHead.smallIcons}><FaCaretDown /></span>
            </div>
            <div className={styleHead.head_menu}>
                {fd}
            </div>
        </div>

        <div className={styleHead.eachHeadLink}>
            <div className={styleHead.head_link}>
                Share 
                <span className={styleHead.smallIcons}><FaCaretDown /></span>
            </div>
            <div className={styleHead.head_menu}>
                {sd}
            </div>
        </div>

        {/* share link */}
        <div className={copy ? `${styleHead.copiedToClip} ${styleHead.active}` : styleHead.copiedToClip}>Copied !</div>
        <div className={link_state ? `${styleHead.backCover} ${styleHead.active}` : styleHead.backCover}></div>
        <OutsideClickHandler onOutsideClick={() => handleShareLink(false)}>
            <div className={link_state ? `${styleHead.getLinkContainer} ${styleHead.active}` : styleHead.getLinkContainer}>
                <div className={styleHead.getLinkHead}>Share Link</div>
                <div className={styleHead.getLinkDataCont}>
                    <div className={styleHead.getLinker}><input ref={inputRef} readOnly value={linker} /></div>
                    <div onClick={handleCopy} className={styleHead.copy_link_btn}><FaCopy /></div>
                </div>
            </div>
        </OutsideClickHandler>


    </div>
  )
}
