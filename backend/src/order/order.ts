import rand from "../lib/rand";
import { ProductNS } from "../product/product";
import {format} from 'date-fns'
export namespace OrderNS{
    export interface Order{
        id:string,
        code:string,
        status:OrderStatus,
        customer_id: string,
        total:number,
        info?:{
        address:string,
        name:string,
        phone:string,
        }
        ctime:number,
        mtime:number,
    }

    export enum OrderStatus{
        NEW="new",
        DELETE="delete",
        WAIT="await",
        DONE="done",
        CANCLE="cancel"
    }

    export interface Item{
        id:string,
        product_id:string,
        order_id:string,
        amount:number,
        ctime:number,
        mtime:number
    }

    export interface CreateItemParams{
        product_id:string,
        amount:number,
    }

    export interface UpdateItemParams{
        product_id?:string,
        amount?:number
    }
    
    export interface viewItem extends Item{
        product:ProductNS.Product
    }

    export interface viewOrder extends Order{
        items:viewItem[]
    }
    export interface CreateOrderParmas{
        customer_id:string,
        itemParams:CreateItemParams
    }

    export interface UpdateOrderParams{
        status?:OrderStatus,
        info?:{
            address:string,
            name:string,
            phone:string,
            }
        itemParams?:UpdateItemParams
    }

    export interface QueryOrderParams{
        status?:OrderStatus,
        customer_id?:string
    }

    export interface QueryFilterParams{
        status:OrderStatus,
        gender?:ProductNS.Gender,
        from?:number,
        to?:number,
    }

    export enum QueryReport{
        DAY="day",
        WEEK="week"
    }
    export interface BLL{
        ListOrder(query:QueryOrderParams):Promise<viewOrder[]>,
        GetViewOrder(id: string):Promise<viewOrder>,
        CreateOrder(params:CreateOrderParmas):Promise<viewOrder>,
        UpdateOrder(id:string,params:UpdateOrderParams):Promise<viewOrder>
        FilterOrder(query:QueryFilterParams):Promise<viewOrder[]>
        OrderByReport(query:QueryReport):Promise<Object>
        GetItem(id: string):Promise<viewItem>
        UpdateItem(id: string,params:UpdateItemParams):Promise<viewItem>
    }

    export interface DAL{
        ListOrder(query:QueryOrderParams):Promise<Order[]>
        GetOrder(id: string):Promise<Order>
        CreateOrder(order:Order):Promise<void>
        UpdateOrder(order:Order):Promise<void>
        ListOrderByReport(query:QueryReport):Promise<Order[]>

        ListItem(product_id: string):Promise<Item[]>
        GetItem(order_id: string):Promise<Item>
        CreateItem(item:Item):Promise<void>
        UpdateItem(item:Item):Promise<void>
    }

    export const Errors={
        OrderNotFound: new Error("Order not found"),
        OrderExist: new Error("Order does exist"),
        ItemNotFound:new Error("Item not found"),
        ItemExists: new Error("Item does exist")
    }

    export const Generator={
        NewOrderID : () => rand.alphabet(12),
        NewOrderCode : () => format(Date.now(), "yyMMddhhmmss"),
        NewItemID:()=>rand.alphabet(12),
    }

    export const Utils={
        TotalMoneyByDay:(viewOrder:Array<any>)=>{
            const sum=viewOrder.reduce((init,curr)=>{
                return init+curr.total
            },0)
            return sum
        },
        FilterOrder:(viewOrder:viewOrder[])=>{
            const newArr=viewOrder.map(el=>{
                return {
                    ...el,
                    day:new Date(el.mtime).toDateString().split(' ')[0]
                }
            })
            return newArr
        },
        FilterReport:(viewArr:Array<any>)=>{
            const MonArr=viewArr.filter(el=>el.day==="Mon")
            const TueArr=viewArr.filter(el=>el.day==="Tue")
            const WedArr=viewArr.filter(el=>el.day==="Wed")
            const ThuArr=viewArr.filter(el=>el.day==="Thu")
            const FriArr=viewArr.filter(el=>el.day==="Fri")
            const SatArr=viewArr.filter(el=>el.day==="Sat")
            const SunArr=viewArr.filter(el=>el.day==="Sun")
            return [
                {amount:MonArr.length, total:OrderNS.Utils.TotalMoneyByDay(MonArr),day:"Mon"},
                {amount:TueArr.length, total:OrderNS.Utils.TotalMoneyByDay(TueArr),day:"Tue"},
                {amount:WedArr.length, total:OrderNS.Utils.TotalMoneyByDay(WedArr),day:"Wed"},
                {amount:ThuArr.length, total:OrderNS.Utils.TotalMoneyByDay(ThuArr),day:"Thur"},
                {amount:FriArr.length, total:OrderNS.Utils.TotalMoneyByDay(FriArr),day:"Fri"},
                {amount:SatArr.length, total:OrderNS.Utils.TotalMoneyByDay(SatArr),day:"Sat"},
                {amount:SunArr.length, total:OrderNS.Utils.TotalMoneyByDay(SunArr),day:"Sun"}
            ]
        }
    }
}