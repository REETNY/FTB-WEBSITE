import React from 'react'
import { getTitlesById } from '@/actions/level1/getTitlesById'
import Alternative_Titles from '@/app/(Level1)/(innerLayout)/_comp/Alternative_Titles/Alternative_Titles'

export default async function page({params}:{params:{anime_id:string}}) {
    let ID = parseInt(params?.anime_id.split("_")[0]);
    let url = 'https://api.jikan.moe/v4/anime/';
    const type = "anime";

    let alternated = await getTitlesById(url, type, ID)
    let alt_titles = {
        titlez: (alternated?.data?.titles)
    };
  
  return (
    <Alternative_Titles TITLES={alt_titles} type='anime_manga' />
  )
}
