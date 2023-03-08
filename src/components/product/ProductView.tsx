import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { IProductItem } from "./store/type";

const Product = ()=>{
    const [list, setlist] = useState<IProductItem[]>([]);
    useEffect(() => {
        getDataFromServer();
      }, [])

      const getDataFromServer = async() => {
        try{
            await axios.get<IProductItem[]>("http://localhost:8083/api/products").then((result)=>{
                 const {data} = result;
                 setlist(data);
             });
         }
         catch(error:any)
         {
             console.log("Error: ",error);
         }
      }
      const elements = list.map((product) => (
        <div key={product.name} className="group relative">
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
            <img
              src={"http://localhost:8083/files/600_"+product.images[0]}
              alt={product.images[0]}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="mt-6 text-sm text-gray-900">
            <Link to={"/asd"}>
              <span className="absolute inset-0" />
              <p className="font-bold text-xl text-center">
              {product.name}
              </p>
            </Link>
          </h3>
          <p className="text-base font-semibold text-gray-500">{"Опис продукту: "}{product.description}</p>
          <p className="text-xl font-bold text-gray-900">{"Ціна: "}{product.price}{" грн."}</p>
        </div>
      ))

    return (
      <>
        <div className=" text-center pt-5">
          <Link
            to="/product/create"
            className=" bg-green-600 px-4 py-2 rounded-md border border-transparent hover:bg-green-500 text-white text-lg font-bold "
          >
            Create product
          </Link>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Collections products
            </h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-3 lg:space-y-0">
              {elements}
            </div>
          </div>
        </div>
      </>
    );
}
export default Product;