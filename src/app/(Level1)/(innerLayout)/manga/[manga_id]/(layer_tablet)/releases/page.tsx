import { getReleasesById } from '@/actions/level1/getReleasesById';
import React from 'react';
import Release_Date from '@/app/(Level1)/(innerLayout)/_comp/Release_Date/Release_Date';

export default async function page({params}:{params:{manga_id:string}}) {
    let ID = parseInt(params?.manga_id.split("_")[0]);
    let url = `https://api.jikan.moe/v4/manga/`;
    let type = "manga";

    let releases = await getReleasesById(url, type, ID)
    let formatted_release = [
        {
            country: "All",
            date: releases?.data?.published?.from,
            still_airing: releases?.data?.publishing,
            status: releases?.data?.status,
            fin_air: releases?.data?.publsihed?.to || new Date(),
            type: releases?.data?.url
        }
    ];

  return (
    <Release_Date RELEASE={formatted_release} type='anime_manga' />
  )
}
