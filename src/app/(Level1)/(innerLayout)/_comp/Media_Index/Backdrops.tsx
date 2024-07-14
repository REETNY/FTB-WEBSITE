import React from 'react'
import Image01 from '@/components/ImageComponents/Image01'
import styleBackdrop from "./media_index.module.css"

export default function Backdrops({url}:{url:string}) {
  return (
    <div className={styleBackdrop.frame_cont}>
      <Image01 path1={url} path2='' name='' />
    </div>
  )
}
