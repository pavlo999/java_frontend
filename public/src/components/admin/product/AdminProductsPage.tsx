import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProductItem } from "./store/type";
import { APP_ENV } from "../../../env";
import http from "../../../http_common";
import ModalDelete from "../../common/modal/ModalDelete";
import Loader from "../../common/loader";


const AdminProductsPage = () => {
  const [list, setlist] = useState<IProductItem[]>([]);
  const [isLoaded , setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getAllDataFromServer();
  }, []);

  const deleteProductHandler  = async (id:number) => {
    try{
      await http.delete(`${APP_ENV.REMOTE_HOST_NAME}api/products?id=`+id).then(result=>{
        setlist(list.filter(e=>{return e.id!==id}));       
      });
    }catch(e:any){
    }   
  };

  const getAllDataFromServer = async () => {
    try {
      await axios
        .get<IProductItem[]>(`${APP_ENV.REMOTE_HOST_NAME}api/products`)
        .then((result) => {
          const { data } = result;
          setlist(data);
          setLoaded(true);
        });
    } catch (error: any) {
      console.log("Error: ", error);
      setLoaded(true);
    }
  };


  const elements = list.map((product) => (
    <div key={product.name+"_"+product.id} className="relative">
      <div className="group relative">
        <div className="relative h-[100%] w-[100%] overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
          <img
            src={"http://localhost:8083/files/600_" + product.images[0]}
            alt={product.images[0]}
            className="h-[100%] w-[100%] object-scale-down object-center"
          />
        </div>
        <h3 className="mt-8 text-sm text-gray-900">
          <Link to={`/product/info/${product.id}`}>
            <span className="absolute inset-0" />
            <p className="font-bold text-xl text-center">{product.name}</p>
          </Link>
        </h3>
        <p className="text-base font-semibold text-gray-500">
          {"Опис продукту: "}
          {product.description}
        </p>
        <p className="text-xl font-bold text-gray-900">
          {"Ціна: "}
          {product.price}
          {" грн."}
        </p>
      </div>

      <div className="mb-3 flex flex-row-reverse justify-between">
        <Link
          to={`/admin/product/edit/${product.id}`}
          className=" cursor-pointer text-sm bg-green-500 hover:green-red-700 text-white font-bold py-2 px-4 rounded-md"
        >
          {"Редагувати"}
        </Link>

        <ModalDelete
          id={product.id}
          title="Видалення"
          text={`Ви дійсно бажаєте видалить '${product.name}'?`}
          onDelete={deleteProductHandler}
        />
      </div>
    </div>
  ));

  return (
    <>
     {!isLoaded &&
      <Loader/>}
      <div className=" text-center pt-5">
        <Link
          to="/admin/product/create"
          className=" bg-green-600 px-4 py-2 rounded-md border border-transparent hover:bg-green-500 text-white text-lg font-bold "
        >
          {"Додати продукт"}
        </Link>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {"Список продуктів"}
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-3 lg:space-y-0">
            {elements}
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminProductsPage;
