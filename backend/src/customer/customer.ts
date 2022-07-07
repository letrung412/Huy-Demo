import rand from "../lib/rand";

export namespace CustomerNS{
    export interface Customer{
        id: string;
        name: string;
        role:Role;
        username:string;
        birthday:string
        cccd:string;
        phone: string
    }
    export enum Role{
        ADMIN="admin",
        CUSTOMER="customer",
        STAFF="staff"
    }
    export interface CreateCustomerParams{
        name: string;
        role:Role;
        username:string;
        birthday:string;
        cccd:string;
        phone:string;
    }
    export interface UpdateCustomerParams{
        name?: string;
        role?:Role;
        username?:string
        birthday?:string;
        cccd?:string;
        phone?:string;
    }

    export interface BLL {
        ListCustomer():Promise<Customer[]>;
        GetCustomer(id:string):Promise<Customer>;
        GetCustomerByUsername(username:string):Promise<Customer>
        CreateCustomer(params:CreateCustomerParams):Promise<Customer>;
        UpdateCustomer(id:string, params:UpdateCustomerParams):Promise<Customer>
        DeleteCustomer(id:string):Promise<void>
    }

    export interface DAL{
        ListCustomer():Promise<Customer[]>;
        GetCustomer(id:string):Promise<Customer>;
        GetCustomerByUsername(username:string):Promise<Customer>
        CreateCustomer(customer:Customer):Promise<void>;
        UpdateCustomer(customer:Customer):Promise<void>
    }
    
    export const Errors={
        CustomerNotFound:new Error("Customer not found"),
        CustomerExists:new Error("Customer already exists")
    }

    export const Generator={
        NewCustomerID:()=>rand.alphabet(8)
    }
}