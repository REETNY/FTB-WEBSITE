import React from 'react'
import type { Metadata } from 'next'
import { getSeries } from '@/actions/getSeries'
import { v4 as uuidV4} from "uuid"
import SerieList from './_component/SeriesList'
import styles from "./seriesList.module.css"

interface Props {
  params: {
    type: string,
  },
  searchParams?: { [key: string]: string | string[] | undefined }
}


export const generateMetadata = ({params}: Props): Metadata => {
  let { type } = params

  const title = type == "popular"
  ? "Popular Tv Shows"
  : type == "top_rated"
  ? "Top Rated Tv Shows"
  : type == "airing_today"
  ? "Tv Shows Airing Today"
  : type == "on_tv"
  ? "Currently Airing Tv Shows"
  : "Tv Shows"

  return {
      title: title,
      description: ""
  }
}

export default async function Series({params, searchParams}:Props) {

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
  const first_air_date_gte = searchParams!["first_air_date.gte"]!;
  const first_air_date_lte = searchParams!["first_air_date.lte"]
  const air_date_gte = searchParams!["air_date.gte"]!;
  const air_date_lte = searchParams!["air_date.lte"]
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
    ...(first_air_date_gte && {"first_air_date.gte": first_air_date_gte}),
    ...(first_air_date_lte && {"first_air_date.lte": first_air_date_lte}),
    ...(air_date_gte && {"air_date.gte": air_date_gte}),
    ...(air_date_lte && {"air_date.lte": air_date_lte}),
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
  const url = checkParams ? "https://api.themoviedb.org/3/discover/tv" : `https://api.themoviedb.org/3/tv/${params.type == "on_tv" ? "on_the_air" : params.type}`;


  const res = await getSeries(url, parameters);
  const generatedKey = uuidV4();

  return (
    <div className={styles.moviesListCont}>
      {res && <SerieList key={generatedKey} params={{url, parameter: parameters, firstFetch: res.results, startPage: 1}} />}
    </div>
  )
}
