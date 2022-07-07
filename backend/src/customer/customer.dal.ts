import { CustomerNS } from "./customer";
import { Db } from "mongodb";
import { FromMongoData, MongoErrorCodes, MongoModel, ToMongoData } from "../lib/mongodb";

export class CustomerMongoDAL implements CustomerNS.DAL{
    constructor(private db: Db) {}
    private col_customer=this.db.collection<MongoModel<CustomerNS.Customer>>("customer");

    async init(){
        this.col_customer.createIndex("username",{unique:true,background:true})
    }

    async ListCustomer(){
        const customers = await this.col_customer.find().toArray();
        return FromMongoData.Many<CustomerNS.Customer>(customers)
    }

    async GetCustomer(id:string){
        const customers = await this.col_customer.findOne({_id:id})
        return FromMongoData.One<CustomerNS.Customer>(customers)
    }

    async GetCustomerByUsername(username:string){
        const customers = await this.col_customer.findOne({username:username})
        return FromMongoData.One<CustomerNS.Customer>(customers)
    }

    async CreateCustomer(customer:CustomerNS.Customer){
        const doc=ToMongoData.One<CustomerNS.Customer>(customer)
        try {
            await this.col_customer.insertOne(doc)
        } catch (error) {
            if(error.code===MongoErrorCodes.Duplicate){
                throw CustomerNS.Errors.CustomerExists
            }
            throw error
        }
    }

    async UpdateCustomer(customer:CustomerNS.Customer){
        const doc=ToMongoData.One<CustomerNS.Customer>(customer)
        try {
            await this.col_customer.updateOne({_id:customer.id},{$set:doc})
        } catch (error) {
            throw error
        }
    }
}