import React from 'react'
import styleTrail from "./trailerPlay.module.css"

export default function TrailerPlay({PTB, PTBool, SOURCE}: {PTB: () => void, PTBool: boolean, SOURCE: string}) {
  return (
    <div onClick={PTB} className={PTBool ? `${styleTrail.trailer_container} ${styleTrail.playing}` : styleTrail.trailer_container}>
        <div className={styleTrail.player_container}>
          {PTBool ? <iframe 
          frameBorder={0} 
          src={`https://www.youtube.com/embed/${SOURCE}`} 
          title="YouTube video player"
          allowFullScreen
          allow="accelerometer"
          // clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
          /> : ""}
        </div>
      </div>
  )
}
