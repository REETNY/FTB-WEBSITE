"use client"
import React, { useEffect, useRef, useState } from 'react';
import styls from "./filter.module.css"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Select, Checkbox, CheckboxProps, Slider, SliderSingleProps, DatePicker, DatePickerProps, Tooltip, Input, InputProps, Radio, Switch } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { chooseCountry } from '@/store/Slices/UserSlice';
import { useInView } from 'react-intersection-observer';

import dayjs from 'dayjs';
import { isBtnInView, queryBtn, setQueriesParams } from '@/store/Slices/QuerySlice';

const dateFormater = (date: Date) => {
    let datex = date;
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth()+1}`;
    let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let formatedDate = `${year}-${month}-${day}`
    return formatedDate
}
  
const jikanHeader = {
 "accept": "application/json",
}
  
const fetcher = (url:string) => fetch(url, {headers:{...jikanHeader}}).then((res) => res.json());
  
const option = {
    revalidateOnMount: true,
    revalidateIfStale: true,
    refreshInvertal: 0,
}

export default function MangaFilter() {
    const {isBtnActive} = useSelector((state: RootState) => state.querySlice)
    const dispatch = useDispatch();
    const country_code = useSelector((state: RootState) => state.userSlice.country)
    const [scrollTrigger, isInView] = useInView();
    const router = useRouter();
    const searchParams = useSearchParams();
    const letterRef = useRef("")

    function pushQuery(pathname:string, query:string){
        router.push(`${pathname}${query}`, {scroll: true});
    }

    interface FilterProps {
        letter: string,
        sort: string,
        sfw: string,
        rating: string,
        status: string,
        with_genres: number[],
        user_score: {
          min: number,
          max: number
        },
        type: string,
        release_date: {
          from: string | Date,
          to: string 
        },
        keyword: string,
        show_me: string,
        limit: number,
    }

    const sort = searchParams.get("sort");

    // state manager for the filters before it gets to the browsers
    const [filters, setFilters] = useState<FilterProps>({
        letter: searchParams.get("letter") || '', //done
        sfw: (searchParams.get("sfw")) || "true", 
        limit: parseInt(searchParams.get("limit") || "25"), // done
        rating: searchParams.get("rating") || "Choose Rating?", // done
        status: searchParams.get("status") || "", //done
        sort: sort == null ? "Choose Sorting?" : sort, // done
        with_genres: searchParams.get("with_genres")?.split(",").map((item) => parseInt(item)) || [], // done
        user_score: {
        min: parseInt(searchParams.get("vote_average.gte") || "0"), 
        max: parseInt(searchParams.get("vote_average.lte") || "0")
        }, //done
        release_date: {
        from: searchParams.get("release_date.gte") || dateFormater(new Date()),
        to: searchParams.get("release_date.lte") || dateFormater(new Date())
        }, //done
        type: searchParams.get("type") || "Choose Type?", //done
        keyword: searchParams.get("with_keywords") || "", //done
        show_me: "all" // done
    })

     // fetch syntaxs

  // fetch anime genre syntax
  const { data: genre, error } = useSWR(
    `https://api.jikan.moe/v4/genres/manga`, 
    fetcher,
    option
  );
  // genre Els
  const genreData = genre?.data?.map((item: {mal_id: number, name: string}) => {
    return {value: item.mal_id, label: item.name}
  })
  const checkGenres = (val:number) => {
    const itExists = filters.with_genres.find((item) => item == val);
    return itExists ? true : false
  }
  const genreEls = genreData?.map((item: {value: number, label: string}, index: number) => {
    return(
      <div 
        onClick={() => handleGenres(item.value)} 
        key={index}
        className={checkGenres(item.value) ? `${styls.genreEl} ${styls.active}` : styls.genreEl}
      >
        {item.label}
      </div>
    )
  })

  // passing the queries to a redux
  useEffect(() => {
    if(!isBtnActive)return
    dispatch(setQueriesParams(filters))
  }, [isBtnActive, filters, dispatch])

  // help to check if btn is in browsers viewport
  useEffect(() => {
    dispatch(isBtnInView(isInView))
  }, [isInView, dispatch])

    // state for filters
    const [menu, setMenu] = useState({
      sort: false,
      others: false,
      letter: false,
      release_typs: searchParams.get("with_release_type") ? false : true,
      release_dates: false,
      show_me: false
    })
  
    // state for filtrations
    const [filtration, setFiltration] = useState({
      sortBy: searchParams.get("sort") || "",
      whereToWatch: searchParams.get("watch_region") || "",
      availabilities: searchParams.get("with_watch_monetization_types"),
      
    })
  
    // used to get pathname
    const pathname = usePathname();
  
    // function to change menu state
    const dissolve = (val:string, val2: boolean) => { 
      setMenu((obj) => ({...obj, [val]: val2}))
    }
  
    // classname changes for css
    const sortClass = clsx({
      [`${styls.menu} ${styls.opened}`]: menu.sort,
      [styls.menu]: !menu.sort
    })

    const letterClass = clsx({
      [`${styls.menu} ${styls.opened}`]: menu.letter,
      [styls.menu]: !menu.letter
    })
  
    const otherClass = clsx({
      [`${styls.menu} ${styls.liner} ${styls.opened}`]: menu.others,
      [`${styls.menu} ${styls.liner}`]: !menu.others
    })
    
    // handle select of sort //done
    const handleSort = (value:string) => {
        dispatch(queryBtn(true))
        if (value == null || value == undefined || value == "") {
          setFilters((obj) => ({...obj, sort: "Choose Sorting?"}));
        } else {
          setFilters((obj) => ({...obj, sort: value}))
        }
    
      }
  
      // handle select of status //done
      const handleStatus = (value:string) => {
        dispatch(queryBtn(true))
        if (value == null || value == undefined || value == "" || value == "Choose Status?") {
          setFilters((obj) => ({...obj, status: "Choose Status?"}));
        } else {
          setFilters((obj) => ({...obj, status: value}))
        }
    
      }
    
      // handleGenres //done
      function handleGenres(val:number){
        dispatch(queryBtn(true))
        let itExists = filters.with_genres.find((item) => item == val);
    
        if(itExists){
          const filtered = filters.with_genres.filter((item) => item != val ? item : false);
          setFilters((obj) => ({...obj, with_genres: filtered}))
        }else{
          setFilters((obj) => ({...obj, with_genres: [...filters.with_genres, val]}))
        }
    
      }
    
      // handle user score details //done
      const handleUserScore = (values: number[]) => {
        dispatch(queryBtn(true))
        setFilters((obj) => ({...obj, user_score: {min: values[0], max: values[1]}}));
    
      }
    
      // handle date picker //done
      const handleStartDate:  DatePickerProps['onChange'] = (date, dateString) => {
        dispatch(queryBtn(true))
        setFilters((obj) => ({...obj, release_date: {...filters.release_date, from: dateString.toString()}}))
      }
      const handleEndDate: DatePickerProps['onChange'] = (date, dateString) => {
        dispatch(queryBtn(true))
        setFilters((obj) => ({...obj, release_date: {...filters.release_date, to: dateString.toString()}}))
      }
    
      // handle keyword
      const handleKeyword: InputProps["onChange"] = (e) => {
        dispatch(queryBtn(true))
        setFilters((obj) => ({...obj, keyword: e.target.value}));
      }
    
      // handle show props
      const handleShowMe = (e: RadioChangeEvent) => {
        dispatch(queryBtn(true))
        setFilters((obj) => ({...obj, show_me: e.target.value}))
      }
  
      // handle limit
      const handleLimit: InputProps["onChange"] = (e) => {
        dispatch(queryBtn(true))
        setFilters((obj) => ({...obj, limit: parseInt(e.target.value || "0")}));
      }
  
      // handle type
      const handleType = (value:string) => {
        dispatch(queryBtn(true))
        if (value == null || value == undefined || value == "" || value == "Choose Type?") {
          setFilters((obj) => ({...obj, type: ""}));
        } else {
          setFilters((obj) => ({...obj, type: value}))
        }
    
      }
  
      // handle letter
      const handleLetter = (val:string) => {
        dispatch(queryBtn(true));
        if(val != null || val != ""){
          setFilters((obj) => ({...obj, letter: val}))
        }else{
          setFilters((obj) => ({...obj, letter: ""}))
        }
        letterRef.current = val
      }
  
      // handle SFW
      const handleSFW = (checked: boolean) => {
        dispatch(queryBtn(true));
        if(!checked){
          setFilters((obj) => ({...obj, sfw: "false"}))
        }else{
          setFilters((obj) => ({...obj, sfw: "true"}))
        }
      }
    
      //score
      const userScoreMarks: SliderSingleProps['marks'] = {
        0: '0',
        10: '.',
        20: '.',
        30: '.',
        40: '.',
        50: '5',
        60: '.',
        70: '.',
        80: '.',
        90: '.',
        100: "10"
      };
    
      
    // generate alphabets a to z
    let alpahbets = [...Array(26)].map((_, i) => String.fromCharCode(i + 97)); 
    const checkForLetter = (val:string) => {
      let letterParam = searchParams.get("letter");
      return letterParam == val
    }
    let mappedAlphabets = [...alpahbets, "cl"].map((item, index) => {
      if(item == "cl"){
        return <div className={styls.letter} key={index} onClick={() => handleLetter("")}>{item}</div>
      }else{
        return <div key={index} className={
          (checkForLetter(item)) 
          ? `${styls.letter} ${styls.active}`
          :  (letterRef.current == item)
          ?  `${styls.letter} ${styls.current}`
          : styls.letter
        } onClick={() => handleLetter(item)}>{item}</div>
      }
    } )
    
    
    // submit query function
    const submitQuery = () => {
      // get all the current query parameters
      const current = new URLSearchParams(Array.from(searchParams.entries()));
  
       // status 
       if(filters?.status != "Choose Status?" && filters?.status != null && filters?.status != ""){
        current.set("status", filters.status)
      }else{
        current.delete("status")
      }
  
      // type
      if(filters?.type != "Choose Type?" && filters?.type != null && filters?.type != ""){
        current.set("type", filters.type)
      }else{
        current.delete("type")
      }
  
      // sfw
      if(filters?.sfw == "false" || filters.sfw == null || filters.sfw == undefined){
        current.set("sfw", "false")
      }else{
        current.set("sfw", "true")
      }
  
      // letter
      if(filters?.letter != "" && filters?.letter != null){
        current.set("letter", filters.letter)
      }else{
        current.delete("letter")
      }
      
      // sort
      if(filters.sort != null && filters.sort != "Choose Sorting?" && filters.sort != undefined){
        current.set("sort", filters.sort)
      }else{
        current.delete("sort")
      }
  
      // genres
      if(filters.with_genres.length > 0){
  
        let strigified = ``;
        filters.with_genres.map((item, index) => {
          if(index != filters.with_genres.length - 1){
            strigified = strigified + item.toString() + ","
          }else{
            strigified = strigified + item.toString()
          }
        })
        current.set("with_genres", strigified)
      }else if(filters.with_genres.length == 0){
        current.delete("with_genres")
      }
  
      // user score
      if(filters.user_score.min == 0){
        current.delete("vote_average.gte")
      }else{
        current.set("vote_average.gte", (filters.user_score.min / 10).toString())
      }
      if(filters.user_score.max == 100 || filters.user_score.max == 0){
        current.delete("vote_average.lte")
      }else{
        current.set("vote_average.lte", (filters.user_score.max / 10).toString())
      }
  
      // limit
      if(filters.limit > 0 && filters?.limit != 25){
        current.set("limit", filters.limit.toString())
      }else{
        current.delete("limit")
      }
  
      // release date
      if(filters.release_date.from && filters.release_date.from != dateFormater(new Date())){
        current.set("release_date.gte", filters.release_date.from.toString())
      }else{
        current.delete("release_date.gte")
      }
      if(filters.release_date.to && filters.release_date.to != dateFormater(new Date())){
        current.set("release_date.lte", filters.release_date.to.toString())
      }else{
        current.delete("release_date.lte")
      }
  
      // keyword
      if(filters.keyword.length > 0){
        current.set("with_keywords", filters.keyword)
      }else{
        current.delete("with_keywords")
      }
  
      // show me
      if(filters.show_me != "all"){
        current.set("show_data", filters.show_me)
      }else{
        current.delete("show_data")
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
      <div className={styls.filterCont}>
        
        <div className={styls.sortingMethod}>
          <div className={styls.OpenMenu} onClick={() => dissolve("sort", !menu.sort)}>
            <span>Sort</span> 
            <FaChevronRight /> 
          </div>
          <div className={sortClass}>
            <div>Sort Result By?</div>
            <div>
              <Select
                defaultValue={filters.sort}
                style={{ width: "100%", marginTop: "10px"}}
                onChange={handleSort}
                options={[
                  { value: "", label: 'Choose Sorting?'},
                  { value: 'asc', label: 'Ascending Order' },
                  { value: 'desc', label: 'Descending Order' },
                ]}
              />
            </div>
          </div>
        </div>
  
        <div className={styls.sortingMethod} id='for letter'>
          <div className={styls.OpenMenu} onClick={() => dissolve("letter", !menu.letter)}>
            <span>Letter</span> 
            <FaChevronRight /> 
          </div>
          <div className={letterClass}>
            <div>Search Result By Letter?</div>
            <div className={styls.letterEls}>
              {mappedAlphabets}
            </div>
          </div>
        </div>
  
        <div className={styls.otherFiltrations}>
          <div className={styls.OpenMenu} onClick={() => dissolve("others", !menu.others)}>
            Filters
            <FaChevronRight />
          </div>
  
          <div className={otherClass}>
  
            <div className={styls.showMe} id='for Limit'>
              <div className={styls.menuHead}>Limit?</div>
              <div className={styls.showCont}>
                <Input 
                  placeholder='Enter Limit'
                  onChange={handleLimit}
                  value={filters.limit}
                />
              </div>
            </div>
  
            <div className={styls.showMe}>
              <div className={styls.menuHead}>Show Me</div>
              <div className={styls.showCont}>
                <Radio.Group onChange={handleShowMe} value={filters.show_me}>
                  <Radio value={"all"}>Everything</Radio>
                  <Radio value={"not_seen"}>Manga I Havent Seen</Radio>
                  <Radio value={"already_seen"}>Manga I Have Seen</Radio>
                </Radio.Group>
              </div>
            </div>
  
            <div className={styls.safeForWork}>
              <div className={styls.menuHead}>Show Expilicit Content</div>
              <div className={styls.showCont}>
                <Switch defaultChecked={Boolean(filters?.sfw == "true" ? true : false)} onChange={handleSFW} />
              </div>
            </div>
  
            <div className={styls.releaseDates}>
              <div className={styls.menuHead}>Release Dates</div>
              <div className={styls.datePickerEls}>
                <div className={styls.datePickEl}>
                  <small>from</small>
                  <DatePicker value={dayjs(filters.release_date.from)} style={{width: "100%"}} onChange={handleStartDate} />
                </div>
                <div className={styls.datePickEl}>
                  <small>to</small>
                  <DatePicker value={dayjs(filters.release_date.to)} style={{width: "100%"}} onChange={handleEndDate} />
                </div>
              </div>
            </div>
  
            <div className={styls.language} id="for Type">
              <div className={styls.menuHead}>Type</div>
              <div>
                <Select 
                  defaultValue={filters.type}
                  style={{ width: "100%", marginTop: "10px"}}
                  onChange={handleType}
                  options={[
                    { value: "", label: 'Choose Type?'},
                    { value: 'manga', label: 'Manga' },
                    { value: 'novel', label: 'Novel' },
                    { value: 'lightnovel', label: 'Lightnovel' },
                    { value: 'oneshot', label: 'Oneshot' },
                    { value: 'doujin', label: 'Doujin' },
                    { value: 'manhwa', label: 'manhwa' },
                    { value: 'manhua', label: 'Manhua' },
                  ]}
                />
              </div>
            </div>
  
            <div className={styls.language} id="for Status">
              <div className={styls.menuHead}>Status</div>
              <div>
                <Select 
                  defaultValue={filters.status}
                  style={{ width: "100%", marginTop: "10px"}}
                  onChange={handleStatus}
                  options={[
                    { value: "", label: 'Choose Status?'},
                    { value: 'publishing', label: 'Publishing' },
                    { value: 'complete', label: 'Complete' },
                    { value: 'haitus', label: 'Haitus' },
                    { value: 'discontinued', label: 'Discontinued' },
                    { value: 'upcoming', label: 'Upcoming' },
                  ]}
                />
              </div>
            </div>
  
            <div className={styls.genres}>
              <div className={styls.menuHead}>Genres</div>
  
              <div className={styls.genresMap}>
                {genreEls}
              </div>
            </div>
  
            <div className={styls.userScore}>
              <div className={styls.menuHead}>User Score</div>
              <div className={styls.sliderProps}>
                <Slider 
                  onChange={(values: number[]) => handleUserScore(values)}
                  range
                  style={{width: "95%", height: "100%"}} 
                  marks={userScoreMarks} 
                  step={10} 
                  tooltip={{
                    formatter: (value : number | undefined) => {
                      return (
                        <div>{value == undefined ? 0 / 10 : value / 10}</div>
                      )
                    }
                    
                  }}
                  defaultValue={
                    [filters.user_score.min*10, (filters.user_score.max == 0 ? 10*10 : filters.user_score.max *10)]
                  }
                />
              </div>
            </div>
  
            <div className={styls.searchKeyStroke}>
              <div className={styls.menuHead}>Keyword</div>
              <div className={styls.keywordCont}>
                <Input 
                  placeholder='Search Keyword'
                  onChange={handleKeyword}
                  value={filters.keyword}
                />
              </div>
            </div>
  
          </div>
        </div>
  
        <button
          ref={scrollTrigger} 
          onClick={() => submitQuery()}
          disabled={isBtnActive == false ? true : false}
          className={isBtnActive ? `${styls.searchBtn} ${styls.isBtn}` : styls.searchBtn}
        >
          Search
        </button>
        
      </div>
    )
}
