import { getCollectionTranslations } from '@/actions/collection/getCollectionTranslate';
import React from 'react'
import Translation from '@/app/(Level1)/(innerLayout)/_comp/Translation_Trans/Translation';

export default async function page({params}:{params:{collection_id: string}}) {
  const ID = parseInt(params?.collection_id?.split("_")[0]);
  let url = `https://api.themoviedb.org/3/collection/`;
  const collection_translations = await getCollectionTranslations(url, ID);
  
  return (
    <Translation type='movie_serie' TRANSLATE={collection_translations?.translations} />
  )
}
