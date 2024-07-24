import axios from "axios";
import delayTimer from "../timerDelay";

export const getDataPicById = async(
    url: string, 
    id: number, 
) => {

    let fd;

  try{
    let res = await axios.get(
      url + id + "/pictures");
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