"use client"
import React from 'react'
import styles from "./logos.module.css"
import { DataContext } from '../Data_Provider/DataProvider';
import { useContext } from 'react';
import { useState } from 'react';
import Image01 from '@/components/ImageComponents/Image01';
import { tmdb_image_url } from '../someExports';
import { FaLock } from 'react-icons/fa';

export default function Logos({LOGO, type, initer}: {LOGO:any, type:string, initer?:string}) {
  const [current, setCurrent] = useState(initer || "No Language");
  let languages: string[];
  let mapped_languages;
  let mapped_current;
  const FTC = useContext(DataContext);


  const active = {
    background: `${FTC?.DarkVibrant}`,
    color: `white`
  }

  if(type == "movie_serie"){

      languages = LOGO?.map((item:any) => item?.language);
      languages = languages?.reduce((accumulator:string[], currentVal) => {
          if(!accumulator.includes(currentVal)){
              accumulator.push(currentVal)
          }
          return accumulator
      }, [])
      mapped_languages = languages.map((item:string, index:number) => {
          return (
              <div style={current == item ? {...active} : {}} key={index} onClick={() => setCurrent(item)} className={styles.clickCountry}>{item}</div>
          )
      })
      mapped_current = LOGO.map((item:any, index:number) => {
          if(item.language != current)return;

          return(
              <div key={index} className={styles.full_bg_cont}>
                  <div className={styles.bg_hero}>
                      <Image01 path1={tmdb_image_url + item?.file_path} path2='' name='' />
                  </div>
                  <div className={styles.bg_infoz}>
                      <div className={styles.bg_infoz_head}>
                          <div className={styles.text}>Info</div>
                          <div className={styles.icon}><FaLock /></div>
                      </div>
                      <div className={styles.bg_infoz_dataz}>

                          <div className={styles.information_data}>
                              <div className={styles.infoz_label}>Added By</div>
                              <div className={styles.infoz_labelled_data}>{"FTB"}</div>
                          </div>

                          <div>
                              <div className={styles.infoz_label}>Size</div>
                              <div className={styles.infoz_labelled_data}>{item?.width} by {item?.height}</div>
                          </div>

                          <div>
                              <div className={styles.infoz_label}>Language</div>
                              <div className={styles.infoz_labelled_language}>{item?.language}</div>
                          </div>

                      </div>
                  </div>
              </div>
          )
      })
  }else{
    languages = LOGO?.map((item:any) => item?.language);
      languages = languages?.reduce((accumulator:string[], currentVal) => {
          if(!accumulator.includes(currentVal)){
              accumulator.push(currentVal)
          }
          return accumulator
      }, [])
      mapped_languages = languages.map((item:string, index:number) => {
          return (
              <div style={current == item ? {...active} : {}} key={index} onClick={() => setCurrent(item)} className={styles.clickCountry}>{item}</div>
          )
      })
      mapped_current = LOGO.map((item:any, index:number) => {
          if(item.language != current)return;

          return(
              <div key={index} className={styles.full_bg_cont}>
                  <div className={styles.bg_hero}>
                      <Image01 path1={item?.file_path} path2='' name='' />
                  </div>
                  <div className={styles.bg_infoz}>
                      <div className={styles.bg_infoz_head}>
                          <div className={styles.text}>Info</div>
                          <div className={styles.icon}><FaLock /></div>
                      </div>
                      <div className={styles.bg_infoz_dataz}>

                          <div className={styles.information_data}>
                              <div className={styles.infoz_label}>Added By</div>
                              <div className={styles.infoz_labelled_data}>{"FTB"}</div>
                          </div>

                          <div>
                              <div className={styles.infoz_label}>Size</div>
                              <div className={styles.infoz_labelled_data}>{item?.width} by {item?.height}</div>
                          </div>

                          <div>
                              <div className={styles.infoz_label}>Language</div>
                              <div className={styles.infoz_labelled_language}>{item?.language}</div>
                          </div>

                      </div>
                  </div>
              </div>
          )
      })
  }


  
return (
  <div className={styles.altTitle_Cont}>

      <div className={styles.left_nav_bar}>
          <div className={styles.fullcrum_nav}>
              <div style={{background: `${FTC?.DarkVibrant}`}} className={styles.fullcrum_head}>Logos</div>
              <div className={styles.fullcrum_options}>
                  {mapped_languages}
              </div>
          </div>
      </div>

      <div className={styles.right_content_block}>
          {mapped_current}
      </div>

  </div>
)
}
