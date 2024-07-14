import React from 'react'
import Image01 from '@/components/ImageComponents/Image01'
import stylesPoster from "./media_index.module.css"

export default function Posters({url}:{url:string}) {
  return (
    <div className={stylesPoster.frame_cont}>
      <Image01 path1={url} path2='' name='' />
    </div>
  )
}
