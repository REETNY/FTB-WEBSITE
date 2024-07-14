import React from 'react'
import { getReviewById } from '@/actions/level1/getReviewById'
import Reviews from '@/app/(Level1)/(innerLayout)/_comp/Review/Reviews';

export default async function page({params}:{params:{series_id: string}}) {
    let ID = parseInt(params?.series_id?.split("_")[0]);
    let url = `https://api.themoviedb.org/3/tv/`
    let type = "serie";

    let rev_data = await getReviewById(url, type, ID);

    let first_review_data = rev_data?.results;

  return (
    <Reviews REVIEW={first_review_data} type={"movie_serie"} id={params?.series_id} />
  )
}
