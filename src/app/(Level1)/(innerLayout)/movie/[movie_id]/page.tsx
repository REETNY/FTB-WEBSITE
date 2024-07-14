import React from 'react'
import stylePage from "./css_styling.module.css"
import { getMovieById } from '@/actions/level2/movie/getMovieById';
import Introduction from './_component/index/Introduction';
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
import Collection from '../../_comp/Collection_Index/Collection';

interface SearchParams {
  params : {
    movie_id: string
  }
}

export interface MovieID{
  adult: false,
  backdrop_path: '/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg',
  belongs_to_collection: {
    id: 1022790,
    name: 'Inside Out Collection',
    poster_path: '/Apr19lGxP7gm6y2HQX0kqOXTtqC.jpg',
    backdrop_path: '/7U2m2dMSIfHx2gWXKq78Xj1weuH.jpg'
  },
  budget: 200000000,
  genres: { id: number, name: string }[],
  homepage: string,
  id: number,
  imdb_id: string,
  origin_country: string[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }[],
  production_countries: { iso_3166_1: string, name: string }[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: { english_name: string, iso_639_1: string, name: string }[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
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

  let ID = parseInt(params.movie_id.split("_")[0])
  let url = `https://api.themoviedb.org/3/movie/`;

  const movieData = await getMovieById(url, ID);
  let clr_res = await extractColorsFromImageUrl(url, ID, true);
  let cas_res = await getMovieCastById(url, ID);
  let trl_res = await getMovieTrailerById(url, ID);
  let rev_res = await getMovieReview(url, ID);
  let img_res = await getMovieImages(url, ID);
  let rec_res = await getMovieReccomend(url, ID);


  // part of collection
  const collections = await movieData;

  return (
    <section className={stylePage.data_full_container}>

      <Introduction FTC={clr_res} MOVIE={movieData} CAST={cas_res} SCENE={trl_res?.results} />

      <div className={stylePage.data_details}>

        <div className={stylePage.left_col_details}>
          <Cats_Index Characters={cas_res?.cast} id={params.movie_id} />
          <Social_Index Reviews={rev_res} />
          <Media_Index SCENE={trl_res?.results} THUMBS={img_res} />
          {collections?.belongs_to_collection?.id && <Collection PARAM_PATH={params?.movie_id} FTC={clr_res} COLLECT={collections} />}
          <Recommend_Index RECOM={rec_res} type={"ms"} />
        </div>

        <div className={stylePage.right_col_details}></div>

      </div>

    </section>
  )
}
