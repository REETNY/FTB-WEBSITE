import React from 'react'
import Videos from '@/app/(Level1)/(innerLayout)/_comp/Videos/Videos'
import { getVideosById } from '@/actions/level1/getVideosById';

export default async function page({params}:{params:{movie_id:string, type:string}}) {

  let ID = parseInt(params?.movie_id.split("_")[0]);
  let url = `https://api.themoviedb.org/3/movie/`;
  let types = "movie";


  let getTrailer = await getVideosById(url, types, ID);

  let Datas = await getTrailer?.results;
  

  return (
    <Videos VIDEO={Datas} type='movie_serie' id={types +'/' + params?.movie_id} />
  )
}
