"use client"
import React from 'react'
import { Slider } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function UserSlider({type, id}:{type:string, id?:number}) {

    const state = useSelector((state:RootState) => state.dataSlice);
    const movies_state = type == "movies"
    ? state.movies
    : type == 'series'
    ? state.series
    : type == "manga"
    ? state.manga
    : state.anime;

    const rated_what = movies_state?.rating?.filter((item:any) => item.id == id ? item : false);
    console.log(rated_what);
    
    
    

  return (
    <span style={{width: "100%", height: "fit-content", display: "grid", alignItems: "center", gridTemplateColumns: "1fr 30px", columnGap: "5px"}}>
        <Slider 
            value={rated_what?.length > 0 ? rated_what[0].rated * 20 : 0}
            disabled
            graduated
            progress
            step={10}
            style={{width: "100%", height: "fit-content"}}
        />
        <span style={{fontSize: "14px", fontWeight: "var(--font-weigth700)", width: "100%", textAlign: "right"}}>{rated_what?.length > 0 ? rated_what[0].rated * 20 : 0}%</span>
    </span>
  )
}
