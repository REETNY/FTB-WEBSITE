"use client";
import React from 'react'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // ADD THIS
  
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };

function hexToRgb(hex?:string) {
    // Remove the hash if it's included
    hex = hex?.replace('#', '');

    // Parse hexadecimal value to RGB
    var r = parseInt((hex || "#FFF").substring(0, 2), 16);
    var g = parseInt((hex || "#FFF").substring(2, 4), 16);
    var b = parseInt((hex || "#FFF").substring(4, 6), 16);

    // Return RGB values as an object
    return { r, g, b };
}

export default function LineChart({name, color, color2, datas}:{name?:string, color?:string, color2?:string, datas?:number[]}) {
    let rgb_bgColor = `rgba(${hexToRgb(color).r},${hexToRgb(color).g}, ${hexToRgb(color).b}, .3)`;
    let rgb_brColor = `rgba(${hexToRgb(color).r},${hexToRgb(color).g}, ${hexToRgb(color).b}, .9)`;
      // Selecting the input element and get its value
    const options = {
        responsive: true,
        title: {
        display: true,
        text: "Chart Title"
        },
        legend:{
            ...legend
        }
    };
    const data = {
        labels: ["", "", "", "", "", ""],
        datasets: [
          {
            label: name || "",
            data: datas,
            fill: true,
            backgroundColor: rgb_bgColor || "rgba(75,192,192,0.2)",
            borderColor: rgb_brColor || "rgba(75,192,192,1)"
          }
        ]
    };
    

  return (
    <div style={{position: "absolute", width: "100%", height: "100%"}}>
      <Line 
        data={data}
        height={"100%"}
        // width={"100%"}
        // title='My Chart'
        options={options}
      />  
    </div>
    
  )
}
