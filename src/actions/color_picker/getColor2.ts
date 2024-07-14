import { tmdb_image_url2, tmdb_image_url } from "@/app/(Level1)/(innerLayout)/_comp/someExports";
// import { extractColors } from "extract-colors"

// utils/colorExtractor.js
const Vibrant = require('node-vibrant');
const axios = require('axios');
const extractColors = require('extract-colors');

// Function to extract colors from an image URL
export async function extractColorsFromImageUrl2(url:string) {
  try { 
    const response = await axios.get(url, { responseType: 'arraybuffer' });
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

