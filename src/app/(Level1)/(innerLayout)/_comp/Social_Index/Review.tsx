"use client"
import React from 'react'
import Image01 from '@/components/ImageComponents/Image01'
import { FaStar } from 'react-icons/fa'
import { ReviewData } from './Social_Index'
import { tmdb_image_url } from '../someExports'
import Link from 'next/link'
import styleRev from "./social_index.module.css"


export default function Review({Data, id, type}:{Data: ReviewData, id:string, type:string}) {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let formattedRating = (Data?.author_details?.rating)?.toFixed(1);
    const formattedDate = () => {
        let date = new Date(Data?.created_at || new Date());
        let month = months[date.getMonth()];
        let day = date.getDate();
        let year = date.getFullYear();
        return `${month} ${day}, ${year}`
    }
    let date_date = formattedDate();
    let img_url = (type == "movie" || type == "serie") ? tmdb_image_url + Data?.author_details?.avatar_path : Data?.author_details?.avatar_path;
    
    if(Data == undefined || Data == null || Object.keys(Data).length == 0){
        return <div>Not Yet Reviewed !</div>
    }

    let ID = parseInt(id.split("_")[0]);

  return (
    <div className={styleRev.detailed_review}>

        <div className={styleRev.social_review_hero_cont}>
            <div className={styleRev.reviewer_hero}>
                <Image01 
                    path1={img_url != null ? img_url : "error"} 
                    path2='' 
                    name='' 
                />
            </div>
            <div className={styleRev.reviewer_details}>
                <div className={styleRev.reviewed_head}>A Review By {Data?.author || "Anonymous"}</div>
                <div className={styleRev.reviewers_conjugate}>
                    <div className={styleRev.reviewer_scored}>
                        <span className={styleRev.star}><FaStar /></span>
                        <span className={styleRev.reviewer_mark}>{formattedRating || "0%"}</span>
                    </div>
                    <div className={styleRev.review_written}>
                        written by {Data?.author || "Anonymous"} on {date_date || "Unknown"}
                    </div>
                </div>
            </div>
        </div>

        <div className={styleRev.reviewers_thought}>
            {   
                (Data?.content && Data?.content?.length > 500)
                ? (
                    <>
                        {Data?.content.slice(0,500)}
                        <Link 
                        style={{color: "var(--text-2)", textDecoration: "underline"}} 
                        href={`/review/${type}/${ID}_${Data?.id}`}
                    >...read the rest</Link>
                    </>
                )
                : Data?.content
            }
        </div>

    </div>
  )
}
