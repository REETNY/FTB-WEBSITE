import { getReleasesById } from '@/actions/level1/getReleasesById';
import Release_Date from '@/app/(Level1)/(innerLayout)/_comp/Release_Date/Release_Date'
import React from 'react'

export default async function page({params}:{params: {movie_id:string}}) {
    let url = `https://api.themoviedb.org/3/movie/`;
    let ID = parseInt(params?.movie_id.split("_")[0]);
    const type = "movie";
    let releases = await getReleasesById(url,type,ID);
    let releases_data = releases?.results;

  return (
    <Release_Date RELEASE={releases_data} type={"movie_series"} />
  )
}
