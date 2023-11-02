const NewsModel = require("../../models/NewsModules")

const NewsService = {
 
 list: async(id)=>{
    return id?NewsModel.find({_id:id,isPublish:1}):NewsModel.find({isPublish:1}).sort({editTime:-1})
 },
  getlist:async(page,skip)=>{
   return await NewsModel.find({category:page}).skip(skip).limit(5).sort({editTime:-1})
  },
  getlist1:async(page)=>{
   return await NewsModel.countDocuments({category:page})
  }
}
module.exports = NewsService