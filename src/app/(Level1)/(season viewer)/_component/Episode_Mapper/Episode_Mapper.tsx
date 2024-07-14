"use client"
import React, { useState } from 'react'
import styles from "./episode_mapper.module.css"
import Image01 from '@/components/ImageComponents/Image01'
import { FaCaretDown, FaCaretUp, FaStar } from 'react-icons/fa'
import Episodes_Casts from './Episodes_Casts';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';


const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const formattedDated = (val:string) => {
    let date = new Date(val);
    let month = date.getMonth();
    let year = date.getFullYear();
    let day = date.getDate();

    return `${months[month]} ${day}, ${year}`;
}

const formattedTime = (val:number) => {
    const number = parseInt(val.toString() || "0") * 60 * 1000;
    let hour = Math.floor(number / 1000 / 60 / 60) % 60;
    let min = Math.floor(number / 1000 / 60) % 60;
    let sec = Math.floor(number / 1000) % 60;

    return `${hour}h ${min}m ${sec}s`
}


export default function Episode_Mapper({DATA}:{DATA:any}) {
    const [expand, setExpansion] = useState(false);
    let image = tmdb_image_url + DATA?.still_path;
    let release = DATA?.air_date;
    let overview = DATA?.overview;
    let rating = DATA?.vote_average;
    let episode_number = DATA?.episode_number;
    let runtime = DATA?.runtime || 0;
    let episode_name = DATA?.name;
    
    let casts_array = DATA?.guest_stars?.map((item:any, index:number) => {
       return( <Episodes_Casts DATA={item} key={index} />)
    })

    let crews_obj = {
        written: "",
        directed: ""
    }

    const episode_crews = DATA?.crew?.map((item:any, index:number) => {
        if(item.job == "Writer"){
            crews_obj = {
                ...crews_obj,
                written: item?.name
            }
        }
        if(item.job == "Director"){
            crews_obj = {
                ...crews_obj,
                directed: item?.name
            }
        }
    })


  return (
    <div className={styles.context_main}>
        <div className={styles.details_hero}>
            <div className={styles.heroed}>
            <Image01 path1={image} path2='' name=''/>
            </div>
            <div className={styles.transformation}>
            <div className={styles.epidose_entry}>
                <span className={styles.epi_what}>{episode_number}</span>
                <span className={styles.epi_title}>{episode_name}</span>
            </div>
            <div className={styles.episode_facet}>
                <span className={styles.epi_rate}>
                <div className={styles.left_rated}><FaStar /> {parseInt(rating) * 10}%</div>
                <div className={styles.rigth_rating_manual}></div>
                </span>
                <span className={styles.epis_relz}>{formattedDated(release)}</span>
                <span className={styles.epi_duration}>{formattedTime(runtime)}</span>
            </div>
            <div className={styles.episode_about}>
                {overview}
            </div>
            </div>
        </div>
        <div className={expand ? `${styles.episodes_container} ${styles.active}` : styles.episodes_container}>
            <div className={styles.episodes_infom}>
                <div className={styles.crews_tab}>
                    <div className={styles.crew_head}>
                        Crew <span className={styles.crew_length}>{DATA?.crew?.length}</span>
                    </div>
                    <div className={styles.crews_infos}>
                        <div className={styles.few_crews}>
                            <span className={styles.left_assign}>Written By</span>
                            :
                            <span className={styles.right_assigned}>{crews_obj?.written}</span>
                        </div>
                        <div className={styles.few_crews}>
                            <span className={styles.left_assign}>Directed By</span>
                            :
                            <span className={styles.right_assigned}>{crews_obj?.directed}</span>
                        </div>
                    </div>
                </div>
                {
                    expand && 
                    <div className={styles.casts_ways}>
                        <div className={styles.casts_head}>
                            <span className={styles.h1}>Guest Stars</span>
                            <span className={styles.h2}>Full Cast & Crews</span>
                        </div>
                        <div className={styles.casts_tab}>
                            {casts_array}
                        </div>
                    </div>
                }
            </div>
        </div>
        <div onClick={() => setExpansion((bool) => !bool)} className={styles.expansionBtn}>
            <span>{expand ? <FaCaretUp /> :  <FaCaretDown />}</span>
            <span>{expand ? "contract" : 'expand'}</span>
        </div>
    </div>
  )
}
