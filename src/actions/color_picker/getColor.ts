import { tmdb_image_url2, tmdb_image_url } from "@/app/(Level1)/(innerLayout)/_comp/someExports";
// import { extractColors } from "extract-colors"

// utils/colorExtractor.js
const Vibrant = require('node-vibrant');
const axios = require('axios');
const extractColors = require('extract-colors');

// Function to extract colors from an image URL
export async function extractColorsFromImageUrl(url:string, id:number, headerOpt: boolean) {
  try {

    let reasoned = await axios.get(
      url + id + `${headerOpt ? "" : "/full"}`,
      { ...(headerOpt &&
        {headers: {Accept: "application/json", Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`}})
      }
    )
    let picture_data = await reasoned.data;
    let image_path = headerOpt ? tmdb_image_url + picture_data?.backdrop_path : picture_data?.data?.
    images?.jpg?.image_url;
    
    const response = await axios.get(image_path, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const palette = await Vibrant.from(buffer).getPalette(); 

    return {
      Vibrant: palette.Vibrant.getHex(),
      DarkVibrant: palette.DarkVibrant.getHex(),
      LightVibrant: palette.LightVibrant.getHex(),
      Muted: palette.Muted.getHex(),
      DarkMuted: palette.DarkMuted.getHex(),
      LightMuted: palette.LightMuted.getHex(),
    };
  } catch (error) {

    return null;
  }
}

