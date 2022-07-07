import { FilterData } from "../common/filter_data_handlers";
import { OrderNS } from "./order";
import { ProductNS } from "../product/product";
export class NewOrderBLLBase implements OrderNS.BLL {
  constructor(private dal: OrderNS.DAL, private product_bll: ProductNS.BLL) {}

  async init() {}

  async GetItem(order_id: string) {
    const item = await this.dal.GetItem(order_id);
    if (!item || !FilterData.One(item)) {
      throw OrderNS.Errors.ItemNotFound;
    }
    const product = await this.product_bll.GetProductByOrder(item.product_id);
    const doc: OrderNS.viewItem = {
      ...item,
      product: product,
    };
    return doc;
  }


  async GetViewOrder(id: string) {
    const order = await this.dal.GetOrder(id);
    if (!order || !FilterData.One(order)) {
      throw OrderNS.Errors.OrderNotFound;
    }
    const item = await this.GetItem(order.id);
    const viewOrder: OrderNS.viewOrder = {
      ...order,
      items: [item],
    };
    return viewOrder;
  }
  async ListOrder(query: OrderNS.QueryOrderParams) {
    let viewOrderArr: Array<OrderNS.viewOrder> = [];
    const orders = await this.dal.ListOrder(query);
    for (let o of FilterData.Many(orders)) {
      const viewOrder = await this.GetViewOrder(o.id);
      viewOrderArr.push(viewOrder);
    }
    return viewOrderArr;
  }

  async FilterOrder(query:OrderNS.QueryFilterParams){
    const orders= await this.dal.ListOrder({status:query.status});
    let viewOrderArr: Array<OrderNS.viewOrder> = []
    for(let o of FilterData.Many(orders)) {
      const viewOrder=await this.GetViewOrder(o.id)
      viewOrderArr.push(viewOrder)
    }
    if(query.gender){
      const result=viewOrderArr.filter(v=>v.items[0].product.gender==query.gender)
      return result
    }else if(query.from && query.to){
      const result=viewOrderArr.filter(v=>v.total>= query.from && v.total<= query.to)
      return result
    }
    return viewOrderArr
  }

  
  async CreateOrder(params: OrderNS.CreateOrderParmas) {
    const time = Date.now();
    const { product_id, amount } = params.itemParams;
    const product = await this.product_bll.GetProduct(product_id);
    const order = {
      id: OrderNS.Generator.NewOrderID(),
      code: OrderNS.Generator.NewOrderCode(),
      status: OrderNS.OrderStatus.NEW,
      customer_id: params.customer_id,
      total: product.price * amount,
      ctime: time,
      mtime: time,
    };
    const item = {
      id: OrderNS.Generator.NewItemID(),
      product_id: product.id,
      order_id: order.id,
      amount: amount,
      ctime: time,
      mtime: time,
    };
    await this.dal.CreateOrder(order);
    await this.dal.CreateItem(item);
    return {
      ...order,
      items: [
        {
          ...item,
          product: product,
        },
      ],
    };
  }

  async UpdateItem(id: string, params: OrderNS.UpdateItemParams) {
    const item = await this.dal.GetItem(id);
    const product = await this.product_bll.GetProduct(item.product_id);
    if (!item || !FilterData.One(item)) {
      throw OrderNS.Errors.ItemNotFound;
    }
    const doc = {
      ...item,
      amount: params.amount,
      mtime: Date.now(),
    };
    await this.dal.UpdateItem(doc);
    return {
      ...doc,
      product: product,
    };
  }
  async UpdateOrder(id: string, params: OrderNS.UpdateOrderParams) {
    const order = await this.dal.GetOrder(id);
    if (!order || !FilterData.One(order)) {
      throw OrderNS.Errors.OrderNotFound;
    }
    let item = await this.dal.GetItem(order.id);
    if (!item || !FilterData.One(item)) {
      throw OrderNS.Errors.ItemNotFound;
    }
    const product = await this.product_bll.GetProduct(item.product_id);
    if (params.status === OrderNS.OrderStatus.NEW) {
      //status=new
      let updateItem: OrderNS.viewOrder;
      if (params.itemParams) {
        order.total = params.itemParams.amount * product.price;
        const doc = await this.UpdateItem(order.id, params.itemParams);
        updateItem = {
          ...order,
          items: [doc],
        };
        await this.dal.UpdateOrder(order);
      }
      return updateItem;
    } else if (params.status === OrderNS.OrderStatus.DELETE) {
      //status=cancle
      const time = Date.now();
      const doc = {
        ...order,
        status: params.status,
        dtime: time,
      };
      const updateItem = {
        ...item,
        dtime: time,
      };
      await this.dal.UpdateItem(updateItem);
      await this.dal.UpdateOrder(doc);
      return {
        ...doc,
        items: [
          {
            ...updateItem,
            product: product,
          },
        ],
      };
    } else if (params.status === OrderNS.OrderStatus.WAIT) {
      // status="done"
      const time = Date.now();
      const doc = {
        ...order,
        status: params.status,
        mtime: time,
      };
      if (params.info) {
        doc.info = params.info;
      }
      const updateProduct = {
        ...product,
        consume: product.consume + item.amount,
        amount: product.amount - item.amount,
        mtime: time,
      };
      await this.dal.UpdateOrder(doc);
      await this.product_bll.UpdateProduct(item.product_id, updateProduct);
      return {
        ...doc,
        items: [
          {
            ...item,
            product: updateProduct,
          },
        ],
      };
    } else if (params.status === OrderNS.OrderStatus.CANCLE) {
      const time = Date.now();
      const doc = {
        ...order,
        status: params.status,
        mtime: time,
      };
      if (params.info) {
        doc.info = params.info;
      }
      const updateProduct = {
        ...product,
        consume: product.consume - item.amount,
        amount: product.amount + item.amount,
        mtime: time,
      };
      await this.dal.UpdateOrder(doc);
      await this.product_bll.UpdateProduct(item.product_id, updateProduct);
      return {
        ...doc,
        items: [
          {
            ...item,
            product: updateProduct,
          },
        ],
      };
    } else {
      const time = Date.now();
      if(order.status===OrderNS.OrderStatus.NEW){
        const time = Date.now();
      const doc = {
        ...order,
        status: params.status,
        mtime: time,
      };
      if (params.info) {
        doc.info = params.info;
      }
      const updateProduct = {
        ...product,
        consume: product.consume + item.amount,
        amount: product.amount - item.amount,
        mtime: time,
      };
      await this.dal.UpdateOrder(doc);
      await this.product_bll.UpdateProduct(item.product_id, updateProduct);
      return {
        ...doc,
        items: [
          {
            ...item,
            product: updateProduct,
          },
        ],
      };
      }else {
        const doc = {
          ...order,
          status: params.status,
          mtime: time,
        };
        await this.dal.UpdateOrder(doc);
        return {
          ...doc,
          items: [
            {
              ...item,
              product: product,
            },
          ],
        };
      }
    }
  }

  async OrderByReport(query:OrderNS.QueryReport){
    const orders= await this.dal.ListOrderByReport(query)
    let viewOrderArr=[]
    for(const o of orders){
      const viewOrder=await this.GetViewOrder(o.id)
      viewOrderArr.push(viewOrder)
    }
    if(query===OrderNS.QueryReport.WEEK){
      const menOrders=viewOrderArr.filter(el=>el.items[0].product.gender===ProductNS.Gender.MEN)
      const womenOrders=viewOrderArr.filter(el=>el.items[0].product.gender===ProductNS.Gender.WOMEN)
      const childOrders=viewOrderArr.filter(el=>el.items[0].product.gender===ProductNS.Gender.CHILD)
      const mapMenOrders=OrderNS.Utils.FilterOrder(menOrders)
      const mapWomenOrders=OrderNS.Utils.FilterOrder(womenOrders)
      const mapChildOrders=OrderNS.Utils.FilterOrder(childOrders)
      return {
        men:OrderNS.Utils.FilterReport(mapMenOrders),
        women:OrderNS.Utils.FilterReport(mapWomenOrders),
        child:OrderNS.Utils.FilterReport(mapChildOrders)
      }
    }else{
      const menOrders=viewOrderArr.filter(o=>o.items[0].product.gender==ProductNS.Gender.MEN)
      const womenOrders=viewOrderArr.filter(o=>o.items[0].product.gender==ProductNS.Gender.WOMEN)
      const childOrders=viewOrderArr.filter(o=>o.items[0].product.gender==ProductNS.Gender.CHILD)
      return {
        men:{
          amount:menOrders.length,
          total:OrderNS.Utils.TotalMoneyByDay(menOrders)
        },
        women:{
          amount:womenOrders.length,
          total:OrderNS.Utils.TotalMoneyByDay(womenOrders)
        },
        child:{
          amount:childOrders.length,
          total:OrderNS.Utils.TotalMoneyByDay(childOrders)
        }
      }
    }
    
  }
}
