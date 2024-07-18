import React, { Suspense } from "react";
import SearchNavigation from "../_Component/SearchNavigation/SearchNavigation";
import styls from "./template.module.css"

export default async function SeasonLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {

    return(
      <section className={styls.searchTemplate}>
        <Suspense fallback={<>...Loading</>}>
          <SearchNavigation />
        </Suspense>
        {children}
      </section>
      
    )
  }
