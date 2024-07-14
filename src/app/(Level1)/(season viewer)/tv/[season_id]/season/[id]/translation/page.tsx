import React from 'react'
import { getSeasonTranslate } from '@/actions/season/getSeasonTranslate'
import Translation from '@/app/(Level1)/(innerLayout)/_comp/Translation_Trans/Translation';

export default async function page({params}:{params: {season_id:string, id:string}}) {
  const ID = parseInt(params?.id);
  let SEASON_ID = parseInt(params?.season_id.split("_")[0]);
  const url = `https://api.themoviedb.org/3/tv/`
  const res = await getSeasonTranslate(url, SEASON_ID, ID);
  const translations = res?.translations?.map((item:any) => {
    return {...item, data:{
      ...item?.data,
      title: item?.data?.name
    }}
  });


  return (
    <Translation TRANSLATE={translations} type='movie_serie' />
  )
}
