import React from 'react'
import Alternative_Titles from '../../../../_comp/Alternative_Titles/Alternative_Titles'
import { getTitlesById } from '@/actions/level1/getTitlesById';

export default async function page({params}: {params: {movie_id: string}}) {
  let ID = parseInt(params?.movie_id.split("_")[0]);
  let url = 'https://api.themoviedb.org/3/movie/';
  const type = "movie";

  let alternated = await getTitlesById(url, type, ID)
  let alt_titles = (alternated);
  
  let fetched: any = [];

  console.log(alternated, "mov");
  

  return (
    <Alternative_Titles TITLES={alt_titles} type='movie_serie' />
  )
}
