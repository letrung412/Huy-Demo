import {FilterData} from '../common/filter_data_handlers'
import { OrderNS } from '../order/order'
import { ProductNS } from './product'

export class NewProductBLLBase implements ProductNS.BLL {
    constructor(private dal:ProductNS.DAL, private orderDAL:OrderNS.DAL){}

    async init(){}

    async ListComment(product_id:string){
        const comments= await this.dal.ListComment(product_id)
        if(FilterData.Many<ProductNS.Comment>(comments).length==0){
            return []
        }
        return comments
    }

    async GetComment(id:string){
        const comment=await this.dal.GetComment(id)
        if(!comment || !FilterData.One(comment)){
            throw ProductNS.Errors.CommentNotFound
        }
        return comment
    }

    async CreateComment(params:ProductNS.CreateCommentParams){
        const doc={
            id:ProductNS.Generator.NewCommentID(),
            ...params,
            ctime:Date.now(),
            mtime:Date.now()
        }
        await this.dal.CreateComment(doc)
        return doc
    }

    async GetProduct(id:string){
        const product=await this.dal.GetProduct(id)
        if(!product || !FilterData.One(product)){
            throw ProductNS.Errors.ProductNotFound
        }
        const comments=await this.ListComment(product.id)
        return {
            ...product,
            comments: comments
        }
    }

    async GetProductByName(name:string){
        const products=await this.dal.GetProductByName(name)
        if(FilterData.Many(products).length==0){
            throw ProductNS.Errors.ProductNotFound
        }
        const viewProductArr:ProductNS.viewProduct[]=[]
        for(const p of FilterData.Many(products)){
            const comments=await this.ListComment(p.id)
            const product:ProductNS.viewProduct={
                ...p,
                comments: comments
            }
            viewProductArr.push(product)
        }
        return viewProductArr
    }

    async GetProductByOrder(id:string){
        const product=await this.dal.GetProduct(id)
        const comments=await this.ListComment(product.id)
        return {
            ...product,
            comments: comments
        }
    }
    async ListProduct(gender:ProductNS.Gender){
        if(gender){
            let viewProduct=[]
            const products=await this.dal.ListProduct(gender)
            for(const p of FilterData.Many(products)){
                const product=await this.GetProduct(p.id)
                viewProduct.push(product)
            }
            return viewProduct
        }
        let viewProduct=[]
            const products=await this.dal.ListProduct()
            for(const p of FilterData.Many(products)){
                const product=await this.GetProduct(p.id)
                viewProduct.push(product)
            }
            return viewProduct
    }

    async ListProductSales(){
        let viewProduct=[]
            const products=await this.dal.ListProduct()
            const filterProducts=FilterData.Many(products).filter(el=> el.origin_price!==el.price)
            for(const p of filterProducts){
                const product=await this.GetProduct(p.id)
                viewProduct.push(product)
            }
            return viewProduct
    }

    async CreateProduct(params:ProductNS.CreateProductParams){
        const doc={
            id:ProductNS.Generator.NewProductID(),
            code:ProductNS.Generator.NewProductCode(),
            ...params,
            consume:0,
            ctime:Date.now(),
            mtime:Date.now()
        }
        await this.dal.CreateProduct(doc)
        return doc
    }

    async UpdateProduct(id:string, params:ProductNS.UpdateProductParams){
        const product=await this.dal.GetProduct(id)
        if(!product || !FilterData.One(product)){
            throw ProductNS.Errors.ProductNotFound
        }
        const comments=await this.ListComment(product.id)
        const doc={
            ...product,
            ...params,
            mtime:Date.now()
        }
        if(params.image){
            doc.image=params.image
        }
        if(params.price){
            const items=await this.orderDAL.ListItem(product.id)
            for(let i of items){
                const order=await this.orderDAL.GetOrder(i.order_id)
                const newOrder={
                    ...order,
                    total:i.amount*params.price
                }
                await this.orderDAL.UpdateOrder(newOrder)
            }
        }
        await this.dal.UpdateProduct(doc)
        return {
            ...doc,
            comments:comments
        }
    }

    async DeleteProduct(id:string){
        const product=await this.dal.GetProduct(id)
        if(!product || !FilterData.One(product)){
            throw ProductNS.Errors.ProductNotFound
        }
        const comments=await this.ListComment(product.id)
        const doc={
            ...product,
            dtime:Date.now()
        }
        await this.dal.UpdateProduct(doc)
        return {
            ...doc,
            comments:comments
        }
    }
}