import React from 'react'
import { getImagesById } from '@/actions/level1/getImagesById';
import Posters from '@/app/(Level1)/(innerLayout)/_comp/Posters/Posters';

export default async function page({params}:{params:{manga_id:string}}) {    
    let ID = parseInt(params?.manga_id?.split("_")[0]);
    let url = `https://api.jikan.moe/v4/manga/`;
    let types = "manga"
    let images = await getImagesById(url,types,ID);

    let formatted_image = images?.data?.map((item:any) => {
        return {language: "No Language", file_path: item?.jpg?.image_url, width: "Unknown", height: "Unknown"}
    })

  return (
    <Posters POSTER={formatted_image} type='anime_manga' />
  )
}
