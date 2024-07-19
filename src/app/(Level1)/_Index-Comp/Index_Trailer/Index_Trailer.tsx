"use client";
import React, {useState, useRef, useEffect} from 'react';
import styls from "./index_trailer.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getDataByUrl } from '@/actions/universal/getDataByUrl';

import { SelectPicker } from 'rsuite';
import { ValueType } from 'rsuite/esm/InputPicker/InputPicker';

import { getDataByUrl2 } from '@/actions/universal/getDataByUrl2';
import { getVideosById } from '@/actions/level1/getVideosById';
import Trailer_Mapper from '../Item_Mapper/Trailer_Mapper';
import TrailerPlay from '../../(innerLayout)/_comp/TrailerPlay/TrailerPlay';

interface CustomOptionType{
    value: string,
    label: string
}



const popular_cont = ["Now Playing", "Trending", "On Tv"];

export default function Index_Trailer() {
    const [videoKey, setVideoKey] = useState({
        source: "",
        ptbool: false
    })
    const [BGIMG, setBG] = useState('')
    const refz = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null)
    const [saveStates, setStates] = useState<{
        trending: string,
        trending_content: {}[],
        isLoading: boolean
    }>({
        isLoading: false,
        trending: "Now Playing",
        trending_content: [],
    });
    let reference = saveStates.trending;

    const main_url = saveStates.trending == "Now Playing"
        ? `https://api.themoviedb.org/3/discover/movie?with_release_type=1&include_video=true`
        : saveStates.trending == "On Tv" 
        ? 'https://api.themoviedb.org/3/discover/tv?with_release_type=6&include_video=true'
    : 'https://api.themoviedb.org/3/trending/all/day';

    let curr_type = saveStates.trending == "Now Playing"
        ? `movie`
        : saveStates?.trending == "On Tv"
        ? "series"
    : "trending";

    const Fetch_Trending = async() => {
        setStates((obj) => ({...obj, isLoading: true}))
        let rep = await getDataByUrl(main_url);
        let res: {}[] = await rep?.data || rep?.results;
        let id = res?.map((item:any) => item.id);
        let urls = 
        curr_type == "movie" 
        ? `https://api.themoviedb.org/3/movie/`
        : curr_type == "series"
        ? `https://api.themoviedb.org/3/tv/`
        : ``
        let itemz = await Promise.all(
            id?.map(async(ID:number, index:number) => {
                let value : {media_type?: string} = {...res[index]}
                let urls2 = urls.length == 0 ? `https://api.themoviedb.org/3/${value?.media_type}/` : urls;
                let rep = await getVideosById(urls2, curr_type, ID);
                let res_inner = await rep?.results;
                let official = await res_inner?.filter((item:any) => (item?.official && item.type == "Trailer") && item);
                if(official.length == 0){
                    return
                }else{
                    return {...official[0], id: ID}
                }
            })
        )
        itemz = itemz.filter((item:any) => item != undefined && item);
        const results: {}[] = []
        res?.map((item:any) => {
            let vid_id = (itemz.filter((VID:any) => VID.id == item.id));
            if(vid_id.length == 0)return false
            let vid_obj = vid_id;
            if(vid_id.length > 0){
                let obj = {
                    key: vid_obj[0].key,
                    site: vid_obj[0].site,
                    published: vid_obj[0].published_at,
                    title: item.title || item.name,
                }
                results.push(obj)
                return true
            }else{
                return false
            }
           
        });
        
        setStates((obj) => ({...obj, trending_content: [...results], isLoading: false}));
    }

    const saveImage = (val:string) => {
        setBG(val)
    }

    const saveKey = (val:string) => {
        setVideoKey((obj) => ({...obj, source: val, ptbool: true}))
    }

    const endVideo = () => {
        setVideoKey((obj) => ({...obj, source:"", ptbool: false}))
    }

    useEffect(() => {
        Fetch_Trending();
    }, [reference]);

    const saveState = (val:string, type:string) => {
        setStates((obj) => ({...obj, [type]: val}))
        let parent = containerRef?.current;
        let parent_width = parent?.clientWidth;
        let num = popular_cont.indexOf(val) * 90;

        let percentage = (num * 100) / (parent_width || popular_cont.length * 90);
        refz.current = percentage
    }

    const st1 = {
        width: "280px",
        height: "320px",
    }

    const st2 = {
        width: "280px",
        height: "225px",
    }

    const st3 = {
        width: "100%",
        height: "20px",
    }

    const st4 = {
        width: "40px",
        height: "40px",
    }

    const mapped_item = saveStates?.trending_content?.map((item:any, index:number) => {
        return (

            <SwiperSlide key={index} className={styls.item_map}>
                <Trailer_Mapper SETBG={saveImage} DATA={item} setKey={saveKey} />
            </SwiperSlide>

        )
    })

    const loading_swipes = [1,2,3,4,5,6,7,8,9,0].map((item, index:number) => {
        return(<SwiperSlide  key={index} className={styls.item_map}>
            <div style={st1}>

                <div style={st2}>
                    <Skeleton width={"100%"} height={"100%"} />
                </div>
                
                <div style={{...st1, paddingTop: "10px", position: "relative"}} >

                    <div style={st3}><Skeleton width={"100%"} height={"100%"} /></div>

                    <div style={{...st3, marginTop: "10px"}}><Skeleton width={"100%"} height={"100%"} /></div>

                </div>
                
            </div>
        </SwiperSlide>)
    });

    const nav_items = popular_cont.map((item:string, index:number) => {
        return(
            <span
                key={index}
                onClick={(e) => saveState(item, "trending")} 
                className={saveStates.trending != item ? styls.nav_childs : `${styls.nav_childs} ${styls.active}`}

            >
                {item}
            </span>
        )
    });

    let calculated = {
        left: `${refz.current}%`,
    }

    const options: CustomOptionType[] = [
        ...popular_cont?.map((item:string) => {
            return {value: item, label:item}
        })
    ];

    const backstyle = {
        background: `linear-gradient(to right, rgba(3, 37, 65, .7) 0%, rgba(3, 37, 65, .7) 100% ),
        url(${BGIMG}) no-repeat center center/cover`
    }

    return (
        <>
            <div style={BGIMG == "" ? {} : {...backstyle}} className={styls.trending_now_container} >
        
                <div className={styls.trending_head_cont}>
                    <div className={styls.trending_head_text}>Trailer</div>
                    <div className={styls.trending_nav}>
                        <div ref={containerRef} className={styls.trending_navigation}>
                            {nav_items}
                        </div>
                        <span 
                            style={calculated}
                            className={styls.nav_select}
                        >
                        </span>
                    </div>
                    <div className={styls.small_device_trending_nav}>
                        <SelectPicker
                            data={options}
                            style={{ width: "170px" }}
                            defaultValue={saveStates?.trending}
                            onChange={(value: ValueType, event: React.SyntheticEvent) => saveState(value, "trending")}
                        />
                    </div>
                </div>
        
                <div className={styls.trending_contents}>
                    <div className={styls.trending_content_swiper}>
                        <Swiper 
                            slidesPerView={'auto'}
                            className={styls.swiper_cont}
                            spaceBetween={10}
                        >
                            {saveStates.isLoading ? loading_swipes : mapped_item}
                        </Swiper>
                    </div>
                </div>

                
        
            </div>
            { videoKey.ptbool &&
                <TrailerPlay SOURCE={videoKey.source} PTB={endVideo} PTBool={videoKey.ptbool} />
            }
        </>
    )
}
