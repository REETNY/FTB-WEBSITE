"use client"
import React from 'react'
import styles from "./translation.module.css"
import { getCountryName } from '@/actions/country_mapper/country_mapper';
import { useContext } from 'react';
import { DataContext } from '../Data_Provider/DataProvider';



const convertMinutes = (val:number) => {
    let minutes = val;
    let milliseconds = minutes * 60 * 1000;
    let hour = Math.floor(((milliseconds / 1000 / 60 / 60) % 24));
    let minute = (milliseconds / 1000 / 60) % 60;
    return `${hour}H ${minute}M`
}



export default function Translation({TRANSLATE, type}: {TRANSLATE:any, type:string}) {
    const FTC = useContext(DataContext)
    let currenType = type
    let country_code: string[];
    let country_names: string[];
    let keyed_countries:any;
    let mapper_country_item;
    if(currenType == "movie_serie"){
        console.log(TRANSLATE);
        country_code = TRANSLATE.map((Item:any) => {
            return Item.iso_3166_1
        })
        country_names = country_code?.map((item:string) => getCountryName(item));
        keyed_countries = TRANSLATE.map((item:any, index:number) => {
            return (
                <div key={index} onClick={() => goToHashTag(`${item?.iso_639_1}-${country_code[index]}`)} className={styles.clickCountry2}>
                    <span className={styles.ccn}>{country_names[index]}</span>
                    <span className={styles.ccc}>{item?.iso_639_1+"-"+item?.iso_3166_1}</span>
                </div>
            )
        })
        mapper_country_item = TRANSLATE.map(((item:any,index:number) => {

            return (
                <div 
                    id={item?.iso_639_1+"-"+item?.iso_3166_1} 
                    key={index} className={styles.each_country_titles}
                >
                    <div className={styles.country_head}>
                        <span className={styles.CN}>{country_names[index]}</span>
                        <span className={styles.CL}>{item?.iso_639_1+"-"+item?.iso_3166_1}</span>
                    </div>

                    <div className={styles.tabled_data}>
                        <table className={styles.tab_ble}>
                            <tr className={styles.table_row}>
                                <td className={styles.td_left}>Title</td>
                                <td className={styles.td_right}>{item?.data?.title}</td>
                            </tr>
                            <tr className={styles.table_row}>
                                <td className={styles.td_left}>Tagline</td>
                                <td className={styles.td_right}>{item?.data?.tagline}</td>
                            </tr>
                            <tr className={styles.table_row}>
                                <td className={styles.td_left}>Overview</td>
                                <td className={styles.td_right}>{item?.data?.overview}</td>
                            </tr>
                            <tr className={styles.table_row}>
                                <td className={styles.td_left}>Runtime</td>
                                <td className={styles.td_right_time}>{item?.data?.runtime ? convertMinutes(item?.data?.runtime) : 0}</td>
                            </tr>
                        </table>
                    </div>

                </div>
            )
        }))
    }

    
    function goToHashTag(val:string){
        let scroll_to = document.querySelector(`#${val}`);
        scroll_to?.scrollIntoView({behavior: "smooth"})
    }

  return (
    <div className={styles.altTitle_Cont}>

        <div className={styles.left_nav_bar}>
            <div className={styles.fullcrum_nav}>
                <div style={{background: `${FTC?.DarkVibrant}`}} className={styles.fullcrum_head}>Translations</div>
                <div className={styles.fullcrum_options}>
                    {keyed_countries}
                </div>
            </div>
        </div>

        <div className={styles.right_content_block}>
            {mapper_country_item}
        </div>

    </div>
  )
}
