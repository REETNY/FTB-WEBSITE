import React from 'react';
import Cast_Crews from '@/app/(Level1)/(innerLayout)/_comp/Casts_Crews/Cast_Crews';
import { getCastById } from '@/actions/level1/getCastById';

export default async function page({params}:{params:{manga_id:string}}) {
    let ID = parseInt(params?.manga_id.split("_")[0]);
    let url = `https://api.jikan.moe/v4/manga/`;
    let type = "manga";

    let casts = await getCastById(url, type, ID);
    let cast_data = casts?.data || [];
    const crew_data: [] = [];

  return (
    <Cast_Crews CREW={crew_data} CAST={cast_data} type={"manga"} />
  )
}
