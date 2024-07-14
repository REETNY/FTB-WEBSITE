"use client"
import React from 'react'
import stylesSocial from "./social_index.module.css"
import { useState } from 'react';
import Review from './Review';
import Discussion from './Discussion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface ReviewData{
    author?: string,
    author_details?: {
      name?: string,
      username?: string,
      avatar_path?: string,
      rating?: number
    },
    content?: string,
    created_at?: string,
    id?: string,
    mal_id?:string,
    updated_at?: string,
    url?: string,
    review?:string,
    date?:string,
    reactions?:string
}

const type_decide = (val:string) => {
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

export default function Social_Index({Reviews, type}: {Reviews: any, type?: boolean}) {

    const [socials, setSocials] = useState("Review");
    
    const handleSocial = (val:string) => {
        setSocials(val)
    }

    let num_of_review = Object?.keys(Reviews);
    let single_review =
    (!type)?
    num_of_review.map((item: string) => {
        let rev = Reviews[item];
       return rev
    })[0]
    :
    Reviews[0];

    const pathname = usePathname();
    const splited = pathname.split("/");
    const ID = splited[splited.length - 1]
    const type_init = type_decide(pathname);
    

  return (
    <div className={stylesSocial.social_index_container}>

        <div className={stylesSocial.social_index_nav}>
            <span className={stylesSocial.left_head}>Socials</span>
            <span className={stylesSocial.right_nav}>
                <div 
                    onClick={() => handleSocial("Review")} 
                    className={socials == "Review" ? `${stylesSocial.r_s_item} ${stylesSocial.active}` : stylesSocial.r_s_item}
                >
                    Reviews
                </div>
                <div 
                    onClick={() => handleSocial("Discussion")} 
                    className={socials == "Discussion" ? `${stylesSocial.r_s_item} ${stylesSocial.active}` : stylesSocial.r_s_item}
                >
                    Discussion
                </div>
            </span>
        </div>

        <div className={stylesSocial.review_discuss_container}>
            {
                socials == "Review"
                ? <Review Data={single_review} id={ID} type={type_init} />
                : <Discussion />
            }
        </div>

        <div className={stylesSocial.view_full_item}>
            {
            socials == "Review" 
            ? num_of_review.length == 0 ? ""  : <Link style={{color: "var(--text-2)"}} href={"review"}>Read All Reviews</Link>
            : "Go to discussion"}
        </div>

    </div>
  )
}
