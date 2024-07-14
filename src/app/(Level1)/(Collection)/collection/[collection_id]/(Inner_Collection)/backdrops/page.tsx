import React from 'react';
import Backdrops from '@/app/(Level1)/(innerLayout)/_comp/Backdrops/Backdrops';
import { getCollectionImages } from '@/actions/collection/getCOllectionImages';
import { getLanguageName } from '@/actions/country_mapper/language_mapper';

export default async function page({params}:{params:{collection_id:string}}) {
  const ID = parseInt(params?.collection_id?.split("_")[0]);
  let url = `https://api.themoviedb.org/3/collection/`;
  const collection_images = await getCollectionImages(url, ID);
  let backdrops = collection_images?.backdrops?.map((item:any) => {
    let language = getLanguageName(item?.iso_639_1);
    return{
      ...item,
      language: language == "Unknown" ? "No Language" : language
    }
  })
  
  
  return (
    <Backdrops type='movie_serie' BACKDROP={backdrops} />
  )
}
