import React from 'react'
import Introduction from './_component/introduction'
import Cats_Index from '../../_comp/Cast_Index/Cats_Index'
import Social_Index from '../../_comp/Social_Index/Social_Index'
import Media_Index from '../../_comp/Media_Index/Media_Index'
import Recommend_Index from '../../_comp/Reccomend_Index/Recommend_Index'
import stylePage from "./css_styling.module.css"
import { getDataById } from '@/actions/level2/anime/getDataById'
import { extractColorsFromImageUrl } from '@/actions/color_picker/getColor'
import { getDataCastsById } from '@/actions/level2/anime/getDataCastsById'
import { getDataRevById } from '@/actions/level2/anime/getDataRevById'
import { getDataVidById } from '@/actions/level2/anime/getDataVidById'
import { getDataPicById } from '@/actions/level2/anime/getDataPicById'
import { getDataRecommendationsById } from '@/actions/level2/anime/getDataRecommendById'
import type { Metadata } from 'next'
import { FaLink } from 'react-icons/fa'
import Link from 'next/link'
import LineChart from '../../_comp/ChartJS/LineChart'


export const generateMetadata = async({params}: {params:{manga_id: string}}): Promise<Metadata> => {
    let ID = parseInt(params.manga_id.split("_")[0]);
    const url = `https://api.jikan.moe/v4/manga/`;
    let res = await getDataById(url, ID)
    const name = await res?.data?.title;
    console.log(res?.data);
    
    return {
        title: name || "manga",
        description: `page to view anime titled ${name}` || "page for viewing each manga",
    }
}

const delayTimer = async(value: number) => {
    return new Promise((reject, resolve) => setTimeout(resolve, value));
}

export default async function page({params}:{params:{manga_id: string}}) {

    let ID = parseInt(params?.manga_id.split("_")[0]);
    const url = `https://api.jikan.moe/v4/manga/`;
 
    const animeData = await getDataById(url, ID);
    let clr_res = await extractColorsFromImageUrl(url, ID, false);
    let cas_res = await getDataCastsById(url, ID);
    let rev_res = await getDataRevById(url, ID);
    let recom = await getDataRecommendationsById(url,ID);
    let pict = await getDataPicById(url, ID);

    let rev_res_2 = rev_res?.data?.map((item:any) => {
        return {
            author: item?.user?.username, 
            id: item.mal_id, 
            created_at: item?.date, 
            content: item?.review, 
            author_details:{
            name: item?.user?.username,
            username: item?.user?.username,
            avatar_path: item?.user?.images?.jpg?.image_url,
            rating: item?.score
            }
        }
    });
    let trl_res_2: any[] = [];
    const img_res = pict?.data && {
        backdrops: [
            ...pict?.data?.map((item:any) => {
                return {file_path: item?.jpg?.image_url}
            })
        ],
        posters:[
            ...pict?.data?.map((item:any) => {
                return {file_path: item?.webp?.image_url}
            })
        ]
    }; 

    let authors = animeData?.data?.authors.slice(0,4);
    let rate = animeData?.data?.score * 10;
    let offLink = animeData?.data?.external[0].url;
    let original_language = 'Japanese';
    let budget = 'Nill';
    let revenue = 'Nill';
    let type = 'Manga';
    let keywords = 'No Keywords!';
    let status = animeData?.data?.status;
    let datas: number[] = []

    for(let i = 1; i <= 6; i++){
        let ranNumber = Math.floor(Math.random() * rate);
        datas?.push(ranNumber)
    }
    
    

    return(
        <section className={stylePage.data_full_container}>

            <Introduction FTC={clr_res} MANGA={animeData?.data} CAST={authors} />

            <div className={stylePage.data_details}>

                <div className={stylePage.left_col_details}>
                    <Cats_Index Characters={cas_res?.data} id={params.manga_id} type={"anime"} />
                    <Social_Index Reviews={rev_res_2} />
                    <Media_Index SCENE={trl_res_2} THUMBS={img_res} type={true} />
                    <Recommend_Index RECOM={recom?.data || []} type={"am"} />
                </div>

                <div className={stylePage.right_col_details}>
                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>
                            <Link href={offLink}><FaLink /></Link>
                        </div>
                    </div>

                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>Status</div>
                        <div className={stylePage.station_info}>{status}</div>
                    </div>

                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>Original Language</div>
                        <div className={stylePage.station_info}>{original_language}</div>
                    </div>

                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>Budget</div>
                        <div className={stylePage.station_info}>{budget}</div>
                    </div>

                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>Revenue</div>
                        <div className={stylePage.station_info}>{revenue}</div>
                    </div>

                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>Type</div>
                        <div className={stylePage.station_info}>{type}</div>
                    </div>

                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>Keywords</div>
                        <div className={stylePage.station_info_list}>{keywords}</div>
                    </div>

                    <div className={stylePage.content_station}>
                        <div className={stylePage.station_head}>Popularity Trend</div>
                        <div className={stylePage.station_info_chart}>
                            <LineChart name={animeData?.data?.title} color={clr_res?.DarkVibrant} color2={clr_res?.DarkMuted} datas={datas} />
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}
