import QueryButton from "./_comp/buttons/QueryButton";
import SearchFilter from "./_comp/SearchFilter";
import styls from "./SearchLayout.module.css"
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styls.SearchContainer}>
      <Suspense fallback={"loading"}>
        <SearchFilter />
      </Suspense>
      {children}
      <QueryButton />
    </div>
  );
}
