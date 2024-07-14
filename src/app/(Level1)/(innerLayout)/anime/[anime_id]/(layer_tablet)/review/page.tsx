import React from 'react';
import { getReviewById } from '@/actions/level1/getReviewById';
import Reviews from '@/app/(Level1)/(innerLayout)/_comp/Review/Reviews';

export default async function page({params}:{params:{anime_id:string}}) {
    
    let ID = parseInt(params?.anime_id?.split("_")[0]);
    let url = `https://api.jikan.moe/v4/anime/`
    let type = "anime";

    let rev_data = await getReviewById(url, type, ID);

    let first_review_data = rev_data?.data || [];
    
  return (
    <Reviews REVIEW={first_review_data} type='anime_manga' id={params?.anime_id} />
  )
}
