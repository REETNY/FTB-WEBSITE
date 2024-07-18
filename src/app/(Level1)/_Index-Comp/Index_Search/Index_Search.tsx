"use client";
import React, { useRef } from 'react'
import styles from "./index_search.module.css"
import { useRouter } from 'next/navigation';

const images_bg = ['/images/SB1.jpg', '/images/SB2.jpg', '/images/SB3.jpg', '/images/SB4.jpg', "/images/Main_BG.jpg"];

export default function Index_Search() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null)
  const randomNumber = () => {
    return Math.floor(Math.random() * images_bg.length)
  }

  let image = images_bg[randomNumber()]

  const styled = {
    background: `linear-gradient(to right, rgba(3, 37, 65, .7) 0%, rgba(3, 37, 65, .7) 100% ),
      url(${image}) no-repeat center center/cover`
  }

  return (
    <div style={{...styled}} className={styles.index_page_search_container}>
      <div className={styles.text_box_container}>
        <span className={styles.welcome_message}>Welcome.</span>
        <span className={styles.intro_text}>
          Millions of Movies, TV shows, Animes, Mangas and people to discover. Explore now.
        </span>
      </div>
      <div className={styles.search_box_container}>
        <input ref={inputRef} type="text" className={styles.search_input_el} />
        <span onClick={() => router.push(`/search?query=${inputRef.current?.value}`)} className={styles.search_button}>Search</span>
      </div>
    </div>
  )
}
