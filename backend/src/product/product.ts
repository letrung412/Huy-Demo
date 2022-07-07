import rand from '../lib/rand'

export namespace ProductNS{
    export interface Product{
        id:string;
        code:string;
        name:string;
        material:string;
        image:Array<string>;
        color:string;
        consume:number;
        amount:number;
        origin_price:number;
        price:number;
        gender:Gender;
        ctime:number;
        mtime:number;
        dtime?:number
    }

    // export enum SizeType{
    //     S="S",
    //     M="M",
    //     L="L",
    // }
    // export interface Size{
    //     id:string;
    //     product_id:string;
    //     size:SizeType;
    //     amount:number;
    //     ctime:number;
    //     mtime:number;
    // }
    export enum Gender{
        MEN="men",
        WOMEN="women",
        CHILD="children"
    }
    

    export interface CreateProductParams{
        name:string;
        material:string;
        image:Array<string>;
        color:string;
        amount:number;
        origin_price:number;
        price:number;
        gender:Gender;
    }
    
    
    export interface UpdateProductParams{
        name?:string;
        material?:string;
        color?:string;
        image?:Array<string>;
        amount?:number;
        origin_price?:number;
        price?:number;
        gender?:Gender
    }

    export interface Comment{
        id:string;
        product_id:string;
        customer_id:string;
        username:string;
        comment:string;
        rate:number
    }

    export interface CreateCommentParams{
        product_id:string;
        customer_id:string;
        username:string;
        comment:string;
        rate:number
    }
    export interface viewProduct extends Product{
        comments:Comment[];
    }

    export interface BLL{
        ListProduct(gender?:Gender):Promise<viewProduct[]>
        ListProductSales():Promise<viewProduct[]>
        GetProduct(id:string):Promise<viewProduct>
        GetProductByName(name:string):Promise<viewProduct[]>
        GetProductByOrder(id:string):Promise<viewProduct>
        CreateProduct(params:CreateProductParams):Promise<Product>
        UpdateProduct(id:string,params:UpdateProductParams):Promise<viewProduct>
        DeleteProduct(id:string):Promise<viewProduct>

        ListComment(product_id:string):Promise<Comment[]>
        CreateComment(params:CreateCommentParams):Promise<Comment>
        GetComment(id:string):Promise<Comment>
    }
    export interface DAL{
        ListProduct(gender?:Gender):Promise<Product[]>
        GetProduct(id:string):Promise<Product>
        GetProductByName(name:string):Promise<Product[]>
        CreateProduct(product:Product):Promise<void>
        UpdateProduct(product:Product):Promise<void>

        ListComment(product_id:string):Promise<Comment[]>
        CreateComment(params:CreateCommentParams):Promise<void>
        GetComment(id:string):Promise<Comment>
    }

    export const Errors={
        ProductNotFound:new Error("product not found"),
        ProductExist:new Error("product already exist"),
        CommentNotFound:new Error("comment not found"),
    }

    export const Generator={
        NewProductID:()=>rand.alphabet(8),
        NewProductCode:()=>{
            return `Product${rand.number(4)}`
        },
        NewCommentID:()=>rand.alphabet(4)
    }
}