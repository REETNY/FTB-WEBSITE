import React from 'react'
import { getCastById } from '@/actions/level1/getCastById'
import { getStaffById } from '@/actions/level2/anime/getStaffById';
import Cast_Crews from '@/app/(Level1)/(innerLayout)/_comp/Casts_Crews/Cast_Crews'

export default async function page({params}:{params:{anime_id:string}}) {
    let url = `https://api.jikan.moe/v4/anime/`;
    let ID = parseInt(params?.anime_id.split("_")[0]);
    const type = "anime"
    let casts = await getCastById(url, type, ID);
    let staffs = await getStaffById(url, ID);
    let cast_data = casts?.data || [];
    const crew_data: [] = staffs?.data || [];
    
    

  return (
    <Cast_Crews CREW={crew_data} CAST={cast_data} type={"anime"} />
  )
}
