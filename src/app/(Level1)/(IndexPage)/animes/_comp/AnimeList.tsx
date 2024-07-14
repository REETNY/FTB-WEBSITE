"use client"
import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import type { Anime } from '../page';
import { useInView } from "react-intersection-observer"
import LoadingSpinner from '../../_comp/loading_spinner/loading';
import AnimeData from './AnimeData';
import { getAnimes } from '@/actions/getAnimes';
import styles from "../animeList.module.css"

interface Props{
    params: {
        url: string,
        parameter?: {[key:string]: string  | undefined | string[]} | undefined,
        firstFetch: Anime[],
        startPage: number
    }
}

export default  function AnimeList(params: Props) {
    const [currentPage, setPage] = useState(params?.params?.startPage);
    let maxPage;
    const [movies, setMovies] = useState<Anime[]>(params?.params.firstFetch)
    const currentUrl = params?.params?.url;
    let parameters = params?.params?.parameter;
    let moviesMapped = movies?.map((item: Anime, index: number) => <AnimeData key={index} {...item} />);
    const [scrollTrigger, isInView] = useInView();
    let trusy = useRef(false);
    const [loading, setLoading] = useState(false)
    
    async function loadMoreMovies(pageNum: number){
        setLoading(true)
        await new Promise((resolve, reject) => setTimeout(resolve, 5000))
        const resp = await getAnimes(currentUrl, parameters, pageNum);
        console.log(resp);
        
        maxPage = resp?.pagination?.items?.total;
        setMovies((oldMovies) => [...oldMovies, ...resp?.data]);
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
