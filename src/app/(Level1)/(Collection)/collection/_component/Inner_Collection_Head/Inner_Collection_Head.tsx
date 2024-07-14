"use client"
import React from 'react';
import styls from "./inner_collection.module.css"
import Image01 from '@/components/ImageComponents/Image01';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';
import { DataContext } from '@/app/(Level1)/(innerLayout)/_comp/Data_Provider/DataProvider';
import { useContext } from 'react';

export default function Inner_Collection_Head({DATA, ID}:{DATA:any, ID:string}) {

    const FTC = useContext(DataContext);


  return (
    <div style={{background: `${FTC?.DarkVibrant}`}} className={styls.inner_collection_head}>
        <div className={styls.inner_collect_hero}>
            <Image01 path1={tmdb_image_url + DATA?.backdrop_path} path2={tmdb_image_url + DATA?.poster_path} name='' />
        </div>
        <div className={styls.inner_collect_infoz}>
            <div className={styls.inner_collect_name}>{DATA?.name}</div>
            <div className={styls.inner_collect_back}>
                <Link href={`/collection/${ID}`}>
                    <span><FaArrowLeft /></span>
                    <span>Back to main</span>
                </Link>
                
            </div>
        </div>
    </div>
  )
}
