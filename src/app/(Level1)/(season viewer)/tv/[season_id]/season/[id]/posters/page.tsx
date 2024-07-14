import { getSeasonImages } from '@/actions/season/getSeasonImages';
import React from 'react';
import Posters from '@/app/(Level1)/(innerLayout)/_comp/Posters/Posters';
import { getLanguageName } from '@/actions/country_mapper/language_mapper';

export default async function page({params}: {params:{season_id:string, id:string}}) {
  const ID = parseInt(params?.id);
  let SEASON_ID = parseInt(params?.season_id.split("_")[0]);
  const url = `https://api.themoviedb.org/3/tv/`;
  const res = await getSeasonImages(url, SEASON_ID, ID);

  const posters = await res?.posters?.map((item:any) => {
    let language = getLanguageName(item?.iso_639_1);
    return {...item, language: language == "Unknown" ? "No Language": language}
  }) || [];

  return (
    <Posters POSTER={posters} type='movie_serie' />
    // <></>
  )
}
