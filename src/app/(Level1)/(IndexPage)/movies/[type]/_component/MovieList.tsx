"use client"
import React, { useEffect } from 'react'
import MovieData from './MovieData';
import { getMovies } from '@/actions/getMovies';
import { useState, useRef } from 'react';
import type { Movie } from '../page';
import { useInView } from "react-intersection-observer"
import LoadingSpinner from '../../../_comp/loading_spinner/loading';
import styles from "../movieList.module.css"


interface Props{
    params: {
        url: string,
        parameter?: {[key:string]: string | undefined | string[]} | undefined,
        firstFetch: Movie[],
        startPage: number
    }
}

export default  function MovieList(params: Props) {
    const [currentPage, setPage] = useState(params?.params?.startPage);
    let maxPage;
    const [movies, setMovies] = useState<Movie[]>(params?.params.firstFetch)
    const currentUrl = params?.params?.url;
    let parameters = params?.params?.parameter;
    let moviesMapped = movies?.map((item: Movie, index: number) => <MovieData key={index} {...item} />);
    const [scrollTrigger, isInView] = useInView();
    let trusy = useRef(false);
    const [loading, setLoading] = useState(false)
    
    async function loadMoreMovies(pageNum: number){
        setLoading(true)
        await new Promise((resolve, reject) => setTimeout(resolve, 5000))
        const resp = await getMovies(currentUrl, parameters, pageNum);
        maxPage = resp?.total_pages;
        setMovies((oldMovies) => [...oldMovies, ...resp?.results]);
        setPage((old) => old+1);
        trusy.current = true;
        setLoading(false)
    }

    const handleMore = () => {
        let page_num = currentPage + 1;
        loadMoreMovies(page_num);
    }

    useEffect(() => {

        if(trusy.current && isInView){
            handleMore()
        }else{
            return
        }
        
    }, [isInView, handleMore])
  
  return (
    <>
        <div className={styles.moviesListed}>
            {moviesMapped}
            <div ref={scrollTrigger} className={styles.triggerTaker}></div>
        </div>
        {loading == false 
        ? {...currentPage != maxPage && <button onClick={() => handleMore()} className={styles.loadMore}>Load More</button>}
        : <LoadingSpinner />
        }
    </>
  )
}
