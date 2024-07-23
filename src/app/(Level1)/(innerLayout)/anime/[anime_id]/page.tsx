import React from 'react'
import Introduction from './_component/Introduction'
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
import { getStaffById } from '@/actions/level2/anime/getStaffById'
import LineChart from '../../_comp/ChartJS/LineChart'

export const generateMetadata = async({params}: {params:{anime_id: string}}): Promise<Metadata> => {
    let ID = parseInt(params.anime_id.split("_")[0]);
    const url = `https://api.jikan.moe/v4/anime/`;
    let res = await getDataById(url, ID)
    const name = await res?.data?.title;
    return {
        title: name,
        description: `page to view anime titled ${name}`
    }
}

const delayTimer = async(value: number) => {
    return new Promise((reject, resolve) => setTimeout(resolve, value));
}

export default async function page({params}:{params:{anime_id: string}}) {

    let ID = parseInt(params?.anime_id.split("_")[0]);
    const url = `https://api.jikan.moe/v4/anime/`;

    const animeData = await getDataById(url, ID);
    await delayTimer(1200);
    let clr_res = await extractColorsFromImageUrl(url, ID, false);
    let cas_res = await getDataCastsById(url, ID);
    await delayTimer(1200);
    let rev_res = await getDataRevById(url, ID);
    let trl_res = await getDataVidById(url, ID);
    await delayTimer(1200);
    let pict = await getDataPicById(url, ID);
    let staffs = await getStaffById(url, ID);
    await delayTimer(1200);
    let recom = await getDataRecommendationsById(url,ID);

    let stfs_res = staffs?.data?.filter((item:any) => item?.positions?.includes("Producer") || item?.positions?.includes("Director") ? item : false)
    let rev_res_2 = rev_res?.data?.map((item:any) => {
        return {author: item?.user?.username, id: item.mal_id, created_at: item?.date, content: item?.review, author_details:{
            name: item?.user?.username,
            username: item?.user?.username,
            avatar_path: item?.user?.images?.jpg?.image_url,
            rating: item?.score
        }}
    });
    let trl_res_2 = trl_res?.data && [
        ...trl_res?.data?.promo?.map((item:any) => {
            return {
                key: item?.trailer?.youtube_id
            }
        }),
        ...trl_res?.data?.music_videos?.map((item:any) => {
            return {
                key: item?.video?.youtube_id
            }
        })
    ]
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
    }

    const score = animeData?.data?.score * 10;
    let status = animeData?.data?.status;
    let original_language = "Japanese";
    let type = "Anime";
    let budget = "nill";
    let revenue = "nill";
    let keywords = "No Match!";
    let chart: number[] = [];
    let officialLink = animeData?.data?.external?.filter((item:any) => item?.name == "Official Site" ? item : false);
    let offLink = officialLink == undefined ? null : officialLink[0]?.url;
    
    for(let i = 1; i <= 6; i++){
        let ranNum = Math.floor(Math.random() * 10);
        chart?.push(ranNum)
    }

    return(
        <section className={stylePage.data_full_container}>

            <Introduction FTC={clr_res} ANIME={animeData?.data} CAST={[...stfs_res]} />

            <div className={stylePage.data_details}>

                <div className={stylePage.left_col_details}>
                    <Cats_Index Characters={cas_res?.data} id={params.anime_id} type={"anime"} />
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
                            <LineChart datas={chart} name={animeData?.data?.title} color={clr_res?.DarkVibrant} color2={clr_res?.DarkVibrant} />
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
