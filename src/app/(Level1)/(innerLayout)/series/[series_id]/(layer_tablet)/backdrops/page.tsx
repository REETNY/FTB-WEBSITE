import { getImagesById } from '@/actions/level1/getImagesById';
import React from 'react'
import { getLanguageName } from '@/actions/country_mapper/language_mapper';
import Backdrops from '@/app/(Level1)/(innerLayout)/_comp/Backdrops/Backdrops';

export default async function page({params}:{params:{series_id: string}}) {
    let ID = parseInt(params?.series_id?.split("_")[0]);
    let url = `https://api.themoviedb.org/3/tv/`;
    let type = "serie"

    let backdrops = await getImagesById(url, type, ID);

    let backdrop_images = await backdrops?.backdrops;

    let formatted_images = backdrop_images?.map((item:any) => {
        let cc:string = item?.iso_639_1;

        let cn = (cc == null || cc == undefined) ? "No Language" : getLanguageName(cc);
        return {...item, language: cn}
    })


  return (
    <Backdrops BACKDROP={formatted_images} type="movie_serie" />
  )
}
