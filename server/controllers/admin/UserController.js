const UserService = require("../../services/admin/UserService")
const jwt = require("../../util/JWT")

const UserController = {
    login: async (req,res)=>{
     var result= await UserService.login(req.body)
     if(result.length===0){
        res.send({
            code:"-1",
            error:"用户名密码不正确"
        })
     }else{
        const token = jwt.generate({
            _id:result[0]._id,
            username:result[0].username
        },"1d")
        res.header("Authorization",token)
        res.send({
            gzy:"ok",
            data:{
                id:result[0]._id,
                username:result[0].username,
                gender:result[0].gender?result[0].gender:0,
                introduction:result[0].introduction,
                avatar:result[0].avatar,
                role:result[0].role
            }
        })
     }
    },
    upload:async (req,res)=>{
        const id = req.body.id
        const avatar =req.file?`/uploads/${req.file.filename}`:""
        const {username,gender,introduction} = req.body
        await UserService.upload({_id:id,username,gender:Number(gender),introduction,avatar})
        var result= await UserService.newupload(id)
        
        res.send({
            username:result[0].username,
            gender:result[0].gender,
            introduction:result[0].introduction,
            avatar:result[0].avatar,
        }
        //   result.modifiedCount.toString()
        
        )
    },
    add:async (req,res)=>{
        const avatar =`/uploads/${req.file.filename}`
        const {username,password,gender,role,introduction} = req.body
       await UserService.add({username,password,gender:Number(gender),role:Number(role),introduction,avatar})
       res.send(
            {
                ok:1
            }
        )
    },
    list:async(req,res)=>{
        const result= await UserService.list()
       res.send(result);
    },
    delist:async(req,res)=>{
        await UserService.delist(req.params.id)
        res.send({
            ok: 1,
        })
    },
    getlist: async(req,res)=>{
        const result= await  UserService.getlist(req.params.id)
        res.send({
            id:result._id,
            username:result.username,
            password:result.password,
            gender:result.gender,
            introduction:result.introduction,
            role:result.role
        })
    },
    uplist:async (req,res)=>{
        const {id,username,password,gender,introduction,role} = req.body
  
        await UserService.uplist({_id:id,username,password,gender:Number(gender),introduction,role:Number(role)})

        res.send({
            ok:1
        })
    },
    pagination:async(req,res)=>{
        const skip = req.query.page?(req.query.page-1)*7:0
        const page = 7
        const totalItems = await UserService.pagination(page,skip)
        res.send({
            ok:1,
            data:totalItems,
        })
    },
    paginatio:async(req,res)=>{
        const totalItems = await UserService.paginatio()
        res.send({
            ok:1,
            data:totalItems,
        })
    },
    jwt:async(req,res)=>{
        const {username} =req.body
        const result = await UserService.jwt(username)
        res.send({
            ok:1,
            data:result,
        })
    }
}
module.exports = UserController