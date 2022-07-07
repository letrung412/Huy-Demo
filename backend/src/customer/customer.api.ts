import { HttpParamValidators } from "../lib/http";
import * as express from "express";
import {CustomerNS} from "./customer"
import { CustomerAuthNS } from "../auth/auth";

export function NewCustomerAPI(
    bll: CustomerNS.BLL,
    auth_bll: CustomerAuthNS.BLL
){
    const router=express.Router();
    const role_type=Object.values(CustomerNS.Role)
    router.get('/customer/list', async (req, res) => {
        const customers=await bll.ListCustomer()
        res.json(customers);
    })
    
    router.get('/customer/get', async (req, res) => {
        const id=HttpParamValidators.MustBeString(req.query,"id",8)
        const customers=await bll.GetCustomer(id)
        res.json(customers)
    })

    router.post('/customer/create', async (req, res) => {
        const params:CustomerNS.CreateCustomerParams={
           name:HttpParamValidators.MustBeString(req.body,"name",2),
           role:HttpParamValidators.MustBeOneOf(req.body,"role",role_type),
           username:HttpParamValidators.MustBeString(req.body,'username',2),
           birthday:HttpParamValidators.MustBeString(req.body,'birthday',10),
           cccd:HttpParamValidators.MustBeString(req.body,'cccd',8),
           phone:HttpParamValidators.CheckPhone(req.body,'phone',10)  
        }
        const customer=await bll.CreateCustomer(params)
        res.json(customer)
    })

    router.post('/customer/update',async(req, res) => {
        const id=HttpParamValidators.MustBeString(req.query,"id",8)
        const params:CustomerNS.UpdateCustomerParams={}
        if(req.body.name){
            params.name = HttpParamValidators.MustBeString(req.body,"name",2)
        }
        if(req.body.username){
            params.username = HttpParamValidators.MustBeString(req.body,'username',2)
        }
        if(req.body.birthday){
            params.birthday = HttpParamValidators.MustBeString(req.body,'birthday',10)
        }
        if(req.body.cccd){
           params.cccd=HttpParamValidators.MustBeString(req.body,'cccd',8)
        }
        if(req.body.role){
           params.role=HttpParamValidators.MustBeOneOf(req.body,"role",role_type)
        }
        if(req.body.phone){
            params.phone = HttpParamValidators.CheckPhone(req.body,'phone',10)  
        }

        const customer=await bll.UpdateCustomer(id,params)
        res.json(customer)
    })

    router.post('/customer/delete',async(req, res)=>{
        const id = HttpParamValidators.MustBeString(req.query, "id",8)
        await bll.DeleteCustomer(id)
        await auth_bll.RemovePassword(id)
        res.json(1) 
    })
    return router
}