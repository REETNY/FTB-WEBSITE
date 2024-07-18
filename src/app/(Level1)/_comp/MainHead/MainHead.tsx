"use client"
import React, { useEffect, useState, useRef } from 'react'
import type { RootState } from '@/store/store'
import { useSelector, useDispatch } from 'react-redux'
import styls from "./MainHead.module.css"
import Link from 'next/link';
import { updateHamState, changeKey } from '@/store/Slices/HamSlice'
import { FaSearch } from 'react-icons/fa';
import { BiX } from "react-icons/bi"
import { useRouter } from 'next/navigation';
import Image01 from '@/components/ImageComponents/Image01';


export default function MainHead() {
  let inputRef = useRef<HTMLInputElement>(null);
  const [detz, setDetz] = useState(false);
  const {isHam, key: openedKey} = useSelector((state: RootState) => state.hamSlice.properties);
  const dispatch = useDispatch();
  const router = useRouter();

  // stops the page from scrolling when nav bar is open in small devices
  useEffect(() => {
    const htmlEl = document.getElementsByTagName("html")[0];
    if(isHam && htmlEl) {
      document.body.style.overflowY = "hidden"
      htmlEl.style.overflowY = "hidden"
    }else if(!isHam && htmlEl){
      document.body.style.overflowY = "auto"
      htmlEl.style.overflowY = "auto"
    }

  }, [isHam]);

  const navigate_search = () => {
    let value = inputRef?.current?.value;
    router.push(`search?query=${value}`)
  }

  const handleKey = (key: string) => {
    dispatch(changeKey({current_key: key}))
  }

  const checkKey = (key: string) => {
    return key == openedKey ? true : false
  }
  
    
  return (
    <div className={styls.overHead}>
      <div className={styls.mainHeadContainer} >

        {/* hidden hamBurger */}
        <div onClick={() => dispatch(updateHamState())} className={styls.hiddenHamBar}>
          <div className={isHam ? `${styls.hamLines} ${styls.active}` : styls.hamLines}></div>
          <div className={isHam ? `${styls.hamLines} ${styls.active}` : styls.hamLines}></div>
          <div className={isHam ? `${styls.hamLines} ${styls.active}` : styls.hamLines}></div>
        </div>

        {/* small device nav */}
        <div className={isHam ? `${styls.xsDevice} ${styls.active}` : styls.xsDevice}>
          <div className={styls.xsNavigations}>

            <div className={styls.navHeadInit}>
              <div onClick={() => handleKey("movies")} className={styls.headIniter}>Movies</div>
              <div className={checkKey("movies") ? `${styls.initerOptions} ${styls.active}` : styls.initerOptions}>
                <Link href={"/movies/popular"}>Popular</Link>
                <Link href={"/movies/now_playing"}>Now Playing</Link>
                <Link href={"/movies/top_rated"}>Top Rated</Link>
                <Link href={"/movies/upcoming"}>Upcoming</Link>
              </div>
            </div>

            <div className={styls.navHeadInit}>
              <div onClick={() => handleKey("tv_series")} className={styls.headIniter}>Tv Series</div>
              <div className={checkKey("tv_series") ? `${styls.initerOptions} ${styls.active}` : styls.initerOptions}>
                <Link href={"/tv_series/popular"}>Popular</Link>
                <Link href={"/tv_series/airing_today"}>Airing Today</Link>
                <Link href={"/tv_series/on_tv"}>On Tv</Link>
                <Link href={"/tv_series/top_rated"}>Top Rated</Link>
              </div>
            </div>

            <div className={styls.headIniter}>
              <Link className={styls.headIniter} href={"/mangas"}>Mangas</Link>
            </div>

            <div className={styls.headIniter}>
              <Link className={styls.headIniter} href={"/animes"}>Animes</Link>
            </div>

            <div className={styls.navHeadInit}>
              <div onClick={() => handleKey("people")} className={styls.headIniter}>People</div>
              <div className={checkKey("people") ? `${styls.initerOptions} ${styls.active}` : styls.initerOptions}>
                <Link href={""}>Popular People</Link>
              </div>
            </div>

          </div>
        </div>

        <div className={styls.leftHeadSide}>
          
          <div className={styls.logoSpan}>FDB</div>

          <div className={styls.headNavigator}>

            <div className={styls.navLinkHead}>
              <Link href={"/animes"}>Anime</Link>
            </div>

            <div className={styls.navLinkHead}>
              <Link href={"/mangas"}>Manga</Link>
            </div>

            <div className={styls.navLinkHead}>
              <div className={styls.navLinkInit}>Movies</div>
              <div className={styls.navLinkChild}>
                <span className={styls.linkChild}>
                  <Link href={"/movies/popular"}>Popular</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link href={"/movies/now_playing"}>Now Playing</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link href={"/movies/top_rated"}>Top Rated</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link href={"/movies/upcoming"}>Upcoming</Link>
                </span>
              </div>
            </div>

            <div className={styls.navLinkHead}>
              <div className={styls.navLinkInit}>Tv Series</div>
              <div className={styls.navLinkChild}>
                <span className={styls.linkChild}>
                  <Link href={"/tv_series/popular"}>Popular</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link href={"/tv_series/airing_today"}>Airing Today</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link href={"/tv_series/on_tv"}>On Tv</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link href={"/tv_series/top_rated"}>Top Rated</Link>
                </span>
              </div>
            </div>

            <div className={styls.navLinkHead}>
              <div className={styls.navLinkInit}>People</div>
              <div className={styls.navLinkChild}>
                <span className={styls.linkChild}>
                  <Link href={"/peoples/popular_people"}>Popular People</Link>
                </span>
              </div>
            </div>

          </div>

        </div>

        <div className={styls.rightHeadSide}>

          <div className={styls.users}>

            <div className={styls.userInfo}>
              <div className={styls.userHero}>
                <Image01 path1='' path2='' name='' />
              </div>
            </div>

            {/* div. */}

          </div>
          
          <div className={styls.clustered_search}>
            <div onClick={() => setDetz((bool) => !bool)} className={styls.clustered_search_init}><FaSearch /></div>
            <div className={detz ? `${styls.clustered_search_cont} ${styls.active}` : styls.       clustered_search_cont}
            >
              <input ref={inputRef} type='text' className={styls.searchBox} />
              <span onClick={navigate_search} className={styls.goToSearch}><FaSearch /></span>
              <span onClick={() => setDetz(false)} className={styls.cancelSearch}><BiX /></span>
            </div>
          </div>

        </div>

      </div>
    </div>
    
  )
}
