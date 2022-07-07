import {CustomerNS} from './customer'
import {FilterData} from '../common/filter_data_handlers'

export class NewCustomerBLLBase implements CustomerNS.BLL {
    constructor(private dal:CustomerNS.DAL){}

    async init() {}

    async ListCustomer(){
        const customer = await this.dal.ListCustomer()
        return FilterData.Many(customer)
    }

    async GetCustomer(id: string){
        const customer = await this.dal.GetCustomer(id)
        if(!customer||FilterData.One(customer).length==0){
            throw CustomerNS.Errors.CustomerNotFound
        }
        return customer
    }

    async GetCustomerByUsername(username: string) {
        const customer = await this.dal.GetCustomerByUsername(username)
        if(!customer||FilterData.One(customer).length==0){
            throw CustomerNS.Errors.CustomerNotFound
        }
        return customer
    }

    async CreateCustomer(params: CustomerNS.CreateCustomerParams){
        const doc={
            id:CustomerNS.Generator.NewCustomerID(),
            ...params,
            ctime:Date.now(),
            mtime:Date.now()
        }

        await this.dal.CreateCustomer(doc)
        return doc
    }

    async UpdateCustomer(id: string,params: CustomerNS.UpdateCustomerParams){
        const customer = await this.GetCustomer(id)
        const doc={
            ...customer,
            ...params,
            mtime:Date.now(),
        }
        await this.dal.UpdateCustomer(doc)
        return doc
    }
    
    async DeleteCustomer(id: string) {
        const customer = await this.GetCustomer(id)
        const doc={
            ...customer,
            dtime:Date.now()
        }
        await this.dal.UpdateCustomer(doc)
    }
}