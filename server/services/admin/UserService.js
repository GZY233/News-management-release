const UserModel = require("../../models/UserModules")

const UserService = {
   login:async ({username,password})=>{
    return UserModel.find({
        username,
        password
    })
   },
   upload:async ({_id,username,introduction,gender,avatar})=>{
      if(avatar){
      return UserModel.updateOne({_id},{username,introduction,gender,avatar})
   }
   else{
      return UserModel.updateOne({_id},{username,introduction,gender})
   }
},
   newupload: async(id)=>{
     return UserModel.find({_id:id})
   },
   add:async ({username,password,role,introduction,gender,avatar})=>{
      return UserModel.create(
      {
         username,password,role,introduction,gender,avatar
      }
     )
},
  list: async()=>{
   return UserModel.find({},["username","role","introduction","gender","avatar"])
  },
  delist:async(id)=>{
     return UserModel.deleteOne({_id:id})
  },
  getlist:async(id)=>{
   return UserModel.findOne({_id:id})
  },
  uplist:async({_id,username,password,gender,introduction,role})=>{
   return UserModel.updateOne({_id},{username,password,gender,introduction,role})
  },
  pagination:async(page,skip)=>{
   return await UserModel.find().skip(skip).limit(7)
  },
  paginatio:async()=>{
   return await UserModel.countDocuments()
  },
  jwt:async(username)=>{
   return await UserModel.find({username:username})
  },
}
module.exports = UserService