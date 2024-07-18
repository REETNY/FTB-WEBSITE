"use client";
import React, {useEffect, useState} from 'react';
import styls from "./search_nav.module.css";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDataByUrl } from '@/actions/universal/getDataByUrl';
import { getDataByUrl2 } from '@/actions/universal/getDataByUrl2';


const delay = async(val:number) => {
    await new Promise((resolve, reject) => setTimeout(resolve, val));
}

const ress = [{name:"Movie", amount: 0}, {name:"Tv", amount: 0}, {name:"Manga", amount:0}, {name:"Anime", amount:0}];
let ress2:{name:string, amount:number}[] = [];

export default function SearchNavigation() {
    const router = useRouter()
    const path = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("query")
    const path_div = path.trim().split("/");
    const third_option = path_div[2]?.charAt(0).toUpperCase() + path_div[2]?.slice(1, path_div[2].length);
    const SP = (third_option == undefined || !third_option) ? "Movie" : third_option;

    let movie_url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
    let tv_url = `https://api.themoviedb.org/3/search/tv?query=${query}`;
    let anime_url = `https://api.jikan.moe/v4/anime?q=${query}`;
    let manga_url = `https://api.jikan.moe/v4/manga?q=${query}`;
    
    const [nav, setNav] = useState(SP);
    const [ress3, setRess] = useState<{name:string, amount:number}[]>([])
    
    function redirect_to(val:string){
        router.push(`/search/${val.toLowerCase()}?query=${query}`)
        setNav(val)
    }

    const Tweak_Navigation = async() => {
        let type:{name:string, amount:number}[] = []
        // movie url
        let await_1 = await getDataByUrl(movie_url);
        let res_1 = await await_1?.total_results;
        type = [...type, {name: "Movie", amount: res_1}]
        // tv url
        let await_2 = await getDataByUrl(tv_url);
        let res_2 = await await_2?.total_results;
        type = [...type, {name: "Tv", amount: res_2}]
        // manga url
        let await_3 = await getDataByUrl2(manga_url);
        let res_3 = await await_3?.pagination?.items?.total;
        type = [...type, {name: "Manga", amount: res_3}]
        // delay cause of jikan api
        await delay(1500)

        // anime url;
        let await_4 = await getDataByUrl2(anime_url);
        let res_4 = await await_4?.pagination?.items?.total;
        type = [...type, {name: "Anime", amount: res_4}]

        setRess(type);
    }

    useEffect(() => {
        Tweak_Navigation();
        setNav(SP);
    }, [])

    console.log(ress3);
    



    const mapped_ress = (ress3.length == 0 ? ress : ress3).map((item:{name:string, amount:number}, index:number) => {
        return(
            <div onClick={() => redirect_to(item.name)} key={index} className={nav == item.name ? `${styls.nav_changer} ${styls.active}` : styls.nav_changer}>{item.name} <span className={styls.result_index}>{item.amount}</span></div>
        )
    })
    
  return (
    <div className={styls.search_navigation}>
        <div className={styls.search_head}>Search Results</div>
        <div className={styls.search_itemsz}>
            {mapped_ress}
        </div>
    </div>
  )
}
