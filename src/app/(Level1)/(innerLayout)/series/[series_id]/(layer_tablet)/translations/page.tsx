import { getTranslateById } from '@/actions/level1/getTranslateById';
import Translation from '@/app/(Level1)/(innerLayout)/_comp/Translation_Trans/Translation'
import React from 'react'
import { SERIEPARAM } from '../layout';


export default async function page({params}:{params: SERIEPARAM}) {

    let url = `https://api.themoviedb.org/3/tv/`;
    let ID = parseInt(params?.series_id.split("_")[0]);
    let type = "movie";

    let translate = await getTranslateById(url, type, ID);
    let translate_data = translate?.translations;   
    
    console.log(translate_data);
    

  return (
    <Translation TRANSLATE={translate_data} type={"movie_serie"} />
  )
}
