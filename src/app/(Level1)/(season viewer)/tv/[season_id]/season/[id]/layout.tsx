import React, { Suspense } from 'react'
import styls from "./season_layout.module.css"
import Season_Header from '@/app/(Level1)/(season viewer)/_component/Season Header/Season_Header'
import { getSeasonDetailsById } from '@/actions/season/getSeasonDetails';
import { getMovieById } from '@/actions/level2/movie/getMovieById';
import { extractColorsFromImageUrl2 } from '@/actions/color_picker/getColor2';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';
import DataProvider from '@/app/(Level1)/(innerLayout)/_comp/Data_Provider/DataProvider';
import { getSeasonVideo } from '@/actions/season/getSeasonVideos';
import Loading from './loading';

export default async function SeasonLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: {season_id:string, id:string}
  }) {

    let SERIE_ID = parseInt(params?.season_id.split("_")[0]);
    let SEASON_ID = parseInt(params?.id);
    let url = `https://api.themoviedb.org/3/tv/`;
    let SERIE_NAME = await getMovieById(url, SERIE_ID);
    const season_details = await getSeasonDetailsById(url, SERIE_ID, SEASON_ID);
    const season_videos = await getSeasonVideo(url, SERIE_ID, SEASON_ID);
    let poster_path = await season_details?.poster_path;
    let FTC = await extractColorsFromImageUrl2(tmdb_image_url+poster_path);
    

    let nav_vid = season_videos?.results && season_videos?.results?.map((item:any) => item?.type);
    nav_vid = nav_vid?.reduce((accumulator: string[], currentVal:string) => {
      if(!accumulator.includes(currentVal)){
        accumulator.push(currentVal)
      }
      return accumulator
    }, []);

    console.log(nav_vid, "layout");

    return(
      <DataProvider store={FTC}>
        <section className={styls.season_layout}>
          <Suspense fallback={<Loading />}>
            <Season_Header NAV_VID={nav_vid} SI={SEASON_ID} DATA={season_details} SN={SERIE_NAME?.name || ""} />   
          </Suspense>
          {children}
        </section>
      </DataProvider>
      
    )
  }
