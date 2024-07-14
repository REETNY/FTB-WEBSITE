import React, { Suspense } from "react";
import styles from "./collection_layout.module.css"
import Collection_Header from "../_component/Collection_Header/Collection_Header";

export default function CollectionLayout({
    children,
    params // will be a page or nested layout
  }: {
    children: React.ReactNode,
    params: {collection_id: string}
  }) {
    
    return (
      <section className={styles.collection__layout}>
        <Suspense fallback={<>...Loading</>} >
          <Collection_Header DATA={[]} />
        </Suspense>
   
        {children}
      </section>
    )
  }