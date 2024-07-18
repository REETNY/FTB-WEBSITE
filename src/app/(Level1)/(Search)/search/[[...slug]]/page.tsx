import React from 'react';
import { getDataByUrl } from '@/actions/universal/getDataByUrl';
import { getDataByUrl2 } from '@/actions/universal/getDataByUrl2';
import ItemView from '../../_Component/ItemView/ItemView';
import delayTimer from '@/actions/level2/timerDelay';


export default async function page({params, searchParams}:{params:{slug: string[]}, searchParams:{[key: string]: string}}) {

  let type = params?.slug ? params?.slug[0] : "movie";
  const query = searchParams?.query;
  const page = searchParams?.page

  let movie_url = `https://api.themoviedb.org/3/search/movie?query=${query}${page ? `&page=${page}` : ""}`;
  let tv_url = `https://api.themoviedb.org/3/search/tv?query=${query}${page ? `&page=${page}` : ""}`;
  let anime_url = `https://api.jikan.moe/v4/anime?q=${query}${page ? `&page=${page}` : ""}`;
  let manga_url = `https://api.jikan.moe/v4/manga?q=${query}${page ? `&page=${page}` : ""}`;

  await delayTimer(1500)

  const res = 
  (!type || type == "movie")
  ? await getDataByUrl(movie_url)
  : (type == "tv")
  ? await getDataByUrl(tv_url)
  : (type == "anime")
  ? await getDataByUrl2(anime_url)
  : (type == "manga")
  ? await getDataByUrl2(manga_url)
  : "";
  let pagination = await (res?.total_pages || res?.pagination?.last_visible_page);
  let rep = await (res?.results || res?.data);

  return (
    <ItemView Data={{rep, pagination, query, type, page}} />
  )
}
