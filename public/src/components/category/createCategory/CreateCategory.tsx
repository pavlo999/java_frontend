import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { APP_ENV } from "../../../env";
import { CreateCategoryValidatorShema } from "../store/ValidateCategory";

interface ICreateCategoryItem{
  name: string,
  description:string,
  file:File|null|undefined
}

const CreateCategory = () =>{
   
  const [currentImage, setCurrentImage] = useState<string>(
    "https://cdn3.iconfinder.com/data/icons/photo-tools/65/select-512.png"
  );
  const [isResizeImage, setIsResizeImage] = useState<boolean>(false)
  const [isSelectImage, setIsSelectImage] = useState<boolean>(false)
  const [currentFile, setCurrentFile] = useState<File>()
  const navigat = useNavigate();


  const initialValues:ICreateCategoryItem = {
		name: "",
    description:"",
    file:null
	};

  const handelSubmit = async (category:ICreateCategoryItem) =>{
    console.log("subm: ",category);
    
    try{
      category.file=currentFile;
      const item =await axios.post(`${APP_ENV.REMOTE_HOST_NAME}api/categories`, category,{
        headers:{"Content-Type":"multipart/form-data"}
      });
            console.log("Server save category", item);
            navigat("/");
    }catch(error:any){
      console.log("Щось пішло не так", error);
    }
};

const handlerSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files && files.length) {
    const file = files[0];
    setCurrentImage(URL.createObjectURL(file));
    setCurrentFile(file);
    setIsResizeImage(true);
    setIsSelectImage(true);
    // if (/^image\/\w+/.test(file.type)) {
    //   getBase64(file, (result) => {
    //     setCurrentImage(result);
    //     setIsResizeImage(true);
    //     setIsSelectImage(true);
    //   });
    // }
  } else {
    alert("Оберіть файл зображення");
  }
  e.target.value = "";
};

const getBase64 = (file: File, cb: (result: string) => void) => {
  const fr: FileReader = new FileReader();
  fr.readAsDataURL(file);
  fr.onload = function () {
    cb(fr.result as string);
  };
};

const errorMessage = (fieldType: string, color: string = "red") => {
  return (
    <ErrorMessage name={fieldType}>
      {(msg) => <div style={{ color: color }}>{msg}</div>}
    </ErrorMessage>
  );
};

return (
  <>
    <div className=" w-auto">
      <div>
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-3xl font-medium leading-6 text-gray-900 text-center mt-3">
              Category
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <Formik
            initialValues={initialValues}
            onSubmit={handelSubmit}
            validationSchema={CreateCategoryValidatorShema}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className=" max-w-[500px] mx-auto">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-lg font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <div className="mt-1">
                          <Field
                            as="input"
                            id="name"
                            name="name"
                            className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative "
                          />
                          {errorMessage("name")}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-lg font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full h-[300px]  relative resize-none"
                        />
                        {errorMessage("description")}
                      </div>
                      <div>
                        <label
                          htmlFor="file"
                          className="block text-lg font-medium text-gray-700"
                        >
                          Select image
                          <img
                            src={currentImage}
                            style={{ cursor: "pointer" }}
                            width="150"
                            className={
                              isResizeImage ? "w-full max-h-[450px]" : ""
                            }
                          />
                        </label>
                        <Field
                        value = ""
                          type="file"
                          id="file"
                          name="file"
                          className="hidden"
                          onChange={handlerSelectImage}
                        />

                      </div>
                    </div>
                    <div className=" px-auto py-3 text-center sm:px-6">
                      <button
                        disabled={!(formik.isValid && isSelectImage) }
                        type="submit"
                        className=" rounded-md border border-transparent bg-indigo-600 px-4 py-2  font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </>
);
}
export default CreateCategory;

