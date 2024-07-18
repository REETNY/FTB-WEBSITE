import React from 'react'
import Index_Search from './_Index-Comp/Index_Search/Index_Search'
import Trending_Now from './_Index-Comp/Trending_Now/Trending_Now'
import Index_Popular from './_Index-Comp/Index_Popular/Index_Popular'
import Free_Watch from './_Index-Comp/Free_Watch/Free_Watch'
import Anime_Manga from './_Index-Comp/Anime_Manga/Anime_Manga'
import Index_Trailer from './_Index-Comp/Index_Trailer/Index_Trailer'

export default function page() {
  return (
    <div className="index_page_container">
      <Index_Search />
      <Trending_Now />
      <Index_Popular />
      <Index_Trailer />
      <Free_Watch />
      <Anime_Manga />
    </div>
  )
}
