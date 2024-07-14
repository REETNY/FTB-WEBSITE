import axios from "axios";

export const getSeasonImages = async(
    url: string, 
    serie_id: number,
    season_id: number
) => {
  try{
    let res = await axios.get(
      url + `/${serie_id}/season/${season_id}/images`, {
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