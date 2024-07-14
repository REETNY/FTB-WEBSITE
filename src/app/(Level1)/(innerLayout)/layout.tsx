import { Suspense } from "react";
import InnerHeader from "./_comp/InnerHeader";
import styleInner from "./innerLayout.module.css"

export default async function MovieLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {

    return (
      <section className={styleInner.InnerLayoutContainer}>
        <Suspense fallback={"loading"}>
          <InnerHeader />
        </Suspense>
        {children}
      </section>
    );
  }