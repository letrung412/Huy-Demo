import rand from "../lib/rand";
import { CustomerAuthNS } from "./auth";
import { CustomerNS } from "../customer/customer";

export class CustomerAuthBLLBase implements CustomerAuthNS.BLL {
    constructor(
        private dal: CustomerAuthNS.DAL,
        private customerBLL: CustomerNS.BLL
    ) { }

    async init() {}
    
    async GetCustomer(id: string) {
        return this.customerBLL.GetCustomer(id);
    }

    async SetPassword(customer_id: string, password: string) {
        await this.customerBLL.GetCustomer(customer_id);
        const secret: CustomerAuthNS.CustomerSecret = {
            customer_id,
            name: "password",
            value: password
        }
        await this.dal.SaveCustomerSecret(secret);
    }

    async Login(username: string, password: string) {
        const customer = await this.customerBLL.GetCustomerByUsername(username);
        // comapre password
        const secret = await this.dal.GetCustomerSecret(customer.id, "password");
        if (!secret) {
            throw CustomerAuthNS.Errors.ErrCustomerHasNoLogin;
        }
        if (secret.value !== password) {
            throw CustomerAuthNS.Errors.ErrWrongPassword;
        } else {
            const session: CustomerAuthNS.CustomerSession = {
                id: rand.alphabet(16),
                customer_id: customer.id,
            };
            await this.dal.CreateCustomerSession(session);
            return session;
        }
    }

    async GetCustomerSession(id: string) {
        return this.dal.GetCustomerSession(id);
    }

    async RemovePassword(customer_id:string){
        await this.dal.RemovePassword(customer_id);
    }
}