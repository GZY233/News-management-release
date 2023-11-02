import moment from "moment"
moment.locale("zh-cn")
const getedittime ={
     getTime:(date)=>{
        return moment(date).format("YYYY/MM/DD")
       
     }
}
export default  getedittime