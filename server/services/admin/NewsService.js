const NewsModel = require("../../models/NewsModules")

const NewsService = {
 add:async ({title,content,category,cover,isPublish,editTime,username})=>{
   return NewsModel.create({
    title,content,category,cover,isPublish,editTime,username
   })
 },
 getlist: async(id)=>{
    return NewsModel.find({username:id})
 },
 getlist1: async(id)=>{
  return NewsModel.findOne({_id:id})
 }
 ,
 publish: async({_id,isPublish,editTime})=>{
    return NewsModel.updateOne({_id},{
      isPublish,
      editTime
    })
 },
 dellist: async (data)=>{
     return NewsModel.deleteOne({_id:data})
 },
 upload: async ({_id,title,content,category,cover,editTime})=>{
  if (cover) {
    return NewsModel.updateOne({_id},{title,content,category,cover,editTime})
  }else{
    return NewsModel.updateOne({_id},{title,content,category,editTime})
  }
 },
 paginatio:async()=>{
  return await NewsModel.countDocuments()
 },
 pagination:async(page,skip)=>{
  return await NewsModel.find().skip(skip).limit(11)
 },

}
module.exports = NewsService