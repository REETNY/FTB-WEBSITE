import axios from "axios";

export const getCollectionDetails = async(
    url: string, 
    collection_id: number,
) => {
  try{
    let res = await axios.get(
      url + collection_id, {
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