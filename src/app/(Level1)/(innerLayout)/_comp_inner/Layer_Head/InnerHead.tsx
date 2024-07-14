"use client"
import React from 'react'
import styles from "./layer_head.module.css";
import Image01 from '@/components/ImageComponents/Image01';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';


export default function InnerHead({path1,path2,name,date, color, link}: {path1:string, path2:string, name:string, date:string, color:string, link:string}) {
  const path = usePathname();
  let currentType = (path.includes("movie"))
  ? "movie"
  : path.includes("serie")
  ? "series"
  : path.includes("manga")
  ? "manga"
  : "anime"

  let year = new Date(date).getFullYear()

  return (
   <div style={{background: `${color}`}} className={styles.inert_head}>

    <div className={styles.head_hero}>
      <Image01 path1={path1} path2={path2} name={name} />
    </div>

    <div className={styles.head_inzert}>
      <div className={styles.head_1}>
        <div className={styles.white_text}>{name}</div>
        <div className={styles.year_text}>({year})</div>
      </div>
      <div className={styles.head_2}>
        <Link href={`/${currentType}/${link}`} ><FaArrowLeft /> Back to main</Link>
      </div>
    </div>

   </div>
  )
}
