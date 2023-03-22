import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { ICategoryItem } from "../../category/store/type";
import Loader from "../../common/loader";
import { IProductEditDTO, IProductItem } from "../store/type";
import { FaTimes} from "react-icons/fa";
import '../../../App.css';

const EditProductPage: React.FC = () => {
  const navigator = useNavigate();
  const [listCategories, setListCategories] = useState<ICategoryItem[]>([]);
  const [loadedImageList, setLoadedImageList] = useState<string[]>([]);
  const [isLoaded , setLoaded] = useState<boolean>(false);
  const [updateModel, setUpdateModel] = useState<IProductEditDTO>({
    id: 0,
    name: "",
    description: "",
    price: 0.0,
    category_id: 0,
    remoteImages: [],
    images: [],
  });
  const params = useParams();

  useEffect(() => {
    getDataFromServer();
  }, []);

  const getDataFromServer = async () => {
    try {
         await axios
        .get<ICategoryItem[]>(`${APP_ENV.REMOTE_HOST_NAME}api/categories`)
        .then((res) => {
          const { data } = res;
          setListCategories(data);      
        });

     await axios
       .get<IProductItem>(
         `${APP_ENV.REMOTE_HOST_NAME}api/products/${params.id}`
       )
       .then((res) => {
         const { data } = res;
         setLoadedImageList(data.images);
        
         const product: IProductEditDTO = {
           id: data.id,
           name: data.name,
           description: data.description,
           price: data.price,
           category_id: data.category_id,
           remoteImages: [],
           images: [],
         };
         setUpdateModel(product);
         setLoaded(true);
       });
        
    } catch (error: any) {
      console.log("Щось пішло не так: ", error);
      setLoaded(true);
    }
  };

  const onChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      |ChangeEvent<HTMLSelectElement>
  ) => {
    setUpdateModel({ ...updateModel, [e.target.name]: e.target.value });
  };

  const onFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    if (files) {
      const file = files[0];
      setUpdateModel({ ...updateModel, images: [...updateModel.images, file] });
    }
    target.value = "";
  };

  const onDeleteHandler = (name: string) => {
    setLoadedImageList(loadedImageList?.filter(image=>{return image !== name}));
    //update new images list
    var newL = updateModel.images?.filter(
      (image) => !image.name.includes(name)
    ) as File[];
    setUpdateModel({ ...updateModel, images: newL });

    //added name images for remove from server
    setUpdateModel((prev) => {
      return { ...prev, remoteImages: [...prev.remoteImages, name] };
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    console.log("ProductDTO: ", updateModel);
    setLoaded(false);
        await axios
          .put(`${APP_ENV.REMOTE_HOST_NAME}api/products/`+updateModel.id,
          updateModel,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
         navigator("/products");
        console.log("Done!");
        
    }catch(error: any) {
      setLoaded(true);
        console.log("Щось пішло не так", error);
    }
  };

  const selectorCategoriesItems = listCategories.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });

  const currentProductImageList = loadedImageList?.map((image, index) => {
    return (
      <div key={image + "_" + index} id="image" className="mb-4 imageView">
        <div className="hideSection">
          <Link
            className="text-sm"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              onDeleteHandler(image);
            }}
          >
            <FaTimes className="m-2 text-3xl text-red-500" />
          </Link>
        </div>

        <div className="relative">
          <div style={{ height: "150px" }}>
            <div className="picture-main  bg-slate-200 ">
              <img
                src={`${APP_ENV.REMOTE_HOST_NAME}files/300_` + image}
                className="picture-container rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  const selectNewImageList = updateModel.images?.map((image, index) => {
    return (
      <div key={image + "_" + index} id="image" className="mb-4 imageView">
        <div className="hideSection">
          <Link
            className="text-sm"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              onDeleteHandler(image.name);
            }}
          >
            <FaTimes className="m-2 text-3xl text-red-500" />
          </Link>
        </div>

        <div className="relative">
          <div style={{ height: "150px" }}>
            <div className="picture-main  bg-slate-200 ">
              <img
                src={URL.createObjectURL(image)}
                className="picture-container rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="p-8 rounded border border-gray-200">
        <h1 className="font-medium text-3xl">
          Резагування продукту "{updateModel.name}"
        </h1>
        {!isLoaded && <Loader />}
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
                value={updateModel.name}
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
                value={updateModel.description}
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
                value={updateModel.category_id}
                onChange={onChangeHandler}
                className="h-full rounded-md border bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
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
                value={updateModel.price}
                onChange={onChangeHandler}
                id="price"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Фото
              </label>
              <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 items-center gap-4">
                    {currentProductImageList}
                    {selectNewImageList}
                  </div>
           
              <div className="mt-4">
                {" "}
                <label
                  htmlFor="selectImage"
                  className="rounded-md border border-gray-300 bg-white 
                         py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Обрати фото
                </label>
              </div>

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
              Редагувати
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
};
export default EditProductPage;
