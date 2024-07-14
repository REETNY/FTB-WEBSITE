"use client"
import React from 'react'
import styls from "./featured_cast.module.css"
import Image01 from '@/components/ImageComponents/Image01';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';
import Image2 from '@/components/ImageComponents/Image2';

export default function Featured_Cast({DATAS, Text}:{DATAS:any, Text?:string}) {
    
  const mamm = (Text ? DATAS?.crews : DATAS?.casts)?.map((item:any, index:number) => {
    return (
      <div key={index} className={styls.cast_meths}>
        <div className={styls.cast_hero}>
          <Image2 path1={tmdb_image_url+item?.profile_path} path2='' name='' genderCode={item?.gender + 1} />
        </div>
        <div className={styls.cast_det}>
          <div className={styls.cast_name}>{item.name}</div>
          <div className={styls.cast_roles}>{item?.character || item?.job}</div>
        </div>
      </div>
    )
  })
    
  return (
    <div className={styls.featured_cast}>
        <div className={styls.featured_cast_head}>Featured {Text ? Text : "Cast"}</div>
        <div className={styls.featured_casts_mapper}>

          {mamm.splice(0, 15)}

        </div>
    </div>
  )
}
