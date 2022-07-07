import { CustomerNS } from "../customer/customer";

export namespace CustomerAuthNS {
    export type Customer = CustomerNS.Customer;
    export interface CustomerSecret {
        customer_id: string;
        name: string;
        value: string;
    }

    export interface CustomerSession {
        id: string;
        customer_id: string;
    }

    export interface SecretEncoder {
        name: string;
        encode(plain: string): Promise<string>;
        compare(plain: string, secret: string): Promise<boolean>;
    }
    export interface BLL {
        GetCustomer(id: string): Promise<Customer>;
    
        SetPassword(customer_id: string, password: string): Promise<void>;
        Login(customername: string, password: string): Promise<CustomerSession>;
        GetCustomerSession(id: string): Promise<CustomerSession>;
        RemovePassword(customer_id: string): Promise<void>
    }
    
    
    export interface DAL {
        SaveCustomerSecret(value: CustomerSecret): Promise<void>;
        GetCustomerSecret(customer_id: string, name: string): Promise<CustomerSecret>;
    
        CreateCustomerSession(session: CustomerSession): Promise<void>;
        GetCustomerSession(id: string): Promise<CustomerSession>;
        GetSessionByCustomer(customer_id : string) : Promise<CustomerSession[]>;
        RemovePassword(customer_id: string): Promise<void>
    }
    
    export const Errors = {
        ErrCustomerHasNoLogin: new Error("customer has no login"),
        ErrWrongPassword: new Error("wrong password"),
        ErrAllowAccess: new Error("customer role not allow full access")
    }
}