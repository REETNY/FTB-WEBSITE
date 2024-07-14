"use client"
import React from 'react'

const constant_url = `https://image.tmdb.org/t/p/w500`

export default function Image1({path1, path2, name}: {path1: string, path2: string, name: string}) {

    const imageStyls = {
      width: "100%",
      height: "100%"
    }

  return (
    <img 
        onError={(e) => {
          e.currentTarget.src = (path2 == null || path2 == undefined) ? `/images/Error_Image.jpg` : `${constant_url}${path2}`
        }}
        style={imageStyls}
        src={path1?.includes("http") ? path1 : constant_url+path1} 
        alt={name}
    />
  )
}
