import React from 'react'
import type { Metadata } from 'next'
import { getAnimes } from '@/actions/getAnimes';
import AnimeList from './_comp/AnimeList';
import { v4 as uuidV4} from "uuid"
import styles from "./animeList.module.css"

export const metadata: Metadata = {
  title: "Anime"
}

interface Param {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export interface Anime{
  mal_id: number,
  url: string,
  images: {
    jpg:{
      image_url: string,
      small_image_url: string,
      large_image_url: string
    },
    webp:{
      image_url: string,
      small_image_url: string,
      large_image_url: string
    }
  },
  trailer: object,
  approved: boolean,
  titles: string[],
  title: string,
  title_english: string,
  title_japanese: string,
  title_synonyms: string[],
  type: string,
  source: string,
  episodes: number,
  status: string,
  airing: boolean,
  aired: {
    from: string,
    to: string,
  },
  duration: string,
  rating: string,
  score: number,
  scored_by: number,
  rank: number,
  popularity: number,
  members: number,
  favorites: number,
  synopsis: string,
  background: string,
  season: string,
  year: number,
  broadcast: {
    day: string,
    time: string,
    timezone: string,
    string: string
  },
  producers: {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }[],
  licensors: {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }[],
  studios:  {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }[],
  genres:  {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }[],
  explicit_genres:  {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }[],
  themes:  {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }[],
  demographics:  {
    mal_id: number,
    type: string,
    name: string,
    url: string
  }[]
}

export default async function Anime({searchParams}: Param) {

  const sort = (searchParams?.sort);
  const show_me = searchParams?.show_me;
  const genres = searchParams?.with_genres;
  const keyword = searchParams?.with_keywords;
  const letter = searchParams?.letter;
  const type = searchParams?.type;
  const sfw = searchParams?.sfw;
  const rating = searchParams?.rating;
  const limit = searchParams?.limit;
  const status = searchParams?.status;
  const release_date_gte = searchParams!["release_date.gte"]!;
  const release_date_lte = searchParams!["release_date.lte"]
  const vote_average_gte = searchParams!["vote_average.gte"];
  const vote_average_lte = searchParams!["vote_average.lte"];

  const parameters = {
    ...(sort && {sort}),
    ...(limit && {limit}),
    ...(genres && {genres: genres}),
    ...(keyword && {q: keyword}),
    ...(letter && {letter: letter}),
    ...(type && {type}),
    ...(sfw && {sfw: sfw}),
    ...(rating && {rating}),
    ...(status && {status}),
    ...(release_date_gte && {start_date: release_date_gte}),
    ...(release_date_lte && {end_date: release_date_lte}),
    ...(vote_average_gte && {min_score: vote_average_gte}),
    ...(vote_average_lte && {max_score: vote_average_lte})
  }

  const currentUrl = `https://api.jikan.moe/v4/anime`
  const res = await getAnimes(currentUrl, parameters);
  

  const generatedKey = uuidV4()

  return (
    <div className={styles.moviesListCont}>
      {res && <AnimeList key={generatedKey} params={{url: currentUrl, parameter: parameters, firstFetch: res.data, startPage: 1}} />}
    </div>
  )
}
