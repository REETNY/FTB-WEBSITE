import axios from "axios";
import delayTimer from "../timerDelay";

export const getDataVidById = async(
    url: string, 
    id: number, 
    type?: boolean
) => {

    let fd;

  try{
    // await delayTimer(1500)
    let res = await axios.get(
      url + id + "/videos",
      {
        ...(type && {headers: {Accept: "application/json", Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`}})
      }
    );
    fd = res.data;

    fd = {
      ...fd,
    }

    return fd
    
    
  }catch(error){
    if(axios.isAxiosError(error)){
      return {status: error.status, msg: error.message}
    }else{
      console.log(error)
    }
    return []
  }
}