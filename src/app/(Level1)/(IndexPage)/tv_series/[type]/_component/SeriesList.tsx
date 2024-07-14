"use client"
import React, { useEffect } from 'react'
import SeriesData from './SeriesData';
import { getSeries } from '@/actions/getSeries';
import { useState, useRef } from 'react';
import type { Series } from './SeriesData';
import { useInView } from "react-intersection-observer"
import LoadingSpinner from '../../../_comp/loading_spinner/loading';
import styles from "../seriesList.module.css"

interface Props{
    params: {
        url: string,
        parameter?: {[key:string]: string | undefined | string[]} | undefined,
        firstFetch: Series[],
        startPage: number
    }
}

export default  function SerieList(params: Props) {
    const [currentPage, setPage] = useState(params?.params?.startPage);
    let maxPage;
    const [movies, setMovies] = useState<Series[]>(params?.params.firstFetch)
    const currentUrl = params?.params?.url;
    let parameters = params?.params?.parameter;
    let moviesMapped = movies?.map((item: Series, index: number) => <SeriesData key={index} {...item} />);
    const [scrollTrigger, isInView] = useInView();
    let trusy = useRef(false);
    const [loading, setLoading] = useState(false)
    
    async function loadMoreMovies(pageNum: number){
        setLoading(true)
        await new Promise((resolve, reject) => setTimeout(resolve, 5000))
        const resp = await getSeries(currentUrl, parameters, pageNum);
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
            console.log("fetched");
            
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
