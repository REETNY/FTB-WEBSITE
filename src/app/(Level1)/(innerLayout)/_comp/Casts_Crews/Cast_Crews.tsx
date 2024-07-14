"use client"
import React from 'react'
import styles from "./cast_crews.module.css"
import Image01 from '@/components/ImageComponents/Image01'
import Image2 from '@/components/ImageComponents/Image2'
import { tmdb_image_url, tmdb_image_url2 } from '../someExports'

export default function Cast_Crews({CAST, CREW, type}: {CAST:any, CREW: any, type: string}) {

    let casts;
    let crews;
    let mapper_cast;
    let mapper_crew;
    if(type == "movie_serie"){
        let keys = Object.keys(CAST);
        casts = keys.map((item: any) => {
            return CAST[item];
        });
        let keys2 = Object.keys(CREW)
        crews = keys2.map((item:any) => CREW[item]);
  
        mapper_cast = casts.map((item:any, index:number) => {
            let image 
            if(item?.profile_path == null){
                image = 'error';
                
            }else{
                image = tmdb_image_url2+item?.profile_path
            }
            return(
            <div key={index} className={styles.others}>
                <div className={styles.other_hero}>
                    <Image2 genderCode={item?.gender + 1} path1={image} path2={image} name={item?.name} />
                </div>
                <div className={styles.other_detz}>
                    <div className={styles.other_name}>{item.name}</div>
                    <div className={styles.role_played}>{item?.character}</div>
                </div>
            </div>
            )
        })
        mapper_crew = crews?.map((item:any, index:number) => {
            let image 
            if(item?.profile_path == null){
                image = 'error'
            }else{
                image = tmdb_image_url2+item?.profile_path
            }
            return(
            <div key={index} className={styles.others}>
                <div className={styles.other_hero}>
                    <Image2 genderCode={item?.gender + 1} path1={image} path2={image} name={item?.name} />
                </div>
                <div className={styles.other_detz}>
                    <div className={styles.other_name}>{item.name}</div>
                    <div className={styles.role_played}>{item?.job}</div>
                </div>
            </div>
            )
        } )
    }else if(type == "anime"){
        mapper_cast = CAST.map((item:any, index:number) => {
            let image 
            if(item?.character?.images?.webp?.image_url == null){
                image = item?.character?.images?.jpg?.image_url == null ? "error" : item?.character?.images?.jpg?.image_url;
            }else{
                image = item?.character?.images?.webp?.image_url;
            }
            return(
            <div key={index} className={styles.anime}>
                <div className={styles.anime_div}>
                    <div className={styles.anime_left}>
                        <div className={styles.anime_character_hero}>
                            <Image01 path1={image} path2={''} name={item?.character?.name} />
                        </div>
                        <div className={styles.character}>
                            <div className={styles.character_name}>{item?.character?.name}</div>
                            <div className={styles.character_role}>{item?.role}</div>
                        </div>
                    </div>
                    <div className={styles.anime_right}>

                        {
                            item?.voice_actors?.map((item: any, index:number) => {
                                
                                return(
                                <div key={index+"a"} className={styles.each_translator_data}>
                                    <div className={styles.translator_hero}><Image01 path1={item?.person?.images?.jpg?.image_url} path2='' name='' /></div>
                                    <div className={styles.translator_detz}>
                                        <div className={styles.translator_name}>{item?.person?.name}</div>
                                        <div className={styles.tranlate_language}>{item?.language} Voice Actor</div>
                                    </div>
                                </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            )
        });
        mapper_crew = CREW?.map((item:any, index:number) => {
            let image 
            if(item?.person?.images?.jpg?.image_url == null){
                image = 'error'
            }else{
                image = item?.person?.images?.jpg?.image_url
            }
            return(
            <div key={index} className={styles.others}>
                <div className={styles.other_hero}>
                    <Image01 path1={image} path2={""} name={item?.person?.name} />
                </div>
                <div className={styles.other_detz}>
                    <div className={styles.other_name}>{item?.person?.name}</div>
                    <div className={styles.role_played}>
                        {item?.positions.map((pos:string, index:number) => {
                            if(item?.positions?.length - 1 == index){
                                return pos+"."
                            }else{
                                return pos+", "
                            }
                        })}
                    </div>
                </div>
            </div>
            )
        } );
    }else if(type == "manga"){
        mapper_cast = CAST.map((item:any, index:number) => {
            let image 
            if(item?.character?.images?.webp?.image_url == null){
                image = item?.character?.images?.jpg?.image_url == null ? "error" : item?.character?.images?.jpg?.image_url;
            }else{
                image = item?.character?.images?.webp?.image_url;
            }
            return(
            <div key={index} className={styles.others}>
                <div className={styles.other_hero}>
                    <Image01 path1={image} path2={''} name={item?.character?.name} />
                </div>
                <div className={styles.other_detz}>
                    <div className={styles.other_name}>{item?.character?.name}</div>
                    <div className={styles.role_played}>{item?.role}</div>
                </div>
            </div>
            )
        });
    }

  return (
    <div className={type == "anime" ? styles.cast_crew_container_anime : styles.cast_crew_container}>

        <div className={styles.cast_container}>

            <div className={styles.cont_head}>Cast</div>

            {mapper_cast}

        </div>

        {type != "manga" && <div className={styles.crews_container}>

            <div className={styles.cont_head}>Crew</div>

            {mapper_crew}

        </div>}

    </div>
  )
}
