"use client"
import React, { useContext } from 'react'
import styles from "./video.module.css"
import { DataContext } from '../Data_Provider/DataProvider';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image01 from '@/components/ImageComponents/Image01';
import { FaYoutube, FaStar, FaPlay } from 'react-icons/fa';
import TrailerPlay from '../TrailerPlay/TrailerPlay';

const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const formatDate = (val:string) => {
    let date = new Date(val);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate()
    return `${months[month]} ${day}, ${year}`
}

export default function Videos({VIDEO, type, id, sn}: {VIDEO:any, type:string, id?:string, sn?:boolean}) {
    // const [current, setCurrent] = useState("No Language");
    const path = usePathname()
    let mapped_current;
    let mapped_current_item;
    const FTC = useContext(DataContext);
    let types: string[];
    let mapped_vid_type;
    const router = useRouter();
    const [player, setPlayer] = useState({
        key: '',
        bool: false,
    })

    const active = {
        background: `${FTC?.DarkVibrant}`,
        color: `white`
    }

    const playerOn = (val:string) => {
        setPlayer((obj) => ({...obj, bool: true, key: val}));
    }

    const playerOff = () => {
        setPlayer((obj) => ({...obj, bool: false, key: ""}))
    }

    if(type == "movie_serie"){

        types = VIDEO?.map((item:any) => item?.type);
        types = types?.reduce((accumulator:string[], currVal) => {
            if(!accumulator.includes(currVal)){
                accumulator.push(currVal)
            }
            return accumulator
        }, [])
        mapped_vid_type = types?.map((item:string, index:number) => {
            let indexType = item == 'Behind the Scenes' 
            ? (item.slice(0,item?.length - 1))?.replaceAll(" ", "_").toLowerCase() 
            : item?.replaceAll(" ", "_").toLowerCase();

            return (
                <div onClick={() => ReRoute(indexType)} style={path.toLowerCase().includes(indexType) ? {...active} : {}} key={index} className={styles.clickCountry}>{item}</div>
            )
        })
        mapped_current = VIDEO?.filter((item:any) => {
            
            if(path.replaceAll("_", " ").includes(
                (item?.type == 'Behind the Scenes')
                ? "behind"
                : item?.type.toLowerCase()
            )
            ){
                return item
            }
            else{
                return false
            }
        })
        mapped_current_item = mapped_current?.map((item:any, index:number) => {
            if(item?.site != "YouTube")return;
            return(
                <div key={index} className={styles.video_content}>

                    <div onClick={() => playerOn(item?.key)} className={styles.video_hero}>
                        <Image01 
                            path1={`https://i.ytimg.com/vi/${item?.key}/sddefault.jpg`} 
                            path2={`https://i.ytimg.com/vi/${item?.key}/sddefault.jpg`} 
                            name={item?.name} 
                        />
                        <span className={styles.player_btn}>
                            <FaPlay />
                        </span>
                    </div>

                    <div className={styles.video_info}>
                        <div className={styles.video_info_top}>
                            <div className={styles.video_name}>{item?.name}</div>
                            <div className={styles.video_report}>
                                <span className={styles.video_type}>{item?.type}</span>
                                {/* <span className={styles.video_duration}></span> */}
                                <span className={styles.video_release}>{formatDate(item?.published_at)}</span>
                            </div>
                        </div>
                        <div className={styles.video_info_bottom}>
                            <span className={styles.video_fromSourecLogo}><FaYoutube /></span>
                            { (item?.official) &&
                                <span className={styles.marked_star}><FaStar /></span>
                            }
                        </div>
                    </div>

                </div>
            )
        }) || ["Nothing to show in here"];  
    }else if(type == "anime_manga"){
        types = VIDEO?.map((item:any) => item?.type);
        types = types?.reduce((accumulator:string[], currVal) => {
            if(!accumulator.includes(currVal)){
                accumulator.push(currVal)
            }
            return accumulator
        }, []);
        mapped_vid_type = types?.map((item:string, index:number) => {
            let indexType = item == 'Behind the Scenes' 
            ? (item.slice(0,item?.length - 1))?.replaceAll(" ", "_").toLowerCase() 
            : item?.replaceAll(" ", "_").toLowerCase();

            return (
                <div onClick={() => ReRoute(indexType)} style={path.toLowerCase().includes(indexType) ? {...active} : {}} key={index} className={styles.clickCountry}>{item}</div>
            )
        })
        mapped_current = VIDEO?.filter((item:any) => {
            
            if(path.replaceAll("_", " ").includes(
                (item?.type == 'Behind the Scenes')
                ? "behind"
                : item?.type.toLowerCase()
            )
            ){
                return item
            }
            else{
                return false
            }
        })
        mapped_current_item = mapped_current?.map((item:any, index:number) => {
            if(item?.site != "YouTube")return;
            if(item?.type == "Episodes" || item?.type == "episodes"){
                return(
                    <div key={index} className={styles.video_content}>
    
                        <div className={styles.video_hero}>
                            <Image01 
                                path1={item?.image} 
                                path2={``} 
                                name={item?.name} 
                            />
                        </div>
    
                        <div className={styles.video_info}>
                            <div className={styles.video_info_top}>
                                <div className={styles.video_name}>{item?.name}</div>
                                <div className={styles.video_report}>
                                    <span className={styles.video_type}>{item?.episode}</span>
                                </div>
                            </div>
                        </div>
    
                    </div>
                )
            }else{
                return(
                    <div key={index} className={styles.video_content}>
    
                        <div onClick={() => playerOn(item?.key)} className={styles.video_hero}>
                            <Image01 
                                path1={`https://i.ytimg.com/vi/${item?.key}/sddefault.jpg`} 
                                path2={`https://i.ytimg.com/vi/${item?.key}/sddefault.jpg`} 
                                name={item?.name} 
                            />
                            <span className={styles.player_btn}>
                                <FaPlay />
                            </span>
                        </div>
    
                        <div className={styles.video_info}>
                            <div className={styles.video_info_top}>
                                <div className={styles.video_name}>{item?.name}</div>
                                <div className={styles.video_report}>
                                    <span className={styles.video_type}>{item?.type}</span>
                                    {/* <span className={styles.video_duration}></span> */}
                                </div>
                            </div>
                            <div className={styles.video_info_bottom}>
                                <span className={styles.video_fromSourecLogo}><FaYoutube /></span>
                                { (item?.official) &&
                                    <span className={styles.marked_star}><FaStar /></span>
                                }
                            </div>
                        </div>
    
                    </div>
                )
            }
            
        }) || ["Nothing to show in here"] ;
        
    }

    function ReRoute(val:string){
        router.push(sn ? `/${id}/videos/${val}` :`/${id}/video/${val}`)   
    }
    
  return (
    <div className={styles.altTitle_Cont}>

        <div className={styles.left_nav_bar}>
            <div className={styles.fullcrum_nav}>
                <div style={{background: `${FTC?.DarkVibrant}`}} className={styles.fullcrum_head}>Videos</div>
                <div className={styles.fullcrum_options}>
                    {mapped_vid_type}
                </div>
            </div>
        </div>

        <div className={styles.right_content_block}>
            {
                (mapped_current_item.length == 0 || (mapped_current_item[0] == undefined && mapped_current_item?.length == 1) )
                ? "Nothing To Show in Here"
                : mapped_current_item
            }
        </div>

        { (mapped_current_item?.length > 0) &&
            <TrailerPlay PTB={playerOff} PTBool={player.bool} SOURCE={player?.key} />
        }

    </div>
  )
}
