import axios from "axios";

export const getDataByUrl2 = async(
    url: string, 
) => {
  try{
    let res = await axios.get(
      url );
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