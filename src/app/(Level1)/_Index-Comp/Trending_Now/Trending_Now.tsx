"use client";
import React, {useEffect, useState, useRef} from 'react';
import styls from "./trending_now.module.css";
import { SwiperSlide, Swiper } from 'swiper/react';
import { getTrending } from '@/actions/Trending/getTrending';
import Item_Mapper1 from '../Item_Mapper/Item_Mapper1';
import 'swiper/css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


import { Select } from 'antd';

interface CustomOptionType{
    value: string,
    label: string
}

const popular_cont = ["Today", "This Week"];

export default function Trending_Now() {
    const refz = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null)
    const [saveStates, setStates] = useState<{
        trending: string,
        trending_content: {}[],
        isLoading: boolean
    }>({
        isLoading: false,
        trending: "Today",
        trending_content: [],
    });
    let reference = saveStates.trending;
    const extension = "all"
    const url = `https://api.themoviedb.org/3/trending/`;
    const time_window = saveStates.trending == "Today" ? "day" : "week";

    const Fetch_Trending = async() => {
        setStates((obj) => ({...obj, isLoading: true}))
        let rep = await getTrending(url, extension, time_window);
        let res = await rep?.results;
        setStates((obj) => ({...obj, trending_content: [...res], isLoading: false}));
    }

    useEffect(() => {
        Fetch_Trending();
    }, [reference])

    const saveState = (val:string, type:string) => {
        setStates((obj) => ({...obj, [type]: val}))
        let parent = containerRef?.current;
        let parent_width = parent?.clientWidth;
        let num = popular_cont.indexOf(val) * 80;

        let percentage = (num * 100) / (parent_width || popular_cont.length * 80);
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

    let calculated = {
        left: `${refz.current}%`,
    }

    const mapped_item = saveStates?.trending_content?.map((item:any, index:number) => {
        return (

            <SwiperSlide key={index} className={styls.item_map}>
                <Item_Mapper1 DATA={item} />
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

    const mapped_nav = popular_cont?.map((item, index:number) => {
        return(
            <span 
            key={index}
            onClick={() => saveState(item, "trending")} 
            className={saveStates.trending != item ? styls.nav_childs : `${styls.nav_childs} ${styls.active}`}
            >{item}</span>
        )
    })

    const { Option } = Select
    const options: CustomOptionType[] = [
        ...popular_cont?.map((item:string) => {
            return {value: item, label:item}
        })
    ];
    const optionRender = (option: CustomOptionType) => {
        return (
          <Option key={option.value} value={option.value} label={option.label}>
            <span 
                onClick={(e) => saveState(option.value, "trending")} 
                className={saveStates.trending != option.value ? styls.nav_childs : `${styls.nav_childs} ${styls.active}`}

            >
                {option.label}
            </span>
          </Option>
        );
    };
    

  return (
    <div className={styls.trending_now_container} >

        <div className={styls.trending_head_cont}>
            <div className={styls.trending_head_text}>Trending</div>
            <div className={styls.trending_nav}>
                <div ref={containerRef} className={styls.trending_navigation}>
                    {mapped_nav}
                </div>
                <span 
                    style={{...calculated}}
                    className={styls.nav_select}
                >
                </span>
            </div>
            <div className={styls.small_device_trending_nav}>
                <Select
                    style={{ width: 200 }}
                    defaultValue={saveStates.trending}
                    value={saveStates.trending}
                >
                    {options.map(optionRender)}
                </Select>
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
