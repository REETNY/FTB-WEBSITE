import axios from "axios";

export const getTrending = async(
    url: string,
    extension: string,
    window_frame: string
) => {
  try{
    let res = await axios.get(
      url + `${extension}/${window_frame}`, {
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