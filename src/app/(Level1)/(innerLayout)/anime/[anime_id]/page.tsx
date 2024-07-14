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

export default async function page({params}:{params:{anime_id: string}}) {

    let ID = parseInt(params?.anime_id.split("_")[0]);
    const url = `https://api.jikan.moe/v4/anime/`;

    const animeData = await getDataById(url, ID);
    let clr_res = await extractColorsFromImageUrl(url, ID, false);
    let cas_res = await getDataCastsById(url, ID);
    let rev_res = await getDataRevById(url, ID);
    let trl_res = await getDataVidById(url, ID);
    let pict = await getDataPicById(url, ID);
    let recom = await getDataRecommendationsById(url,ID);


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
    
    

    return(
        <section className={stylePage.data_full_container}>

            <Introduction FTC={clr_res} ANIME={animeData?.data} CAST={[]} />

            <div className={stylePage.data_details}>

                <div className={stylePage.left_col_details}>
                    <Cats_Index Characters={cas_res?.data} id={params.anime_id} type={"anime"} />
                    <Social_Index Reviews={rev_res_2} />
                    <Media_Index SCENE={trl_res_2} THUMBS={img_res} type={true} />
                    <Recommend_Index RECOM={recom?.data || []} type={"am"} />
                </div>

                <div className={stylePage.right_col_details}></div>

            </div>

        </section>
    )
}
