"use client"
import React, { useEffect, useRef, useState } from 'react';
import styls from "./filter.module.css"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';
import Countries from "../_libs/countries.json";
import Image from 'next/image';
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { chooseCountry } from '@/store/Slices/UserSlice';
import { useInView } from 'react-intersection-observer';

import { isBtnInView, queryBtn, setQueriesParams, setRelease } from '@/store/Slices/QuerySlice';

// RSUITE1 UI
import { SelectPicker } from 'rsuite';
import { ValueType } from 'rsuite/esm/InputPicker/InputPicker';
import { ValueType as Value } from 'rsuite/esm/Radio';
import { Radio, RadioGroup } from 'rsuite';
import { Checkbox } from 'rsuite';
import { DatePicker } from 'rsuite';
import { Tooltip, Whisper } from 'rsuite';
import { Slider, RangeSlider } from 'rsuite';
import { Input } from 'rsuite';

const tmdbOptions = {
  "accept": "application/json",
  "Authorization": `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
}


const dateFormater = (date: Date) => {
  let datex = date;
  let year = date.getFullYear();
  let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth()+1}`;
  let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let formatedDate = `${year}-${month}-${day}`
  return formatedDate
}

const fetcher = (url:string) => fetch(url, {headers:{...tmdbOptions}}).then((res) => res.json());

export default function TvSeriesFilter() {
  const {isBtnActive} = useSelector((state: RootState) => state.querySlice)
  const dispatch = useDispatch()
  const country_code = useSelector((state: RootState) => state.userSlice.country)
  const [scrollTrigger, isInView] = useInView();
  const router = useRouter();
  const searchParams = useSearchParams();

  
  function pushQuery(pathname:string, query:string){
    router.push(`${pathname}${query}`, {scroll: false});
  }

  // some query params
  const sort = searchParams.get("sort");

  interface FilterProps {
    sort: string,
    with_genres: number[],
    user_score: {
      min: number,
      max: number
    },
    user_votes: number,
    runtime: {
      min: number,
      max: number
    },
    available: string[],
    provider: string[],
    release_types: string[],
    certification: string,
    keyword: string,
    show_me: string,
    air_date: {
        from: string,
        to: string
    },
    first_air_date: {
        from: string,
        to: string
    }
  }

  // state manager for the filters before it gets to the browsers
  const [filters, setFilters] = useState<FilterProps>({
    sort: sort == null ? "Choose Sorting?" : sort,
    with_genres: searchParams.get("with_genres")?.split(",").map((item) => parseInt(item)) || [],
    user_score: {
      min: parseInt(searchParams.get("vote_average.gte") || "0"), 
      max: parseInt(searchParams.get("vote_average.lte") || "0")
    },
    user_votes: parseInt(searchParams.get("vote_count.gte") || "0"),
    runtime: {
      min: parseInt(searchParams.get("with_runtime.gte") || "0"),
      max: parseInt(searchParams.get("with_runtime.lte") || "0")
    },
    available: searchParams.get("with_watch_monetization_types")?.split(",") || [],
    provider: searchParams.get("with_watch_providers")?.split(",") || [],
    air_date: {
        from: searchParams.get("air_date.lte") || dateFormater(new Date()),
        to: searchParams.get("air_date.lte") || dateFormater(new Date())
    },
    first_air_date: {
        from: searchParams.get("first_air_date.lte") || "",
        to: searchParams.get("first_air_date.lte") || ""
    },
    release_types: searchParams.get("with_release_type")?.split(",") || [],
    certification: searchParams.get("certificate") || "Choose Certificate",
    keyword: searchParams.get("with_keywords") || "",
    show_me: "all"
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

  // useSWR 
  const option = {
    revalidateOnMount: true,
    revalidateIfStale: true,
    refreshInvertal: 0,
  }
  const { data: genre, error } = useSWR(
    `https://api.themoviedb.org/3/genre/tv/list?language=en`, 
    fetcher,
    option
  );
  const {data:watchProvide, error: watchError} = useSWR(
    `https://api.themoviedb.org/3/watch/providers/tv?language=en-US&watch_region=${country_code}`,
    fetcher
  );
  const {data: certficate, error: certificateErr, isLoading: certLoading} = useSWR(
    `https://api.themoviedb.org/3/certification/tv/list`,
    fetcher
  )

  // genre Els
  const genreData = genre?.genres?.map((item: {id: number, name: string}) => {
    return {value: item.id, label: item.name}
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

  // watch provider Els   //done
  interface provideProps {
    display_priorities: object,
    display_priority: number,
    logo_path: string,
    provider_id: number,
    provider_name: string
  }
  const handleProvider = (val:number) => {
    const itExist = filters.provider.find((item) => parseInt(item) == val);

    dispatch(queryBtn(true))

    if(itExist){
      const filtered = filters.provider.filter((item) => item != val.toString() ? item : false);
      setFilters((obj) => ({...obj, provider: filtered}));
    }else{
      setFilters((obj) => ({...obj, provider: [...filters.provider, val.toString()]}));
    }

  }
  const checkProvide = (val:number) => {
    let exist = filters.provider?.find((item) => item == val.toString());
    return exist ? true : false
  }
  const providerData = watchProvide?.results?.map((item: provideProps, index:number) => {
    return(
      <div onClick={() => handleProvider(item.provider_id)} key={index} 
      className={checkProvide(item.provider_id) ? `${styls.providersImage} ${styls.active}` : styls.providersImage}>
        <Image alt='' src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} width={50} height={50} />
      </div>
    )
  })

  // certification Els  //done
  interface certProp{
    certification: string
    meaning : string
    order: number
  }
  const certificateOptions = certficate?.certifications[country_code]?.map((item: certProp, index:number) => {
    return {value: item.certification, label: item.meaning}
  });
  const handleCertificate = (value:string) => {
    dispatch(queryBtn(true))
    setFilters((obj) => ({...obj, certification: value}))
  }


  // state for filters
  const [menu, setMenu] = useState({
    sort: false,
    watch: false,
    others: false,
    availabilities: searchParams.get("with_watch_monetization_types") ? false : true,
    release_typs: 
    (searchParams.get("first_air_date.gte") || searchParams.get("first_air_date.lte")) ? false : true,
    release_dates: false,
    show_me: false
  })

  // state for filtrations
  const [filtration, setFiltration] = useState({
    first_released: 
    (searchParams.get("first_air_date.gte") || searchParams.get("first_air_date.lte")) ? true : false
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

  const watchClass = clsx({
    [`${styls.menu} ${styls.opened}`]: menu.watch,
    [styls.menu]: !menu.watch
  })

  const otherClass = clsx({
    [`${styls.menu} ${styls.liner} ${styls.opened}`]: menu.others,
    [`${styls.menu} ${styls.liner}`]: !menu.others
  })

  const availsClass = clsx({
    [`${styls.shown} ${styls.show}`]: !menu.availabilities,
    [styls.shown]: menu.availabilities
  })

  const releasesClass = clsx({
    [`${styls.shown} ${styls.show}`]: !menu.release_typs,
    [styls.shown]: menu.release_typs
  })

  // handle select of whereToWatch
  const handleWhere = (value:string) => {
    dispatch(queryBtn(true))
    setFilters((obj) => ({...obj, provider: []}))
    dispatch(chooseCountry(value))
  }

  // handle select of sort //done
  const handleSort = (value:string) => {
    dispatch(queryBtn(true))
    if (value == null || value == undefined || value == "") {
      setFilters((obj) => ({...obj, sort: "Choose Sorting?"}));
    } else {
      setFilters((obj) => ({...obj, sort: value}))
    }

  }

  // handle check of availabilities //done
  const options = [
    { label: 'Stream', value: 'stream' },
    { label: 'Free', value: 'free' },
    { label: 'Ads', value: 'ads' },
    { label: 'Rent', value: 'rent' },
    { label: 'Buy', value: 'buy' }
  ];
  const makeAvail = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setMenu((obj) => ({...obj, availabilities: e.target.checked}))
    setFilters((obj) => ({...obj, available: []}))
  };
  const handleAvails = (e:React.ChangeEvent<HTMLInputElement>) => {
    const itExist = filters.available.find((item:string) => item == e.target.value);
    dispatch(queryBtn(true))
    if(itExist){
      const filtered = filters.available.filter((item) => item != e.target.value ? item : false);
      setFilters((obj) => ({...obj, available: filtered}))
    }else{
      setFilters((obj) => ({...obj, available: [...filters.available, e.target.value]}))
    }
  }
  const observeChecked = (val:string) => {
    const exists = filters.available.find((item) => item == val);
    return exists ? true : false;
  }
  const checkAvailOpts = options.map((item, index) => {
    return (
      <Checkbox 
        key={index} 
        value={item.value} 
        checked={observeChecked(item.value)} 
        onChange={(value: ValueType | undefined, checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => handleAvails(event)} 
      >
        {item.label}
      </Checkbox>
    )
  })

  // handle release types  //done
  const releaseTypes = [
    {value: "first_air_date", label: "Search First Air Date?"},
  ];
  const showReleases = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenu((obj) => ({...obj, release_typs: e.target.checked}));
    setFilters((obj) => ({...obj, release_types: []}));
    dispatch(queryBtn(true))
  }
  const handleReleases = (e:React.ChangeEvent<HTMLInputElement>) => {
    const itExist = filters.release_types.find((item:string) => item == e.target.value);
    dispatch(queryBtn(true))
    if(itExist){
      const filtered = filters.release_types.filter((item) => item != e.target.value ? item : false);
      setFilters((obj) => ({...obj, release_types: filtered}))
    }else{
      setFilters((obj) => ({...obj, release_types: [...filters.release_types, e.target.value]}))
    }
  }
  const observeReleases = (val:string) => {
    const exists = filters.release_types.find((item) => item == val);
    return exists ? true : false;
  }
  const checkReleasesOpts = releaseTypes.map((item, index) => {
    return (
      <Checkbox 
        key={index} 
        value={item.value} 
        checked={observeReleases(item.value)} 
        onChange={(value: ValueType | undefined, checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => handleReleases(event)} 
      >
        {item.label}
      </Checkbox>
    )
  })

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

  // handle user votes details   //done
  const handleUserVotes = (value: number) => {
    dispatch(queryBtn(true))
    setFilters((obj) => ({...obj, user_votes: value}))

  }

  // handle runtime details //done
  const handleRuntime = (values: number[]) => {
    dispatch(queryBtn(true))
    setFilters((obj) => ({...obj, runtime: {min: values[0], max: values[1]}}));
  }

  // handle date picker //done
  const handleStartDate = (date:Date) => {
    let dateString = (new Date(date).toISOString().slice(0,10));
    dispatch(queryBtn(true))
    setFilters((obj) => 
    filtration?.first_released == true 
    ? (
    {
      ...obj, 
      first_air_date: {...filters.first_air_date, from: dateString.toString()},
      air_date: {...filters.air_date, from: ""}
    }
    )
:   (
    {
      ...obj, 
      air_date: {...filters.air_date, from: dateString.toString()},
      first_air_date: {...filters.first_air_date, from: ""}
    }
    )
    )
  }
  const handleEndDate = (date:Date) => {
    let dateString = (new Date(date).toISOString().slice(0,10));
    dispatch(queryBtn(true))
    setFilters((obj) => 
      filtration?.first_released == true 
      ? (
      { ...obj, 
        first_air_date: {...filters.first_air_date, to: dateString.toString()}, 
        air_date: {
          ...filters.air_date, to: ""
        }
      }
      )
      : (
        {
          ...obj, 
          air_date: {...filters.air_date, to: dateString.toString()},
          first_air_date: {...filters.first_air_date, to: ""}
        }
      )
      )
  }

  // handle keyword
  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(queryBtn(true))
    setFilters((obj) => ({...obj, keyword: e.target.value}));
  }

  // handle show props
  const handleShowMe = (value:any) => {
    dispatch(queryBtn(true))
    setFilters((obj) => ({...obj, show_me: value}))
  }

  // mapped countries select
 const countriesObj = (Object.entries(Countries).map((item) => {
  return {value: item[0], label: item[1]}
 }));

  // submit query function
  const submitQuery = () => {
    // get all the current query parameters
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
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

    // user votes
    if(filters.user_votes == 0){
      current.delete("vote_count.gte");
    }else{
      current.set("vote_count.gte", (filters.user_votes * 5).toString())
    }

    // runtime
    if(filters.runtime.min == 0){
      current.delete("with_runtime.gte");
    }else{
      current.set("with_runtime.gte", (filters.runtime.min * 4).toString());
    }
    if(filters.runtime.max != 0){
      current.set("with_runtime.lte", (filters.runtime.max * 4).toString());
    }
    
    // availabilities
    if(filters.available.length == 0){
      current.delete("with_watch_monetization_types");

      // incase we have with_watch_providers which uses watch_region
      if(!current.get("with_watch_providers")){
        current.delete("watch_region");
      }
    }else{
      let stringified = ``;
      filters.available.map((item, index) => {
        if(index == filters.available.length - 1){
          stringified = stringified + item.toString()
        }else{
          stringified = stringified + item.toString() + ","
        }
      })
      current.set("with_watch_monetization_types", stringified);
      current.set("watch_region", country_code)
    }

    // watch provider
    if(filters.provider.length == 0){
      current.delete("with_watch_providers");
      // incase we have with_watch_providers which uses watch_region
      if(!current.get("with_watch_monetization_types")){
        current.delete("watch_region");
      }
    }else{
      let stringified = '';
      filters.provider.map((item, index) => {
        if(index == filters.provider.length - 1){
          stringified = stringified + item.toString()
        }else{
          stringified = stringified + item.toString() + ","
        }
      })
      current.set("with_watch_providers", stringified)
      current.set("watch_region", country_code)
    }

    // air date
    if(filters.air_date.from && filters.air_date.from != dateFormater(new Date())){
      current.set("air_date.gte", filters.air_date.from.toString())
    }else{
      current.delete("air_date.gte")
    }
    if(filters.air_date.to && filters.air_date.to != dateFormater(new Date())){
      current.set("air_date.lte", filters.air_date.to.toString())
    }else{
      current.delete("air_date.lte")
    }
    // first air date
    if(filters.first_air_date.from && filters.first_air_date.from != dateFormater(new Date()) && filters.first_air_date.from != ""){
        current.set("first_air_date.gte", filters.first_air_date.from.toString())
    }else{
        current.delete("first_air_date.gte")
    }
    if(filters.first_air_date.to && filters.first_air_date.to != dateFormater(new Date()) && filters.first_air_date.to != ""){
        current.set("first_air_date.lte", filters.first_air_date.to.toString())
    }else{
        current.delete("first_air_date.lte")
    }

    // releases types
    if(filters.release_types.length > 0){
      let strigified = '';
      filters.release_types?.map((item, index) => {
        if(index == filters.release_types.length - 1){
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
    if(filters.certification && filters.certification != "Choose Certificate"){
      current.set("certificate", filters.certification)
    }else{
      current.delete("certificate")
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

 const selectStyls = {
  width: "100%",
  display: "flex",
  columnGap: "5px",
  alignItems: "center"
 }

 const countriesFlag = {
  width: "20px",
  height: "20px",
  overflow: "hidden",
 }
  

 const line = {
  borderTop: "1px solid var(--line)",
  marginTop: "10px"
 }

 const check_air_date1 = () => {
    if(filters.first_air_date.from == ""){
        return filters.air_date.from
    }else{
        return filters.first_air_date.from
    }
 }

 const check_air_date2 = () => {

    if(filters.first_air_date.to == ""){
        return filters.air_date.to
    }else{
        return filters.first_air_date.to
    }
 }

  //  option sort
  const optionSort = [
    { value: "", label: 'Choose Sorting?'},
    { value: 'popularity_desc', label: 'Popularity Descending' },
    { value: 'popularity_asc', label: 'Popularity Ascending' },
    { value: 'rating_desc', label: 'Rating Descending' },
    { value: 'rating_asc', label: 'Rating Ascending' },
    { value: 'release_date_asc', label: 'Release Date Ascending' },
    { value: 'release_date_desc', label: 'Release Date Descending' },
    { value: 'title_asc', label: 'Title A-Z' },
    { value: 'title_desc', label: 'Title Z-A' },
  ]
  // option sort select
  const renderMenuItem = (label:any, item:any) => {
    return (
      <span>{label}</span>
    );
  };

  // option country select
  const renderMenuItem2 = (label:any, item:any) => {
    return(
      <div style={selectStyls}>
        <span style={countriesFlag}><Image alt='' width={20} height={20} src={`https://flagsapi.com/${item.value}/flat/64.png`} /></span>
        <span>{item.label}</span>
      </div>
    )
  }

  const renderValue2 = (value:any, items:any) => {
    return (
      <div style={selectStyls}>
        <span style={countriesFlag}><Image alt='' width={20} height={20} src={`https://flagsapi.com/${value}/flat/64.png`} /></span>
        <span>{value}</span>
      </div>
    );
  };
 
  // option certificate

  const tooltip = (val:string) => {
    return (
      <Tooltip>
        {val}.
      </Tooltip>
    )
  }

  const renderMenuItem3 = (label:any, item:any) => {
    return(
      <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip(label)}>
        <span>{item.value}</span>
      </Whisper>
    )
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
            <SelectPicker 
              defaultValue={filters?.sort}
              // value={filters?.sort}
              style={{width: "100%", marginTop: "10px"}}
              labelKey="label"
              valueKey="value"
              placeholder="Select Sort?"
              renderMenuItem={renderMenuItem}
              data={optionSort}
              onChange={(value:ValueType) => handleSort(value)}
            />
          </div>
        </div>
      </div>

      <div className={styls.whereToWatch}>
        <div className={styls.OpenMenu} onClick={() => dissolve("watch", !menu.watch)}>
          <span className={styls.menuHead}>Where To Watch</span> 
          <FaChevronRight /> 
        </div>
        <div className={watchClass}>
          <div className={styls.menuHead}>Country</div>
          <div className={styls.menuHeadDrop}>
            <SelectPicker
              defaultValue={country_code}
              // value={filters?.sort}
              style={{width: "100%", marginTop: "10px"}}
              labelKey="label"
              valueKey="value"
              placeholder="Select User"
              renderMenuItem={renderMenuItem2}
              renderValue={renderValue2}
              data={countriesObj}
              onChange={(value:ValueType) => handleWhere(value)}
            />
          </div>
          <div className={styls.watchProviders}>{providerData}</div>
        </div>
      </div>

      <div className={styls.otherFiltrations}>
        <div className={styls.OpenMenu} onClick={() => dissolve("others", !menu.others)}>
          Filters
          <FaChevronRight />
        </div>

        <div className={otherClass}>

          <div className={styls.showMe}>
            <div className={styls.menuHead}>Show Me</div>
            <div className={styls.showCont}>
              <RadioGroup onChange={(value:Value) => handleShowMe(value)} name="" value={filters.show_me}>
                <Radio value={"all"}>Everything</Radio>
                <Radio value={"not_seen"}>Series I Havent Seen</Radio>
                <Radio value={"already_seen"}>Series I Have Seen</Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styls.availabilities}>
            <div className={styls.menuHead}>Availabilities</div>
            <div>
              <Checkbox 
                defaultChecked
                style={{marginTop: "10px"}}
                checked={menu.availabilities}
                onChange={(value: ValueType | undefined, checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => makeAvail(event)}
                >
                  Search All Availabilities?
              </Checkbox>
            </div>
            <div className={availsClass}>
              {checkAvailOpts}
            </div>
          </div>

          <div className={styls.releaseDates}>
            <div className={styls.menuHead}>Release Dates</div>
            <div className={styls.releaseTypes}>
              <div className={styls.showReleaseTypes}>
                <Checkbox 
                  style={{marginTop: "10px"}}
                  checked={menu.release_typs} 
                  onChange={(value: ValueType | undefined, checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => showReleases(event)}
                >
                  Search All Releases?
                </Checkbox>
              </div>
              <div className={releasesClass}>
                {checkReleasesOpts}
              </div>
            </div>
            <div className={styls.datePickerEls}>
              <div className={styls.datePickEl}>
                <small>from</small>
                <DatePicker 
                  value={new Date(check_air_date1())} 
                  style={{width: "100%"}} 
                  // onChange={(date: Date) => console.log()}
                  onChangeCalendarDate={(date: Date, event) => handleStartDate(date)}
                />
              </div>
              <div className={styls.datePickEl}>
                <small>to</small>
                <DatePicker 
                  value={new Date(check_air_date2())} 
                  style={{width: "100%"}} 
                  // onChange={(date: Date) => console.log()}
                  onChangeCalendarDate={(date: Date, event) => handleEndDate(date)}
                />
              </div>
            </div>
          </div>

          <div className={styls.genres}>
            <div className={styls.menuHead}>Genres</div>

            <div className={styls.genresMap}>
              {genreEls}
            </div>
          </div>

          <div className={styls.certification}>
            <div className={styls.menuHead}>Certification</div>
            <div className={styls.certificateSelect}>
              <SelectPicker
                defaultValue={filters?.certification}
                // value={filters?.sort}
                style={{width: "100%", marginTop: "5px"}}
                labelKey="label"
                valueKey="value"
                placeholder="Select Certification"
                renderMenuItem={renderMenuItem3}
                data={certificateOptions}
                onChange={(value:ValueType) => handleCertificate(value)}
              />
            </div>
          </div>

          <div className={styls.userScore}>
            <div className={styls.menuHead}>User Score</div>
            <div className={styls.sliderProps}>
              <RangeSlider 
                style={{marginTop: "10px"}}
                defaultValue={[filters.user_score.min*10, (filters.user_score.max == 0 ? 10*10 : filters.user_score.max *10)]}
                graduated
                step={10}
                onChange={(value:[number, number]) => handleUserScore(value)}
                renderMark={(mark:number) => {
                  return <span>{(mark / 10) % 5 == 0 ? mark : ''}</span>
                }}
              />
            </div>
          </div>

          <div className={styls.minimumUSerVotes}>
            <div className={styls.menuHead}>User Votes</div>
            <div className={styls.sliderProps}>
              <Slider
                progress 
                style={{marginTop: "10px"}}
                defaultValue={filters.user_votes / 5}
                graduated
                step={10}
                onChange={(value:number) => handleUserVotes(value)}
                renderMark={(mark:number) => {
                  return <span>{(mark * 5) % 100 == 0 ? mark * 5 : ''}</span>
                }}
                renderTooltip={(value: number | undefined) => {
                  return <div>{value == undefined ? 0 * 5 : value * 5}</div>
                }}
              />
            </div>
          </div>

          <div className={styls.runtime}>
            <div className={styls.menuHead}>Runtime</div>
            <div className={styls.sliderProps}>
              <RangeSlider 
                style={{marginTop: "10px"}}
                defaultValue={
                  [(filters.runtime.min/4), (filters.runtime.max == 0 ? (400/4) : (filters.runtime.max/4))]
                }
                graduated
                step={5}
                onChange={(value:[number, number]) => handleRuntime(value)}
                renderMark={(mark:number) => {
                  return <span>{(mark * 1 * 4) % 100 == 0 ? mark * 4 : ''}</span>
                }}
                renderTooltip={(value: number|undefined) => {
                  return <div style={{fontSize: "12px"}}>{value == undefined ? 0 * 4 : value * 4} minutes</div>
                }}
              />
            </div>
          </div>

          <div className={styls.searchKeyStroke}>
            <div className={styls.menuHead}>Keyword</div>
            <div className={styls.keywordCont}>
              <Input 
                placeholder='Search Keyword'
                onChange={(value: string, event: React.ChangeEvent<HTMLInputElement>) => handleKeyword(event)}
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
