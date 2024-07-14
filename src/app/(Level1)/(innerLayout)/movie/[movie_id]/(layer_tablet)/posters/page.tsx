import { getCountryName } from '@/actions/country_mapper/country_mapper';
import { getLanguageName } from '@/actions/country_mapper/language_mapper';
import { getImagesById } from '@/actions/level1/getImagesById';
import Posters from '@/app/(Level1)/(innerLayout)/_comp/Posters/Posters';
import React from 'react'

export default async function page({params}:{params:{movie_id:string}}) {
    let ID = parseInt(params?.movie_id?.split("_")[0]);
    let url = `https://api.themoviedb.org/3/movie/`;
    let type = "movie";


    let image = await getImagesById(url, type, ID);

    let posters_image = await image?.posters;

    let formatted_images = posters_image?.map((item:any) => {
        let cc:string = item?.iso_639_1;

        let cn = (cc == null || cc == undefined) ? "No Language" : getLanguageName(cc);
        return {...item, language: cn}
    })

  return (
    <Posters POSTER={formatted_images} type="movie_serie" />
  )
}
