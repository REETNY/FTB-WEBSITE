import React from 'react'
import Image01 from '@/components/ImageComponents/Image01'
import { FaPlay } from 'react-icons/fa'
import styleVideos from "./media_index.module.css"

export default function Videos({url, SETKEY, trailerKey}: {url:string, SETKEY: (val:string) => void, trailerKey:string}) {
  return (
    <div className={styleVideos.iframe_play_cont}>
        <Image01 path1={url} path2='' name='' />
        <span onClick={() => SETKEY(trailerKey)} className={styleVideos.openVideo}><FaPlay /></span>
    </div>
  )
}

// `https://img.youtube.com/vi/${item.key}/maxresdefault.jpg`
