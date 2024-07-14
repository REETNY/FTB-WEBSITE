import React from 'react'
import stylePage from "./css_styling.module.css"

import { getMovieById } from '@/actions/level2/movie/getMovieById';

import Introduction from './_comp/Introduction';

import { extractColorsFromImageUrl } from '@/actions/color_picker/getColor';
import { getMovieCastById } from '@/actions/level2/movie/getMovieCastById';
import { getMovieTrailerById } from '@/actions/level2/movie/getMovieTrailerById';
import { getMovieReview } from '@/actions/level2/movie/getMovieReview';
import { getMovieImages } from '@/actions/level2/movie/getMovieImages';
import { getMovieReccomend } from '@/actions/level2/movie/getMovieReccomendation';

import Cats_Index from '../../_comp/Cast_Index/Cats_Index';
import Social_Index from '../../_comp/Social_Index/Social_Index';
import Media_Index from '../../_comp/Media_Index/Media_Index';
import Recommend_Index from '../../_comp/Reccomend_Index/Recommend_Index';

interface SearchParams {
  params : {
    series_id: string
  }
}

export interface SERIE{

  adult: boolean,
  backdrop_path: string,
  created_by: {
    id: number,
    credit_id: string,
    name: string,
    original_name: string,
    gender: number,
    profile_path: string
  }[],
  episode_run_time: number[],
  first_air_date: string,
  genres: {
    id: number,
    name: string
  }[],
  homepage: string,
  id: number,
  in_production: boolean,
  languages: string[],
  last_air_date: string,
  last_episode_to_air: {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string
  },
  name: string,
  next_episode_to_air: {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number | null,
    season_number: number,
    show_id: number,
    still_path: any
  },
  networks: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }[],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }[],
  production_countries: {
    iso_3166_1: string,
    name: string
  }[],
  seasons: {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
    vote_average: number
  }[],
  spoken_languages: {
    english_name: string,
    iso_639_1: string,
    name: string
  }[],
  status: string,
  tagline: string,
  type: string,
  vote_average: number,
  vote_count: number
}

export interface Cast {
  cast:{
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    credit_id: string,
    department: string,
    job: string
  }[],
  crew: {
    adult: false
    credit_id: string,
    department: string, 
    gender: number
    id: number,
    job: string,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number
    profile_path: string,
  }[]
}

export interface Crew{
  adult: false
  credit_id: string,
  department: string, 
  gender: number
  id: number,
  job: string,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number
  profile_path: string
}

export interface Trailer{
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: true,
  published_at: string,
  id: string
}[]

export default async function page({params}: SearchParams) {

  let ID = parseInt(params.series_id.split("_")[0])
  let url = `https://api.themoviedb.org/3/tv/`;

  const movieData = await getMovieById(url, ID);
  let clr_res = await extractColorsFromImageUrl(url, ID, true);
  let cas_res = await getMovieCastById(url, ID);
  let trl_res = await getMovieTrailerById(url, ID);
  let rev_res = await getMovieReview(url, ID);
  let img_res = await getMovieImages(url, ID);
  let rec_res = await getMovieReccomend(url, ID);

  

  return (
    <section className={stylePage.data_full_container}>

      <Introduction FTC={clr_res} SERIE={movieData} CAST={cas_res} SCENE={trl_res?.results} />

      <div className={stylePage.data_details}>

        <div className={stylePage.left_col_details}>
          <Cats_Index Characters={cas_res.cast} id={params.series_id} />
          <Social_Index Reviews={rev_res} />
          <Media_Index SCENE={trl_res?.results} THUMBS={img_res} />
          <Recommend_Index RECOM={rec_res} type={"ms"} />
        </div>

        <div className={stylePage.right_col_details}></div>

      </div>

    </section>
  )
}
