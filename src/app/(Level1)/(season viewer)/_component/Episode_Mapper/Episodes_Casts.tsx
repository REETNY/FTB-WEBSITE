import React from 'react'
import styles from "./episode_cast.module.css"
import Image01 from '@/components/ImageComponents/Image01'
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports'





export default function Episodes_Casts({DATA}:{DATA:any}) {

  let image = tmdb_image_url + DATA?.profile_path;
  let name = DATA?.name;
  let role = DATA?.character;

  return (
    <div className={styles.episode_cast}>
        <div className={styles.cast_hero}>
          <Image01 path1={image} path2='' name='' />
        </div>
        <div className={styles.casts_details}>
          <div className={styles.cast_name}>{name}</div>
          <div className={styles.cast_role_name}>{role}</div>
        </div>
    </div>
  )
}
