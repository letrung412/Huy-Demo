import { ProductNS } from "./product";
import { Db } from "mongodb";
import { FromMongoData, MongoErrorCodes, MongoModel, ToMongoData } from "../lib/mongodb";

export class ProductMongoDAL implements ProductNS.DAL{
    constructor(private db: Db){}
    private col_comment=this.db.collection<MongoModel<ProductNS.Comment>>("comment");
    private col_product=this.db.collection<MongoModel<ProductNS.Product>>("product");
    async init(){}

    async ListComment(product_id:string){
        const comments=await this.col_comment.find({product_id:product_id}).toArray();
        return FromMongoData.Many<ProductNS.Comment>(comments);
    }
    async GetComment(id: string) {
        const comment=await this.col_comment.findOne({_id:id})
        return FromMongoData.One<ProductNS.Comment>(comment)
    }

    async CreateComment(comment:ProductNS.Comment){
        const doc=ToMongoData.One<ProductNS.Comment>(comment)
        try {
            await this.col_comment.insertOne(doc)
        } catch (error) {
            throw error
        }
    }

    async ListProduct(gender: ProductNS.Gender){
        if(gender){
            const products=await this.col_product.find({gender:gender}).toArray();
            return FromMongoData.Many<ProductNS.Product>(products);
        }
        const products=await this.col_product.find().toArray()
        return FromMongoData.Many<ProductNS.Product>(products);
    }

    async GetProduct(id:string){
        const product=await this.col_product.findOne({_id:id})
        return FromMongoData.One<ProductNS.Product>(product)
    }

    async GetProductByName(name:string){
        const products=await this.col_product.find({"name": {$regex:name}}).toArray()
        return FromMongoData.Many<ProductNS.Product>(products)
    }
    async CreateProduct(product: ProductNS.Product){
        const doc=ToMongoData.One<ProductNS.Product>(product)
        try {
            await this.col_product.insertOne(doc)
        } catch (error) {
            throw error
        }
    }

    async UpdateProduct(product:ProductNS.Product){
        const doc=ToMongoData.One<ProductNS.Product>(product)
        try {
            await this.col_product.updateOne({_id:product.id},{$set:doc})
        } catch (error) {
            throw error
        }
    }
}