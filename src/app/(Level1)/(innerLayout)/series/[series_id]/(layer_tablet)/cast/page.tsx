import { getCastById } from '@/actions/level1/getCastById'
import Cast_Crews from '@/app/(Level1)/(innerLayout)/_comp/Casts_Crews/Cast_Crews'
import React from 'react'
import { SERIEPARAM } from '../layout';

export default async function page({params}:{params: SERIEPARAM}) {
    let url = `https://api.themoviedb.org/3/tv/`;
  let ID = parseInt(params?.series_id.split("_")[0]);
  const type = "movie"
  let casts = await getCastById(url, type, ID);

  const cast_data = casts?.cast || [];
  const crew_data = casts?.crew || [];
  return (
    <Cast_Crews CREW={crew_data} CAST={cast_data} type={"movie_serie"} />
  )
}
