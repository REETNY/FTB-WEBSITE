import React, { Suspense } from "react";
import styles from "./inner_layout.module.css"
import Inner_Collection_Head from "../../_component/Inner_Collection_Head/Inner_Collection_Head";
import { getCollectionDetails } from "@/actions/collection/getCollectionDetails";
import { extractColorsFromImageUrl2 } from "@/actions/color_picker/getColor2";
import { tmdb_image_url } from "@/app/(Level1)/(innerLayout)/_comp/someExports";
import DataProvider from "@/app/(Level1)/(innerLayout)/_comp/Data_Provider/DataProvider";

export default async function CollectionLayout({
    children,
    params // will be a page or nested layout
  }: {
    children: React.ReactNode,
    params: {collection_id: string}
  }) {
    
    let ID = parseInt(params?.collection_id?.split("_")[0]);
    let url = `https://api.themoviedb.org/3/collection/`;
    const collection_details = await getCollectionDetails(url, ID);
    let img_url = await tmdb_image_url + collection_details?.backdrop_path || tmdb_image_url + collection_details?.poster_path;
    let clr_res = await extractColorsFromImageUrl2(img_url);
    
    
    return (
      <DataProvider store={clr_res}>
        <section className={styles.inner_collection}>
            <Suspense fallback={<>...Loading</>} >
                <Inner_Collection_Head ID={params?.collection_id} DATA={collection_details} />
            </Suspense>
    
            {children}
        </section>
      </DataProvider>
    )
  }