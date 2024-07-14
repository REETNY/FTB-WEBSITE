import React from 'react'
import { getSeasonCasts } from '@/actions/season/getSeasonCast'
import Cast_Crews from '@/app/(Level1)/(innerLayout)/_comp/Casts_Crews/Cast_Crews';

export default async function page({params}: {params:{season_id:string, id:string}}) {
  const ID = parseInt(params?.id);
  let SEASON_ID = parseInt(params?.season_id.split("_")[0]);
  const url = `https://api.themoviedb.org/3/tv/`
  const aggregate_credits = await getSeasonCasts(url, SEASON_ID, ID);

  const aggregate_casts = await aggregate_credits?.cast.map((item:any) => {
    let characters: string = "" 
    item?.roles?.map((chars:any, index:number) => {
      if(index == (item?.roles?.length - 1)){
        characters = characters + chars?.character + "."
      }else{
        characters = characters + chars?.character + ", "
      }
    })
    return (
      {...item, character: characters}
    )
  }) || [];
  const aggregate_crews = await aggregate_credits?.crew.map((item:any) => {
    let jobs:string = ""
    item?.jobs?.map((work:any, index:number) => {
      if(index == item?.jobs?.length - 1){
        jobs = jobs + work?.job + "."
      }else{
        jobs = jobs + work?.job + ", "
      }
    })

    return {...item, job: jobs}
  }) || [];

  console.log(aggregate_crews);
  
  
  return (
    <Cast_Crews CAST={aggregate_casts} CREW={aggregate_crews} type='movie_serie' />
  )
}
