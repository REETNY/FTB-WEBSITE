import axios from "axios";

export const getMovieCastById = async(
    url: string, 
    id: number, 
) => {

    let fd;

  try{
    let res = await axios.get(
      url + id + "/credits", {
      headers: {Accept: "application/json", Authorization: `${process.env.NEXT_PUBLIC_TMDB_TOKEN}`}
    });
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