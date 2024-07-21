import React from 'react'
import stylePage from "./css_styling.module.css"
import { getMovieById } from '@/actions/level2/movie/getMovieById';
import Introduction from './_component/index/Introduction';
import { extractColorsFromImageUrl } from '@/actions/color_picker/getColor';
import { getMovieCastById } from '@/actions/level2/movie/getMovieCastById';
import { getMovieTrailerById } from '@/actions/level2/movie/getMovieTrailerById';
import { getMovieReview } from '@/actions/level2/movie/getMovieReview';
import { getMovieImages } from '@/actions/level2/movie/getMovieImages';
import { getMovieReccomend } from '@/actions/level2/movie/getMovieReccomendation';
import Cats_Index from '../../_comp/Cast_Index/Cats_Index';
import Social_Index from '../../_comp/Social_Index/Social_Index';
import Media_Index from '../../_comp/Media_Index/Media_Index';
import Recommend_Index from '../../_comp/Reccomend_Index/Recommend_Index';
import Collection from '../../_comp/Collection_Index/Collection';
import LineChart from '../../_comp/ChartJS/LineChart';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';
import { getCountryName } from '@/actions/country_mapper/country_mapper';
import { getLanguageName } from '@/actions/country_mapper/language_mapper';
import Image01 from '@/components/ImageComponents/Image01';
import { tmdb_image_url2 } from '../../_comp/someExports';
import UserSlider from '../../_comp/UserSlide/UserSlider';

interface SearchParams {
  params : {
    movie_id: string
  }
}

export interface MovieID{
  adult: false,
  backdrop_path: '/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg',
  belongs_to_collection: {
    id: 1022790,
    name: 'Inside Out Collection',
    poster_path: '/Apr19lGxP7gm6y2HQX0kqOXTtqC.jpg',
    backdrop_path: '/7U2m2dMSIfHx2gWXKq78Xj1weuH.jpg'
  },
  budget: 200000000,
  genres: { id: number, name: string }[],
  homepage: string,
  id: number,
  imdb_id: string,
  origin_country: string[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }[],
  production_countries: { iso_3166_1: string, name: string }[],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: { english_name: string, iso_639_1: string, name: string }[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export interface Cast {
  cast:{
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    credit_id: string,
    department: string,
    job: string
  }[],
  crew: {
    adult: false
    credit_id: string,
    department: string, 
    gender: number
    id: number,
    job: string,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number
    profile_path: string,
  }[]
}

export interface Crew{
  adult: false
  credit_id: string,
  department: string, 
  gender: number
  id: number,
  job: string,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number
  profile_path: string
}

export interface Trailer{
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: true,
  published_at: string,
  id: string
}[]

function getRuntime(val:number){
  let milli = val * 60 * 1000;
  let hour = Math.floor(milli / 1000 / 60 / 60) % 60;
  let min = Math.floor(milli / 1000 / 60) % 60;
  let sec = Math.floor(milli / 1000) % 60;
  return `${hour}h ${min}m ${sec}s`
}

export default async function page({params}: SearchParams) {

  let ID = parseInt(params.movie_id.split("_")[0])
  let url = `https://api.themoviedb.org/3/movie/`;

  const movieData = await getMovieById(url, ID);
  let clr_res = await extractColorsFromImageUrl(url, ID, true);
  let cas_res = await getMovieCastById(url, ID);
  let trl_res = await getMovieTrailerById(url, ID);
  let rev_res = await getMovieReview(url, ID);
  let img_res = await getMovieImages(url, ID);
  let rec_res = await getMovieReccomend(url, ID);

  let origin_countries = movieData?.origin_country?.map((item:string) => {
    return getCountryName(item.toLowerCase())
  });

  const type = "Movie";
  let revenue = movieData?.revenue;
  let offLink = movieData?.homepage;
  let original_language = getLanguageName(movieData?.original_language);

  // original country
  let ori_coun = "";
  origin_countries?.map((item:string,index:number) => {
    if(index == origin_countries?.length - 1){
      ori_coun += item
    }else{
      ori_coun += item+", "
    }
  })

  let budget = movieData?.budget;
  let keywords = 'No Keywords!';
  let status = movieData?.status;
  const isAdult: boolean = movieData?.adult;
  const title = movieData?.title || movieData?.name;

  // genres
  let genres = '';
  movieData?.genres?.map((item:any,index:number) => {
    let indx = movieData?.genres?.length - 1;
    if(index == indx){
      genres += item?.name
    }else{
      genres += item?.name+', '
    }
  })

  const isCollection = movieData?.belongs_to_collection;

  let production_companies = movieData?.production_companies?.map((item:any,index:number) => {
    return(
      <span key={"A"+index} className={stylePage.companies_pic}>
        <div className={stylePage.companies_logo}>
          <Image01 path1={tmdb_image_url2 + item?.logo_path} path2='' name='' />
        </div>
        <div className={stylePage.companies_name}>{item.name}</div>
      </span>
    )
  });

  // production country
  let production_country = "";
  movieData?.production_countries?.map((item:any, index:number) => {
    let lengths = movieData?.production_countries.length - 1;
    if(lengths == index){
      production_country += item.name;
    }else{
      production_country += item.name+", "
    }
  })

  // spoken language
  let spoken_languages = "";
  movieData?.spoken_languages?.map((item:any, index:number) => {
    let msp = movieData?.spoken_languages?.length - 1;
    if(msp == index){
      spoken_languages += item.name
    }else{
      spoken_languages += item.name + `, `
    }
  });

  let runtime = getRuntime(movieData?.runtime)

  console.log(movieData);
  

  // part of collection
  const collections = await movieData;

  return (
    <section className={stylePage.data_full_container}>

      <Introduction FTC={clr_res} MOVIE={movieData} CAST={cas_res} SCENE={trl_res?.results} />

      <div className={stylePage.data_details}>

        <div className={stylePage.left_col_details}>
          <Cats_Index Characters={cas_res?.cast} id={params.movie_id} />
          <Social_Index Reviews={rev_res} />
          <Media_Index SCENE={trl_res?.results} THUMBS={img_res} />
          {collections?.belongs_to_collection?.id && <Collection PARAM_PATH={params?.movie_id} FTC={clr_res} COLLECT={collections} />}
          <Recommend_Index RECOM={rec_res} type={"ms"} />
        </div>

        <div className={stylePage.right_col_details}>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>
              <Link href={offLink}><FaLink /></Link>
            </div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Status</div>
            <div className={stylePage.station_info}>{status}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Original Language</div>
            <div className={stylePage.station_info}>{original_language}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Budget</div>
            <div className={stylePage.station_info}>{budget}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Runtime</div>
            <div className={stylePage.station_info}>{runtime}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Production Companies</div>
            <div className={stylePage.station_companies}>{production_companies}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Production Country</div>
            <div className={stylePage.station_info}>{production_country}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Spoken Language</div>
            <div className={stylePage.station_info}>{spoken_languages}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Revenue</div>
            <div className={stylePage.station_info}>{revenue}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Type</div>
            <div className={stylePage.station_info}>{type}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Keywords</div>
            <div className={stylePage.station_info_list}>{keywords}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Adult</div>
            <div className={stylePage.station_info_list}>{isAdult.toString()}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Genres</div>
            <div className={stylePage.station_info_list}>{genres}</div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Popularity Trend</div>
            <div className={stylePage.station_info_chart}>
              <LineChart name={title} color={clr_res?.DarkVibrant} color2={clr_res?.DarkMuted} datas={[0,30, 40, 50, 60]} />
            </div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Rated By You</div>
            <div className={stylePage.station_companies}>
              <UserSlider type='movies' id={ID} />
            </div>
          </div>

          <div className={stylePage.content_station}>
            <div className={stylePage.station_head}>Include Collection</div>
            <div className={stylePage.station_companies}>{isCollection ? "True" : "False"}</div>
          </div>
          
        </div>

      </div>

    </section>
  )
}
