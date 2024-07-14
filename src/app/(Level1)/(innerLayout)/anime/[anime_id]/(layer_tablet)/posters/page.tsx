import React from 'react'
import { getImagesById } from '@/actions/level1/getImagesById'
import Posters from '@/app/(Level1)/(innerLayout)/_comp/Posters/Posters'

export default async function page({params}:{params:{anime_id:string}}) {

    let ID = parseInt(params?.anime_id?.split("_")[0]);
    let url = `https://api.jikan.moe/v4/anime/`;
    let types = "anime"
    let images = await getImagesById(url,types,ID);

    let formatted_image = images?.data?.map((item:any) => {
        return {language: "No Language", file_path: item?.jpg?.image_url, width: "Unknown", height: "Unknown"}
    })


  return (
    <Posters POSTER={formatted_image} type='anime_manga' />
  )
}
