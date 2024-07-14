import React from 'react'
import Videos from '@/app/(Level1)/(innerLayout)/_comp/Videos/Videos'
import { getSeasonVideo } from '@/actions/season/getSeasonVideos'

export default async function page({params}: {params:{season_id:string, id:string, type: string}}) {
  const ID = parseInt(params?.id);
  let SEASON_ID = parseInt(params?.season_id.split("_")[0]);
  const url = `https://api.themoviedb.org/3/tv/`;
  const res = await getSeasonVideo(url, SEASON_ID, ID);
  const ss_vids = await res?.results;

  return (
    <Videos sn={true} VIDEO={ss_vids} type='movie_serie' id={`tv/` + params?.season_id + `/season/` + params?.id} />
  )
}
