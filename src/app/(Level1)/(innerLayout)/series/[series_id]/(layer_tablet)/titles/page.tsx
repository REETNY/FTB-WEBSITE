import React from 'react'
import Alternative_Titles from '../../../../_comp/Alternative_Titles/Alternative_Titles'
import { getTitlesById } from '@/actions/level1/getTitlesById';
import { SERIEPARAM } from '../layout';

export default async function page({params}: {params: SERIEPARAM}) {
  let ID = parseInt(params?.series_id.split("_")[0]);
  let url = 'https://api.themoviedb.org/3/tv/';
  const type = "movie";

  let alternated = await getTitlesById(url, type, ID)
  let alt_titles = (alternated);
  
  console.log(alternated, "ser");

  return (
    <Alternative_Titles TITLES={alt_titles} type='movie_serie' />
  )
}
