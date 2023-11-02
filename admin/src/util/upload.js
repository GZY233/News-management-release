
import axios from 'axios';
function upload(path,centerForm){
    const params = new FormData() //
    for( let i in centerForm){
      params.append(i,centerForm[i])
    }
    return axios.post(path,params,{
      headers:{
          "Content-Type":"multipart/form-data"
      },
      // responseType: 'text'
    })

}
export default upload 
