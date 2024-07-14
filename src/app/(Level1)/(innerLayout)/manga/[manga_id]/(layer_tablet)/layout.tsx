import { Suspense } from "react";
import InnerStyles from "./layer_tablet.module.css"
import { extractColorsFromImageUrl } from "@/actions/color_picker/getColor";
import DataProvider from "../../../_comp/Data_Provider/DataProvider";
import InnerHead from "../../../_comp_inner/Layer_Head/InnerHead";
import { getDataById } from "@/actions/level2/anime/getDataById";


export default async function InnerLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: {manga_id:string}
  }) {
    
    const url = 'https://api.jikan.moe/v4/manga/';
    const ID = parseInt(params?.manga_id.split("_")[0])
    const full_details = await getDataById(url, ID);
    const FTC = await extractColorsFromImageUrl(url, ID, false);

    return (
      <section className={InnerStyles.options_container}>
        <Suspense fallback={"loading"}>
          <InnerHead 
            color={FTC?.DarkVibrant} 
            path1={full_details?.data?.images?.jpg?.image_url} 
            path2={full_details?.data?.images?.webp?.image_url} 
            name={full_details?.data?.title} date={full_details?.data?.published?.from} 
            link={params?.manga_id} 
          />
        </Suspense>
        <DataProvider store={FTC}>
            {children}
        </DataProvider>
      </section>
    );
  }