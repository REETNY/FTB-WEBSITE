"use client"
import React from 'react'
import { RootState } from '@/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation';
import { queryBtn } from '@/store/Slices/QuerySlice';
import { usePathname } from 'next/navigation';
import styles from "./query_style.module.css"

const dateFormater = (date: Date) => {
    let datex = date;
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth()+1}`;
    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let formatedDate = `${year}-${month}-${day}`
    return formatedDate
}

interface params {
  sort?: string | undefined | null,
  with_genres?: string[] | number[],
  user_score?: {
      min?: number,
      max?: number
  },
  user_votes?: number,
  runtime?: {
    min: number,
    max: number
  },
  available?: string[] | number[],
  provider?: string[] | number[],
  release_date?: {
    from?: string,
    to?: string
  },
  air_date?: {
      from?: string,
      to?: string
  },
  first_air_date?: {
      from?: string,
      to?: string
  },
  release_types?: string[] | number[],
  certification?: string,
  keyword?: string,
  show_me?: string,
  type?: string,
  limit?: string | number,
  sfw?: string,
  rating?: string,
  status?: string,
  letter?:string
}

export default function QueryButton() {
  const {params , isBtnActive, isInView} = useSelector((state: RootState) => state.querySlice);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const country_code = useSelector((state: RootState) => state.userSlice.country);
  const router = useRouter();
  const pathname = usePathname();

  function pushQuery(pathname:string, query:string){
    router.push(`${pathname}${query}`, {scroll: true});
  }
    
  const submitQuery = () => {
    // get all the current query parameters
    const current = new URLSearchParams(Array.from(searchParams.entries()));
      
    // sort
    if(params?.sort != null && params?.sort != "Choose Sorting?" && params.sort != undefined){
      current.set("sort", params.sort)
    }else{
      current.delete("sort")
    }

    // genres
    if(params.with_genres && params?.with_genres.length > 0){

      let strigified = ``;
      params?.with_genres.map((item, index) => {
        if(params.with_genres && index != params?.with_genres.length - 1){
          strigified = strigified + item.toString() + ","
        }else{
          strigified = strigified + item.toString()
        }
      })
      current.set("with_genres", strigified)
    }else if(params?.with_genres && params?.with_genres.length == 0){
      current.delete("with_genres")
    }
  
    // user score
    if(params?.user_score?.min && params?.user_score.min == 0){
      current.delete("vote_average.gte")
    }else if(params?.user_score?.min && params?.user_score.min != 0){
      current.set("vote_average.gte", (params?.user_score?.min / 10).toString())
    }
    if( params.user_score?.max && (params.user_score.max == 100 || params.user_score.max == 0)){
      current.delete("vote_average.lte")
    }else if(params.user_score?.max && (params.user_score.max != 100 || params.user_score.max > 0)){
      current.set("vote_average.lte", (params?.user_score.max / 10).toString())
    }

    // user votes
    if(params?.user_votes == 0){
      current.delete("vote_count.gte");
    }else if(params?.user_votes && params.user_votes != 0){
      current.set("vote_count.gte", (params?.user_votes * 5).toString())
    }

    // runtime
    if(params?.runtime?.min && params?.runtime.min == 0){
      current.delete("with_runtime.gte");
    }else if(params?.runtime?.min && params?.runtime.min != 0){
      current.set("with_runtime.gte", (params?.runtime.min * 4).toString());
    }
    if(params?.runtime?.max && params?.runtime.max != 0){
      current.set("with_runtime.lte", (params?.runtime.max * 4).toString());
    }
    
    // availabilities
    if(params?.available && params?.available.length == 0){
      current.delete("with_watch_monetization_types");

      // incase we have with_watch_providers which uses watch_region
      if(!current.get("with_watch_providers")){
        current.delete("watch_region");
      }
    }else if(params.available){
      let stringified = ``;
      params?.available.map((item, index) => {
        if(params?.available && index == params?.available.length - 1){
          stringified = stringified + item.toString()
        }else{
          stringified = stringified + item.toString() + ","
        }
      })
      current.set("with_watch_monetization_types", stringified);
      current.set("watch_region", country_code)
    }
  
    // watch provider
    if(params?.provider && params.provider.length == 0){
      current.delete("with_watch_providers");
      // incase we have with_watch_providers which uses watch_region
      if(!current.get("with_watch_monetization_types")){
        current.delete("watch_region");
      }
    }else if(params?.provider){
      let stringified = '';
      params.provider.map((item, index) => {
        if(params?.provider && index == params?.provider.length - 1){
          stringified = stringified + item.toString()
        }else{
          stringified = stringified + item.toString() + ","
        }
      })
      current.set("with_watch_providers", stringified)
      current.set("watch_region", country_code)
    }

    // release date
    if(params?.release_date?.from && params?.release_date?.from != dateFormater(new Date())){
      current.set("release_date.gte", params?.release_date.from.toString())
    }else{
      current.delete("release_date.gte")
    }
    if(params?.release_date?.to && params?.release_date?.to != dateFormater(new Date())){
      current.set("release_date.lte", params?.release_date?.to.toString())
    }else{
      current.delete("release_date.lte")
    }

    // air date
    if(params?.air_date && params?.air_date.from && params?.air_date.from != dateFormater(new Date())){
      current.set("air_date.gte", params?.air_date.from.toString())
    }else{
      current.delete("air_date.gte")
    }
    if(params?.air_date && params?.air_date.to && params?.air_date.to != dateFormater(new Date())){
      current.set("air_date.lte", params?.air_date.to.toString())
    }else{
      current.delete("air_date.lte")
    }
    // first air date
    if(params?.first_air_date && params?.first_air_date.from && params?.first_air_date.from != dateFormater(new Date()) && params?.first_air_date.from != ""){
        current.set("first_air_date.gte", params?.first_air_date.from.toString())
    }else{
        current.delete("first_air_date.gte")
    }
    if(params?.first_air_date && params?.first_air_date.to && params?.first_air_date.to != dateFormater(new Date()) && params?.first_air_date.to != ""){
        current.set("first_air_date.lte", params?.first_air_date.to.toString())
    }else{
        current.delete("first_air_date.lte")
    }


    // releases types
    if(params?.release_types && params?.release_types?.length > 0){
      let strigified = '';
      params?.release_types?.map((item, index) => {
        if(params?.release_types && index == params?.release_types?.length - 1){
          strigified = strigified + item.toString()
        }else{
          strigified = strigified + item.toString() + ","
        }
      })
      current.set("with_release_type", strigified)
    }else{
      current.delete("with_release_type")
    }
  
    // certificate
    if(params?.certification && params?.certification != "Choose Certificate"){
      current.set("certificate", params.certification)
    }else{
      current.delete("certificate")
    }
  
    // keyword
    if(params?.keyword && params?.keyword.length > 0){
      current.set("with_keywords", params?.keyword)
    }else{
      current.delete("with_keywords")
    }
  
    // show me
    if(params?.show_me && params?.show_me != "all"){
      current.set("show_data", params?.show_me)
    }else{
      current.delete("show_data")
    }

    // rating 
    if(params?.rating != "Choose Rating?" && params?.rating != null && params?.rating != ""){
      current.set("rating", params.rating)
    }else{
      current.delete("rating")
    }

    // status 
    if(params?.status != "Choose Status?" && params?.status != null && params?.status != ""){
      current.set("status", params.status)
    }else{
      current.delete("status")
    }

    // type
    if(params?.type != "Choose Type?" && params?.type != null && params?.type != ""){
      console.log(params.type);
      
      current.set("type", params.type)
    }else{
      current.delete("type")
    }

    // limit
    if(params?.limit && params?.limit > 0 && params?.limit != 25){
      current.set("limit", params?.limit.toString())
    }else{
      current.delete("limit")
    }

    // sfw
    if(params?.sfw == "false" || params?.sfw == false || params.sfw == null || params.sfw == undefined){
      current.set("sfw", "false")
    }else{
      current.set("sfw", "true")
    }
    
      // letter
      if(params?.letter != "" && params?.letter != null){
        current.set("letter", params.letter)
      }else{
        current.delete("letter")
      }
  
    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";
  
    pushQuery(pathname, query)
  
    // set the btn back to stale
    dispatch(queryBtn(false))
    
  }

  return (
   <button className={(isBtnActive && !isInView) ? `${styles.queryBtn} ${styles.isBtn}`: styles.queryBtn} onClick={() => submitQuery()}>Search</button>
  )
}
