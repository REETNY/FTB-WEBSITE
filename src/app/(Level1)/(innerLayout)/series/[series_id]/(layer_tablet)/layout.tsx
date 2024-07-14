import { Suspense } from "react";
import InnerStyles from "./layer_tablet.module.css"
import { getMovieById } from "@/actions/level2/movie/getMovieById";
import { extractColorsFromImageUrl } from "@/actions/color_picker/getColor";
import DataProvider from "../../../_comp/Data_Provider/DataProvider";
import InnerHead from "../../../_comp_inner/Layer_Head/InnerHead";
import { tmdb_image_url } from "../../../_comp/someExports";

export interface SERIEPARAM{
    series_id: string
}

export default async function InnerLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: {series_id:string}
  }) {
    
    const url = 'https://api.themoviedb.org/3/tv/';
    const ID = parseInt(params?.series_id.split("_")[0])
    const full_details = await getMovieById(url, ID);
    const FTC = await extractColorsFromImageUrl(url, ID, true);

    return (
      <section className={InnerStyles.options_container}>
        <Suspense fallback={"loading"}>
          <InnerHead color={FTC?.DarkVibrant} path1={tmdb_image_url + full_details?.backdrop_path} path2={tmdb_image_url + full_details?.poster_path} name={full_details?.name} date={full_details?.first_air_date} link={params?.series_id} />
        </Suspense>
        <DataProvider store={FTC}>
            {children}
        </DataProvider>
      </section>
    );
  }