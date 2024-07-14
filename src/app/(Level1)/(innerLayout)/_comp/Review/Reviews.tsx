"use client"
import React from 'react'
import styles from "./review.module.css"
import { tmdb_image_url } from '../someExports';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import Image01 from '@/components/ImageComponents/Image01';
import { usePathname } from 'next/navigation';

let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const formattedDate = (val:string) => {
  let date = new Date(val || new Date());
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`
}

const declarePath = (val:string) => {
  return val.includes("manga")
  ? "manga"
  : val.includes("anime")
  ? "anime"
  : val.includes("movie")
  ? "movie"
  : val.includes("serie")
  ? "serie"
  : ""
}

export default function Reviews({REVIEW, type, id}:{REVIEW:any, type: string, id: string}) {
  let mapped_reviews;
  const ID = parseInt(id.split("_")[0]);
  const pathname = usePathname();
  let route = declarePath(pathname);

  console.log(id);
  
  

  if(type == "movie_serie"){
    mapped_reviews = REVIEW?.length > 0 ? REVIEW?.map((item:any, index:number) => {
      let formattedRating = (item?.author_details?.rating)?.toFixed(1);
      let dated = formattedDate(item?.created_at);
      let img_url = tmdb_image_url + item?.author_details?.avatar_path || "";

      return(
        <div key={index} className={styles.detailed_review}>

        <div className={styles.social_review_hero_cont}>
          <div className={styles.reviewer_hero}>
            <Image01 
              path1={img_url} 
              path2='' 
              name='' 
            />
          </div>
          <div className={styles.reviewer_details}>
            <div className={styles.reviewed_head}>A Review By {item?.author|| "Anonymous"}</div>
            <div className={styles.reviewers_conjugate}>
              <div className={styles.reviewer_scored}>
                <span className={styles.star}><FaStar /></span>
                <span className={styles.reviewer_mark}>{formattedRating || "0%"}</span>
              </div>
              <div className={styles.review_written}>
                written by {item?.author || "Anonymous"} on {dated || "Unknown"}
              </div>
            </div>
          </div>
        </div>
  
        <div className={styles.reviewers_thought}>
            {   
              (item?.content && item?.content?.length > 500)
              ? (
                <>
                  {item?.content.slice(0,500)}
                  <Link 
                    style={{color: "var(--text-2)", textDecoration: "underline"}} 
                    href={`/review/${route}/${ID}_${item?.id}`}
                  >...read the rest</Link>
                </>
              )
              : item?.content
            }
        </div>
  
      </div>
      )

    }) : "Not Yet Reviewed";
  }else if(type == "anime_manga"){
    mapped_reviews = REVIEW?.length > 0 ? REVIEW?.map((item:any, index:number) => {
      let formattedRating = (item?.score)?.toFixed(1);
      let dated = formattedDate(item?.date);
      let img_url = item?.user?.images?.jpg?.image_url || "/images/Error_Image.jpg";

      return(
        <div key={index} className={styles.detailed_review}>

        <div className={styles.social_review_hero_cont}>
          <div className={styles.reviewer_hero}>
            <Image01 
              path1={img_url} 
              path2='' 
              name='' 
            />
          </div>
          <div className={styles.reviewer_details}>
            <div className={styles.reviewed_head}>A Review By {item?.user?.username|| "Anonymous"}</div>
            <div className={styles.reviewers_conjugate}>
              <div className={styles.reviewer_scored}>
                <span className={styles.star}><FaStar /></span>
                <span className={styles.reviewer_mark}>{formattedRating || "0%"}</span>
              </div>
              <div className={styles.review_written}>
                written by {item?.user?.username || "Anonymous"} on {dated || "Unknown"}
              </div>
            </div>
          </div>
        </div>
  
        <div className={styles.reviewers_thought}>
            {   
              (item?.review && item?.review?.length > 500)
              ? (
                <>
                  {item?.review.slice(0,500)}
                  <Link 
                    style={{color: "var(--text-2)", textDecoration: "underline"}} 
                    href={{pathname:`/review/${route}/${ID}_${item?.mal_id}`}}
                  >
                    ...read the rest
                  </Link>
                </>
              )
              : item?.review
            }
        </div>
  
      </div>
      )
      
    }) : "Not Yet Reviewed"
  }
    

  return (
    <div className={styles.reviews_container}>
      {mapped_reviews}
    </div>
  )
}
