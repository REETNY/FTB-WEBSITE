import axios from "axios";


export const getTitlesById = async(
    url: string, 
    type: string,
    id: number
) => {
    const extension = (type == "movie" || type == "serie") ? "/alternative_titles" : "/full"
  try{
    let res = await axios.get
    (
        url + id + extension, {
            headers: {Accept: "application/json", Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`}
        }
    );
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