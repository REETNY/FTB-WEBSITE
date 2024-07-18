"use client";
import React from 'react';
import Link from 'next/link';
import styls from "./item_mapper.module.css"
import Image01 from '@/components/ImageComponents/Image01';
import { SemiCircle1, SemiCircle2, SemiCircle3 } from '../../(IndexPage)/_comp/styled_components/plane_shapes';
import { tmdb_image_url,tmdb_image_url2 } from '../../(innerLayout)/_comp/someExports';

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const dateTeller = (val:string) => {
    let date = new Date(val || "");
    let month = date.getMonth();
    let year = date.getFullYear();
    let day = date.getDate();
    return `${months[month]} ${day}, ${year}`;
}

// Item Mapper for Movies and Anime
export default function Item_Mapper1({DATA, TYPE}:{DATA?:any, TYPE?:string}) {
    const BP = DATA?.backdrop_path;
    const PP = DATA?.poster_path;
    const media = DATA?.media_type == "tv" ? "series" : DATA?.media_type;
    const air_date = DATA?.air_date || DATA?.first_air_date || DATA?.release_date;
    const title = DATA?.title || DATA?.name;
    const ID = DATA?.id;
    const full_link = `/${media == undefined ? TYPE : media}/${ID}_${title.replaceAll(" ", "-").replaceAll("/", "&")}`;

    const score = parseFloat(DATA?.vote_average?.toFixed(1)) * 10;
    // parseFloat(DATA?.vote_average?.toFixed(1)) * 10;
    const colorDecode = score <= 25 
    ? "209,19,2"
    : (score > 25 && score <= 50) 
    ? "242,140,15"
    : (score > 50 && score <= 75)
    ? "245,241,2"
    : (score > 75)
    ? "28,199,51"
    : ""
    const colorDecode2 = score <= 25 
    ? "130, 13, 3"
    : (score > 25 && score <= 50) 
    ? "173, 99, 7"
    : (score > 50 && score <= 75)
    ? "161, 158, 6"
    : (score > 75)
    ? "11, 110, 24"
    : "";

  return (
    <div className={styls.item_mapper_cont}>
        <Link href={full_link}>
            <div className={styls.item_mapper_hero}>
                <Image01 path1={tmdb_image_url2 + BP} path2={tmdb_image_url2 + PP} name='' />
            </div>
        </Link>
        

        <div className={styls.item_mapper_details}>

            <div className={styls.item_mapper_rating}>
                
                <div style={{background: `rgb(${colorDecode2})`}} className={styls.item_mapper_rate}>
                    <SemiCircle1 $color={`rgb(${colorDecode})`} $score={score / 10} />
                    <SemiCircle2 $color={`rgb(${colorDecode})`} $score={score / 10} />
                    {(score / 10) > 5 
                      ? <SemiCircle3 $color={`rgb(${colorDecode2})`} $score={40} /> 
                      : <div className={styls.miniCircle} style={{background: `rgb(${colorDecode2})`}}></div>
                    }
                </div>

                <div className={styls.item_rated_score}>
                    <span className={styls.actual_score}>{score}</span>
                    <span className={styls.percent_icon}>%</span>
                </div>

            </div>

            <div className={styls.item_mapper_infoz}>
                <div className={styls.item_mapper_name}>
                    <Link href={full_link} > {title}</Link>
                </div>
                <sup className={styls.item_mapper_date}>{dateTeller(air_date) || ""}</sup>
            </div>

        </div>
    </div>
  )
}
