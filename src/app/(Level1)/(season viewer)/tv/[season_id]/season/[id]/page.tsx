import React, { Suspense } from 'react'
import styles from "./main_index.module.css"
import { getMovieById } from '@/actions/level2/movie/getMovieById';
import { getSeasonDetailsById } from '@/actions/season/getSeasonDetails';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import Image01 from '@/components/ImageComponents/Image01';
import Episode_Mapper from '@/app/(Level1)/(season viewer)/_component/Episode_Mapper/Episode_Mapper';
import Loading from './loading';

export default async function page({params}:{params:{season_id:string, id:string}}) {

  let SERIE_ID = parseInt(params?.season_id.split("_")[0]);
  let SEASON_ID = parseInt(params?.id);
  let url = `https://api.themoviedb.org/3/tv/`;
  let SERIE = await getMovieById(url, SERIE_ID);
  const season_details = await getSeasonDetailsById(url, SERIE_ID, SEASON_ID);
  let num_season = SERIE?.seasons?.map((item:any) => item.season_number);

  const mapped_episode = season_details?.episodes?.map((item:any, index:number) => {
    return (
      <Episode_Mapper DATA={item} key={index} />
    )
  })

  return (
    <Suspense fallback={<Loading />}>
    <section className={styles.index_season_cont}>

      <div className={styles.top_navigation}>

        {num_season[0] != season_details?.season_number && <span className={styles.backBtn}>
          <Link 
            href={`/tv/${params?.season_id}/season/${parseInt(params?.id) - 1}`}
          >
            <FaArrowLeft /> {parseInt(params?.id) - 1 == 0 ? "Specials" : `Season ${parseInt(params?.id) - 1}`}
          </Link>
        </span>}

        {num_season[num_season.length - 1] != season_details?.season_number && <span className={styles.forwardBtn}>
          <Link 
            href={`/tv/${params?.season_id}/season/${parseInt(params?.id) + 1}`}
          >
            {parseInt(params?.id) + 1 == 0 ? "Specials" : `Season ${parseInt(params?.id) + 1}`} <FaArrowRight />
          </Link>
        </span>}

      </div>

      <div className={styles.index_seasoned_content}>

        <div className={styles.index_top}>
          <span className={styles.spaned_left}>Episodes {season_details?.episodes?.length}</span>
          <span className={styles.spaned_right}></span>
        </div>

        <div className={styles.index_content}>
          {mapped_episode}
        </div>

      </div>

    </section>
    </Suspense>
  )
}
