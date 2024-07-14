import { getCountryName } from '@/actions/country_mapper/country_mapper';
import { getLanguageName } from '@/actions/country_mapper/language_mapper';
import { getImagesById } from '@/actions/level1/getImagesById';
import Logos from '@/app/(Level1)/(innerLayout)/_comp/Logos/Logos';
import React from 'react'

export default async function page({params}:{params:{movie_id:string}}) {
    let ID = parseInt(params?.movie_id?.split("_")[0]);
    let url = `https://api.themoviedb.org/3/movie/`;
    let type = "movie";


    let image = await getImagesById(url, type, ID);

    let logos_image = await image?.logos;

    let formatted_images = logos_image?.map((item:any) => {
      let cc:string = item?.iso_639_1;

      let cn = (cc == null || cc == undefined) ? "No Language" : getLanguageName(cc);
      return {...item, language: cn}
    })

    let opener = formatted_images?.map((item:any) => item.language);
    let init = opener.includes("No Language") ? "No Language" : opener[0];
    

  return (
    <Logos LOGO={formatted_images} type='movie_serie' initer={init} />
  )
}
