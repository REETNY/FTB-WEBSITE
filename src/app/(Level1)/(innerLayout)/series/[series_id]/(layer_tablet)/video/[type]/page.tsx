import React from 'react'
import { getVideosById } from '@/actions/level1/getVideosById';
import Videos from '@/app/(Level1)/(innerLayout)/_comp/Videos/Videos';

export default async function page({params}:{params:{series_id:string, type: string}}) {

    let ID = parseInt(params?.series_id.split("_")[0]);
    let url = `https://api.themoviedb.org/3/tv/`;
    let types = "serie";
  
  
    let getTrailer = await getVideosById(url, types, ID);
  
    let Datas = await getTrailer?.results;
    
    console.log(Datas);
    
  
    return (
      <Videos VIDEO={Datas} type='movie_serie' id={types+"s" +'/' + params?.series_id} />
    )
}
