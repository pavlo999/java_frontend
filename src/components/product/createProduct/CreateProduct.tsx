import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICategoryItem } from "../../category/store/type";
import { IProductCreateDTO } from "../store/type";

const CreateProduct:React.FC = ()=>{

    const navigator = useNavigate();
    const [listCategories, setSelectorCategories] = useState<ICategoryItem[]>([]);
    const [productDTO, setproductDTO] = useState<IProductCreateDTO>({
        name:"",
        description:"",
        price:0.00,
        category_id:"",
        images:null        
    });

    useEffect(()=>{
        getDataFromServer();
    },[]);
    
    const getDataFromServer = async() => {
        try{
             await axios.get<ICategoryItem[]>("http://localhost:8083/api/categories").then(res=>{
                const {data} = res;
                setSelectorCategories(data);
             });
         }
         catch(error:any)
         {
             console.log("Щось пішло не так: ",error);
         }
      }

      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLTextAreaElement> |ChangeEvent<HTMLSelectElement> ) => {
        //console.log(e.target.name, e.target.value);
        setproductDTO({...productDTO, [e.target.name]: e.target.value});
    }

      const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log("Select files: ", e.target.files);
        const {target} = e;
        const {files} = target;
        if(files) {
            const arr = Array.from(files);
            console.log("Images: ",files);
            
            setproductDTO({...productDTO,images:arr})
        }
        target.value="";
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("ProductDTO: ",productDTO);
            const item = await axios
              .post("http://localhost:8083/api/products", 
              productDTO, 
                {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                });
            console.log("Server save category", item);
            navigator("/products");
        }catch(error: any) {
            console.log("Щось пішло не так", error);
        }
    }


      const selectorCategoriesItems = listCategories.map((item)=>{
        return <option key={item.id} value={item.id}>{item.name}</option>
      });
      const selectImageList = productDTO.images?.map((image,index)=>{
        return <img key={index} src={URL.createObjectURL(image)} className="flex-1 w-30" />
      });
    return (
      <>
        <div className="p-8 rounded border border-gray-200">
          <h1 className="font-medium text-3xl">Додати категорію</h1>

          <form onSubmit={onSubmitHandler}>
            <div className="mt-8 grid lg:grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  Назва
                </label>
                <input
                  type="text"
                  name="name"
                  value={productDTO.name}
                  onChange={onChangeHandler}
                  id="name"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Вкажіть назву продукту"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Опис
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={productDTO.description}
                  onChange={onChangeHandler}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Вкажіть опис..."
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категорія
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  onChange={onChangeHandler}
                  className="h-full rounded-md border bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option hidden value={""}>
                    Виберіть категорію
                  </option>
                  {selectorCategoriesItems}
                </select>
              </div>
              <div>
                  <label
                    htmlFor="price"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    Ціна
                  </label>
                  <input
                    type="number"
                    min={"0.00"}
                    step={"0.01"}
                    name="price"
                    value={productDTO.price}
                    onChange={onChangeHandler}
                    id="price"
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  />
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Фото
                </label>

                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="selectImage"
                    className="inline-block w-full overflow-hidden"

                  >
                    {productDTO.images === null ? (
                      <svg
                        className="h-full w-20 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                        <div className=" inline-grid grid-cols-4 sm:grid-cols-10 gap-2">
                        {selectImageList}
                        </div>
                    )}
                  </label>
                 
                </div>
                <div className="mt-4"> <label
                    htmlFor="selectImage"
                    className="rounded-md border border-gray-300 bg-white 
                         py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Обрати фото
                  </label></div>
               
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="selectImage"
                  className="hidden"
                  onChange={onFileHandler}
                />
              </div>
            </div>
            <div className="space-x-4 mt-8">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Додати
              </button>
              <Link
                to="/"
                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              >
                На головну
              </Link>
            </div>
          </form>
        </div>
      </>
    );
}
export default CreateProduct;
