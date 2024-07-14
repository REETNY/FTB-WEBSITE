"use client"
import React from 'react'
import MoviesFilter from './MovieFilter';
import { usePathname } from 'next/navigation';
import TvSeriesFilter from './TvSeriesFilter';
import AnimeFilter from './AnimeFilter';
import MangaFilter from './MangaFilter';

export default function SearchFilter() {

  const pathname = usePathname().toString();
  const index = 
    pathname.includes("movies")
    ? 0
    : pathname.includes("tv_series")
    ? 1
    : pathname.includes("anime")
    ? 2
    : pathname.includes("manga")
    ? 3
  : null

  if(index == 0){
    return <MoviesFilter />
  }else if(index == 1){
    return <TvSeriesFilter />
  }else if(index == 2){
    return <AnimeFilter />
  }else if(index == 3){
    return <MangaFilter />
  }
 
    
}
