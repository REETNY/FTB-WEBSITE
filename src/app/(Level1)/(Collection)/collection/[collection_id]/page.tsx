import { getCollectionDetails } from '@/actions/collection/getCollectionDetails';
import React from 'react'
import styles from "./main_page.module.css"
import Introduction from '../_component/Introduction/Introduction';
import { extractColorsFromImageUrl2 } from '@/actions/color_picker/getColor2';
import Featured_Cast from '../_component/Featured_Cast/Featured_Cast';
import Collective_Movies from '../_component/Collectetive_Movies/Collective_Movies';
import { getMovieCastById } from '@/actions/level2/movie/getMovieCastById';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';


export default async function CollectionPage({params}:{params:{collection_id:string}}) {

  const ID = parseInt(params?.collection_id?.split("_")[0]);
  let url = `https://api.themoviedb.org/3/collection/`;
  let url2 = `https://api.themoviedb.org/3/movie/`;
  const collection_details = await getCollectionDetails(url, ID);
  const clr_res = await extractColorsFromImageUrl2(tmdb_image_url + collection_details?.backdrop_path);
  const moives_id = await collection_details?.parts?.map((item:any) => item?.id);
  let DATAS2 : {
    casts: {}[],
    crews: {}[]
  } = {
    casts: [],
    crews: []
  };
  const clrs = await getMovieCastById(url2, moives_id[0]);

  DATAS2?.casts.push(...clrs?.cast);
  DATAS2?.crews.push(...clrs?.crew);

  
  console.log(clrs);
  

  return (
    <section className={styles.data_full_container}>

      <Introduction MOVIE={collection_details} FTC={clr_res}  />

      <div className={styles.data_other_cont}>
        <Featured_Cast DATAS={DATAS2} />
        <Featured_Cast DATAS={DATAS2} Text='Crews' />
        <Collective_Movies DATAS={collection_details?.parts} />
      </div>
      

    </section>
  )
}
