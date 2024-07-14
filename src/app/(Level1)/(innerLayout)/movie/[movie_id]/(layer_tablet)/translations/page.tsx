import { getTranslateById } from '@/actions/level1/getTranslateById';
import Translation from '@/app/(Level1)/(innerLayout)/_comp/Translation_Trans/Translation'
import React from 'react'

interface Params{
    movie_id: string
}

export default async function page({params}:{params: Params}) {

    let url = `https://api.themoviedb.org/3/movie/`;
    let ID = parseInt(params?.movie_id.split("_")[0]);
    let type = "movie";

    let translate = await getTranslateById(url, type, ID);
    let translate_data = translate?.translations;   

  return (
    <Translation TRANSLATE={translate_data} type={"movie_serie"} />
  )
}
