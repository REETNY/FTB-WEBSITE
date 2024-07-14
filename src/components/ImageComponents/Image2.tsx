"use client"
import React from 'react';
import { useState } from 'react';
const constant_url = `https://image.tmdb.org/t/p/w500`;

export default function Image2(
    {path1, path2, genderCode, name}: 
    {path1: string, path2: string, genderCode: number, name: string}
){
    const [isError, setError] = useState(
        (path1 != null && path1 != "error")
        ? path1
        : (path2 != null && path2 != "error")
        ? path2
        : (genderCode == 1)
        ? `/images/Error_Woman.jpg`
        : `/images/Error_Man.jpg`
    );


    const imageStyls = {
        width: "100%",
        height: "100%"
    }

    let genderImg:string = 
    genderCode == 1 
    ? `/images/Error_Woman.jpg` :
    genderCode == 2
    ?  `/images/Error_Man.jpg`
    : "";

  return (
    <img 
        onError={(e) => {
            setError(genderImg)
        }}
        style={imageStyls}
        src={isError} 
        alt={name}
    />

    // <Image 
    //     priority={true} 
    //     src={isError} 
    //     alt='' 
    //     quality={90}
    //     fill={true}
    //     // onError={(e) => {
    //     //     setError(genderImg)
    //     // }}
    // />
  )
}
