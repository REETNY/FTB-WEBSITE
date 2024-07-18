"use client"
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';
import React from 'react';
import styls from "./item_view.module.css"
import Image01 from '@/components/ImageComponents/Image01';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const formatDate = (val:string) => {
    let date = new Date(val);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return `${months[month]} ${day}, ${year}`;
}

export default function ItemView({Data}:{Data:any}) {
    const lastPage = Data?.pagination;
    const pageNum = !Data?.page ? 1 : Data?.page;
    let pageLoop = pageNum - 3 < 1 ? 1 : pageNum - 2
    const forwardPage = pageNum + 4 > lastPage ? lastPage : parseInt(pageNum) + 3;
    let num_arr = [];
    const extension = Data?.type == "tv" ? "series" : Data?.type;

    const path = usePathname();
    const SP = useSearchParams();
    const query = SP.get("query")
    const router = useRouter();

    const pushNewPage = (val:number | string) => {
        router.push(`${path}?query=${query}&page=${val}`)
    }

    let zKeep = 0
    for(let i = pageLoop; i <= forwardPage; i++){
        num_arr.push(<li onClick={() => pushNewPage(i)} key={i} className={pageNum == i ? `${styls.listed_page} ${styls.active}`: styls.listed_page}>{i}</li>)
    }

    const mapped_item = Data?.rep?.map((item:any, index:number) => {
        let date = item?.release_date || item?.aired?.from || item?.published?.from ||  item?.first_air_date;
        let title = item?.name || item?.title;
        let overview = item?.overview || item?.synopsis;
        let image = item?.backdrop_path && tmdb_image_url+item?.backdrop_path || item?.images?.jpg?.image_url;
        let ID = item?.id || item?.mal_id;

        let fitted = ID+"_"+title.replace(" ", "-").replace("/", "-")

        return(
            <div key={index} className={styls.each_view}>
                <Link href={`/${extension}/${fitted}`}>
                    <div className={styls.hero_cont}>
                        <Image01 path1={image} path2='' name='' />
                    </div>
                </Link>
            
                <div className={styls.detailed_cont}>
                    <Link href={`/${extension}/${fitted}`}>
                        <div className={styls.detz_name}>{title}</div>
                    </Link>
                    <div className={styls.detz_release}>{formatDate(date)}</div>
                    <div className={styls.detz_overview}>{overview?.slice(0, 150)}</div>
                </div>
            </div>
        )
    })
        

  return (
    <div className={styls.item_view_cont}>

        <div className={styls.search_head}>Search: {query}</div>

        <div className={styls.item_viewer_cont}>
            {mapped_item}
        </div>

        <div className={styls.pagination_nav}>
            <div className={styls.paged_divs}>
                <ul className={styls.pages_nums}>
                    {num_arr}
                    {
                        (pageNum != lastPage || pageNum + 5 < lastPage)
                        &&
                        <>
                            <li className={styls.extension}>...</li>
                            <li onClick={() => pushNewPage(lastPage)} key={lastPage} className={pageNum == lastPage ? `${styls.listed_page} ${styls.active}`: styls.listed_page}>{lastPage}</li> 
                        </>
                    }
                </ul>
            </div>
        </div>

    </div>
  )
}
