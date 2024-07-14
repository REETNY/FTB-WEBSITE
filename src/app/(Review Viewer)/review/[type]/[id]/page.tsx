import { getReviewById } from '@/actions/level1/getReviewById';
import React from 'react';
import { getMovieById } from '@/actions/level2/movie/getMovieById';
import { getDataById } from '@/actions/level2/anime/getDataById';
import { tmdb_image_url } from '@/app/(Level1)/(innerLayout)/_comp/someExports';
import styles from "./reviewer.module.css"
import Image01 from '@/components/ImageComponents/Image01';
import Link from 'next/link';


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
  

export default async function page({params}:{params:{type:string, id:string}}) {
    const type = params?.type;
    const data_id = parseInt(params?.id.split("_")[0]);
    let review_id = (params?.id.split("_")[1]);
    
    let url_defined = type == "anime"
    ? "https://api.jikan.moe/v4/anime/"
    : type == "manga"
    ? "https://api.jikan.moe/v4/manga/"
    : type == "movie"
    ? "https://api.themoviedb.org/3/movie/"
    : type == "serie"
    ? "https://api.themoviedb.org/3/tv/"
    : "";

    const getData = (type == "movie" || type == "serie")
    ? await getMovieById(url_defined, data_id)
    : await getDataById(url_defined, data_id);
    const get_review = await getReviewById(url_defined, type, data_id);

    let review_obj: {
        type: string,
        content_release: string,
        content: string,
        scored: number,
        users_image: string,
        users_name: string,
        title: string,
        image: string,
        release: string
    } = {
        type: "",
        content_release: "",
        content: "",
        scored: 0,
        users_image: "",
        users_name: "",
        title: "",
        image: "",
        release: ""
    };

    if(type == "anime" || type == "manga"){
        get_review?.data?.map((item:any) => {
            if(item.mal_id == review_id){
                review_obj = {
                    ...review_obj,
                    type: item?.type,
                    content_release: item?.date,
                    content: item?.review,
                    scored: item?.score,
                    users_image: item?.user?.images?.jpg?.image_url,
                    users_name: item?.user?.username
                }
            }else{
                return
            }
        })

        review_obj = {
            ...review_obj,
            title: getData?.data?.title,
            image: getData?.data?.images?.jpg?.image_url,
            release: getData?.data?.aired?.from || getData?.data?.published?.from
        }
    }else if(type == "movie" || type == "serie"){
        get_review?.results?.map((item:any) => {
            if(item?.id == review_id){
                review_obj = {
                    ...review_obj,
                    type: item?.type || type,
                    content_release: item?.created_at,
                    content: item?.content,
                    scored: item?.author_details?.rating,
                    users_image: tmdb_image_url + item?.author_details?.avatar_path,
                    users_name: item?.author
                }

            }
        })

        review_obj = {
            ...review_obj,
            title: getData?.title || getData?.name,
            image: tmdb_image_url + getData?.backdrop_path || tmdb_image_url + getData?.poster_path,
            release: getData?.release_date || getData?.first_air_date
        }
    }
    
    const yeared = (val:string) => {
        return new Date(val).getFullYear()
    }

    const formateDate = (val:string) => {
        let date = new Date(val);
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        return `${months[month]} ${day}, ${year}`
    }
    
    
  return (
    <div className={styles.reviewers_cont}>

        <div className={styles.reviewer_content_hero}>
            <div className={styles.heros_contet}>
                <Image01 path1={review_obj?.image} path2='' name='' />
            </div>
        </div>

        <div className={styles.reviewer_content}>

            <div className={styles.upper_part}>

                <div className={styles.reviewed_data_detz}>
                    <span className={styles.reviewed_name}>{review_obj?.title}</span>
                    <span className={styles.reviewed_relz}>({yeared(review_obj?.release)})</span>
                </div>

                <div className={styles.reviewers_information}>
                    <div className={styles.users_hero}>
                        <Image01 path1={review_obj?.users_image} path2='' name='' />
                    </div>
                    <div className={styles.rev_info_detz}>
                        written By <span className={styles.users_name}>{review_obj?.users_name}</span> on {formateDate(review_obj?.content_release)}
                    </div>
                </div>

                <div className={styles.reviwers_opinion}>
                    {review_obj?.content}
                </div>

            </div>

            <div className={styles.bottom_part}>
                <div className={styles.redirector}>
                    { type == "manga"
                        ? 
                        <p>
                            <Link href={"/mangas"}>Search Manga</Link>
                        </p>
                    : type == "anime"
                        ? 
                        <p>
                            <Link href={"/animes"}>Search Anime</Link>
                        </p>
                    : type == "movie"
                        ?
                        <p>
                            <Link href={"/movies/popular"}>Popular Movies</Link>
                            |
                            <Link href={"/movies/now_playing"}>Now Playing</Link>
                            |
                            <Link href={"/movies/top_rated"}>Top Rated</Link>
                            |
                            <Link href={"/movies/upcoming"}>Upcomnig</Link>
                        </p> 
                    : type == "serie"
                        ?
                        <p>
                            <Link href={"/tv_series/popular"}>Popular Series</Link>
                            |
                            <Link href={"/tv_series/on_tv"}>On Tv</Link>
                            |
                            <Link href={"/tv_series/top_rated"}>Top Rated</Link>
                            |
                            <Link href={"/tv_series/airing_today"}>Airing Today</Link>
                        </p> 
                    : ''

                    }
                </div>
                <div className={styles.dev_to_know}>
                    The thoughts and opinions expressed in these reviews are those solely of the user.
                </div>
            </div>    

        </div>
    </div>
  )
}
