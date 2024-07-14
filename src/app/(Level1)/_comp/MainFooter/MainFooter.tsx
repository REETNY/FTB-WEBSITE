"use client";
import React from 'react'
import styls from "./main_footer.module.css"
import { FaCopyright } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ReactTyped } from "react-typed";


export default function MainFooter() {
  const {isHam, key: openedKey} = useSelector((state: RootState) => state.hamSlice.properties);
  let Build_Year = 2024;
  let date = new Date().getFullYear();

  return (
    <div className={isHam ? styls.foter_abso : styls.foter_main}>
      <div className={styls.about_me}>
        <span className={styls.about_career}>
          <ReactTyped
            startWhenVisible
            strings={[
              "My name is Ajide Shamsideen Olanrewaju",
              "I am a Frontend Web Developer",
            ]}
            typeSpeed={40}
            backSpeed={40}
          />
        </span>
      </div>
      <span className={styls.creation_year}><FaCopyright /> {Build_Year}-{date} by Ajides inc</span>
    </div>
  )
}
