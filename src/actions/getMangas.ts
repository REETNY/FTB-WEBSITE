import axios from "axios";
import { AxiosError } from "axios";

export const getMangas = async(
    url: string, 
    parameters: {[key: string]: string | boolean | string[] | undefined} | undefined,
    page?: number, 
) => {
  try{
    let res = await axios.get(
      url, {
      ...(parameters && {params: {...parameters, ...(page && {page})}}),
      headers: {Accept: "application/json"}
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