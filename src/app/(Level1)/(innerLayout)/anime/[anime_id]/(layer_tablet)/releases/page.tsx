import React from 'react'
import { getTitlesById } from '@/actions/level1/getTitlesById'
import Release_Date from '@/app/(Level1)/(innerLayout)/_comp/Release_Date/Release_Date'

export default async function page({params}:{params:{anime_id:string}}) {


    let ID = parseInt(params?.anime_id.split("_")[0]);
    let url = 'https://api.jikan.moe/v4/anime/';
    const type = "anime";

    let releases = await getTitlesById(url, type, ID)
    let formatted_release = [
        {
            country: "All",
            date: releases?.data?.aired?.from,
            still_airing: releases?.data?.airing,
            status: releases?.data?.status,
            fin_air: releases?.data?.aired?.to,
            type: releases?.data?.url
        }
    ]
    

  return (
    <Release_Date RELEASE={formatted_release} type='anime_manga' />
  )
}
