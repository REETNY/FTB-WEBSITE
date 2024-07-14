import React from 'react'
import { getReviewById } from '@/actions/level1/getReviewById'
import Reviews from '@/app/(Level1)/(innerLayout)/_comp/Review/Reviews';

export default async function page({params}:{params:{movie_id: string}}) {
    let ID = parseInt(params?.movie_id?.split("_")[0]);
    let url = `https://api.themoviedb.org/3/movie/`
    let type = "movie";

    let rev_data = await getReviewById(url, type, ID);

    let first_review_data = rev_data?.results;

  return (
    <Reviews REVIEW={first_review_data} type={"movie_serie"} id={params?.movie_id} />
  )
}
