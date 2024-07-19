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
import { useSearchParams } from 'next/navigation'
import Image01 from '@/components/ImageComponents/Image01';
import { queryBtn } from '@/store/Slices/QuerySlice';
import { updateHamByBool } from '@/store/Slices/HamSlice'

export default function MainHead() {
  const searchParams = useSearchParams()
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

  const clearQuery = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("status")
    current.delete("type")
    current.delete("sfw");
    current.delete("letter")
    current.delete("sort")
    current.delete("with_genres")
    current.delete("vote_average.gte")
    current.delete("vote_average.lte")
    current.delete("limit")
    current.delete("release_date.gte")
    current.delete("release_date.lte")
    current.delete("with_keywords")
    current.delete("show_data")
    current.delete("vote_count.gte");
    current.delete("with_runtime.gte");
    current.delete("with_runtime.lte");
    current.delete("with_watch_monetization_types")
    current.delete("watch_region");
    current.delete("with_watch_providers");
    current.delete("certificate");
    current.delete("air_date.gte")
    current.delete("air_date.lte")
    current.delete("first_air_date.gte")
    current.delete("first_air_date.lte")
    current.delete("with_release_type")

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";

    // set the btn back to stale
    dispatch(queryBtn(false))
    dispatch(updateHamByBool(false))
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
                <Link onClick={clearQuery} href={"/movies/popular"}>Popular</Link>
                <Link onClick={clearQuery} href={"/movies/now_playing"}>Now Playing</Link>
                <Link onClick={clearQuery} href={"/movies/top_rated"}>Top Rated</Link>
                <Link onClick={clearQuery} href={"/movies/upcoming"}>Upcoming</Link>
              </div>
            </div>

            <div className={styls.navHeadInit}>
              <div onClick={() => handleKey("tv_series")} className={styls.headIniter}>Tv Series</div>
              <div className={checkKey("tv_series") ? `${styls.initerOptions} ${styls.active}` : styls.initerOptions}>
                <Link onClick={clearQuery} href={"/tv_series/popular"}>Popular</Link>
                <Link onClick={clearQuery} href={"/tv_series/airing_today"}>Airing Today</Link>
                <Link onClick={clearQuery} href={"/tv_series/on_tv"}>On Tv</Link>
                <Link onClick={clearQuery} href={"/tv_series/top_rated"}>Top Rated</Link>
              </div>
            </div>

            <div className={styls.headIniter}>
              <Link onClick={clearQuery} className={styls.headIniter} href={"/mangas"}>Mangas</Link>
            </div>

            <div className={styls.headIniter}>
              <Link onClick={clearQuery} className={styls.headIniter} href={"/animes"}>Animes</Link>
            </div>

            <div className={styls.navHeadInit}>
              <div onClick={() => handleKey("people")} className={styls.headIniter}>People</div>
              <div className={checkKey("people") ? `${styls.initerOptions} ${styls.active}` : styls.initerOptions}>
                <Link onClick={clearQuery} href={""}>Popular People</Link>
              </div>
            </div>

          </div>
        </div>

        <div className={styls.leftHeadSide}>
          
          <div className={styls.logoSpan}>FDB</div>

          <div className={styls.headNavigator}>

            <div className={styls.navLinkHead}>
              <Link onClick={clearQuery} href={"/animes"}>Anime</Link>
            </div>

            <div className={styls.navLinkHead}>
              <Link onClick={clearQuery} href={"/mangas"}>Manga</Link>
            </div>

            <div className={styls.navLinkHead}>
              <div className={styls.navLinkInit}>Movies</div>
              <div className={styls.navLinkChild}>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/movies/popular"}>Popular</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/movies/now_playing"}>Now Playing</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/movies/top_rated"}>Top Rated</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/movies/upcoming"}>Upcoming</Link>
                </span>
              </div>
            </div>

            <div className={styls.navLinkHead}>
              <div className={styls.navLinkInit}>Tv Series</div>
              <div className={styls.navLinkChild}>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/tv_series/popular"}>Popular</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/tv_series/airing_today"}>Airing Today</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/tv_series/on_tv"}>On Tv</Link>
                </span>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/tv_series/top_rated"}>Top Rated</Link>
                </span>
              </div>
            </div>

            <div className={styls.navLinkHead}>
              <div className={styls.navLinkInit}>People</div>
              <div className={styls.navLinkChild}>
                <span className={styls.linkChild}>
                  <Link onClick={clearQuery} href={"/peoples/popular_people"}>Popular People</Link>
                </span>
              </div>
            </div>

          </div>

        </div>

        <div className={styls.rightHeadSide}>

          <div className={styls.users}>

            <div className={styls.userInfo}>
              <div className={styls.userHero}>
                <Image01 path1='/images/Error_Image.jpg' path2='' name='' />
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
