"use client"
import React, { SyntheticEvent } from 'react'

export default function Image01({path1, path2, name}: {path1: string , path2: string, name: string}) {

  const imageStyls = {
    width: "100%",
    height: "100%",
  }

  return (
    <img 
      onError={(e) => 
        e.currentTarget.src = 
        (path2 == null || path2 == undefined || path2 == "")
        ? "/images/Error_Image.jpg"
        : path2
      }
      style={imageStyls}
      src={path1} 
      alt={name}
    />
  )
}
