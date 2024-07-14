import axios from "axios";
import delayTimer from "../timerDelay";

export const getStaffById = async(
    url: string, 
    id: number, 
) => {

    let fd;

  try{
    await delayTimer(1500)
    let res = await axios.get(
      url + id + "/staff");
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