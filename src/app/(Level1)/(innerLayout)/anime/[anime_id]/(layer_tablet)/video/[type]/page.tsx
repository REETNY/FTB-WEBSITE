import React from 'react'
import Videos from '@/app/(Level1)/(innerLayout)/_comp/Videos/Videos';
import { getVideosById } from '@/actions/level1/getVideosById';


export default async function page({params}:{params:{anime_id:string}}) {


    let ID = parseInt(params?.anime_id?.split("_")[0]);
    let url = `https://api.jikan.moe/v4/anime/`;
    let type = "anime";

    let get_trailers = await getVideosById(url, type, ID);
    let res = await get_trailers?.data;
    
    let formatted_data = []

    if(res?.promo && res?.promo.length > 0){
        res?.promo?.map((item:any) => {
            if(item?.trailer?.youtube_id == null)return;
            let data = {type: "Promo", key: item?.trailer?.youtube_id, official: false, name: item?.title, published_at: "", site: "YouTube"}
            formatted_data.push(data)
        })
    }else if(res?.promo?.length == 0){
        formatted_data.push({
            type: "Promo",
            site: "Nothing In Here"
        })
    }
    
    if(res?.music_videos && res?.music_videos.length > 0){
        res?.music_videos?.map((item:any) => {
            if(item?.video?.youtube_id == null)return;
            let data = {
                type: "Music Videos", 
                key: item?.video?.youtube_id,
                official: false,
                name: item?.meta?.title,
                published_at: "",
                site: "YouTube"
            }
            formatted_data.push(data)
        })
    }else if(res?.music_videos?.length == 0){
        formatted_data.push({
            type: "Music Videos",
            site: "Nothing In Here"
        })
    }

    if(res?.episodes && res?.episodes.length > 0){
        res?.episodes?.map((item:any) => {
            if(item?.title == null)return
            let data = {
                type: "Episodes", 
                name: item?.title,
                site: "YouTube",
                episode: item?.episode,
                image: item?.images?.jpg?.image_url || "/images/Error_Image.jpg",
                id: item?.mal_id
            }
            formatted_data?.push(data)
        })
    }else if(res?.episodes.length == 0){
        formatted_data.push({
            type: "Episodes",
            site: "Nothing In Here"
        })
    }

  return (
    <Videos VIDEO={formatted_data} type='anime_manga' id={type+"/"+params?.anime_id} />
  )
}
