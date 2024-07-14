import axios from "axios";
import { AxiosError } from "axios";

export const getMovies = async(
    url: string, 
    parameters: {[key: string]: string | string[] | undefined} | undefined,
    page?: number, 
) => {
  try{
    let res = await axios.get(
      url, {
      ...(parameters && {params: {...parameters, ...(page && {page})}}),
      headers: {Accept: "application/json", Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`}
    });
    return res.data
  }catch(error){
    if(axios.isAxiosError(error)){
      console.log(error.status);
      console.log(error.response)
    }else{
      console.log(error)
    }
    return []
  }
}