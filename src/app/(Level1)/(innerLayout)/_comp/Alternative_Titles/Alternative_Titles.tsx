"use client"
import React from 'react'
import AltStyles from "./alternativeTitles.module.css";
import { getCountryName } from '@/actions/country_mapper/country_mapper';
import { useContext } from 'react';
import { DataContext } from '../Data_Provider/DataProvider';
import Image01 from '@/components/ImageComponents/Image01';

interface ALT_DATA{
    titles?:{
        iso_3166_1?: string,
        title?: string,
        type?: string
    }[],
    results?:{
        iso_3166_1?: string,
        title?: string,
        type?: string
    }[],
    titlez?:{
        iso_3166_1?: string,
        title?: string,
        type?: string
    }[]
}

export default function Alternative_Titles({TITLES, type}:{TITLES: ALT_DATA, type:string}) {

    let current_type = type;
    let countries_code: string[] = [];
    let countries_name: string[] = [];
    let country;
    let country_items;
    let FTC: {
        Vibrant: any;
        DarkVibrant: any;
        LightVibrant: any;
        Muted: any;
        DarkMuted: any;
        LightMuted: any
    } = useContext(DataContext);

    // get countries code by type
    if(current_type == "anime_manga"){
        console.log(TITLES);
        country = TITLES?.titlez?.map((item:any, index:number) => {
            return (
                <div key={index} onClick={() => goToHashTag(item.type)} className={AltStyles.clickCountry}>{item.type}</div>
            )
        })
        // country titles
        country_items = TITLES?.titlez?.map((item, index:number) => {
            return (
                <div key={index} className={AltStyles.each_country_titles} id={item.type}>
                    <div className={AltStyles.country_head}>
                        <span className={AltStyles.CN}>{item.type}</span>
                    </div>
                    <div className={AltStyles.country_titls}>
                        <div className={AltStyles.utils_titls}>
                            <span>Title</span>
                            <span>Type</span>
                        </div>
                        <div className={AltStyles.utils_titls}>
                            <span>{item.title}</span>
                            <span>{item.type}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }else if(current_type == "movie_serie"){
        (TITLES?.titles || TITLES?.results) && (TITLES?.titles || TITLES?.results)?.map((item) => {
            if(item.iso_3166_1 != undefined){
                countries_code.push(item.iso_3166_1)
            }
        })

        // sort duplicate countries code
        countries_code = countries_code.reduce((accumaltor:string[], currentVal:string) => {
            if(!accumaltor.includes(currentVal)){
            accumaltor.push(currentVal)
            }
            return accumaltor
        }, []);

        // extract countries name
        countries_name = countries_code.map((item) => getCountryName(item))

        // map out each countries
        country = countries_name.map((item:string, index:number) => {
            return (
                <div key={index} onClick={() => goToHashTag(countries_code[index])} className={AltStyles.clickCountry}>{item}</div>
            )
        })

        // country titles
        country_items = countries_code?.map((item, index) => {
            let name = getCountryName(item);
            const CC = item;
            const name_item = (TITLES?.titles || TITLES?.results)?.map((item:any, index:number) => {
                if(item.iso_3166_1 != CC)return;
                return (
                    <div key={"A"+index} className={AltStyles.utils_titls}>
                        <span>{item.title}</span>
                        <span>{item.type}</span>
                    </div>
                )
            })
            return (
                <div key={index} className={AltStyles.each_country_titles} id={item}>
                    <div className={AltStyles.country_head}>
                        <span className={AltStyles.CH}><Image01 path1={`https://flagsapi.com/${item}/flat/64.png`} path2={`https://flagsapi.com/${item.toLowerCase()}/flat/64.png`} name={item} /></span>
                        <span className={AltStyles.CN}>{name}</span>
                    </div>
                    <div className={AltStyles.country_titls}>
                        <div className={AltStyles.utils_titls}>
                            <span>Title</span>
                            <span>Type</span>
                        </div>
                        {name_item}
                    </div>
                </div>
            )
        })
        
    }


    function goToHashTag(val:string){
        let scroll_to = document.querySelector(`#${val}`);
        scroll_to?.scrollIntoView({behavior: "smooth"})
    }

  return (
    <div className={AltStyles.altTitle_Cont}>

        <div className={AltStyles.left_nav_bar}>
            <div className={AltStyles.fullcrum_nav}>
                <div style={{background: `${FTC?.DarkVibrant}`}} className={AltStyles.fullcrum_head}>Alternative Titles</div>
                <div className={AltStyles.fullcrum_options}>
                    {country}
                </div>
            </div>
        </div>

        <div className={AltStyles.right_content_block}>
            {country_items}
        </div>

    </div>
  )
}
