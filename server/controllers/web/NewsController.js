const NewsService = require("../../services/web/NewsService")
const NewsController = {
    list: async(req,res)=>{
        const result =await NewsService.list(req.params.id)
        res.send({
            ok: 1,
            data:result
        })

    },
    getlist:async(req,res)=>{
        const skip = req.query.page?(req.query.page-1)*5:0
        const page = req.params.id
        const totalItems = await NewsService.getlist(page,skip)
        res.send({
            ok:1,
            data:totalItems,
        })
    },
    getlist1:async(req,res)=>{
        const totalItems = await NewsService.getlist1(req.params.id)
        console.log(totalItems);
        res.send({
            ok:1,
            data:totalItems,
        })
    }
}

module.exports=NewsController