import axios from "axios";

export const getDataRevById = async(
    url: string, 
    id: number, 
) => {

    let fd;

  try{
    let res = await axios.get(
      url + id + "/reviews");
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