"use client"
import React from 'react';
import styles from "./collection.module.css";
import { tmdb_image_url } from '../someExports';
import Link from 'next/link';

export default function Collection({COLLECT, FTC, PARAM_PATH}:{COLLECT:any, FTC:any, PARAM_PATH:string}) {
    const belongs = COLLECT?.belongs_to_collection;
    let image = (belongs?.backdrop_path != null || belongs?.poster_path != null) ? tmdb_image_url + (belongs?.backdrop_path || belongs?.poster_path) : "/images/Error_Image.jpg";
    let title:string = belongs?.name;
    const ID = belongs?.id;

    const styled = {
        backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 1) 0%, rgba(3, 37, 65, 0.6) 100%), url(${image})`
    };
    let text = title?.replaceAll(" ", "-")
    const link_to = `/collection/${ID}_${text?.replaceAll("/","-")}`

  return (
    <div className={styles.belong_to_cont}>
        <div style={styled} className={styles.belongs_to}>
            <div className={styles.collection_name}>
                Part of the {title}
            </div>
            <div style={{background: `${FTC?.DarkVibrant}`}} className={styles.collection_view_btn}>
                <Link href={link_to}>
                    View the Collection
                </Link>
            </div>
        </div>
    </div>
  )
}
