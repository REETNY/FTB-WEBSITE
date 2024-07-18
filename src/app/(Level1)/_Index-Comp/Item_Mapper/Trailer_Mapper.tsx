import React from 'react'
import styls from "./item_mapper.module.css"
import Image01 from '@/components/ImageComponents/Image01'
import { FaPlay } from 'react-icons/fa'


export default function Trailer_Mapper({DATA, setKey, SETBG}:{DATA?:any, setKey: (id:string) => void, SETBG: (val:string) => void}) {
  let string = `https://img.youtube.com/vi/${DATA?.key}/sddefault.jpg`;
  return (
    <div className={styls.trailer_player_index}>
      <div onMouseEnter={() => SETBG(string)} onClick={() => setKey(DATA.key)} className={styls.eachTrailer_hero}>
        <div className={styls.treilerPlayBtn}><FaPlay /></div>
        <Image01 path1={`https://img.youtube.com/vi/${DATA?.key}/sddefault.jpg`} path2='' name='' />
      </div>
      <div className={styls.eachTrailer_info}>
          <div className={styls.trailer_name}>{DATA?.name || DATA?.title}</div>
          <div className={styls.trailer_info}>{''}</div>
      </div>
    </div>
  )
}
