import React from 'react';
import { getReviewById } from '@/actions/level1/getReviewById';
import Reviews from '@/app/(Level1)/(innerLayout)/_comp/Review/Reviews';

export default async function page({params}:{params:{manga_id:string}}) {
    
    let ID = parseInt(params?.manga_id?.split("_")[0]);
    let url = `https://api.jikan.moe/v4/manga/`
    let type = "manga";

    let rev_data = await getReviewById(url, type, ID);

    let first_review_data = rev_data?.data || [];
    
  return (
    <Reviews REVIEW={first_review_data} type='anime_manga' id={params?.manga_id} />
  )
}