const ProductService = require("../../services/admin/ProductService")

const ProductController = {
  add: async (req, res) => {
    const cover = `/productuploads/${req.file.filename}`
    const { title, introduction, detail } = req.body
    await ProductService.add({
      title, introduction, detail, cover, editTime: new Date()
    })
    res.send({
      ok: 1
    })
  },
  getlist: async (req, res) => {
    const result = await ProductService.getlist(req.params.id)
    res.send({
      data: result
    })
  },
  dellist: async (req, res) => {
    await ProductService.dellist(req.params.id)
    res.send({
      ok: 1
    })
  },

  upload: async (req, res) => {
    const cover =req.file?`/productuploads/${req.file.filename}`:""
    const {_id,title,introduction,detail} = req.body
    await ProductService.upload({
      _id,title,introduction,detail,cover,editTime:new Date()
    })
    res.send({
      ok: 1
    })

  },
  paginatio:async(req,res)=>{
    const totalItems = await ProductService.paginatio()
    res.send({
        ok:1,
        data:totalItems,
    })
},
pagination:async(req,res)=>{
    const skip = req.query.page?(req.query.page-1)*11:0
    const page = 11
    const totalItems = await ProductService.pagination(page,skip)
    res.send({
        ok:1,
        data:totalItems,
    })
},
}
module.exports = ProductController