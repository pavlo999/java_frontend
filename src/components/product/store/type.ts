export interface IProductCreateDTO{
     name:string,
     description:string,
     price:number|string,
     category_id:number|string,
     images:File[]|null,
}

export interface IProductItem{
    id:number,
    name:string,
    price: number,
    description:string,
    category:string,
    images:Array<string>, 
 }