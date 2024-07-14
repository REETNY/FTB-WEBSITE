import { getCountryName } from '@/actions/country_mapper/country_mapper';
import { getLanguageName } from '@/actions/country_mapper/language_mapper';
import { getImagesById } from '@/actions/level1/getImagesById';
import Backdrops from '@/app/(Level1)/(innerLayout)/_comp/Backdrops/Backdrops';
import React from 'react'

export default async function page({params}:{params:{movie_id:string}}) {
    let ID = parseInt(params?.movie_id?.split("_")[0]);
    let url = `https://api.themoviedb.org/3/movie/`;
    let type = "movie";


    let image = await getImagesById(url, type, ID);

    let backdrop_images = await image?.backdrops;

    let formatted_images = backdrop_images?.map((item:any) => {
        let cc:string = item?.iso_639_1;

        let cn = (cc == null || cc == undefined) ? "No Language" : getLanguageName(cc);
        return {...item, language: cn}
    })

  return (
    <Backdrops BACKDROP={formatted_images} type="movie_serie" />
  )
}
