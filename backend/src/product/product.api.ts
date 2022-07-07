import { HttpParamValidators } from "../lib/http";
import { ProductNS } from "./product";
import * as express from "express";

export function NewProductAPI(bll: ProductNS.BLL) {
  const gender = Object.values(ProductNS.Gender);
  const router = express.Router();
  router.get("/product/list", async (req, res) => {
    if(req.query.gender){
        const gender_query=HttpParamValidators.MustBeOneOf(req.query,"gender",gender)
        const product=await bll.ListProduct(gender_query);
        return res.json(product);
    }
    const product = await bll.ListProduct();
    return res.json(product);
  });

  router.get('/product/sale', async (req, res) => {
    const product = await bll.ListProductSales();
    return res.json(product);
  })
  router.get("/product/get", async (req, res) => {
    const id = HttpParamValidators.MustBeString(req.query, "id", 8);
    const product = await bll.GetProduct(id);
    res.json(product);
  });

  router.get("/product/get_by_name",async (req, res)=>{
    const name=HttpParamValidators.MustBeString(req.query, "name")
    const products= await bll.GetProductByName(name)
    res.json(products)
  })
  router.post("/product/create", async (req, res) => {
    const params: ProductNS.CreateProductParams = {
      name: HttpParamValidators.MustBeString(req.body, "name", 2),
      material: HttpParamValidators.MustBeString(req.body, "material"),
      image: HttpParamValidators.MustBeArrayString(req.body, "image"),
      color: HttpParamValidators.MustBeString(req.body, "color"),
      amount: HttpParamValidators.MustBeNumber(req.body, "amount"),
      origin_price: HttpParamValidators.MustBeNumber(req.body, "origin_price"),
      price: HttpParamValidators.MustBeNumber(req.body, "price"),
      gender: HttpParamValidators.MustBeOneOf(req.body, "gender", gender),
    };
    const product= await bll.CreateProduct(params);
    res.json(product);
  });

  router.post('/product/update',async (req, res)=>{
    const id=HttpParamValidators.MustBeString(req.query,"id",8)
    const params:ProductNS.UpdateProductParams={}
    if(req.body.name){
        params.name= HttpParamValidators.MustBeString(req.body, "name", 2)
    }
    if(req.body.material){
        params.material=HttpParamValidators.MustBeString(req.body, "material")
    }
    if(req.body.color){
        params.color= HttpParamValidators.MustBeString(req.body, "color")
    }
    if(req.body.amount){
        params.amount=HttpParamValidators.MustBeNumber(req.body, "amount")
    }
    if(req.body.origin_price){
      params.origin_price=HttpParamValidators.MustBeNumber(req.body, "origin_price")
    }
    if(req.body.price){
      params.price=HttpParamValidators.MustBeNumber(req.body, "price")
    }
    if(req.body.gender){
      params.gender=HttpParamValidators.MustBeOneOf(req.body, "gender", gender)
    }
    if(req.body.image){
      params.image=HttpParamValidators.MustBeArrayString(req.body, "image")
    }
    const product=await bll.UpdateProduct(id,params)
    res.json(product)
  })

  router.post('/product/delete',async (req, res)=>{
      const id = HttpParamValidators.MustBeString(req.query, "id", 8)
      const product= await bll.DeleteProduct(id)
      res.json(product)
  })

  router.get('/comment/list',async (req, res)=>{
      const product_id=HttpParamValidators.MustBeString(req.query,"product_id",8)
      const comments= await bll.ListComment(product_id)
      res.json(comments)
  })
  
  router.get('/comment/get',async (req, res)=>{
      const id = HttpParamValidators.MustBeString(req.query, "id", 8)
      const comment= await bll.GetComment(id)
      res.json(comment)
  })
  
  router.post('/comment/create',async (req, res)=>{
      const params:ProductNS.CreateCommentParams={
          product_id:HttpParamValidators.MustBeString(req.body, "product_id",8),
          customer_id: HttpParamValidators.MustBeString(req.body, "customer_id",8),
          username: HttpParamValidators.MustBeString(req.body,"username",2),
          comment: HttpParamValidators.MustBeString(req.body, "comment"),
          rate: HttpParamValidators.MustBeNumber(req.body, "rate")
      }
      const comment= await bll.CreateComment(params)
      res.json(comment)
  })
  return router;
}
