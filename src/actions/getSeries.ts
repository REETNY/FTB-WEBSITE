import axios from "axios";

export const getSeries = async(
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
      }catch(err){
        return []
    }
}