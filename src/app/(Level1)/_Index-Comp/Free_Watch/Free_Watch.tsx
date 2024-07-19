"use client";
import React, {useEffect, useState, useRef} from 'react';
import styls from "./free_watch.module.css";
import { SwiperSlide, Swiper } from 'swiper/react';
import Item_Mapper1 from '../Item_Mapper/Item_Mapper1';
import 'swiper/css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { getDataByUrl } from '@/actions/universal/getDataByUrl';

import { SelectPicker } from 'rsuite';
import { ValueType } from 'rsuite/esm/InputPicker/InputPicker';

const popular_cont = ["Movie", "Tv"];


interface CustomOptionType{
    value: string,
    label: string
}

export default function Free_Watch() {

    const users = useSelector((state:RootState) => state.userSlice);
    const refz = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null)
    const [saveStates, setStates] = useState<{
        trending: string,
        trending_content: {}[],
        isLoading: boolean
    }>({
        isLoading: false,
        trending: "Movie",
        trending_content: [],
    });
    let reference = saveStates.trending;

    const main_url = saveStates.trending == "Tv"
        ? `https://api.themoviedb.org/3/tv/on_the_air?with_watch_monetization_types=free&watch_region=${users.country}`
    : `https://api.themoviedb.org/3/discover/movie?with_watch_monetization_types=free&watch_region=${users.country}`

    let curr_type = saveStates.trending == "Tv"
        ? `series`
    : "movie";

    const Fetch_Trending = async() => {
        setStates((obj) => ({...obj, isLoading: true}))
        let rep = await getDataByUrl(main_url);
        let res = await rep?.results;
        setStates((obj) => ({...obj, trending_content: [...res], isLoading: false}));
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
        width: "150px",
        height: "320px",
    }

    const st2 = {
        width: "150px",
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
                <Item_Mapper1 DATA={item} TYPE={curr_type} />
            </SwiperSlide>

        )
    })

    const loading_swipes = [1,2,3,4,5,6,7,8,9,0].map((item, index:number) => {
        return(<SwiperSlide  key={index} className={styls.item_map}>
            <div style={st1}>

                <div style={st2}>
                    <Skeleton width={"100%"} height={"100%"} />
                </div>
                
                <div style={{...st1, paddingTop: "30px", position: "relative"}} >

                    <div style={{...st4, position: "absolute", left: "10px", top: "-20px"}}>
                        <Skeleton borderRadius={"50%"} width={"100%"} height={"100%"} />
                    </div>

                    <div style={st3}><Skeleton width={"100%"} height={"100%"} /></div>

                    <div style={{...st3, marginTop: "10px"}}><Skeleton width={"100%"} height={"100%"} /></div>

                </div>
                
            </div>
        </SwiperSlide>)
    })

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

  return (
    <div className={styls.trending_now_container} >

        <div className={styls.trending_head_cont}>
            <div className={styls.trending_head_text}>Free to Watch</div>
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
  )
}
