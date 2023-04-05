export interface IProductEditDTO{
     id:number,
     name:string,
     price: number,
     description:string,
     category_id:number|string,
     remoteImages:Array<string>, 
     images:Array<File>, 
  }

export interface IProductCreateDTO{
     name:string,
     description:string,
     price:number|string,
     category_id:number|string,
     images:Array<File>,
}

export interface IProductItem{
    id:number,
    name:string,
    price: number,
    description:string,
    category:string,
    category_id:number|string,
    images:Array<string>, 
 }