import React from 'react'
import type { Metadata } from 'next';
import styles from "./movieList.module.css"
import { getMovies } from '@/actions/getMovies';
import MovieList from './_component/MovieList';
import { v4 as uuidV4} from "uuid"

interface Props {
  params: {
    type: string,
  },
  searchParams?: { [key: string]: string | string[] | undefined }
}

export interface Movie {
  adult: false,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export const generateMetadata = ({params}: Props): Metadata => {
  let { type } = params

  const title = type == "popular"
  ? "Popular Movies"
  : type == "top_rated"
  ? "Top Rated Movies"
  : type == "upcoming"
  ? "Upcoming Movies"
  : type == "now_playing"
  ? "Now Playing Movies"
  : "Movies"

  return {
      title: title,
      description: ""
  }
}

export default async function Movies({params, searchParams}: Props) {
  
  const sort = (searchParams?.sort);
  const watch_provider = searchParams?.with_watch_providers;
  const watch_region = searchParams?.watch_region;
  const region = searchParams?.region;
  const show_me = searchParams?.show_me;
  const availabilities = searchParams?.with_watch_monetization_types;
  const release_type = searchParams?.with_release_type;
  const genres = searchParams?.with_genres;
  const certificate = searchParams?.certificate;
  const keyword = searchParams?.with_keywords;
  const release_date_gte = searchParams!["release_date.gte"]!;
  const release_date_lte = searchParams!["release_date.lte"]
  const vote_average_gte = searchParams!["vote_average.gte"];
  const vote_average_lte = searchParams!["vote_average.lte"];
  const user_count_gte = searchParams!["vote_count.gte"];
  const runtime_gte = searchParams!["with_runtime.gte"];
  const runtime_lte = searchParams!["with_runtime.lte"];

  const parameters: {[key:string]: string | undefined | string[]} = {
    ...(sort && {"sort": sort}),
    ...(watch_region && {"watch_region": watch_region}),
    ...(watch_provider && {"with_watch_provider": watch_provider}),
    ...(region && {"region": region}),
    ...(availabilities && {"with_watch_monetization_types": availabilities}),
    ...(release_type && {"with_release_type": release_type}),
    ...(genres && {"with_genres": genres}),
    ...(certificate && {"certificate": certificate}),
    ...(keyword && {"with_keywords": keyword}),
    ...(release_date_gte && {"release_date.gte": release_date_gte}),
    ...(release_date_lte && {"release_date.lte": release_date_lte}),
    ...(vote_average_gte && {"vote_average.gte": vote_average_gte}),
    ...(vote_average_lte && {"vote_average.lte": vote_average_lte}),
    ...(user_count_gte && {"vote_count.gte": user_count_gte}),
    ...(runtime_gte && {"with_runtime.gte": runtime_gte}),
    ...(runtime_lte && {"with_runtime.lte": runtime_lte})
  }
  
  const isEmptyObject = (obj: object) => {
    return Object.keys(obj).length == 0 ? false : true;
  };
  const checkParams = isEmptyObject(parameters);
  const url = checkParams ? "https://api.themoviedb.org/3/discover/movie" : `https://api.themoviedb.org/3/movie/${params.type}`;

  const res = await getMovies(url, parameters);
  const generatedKey = uuidV4();
  
  return (
    <div className={styles.moviesListCont}>
      {res && <MovieList key={generatedKey} params={{url, parameter: parameters, firstFetch: res.results, startPage: 1}} />}
    </div>
  )
}
