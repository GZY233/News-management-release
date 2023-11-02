const NewsService = require("../../services/admin/NewsService")
const NewsController = {
    add: async (req, res) => {
        const cover =  `/newsupload/${req.file.filename}`
        const { title, content, category, isPublish,username } = req.body
        await NewsService.add({
            title, content, category: Number(category), isPublish: Number(isPublish), cover, editTime: new Date(),username
        })
        res.send({
            ok: 1
        })
    },
    getlist: async(req,res)=>{
        const result =await NewsService.getlist(req.params.id)
        res.send({
            ok: 1,
            data:result
        })

    },
    getlist1: async(req,res)=>{
        const result =await NewsService.getlist1(req.params.id)
        res.send({
            ok: 1,
            data:result
        })

    },
    changepublish:async(req,res)=>{
        await NewsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ok: 1,
        })
    },
    dellist:async(req,res)=>{
      
        await NewsService.dellist(req.params.id)
        res.send({
            ok: 1,
        })
    },
    upload: async(req,res)=>{
        const cover =req.file?`/newsupload/${req.file.filename}`:""
        const {_id,title,content,category} =req.body
        await NewsService.upload({_id,
            title,content,category,cover,
            editTime:new Date()
        })
        res.send({
            ok: 1,
        })
    },
    paginatio:async(req,res)=>{
        const totalItems = await NewsService.paginatio()
        res.send({
            ok:1,
            data:totalItems,
        })
    },
    pagination:async(req,res)=>{
        const skip = req.query.page?(req.query.page-1)*11:0
        const page = 11
        const totalItems = await NewsService.pagination(page,skip)
        res.send({
            ok:1,
            data:totalItems,
        })
    },
}

module.exports=NewsController