import React from 'react'
import { getLanguageName } from '@/actions/country_mapper/language_mapper';
import { getCollectionImages } from '@/actions/collection/getCOllectionImages';
import Posters from '@/app/(Level1)/(innerLayout)/_comp/Posters/Posters';

export default async function page({params}:{params:{collection_id:string}}) {
  const ID = parseInt(params?.collection_id?.split("_")[0]);
  let url = `https://api.themoviedb.org/3/collection/`;
  const collection_images = await getCollectionImages(url, ID);
  let posters = collection_images?.posters?.map((item:any) => {
    let language = getLanguageName(item?.iso_639_1);
    return{
      ...item,
      language: language == "Unknown" ? "No Language" : language
    }
  })
  return (
    <Posters type='movie_serie' POSTER={posters} />
  )
}
