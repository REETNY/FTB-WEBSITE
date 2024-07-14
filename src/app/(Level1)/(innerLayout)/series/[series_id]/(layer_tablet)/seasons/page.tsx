import Season from '@/app/(Level1)/(innerLayout)/_comp/SEASON/Season'
import React from 'react'
import { SERIEPARAM } from '../layout';
import { getSeasonsById } from '@/actions/level1/getSeasonsById';

export default async function page({params}: {params: SERIEPARAM}) {
    let url = `https://api.themoviedb.org/3/tv/`;
    let ID = parseInt(params.series_id.split("_")[0]);
    let type = "serie"
  
    let getSeason = await getSeasonsById(url, type, ID);

    console.log(params);
    
    
  return (
    <Season SEASON={getSeason} SERIE_ID={params?.series_id} type={"movie_serie"} />
  )
}
