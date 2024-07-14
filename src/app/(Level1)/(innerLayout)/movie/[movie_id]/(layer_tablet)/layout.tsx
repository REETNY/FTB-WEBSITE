import { Suspense } from "react";
import InnerStyles from "./layer_tablet.module.css"
import { getMovieById } from "@/actions/level2/movie/getMovieById";
import { extractColorsFromImageUrl } from "@/actions/color_picker/getColor";
import DataProvider from "../../../_comp/Data_Provider/DataProvider";
import InnerHead from "../../../_comp_inner/Layer_Head/InnerHead";
import { tmdb_image_url, tmdb_image_url2 } from "../../../_comp/someExports";

export default async function InnerLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: {movie_id:string}
  }) {
    
    const url = 'https://api.themoviedb.org/3/movie/';
    const ID = parseInt(params?.movie_id.split("_")[0])
    const full_details = await getMovieById(url, ID);
    const FTC = await extractColorsFromImageUrl(url, ID, true);

    return (
      <section className={InnerStyles.options_container}>
        <Suspense fallback={"loading"}>
          <InnerHead color={FTC?.DarkVibrant} path1={tmdb_image_url + full_details?.backdrop_path} path2={tmdb_image_url + full_details?.poster_path} name={full_details?.title} date={full_details?.release_date} link={params?.movie_id} />
        </Suspense>
        <DataProvider store={FTC}>
            {children}
        </DataProvider>
      </section>
    );
  }