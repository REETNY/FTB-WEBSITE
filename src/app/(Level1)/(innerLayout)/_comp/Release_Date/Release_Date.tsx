"use client";
import React from 'react';
import styles from "./release_date.module.css";
import { getCountryName } from '@/actions/country_mapper/country_mapper';
import { useContext } from 'react';
import { DataContext } from '../Data_Provider/DataProvider';
import Image01 from '@/components/ImageComponents/Image01';

const dateFormat = (val:string) => {
    let date = new Date(val);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return `${day}/${month}/${year}`
}
const typeArr = ["Premiere", "Theatrical (limited)", "Theatrical", "Digital", "Physical", "Tv"]

export default function Release_Date({RELEASE, type}: {RELEASE: any, type:string}) {
    const FTC = useContext(DataContext);
    let country_code: string[];
    let country_name: string[];
    let keyed_countries;
    let country_items;
    if(type == "movie_series"){
        country_code = RELEASE.map((item:any) => item?.iso_3166_1);
        country_code = country_code.reduce((accumulator: string[], currVal:string) => {
            if(!accumulator.includes(currVal)){
                accumulator.push(currVal)
            }
            return accumulator;
        }, [])
        
        country_name = country_code.map((item:string) => getCountryName(item));

        keyed_countries = country_name.map((item:string, index:number) => {
            return (
                <div key={index} onClick={() => goToHashTag(country_code[index])} className={styles.clickCountry}>{item}</div>
            )
        });
        country_items = country_code?.map((item:any, index:number) => {
            let name = getCountryName(item);
            const CC = item;
            let reles = RELEASE.filter((item:any) => item.iso_3166_1 == CC ? item : false)[0];
            const name_item = reles?.release_dates?.map((item:any, index:number) => {
                return (
                    <div key={index} className={styles.utils_titls}>
                        <span>{dateFormat(item?.release_date)}</span>
                        <span>{item?.certification}</span>
                        <span>{typeArr[item?.type - 1]}</span>
                        <span>{item?.note}</span>
                    </div>
                )
            })
            return (
                <div key={"ABC"+index} className={styles.each_country_titles} id={item}>
                    <div className={styles.country_head}>
                        <span className={styles.CH}><Image01 path1={`https://flagsapi.com/${item}/flat/64.png`} path2={`https://flagsapi.com/${item.toLowerCase()}/flat/64.png`} name={item} /></span>
                        <span className={styles.CN}>{name}</span>
                    </div>
                    <div className={styles.country_titls}>
                        <div className={styles.utils_titls}>
                            <span>Date</span>
                            <span>Certification</span>
                            <span>Type</span>
                            <span>Note</span>
                        </div>
                        {name_item}
                    </div>
                </div>
            )
        });
    }else if(type == "anime_manga"){
        keyed_countries = RELEASE.map((item:any, index:number) => {
            return (
                <div key={index} onClick={() => goToHashTag(item.country)} className={styles.clickCountry}>
                    {item.country == "All" ? "Primary" : item.country}
                </div>
            )
        });
        country_items = RELEASE?.map((item:any, index:number) => {
            return (
                <div key={index} className={styles.each_country_titles} id={item.country}>
                    <div className={styles.country_head}>
                        <span className={styles.CN}>{item?.country == "All" ? "Primary" : item.country}</span>
                    </div>
                    <div className={styles.country_titls}>
                        <div className={styles.utils_titls}>
                            <span>Date</span>
                            <span>Status</span>
                            <span>{item?.type.includes("anime") ? "Airing" : "Publishing"}</span>
                            <span>Note</span>
                            <span>F/Airing</span>
                        </div>
                        <div className={styles.utils_titls}>
                            <span>{dateFormat(item?.date)}</span>
                            <span>{item?.status}</span>
                            <span>{item?.still_airing.toString()}</span>
                            <span></span>
                            <span>{dateFormat(item?.fin_air)}</span>
                        </div>
                    </div>
                </div>
            )
        });
    }


    function goToHashTag(val:string){
        let scroll_to = document.querySelector(`#${val}`);
        scroll_to?.scrollIntoView({behavior: "smooth"})
    }

  return (
    <div className={styles.altTitle_Cont}>

        <div className={styles.left_nav_bar}>
            <div className={styles.fullcrum_nav}>
                <div style={{background: `${FTC?.DarkVibrant}`}} className={styles.fullcrum_head}>Alternative Titles</div>
                <div className={styles.fullcrum_options}>
                    {keyed_countries}
                </div>
            </div>
        </div>

        <div className={styles.right_content_block}>
            {country_items}
        </div>

    </div>
  )
}
