import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../common/categoryTable";
import { ICategoryItem } from "./store/type";

const Categories:React.FC=()=>{

    const [list , setList] = useState<ICategoryItem[]>([]);
    useEffect(() => {
      axios.get("http://localhost:8083/api/categories").then(res =>{
        console.log("Server response",res);
        const {data} = res;
        setList(data);
      });
    
    }, [])

    const elements = list.map((callout) => (
      <div key={callout.name} className="group relative">
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
          <img
            src={"http://localhost:8083/files/600_"+callout.image}
            alt={"callout.imageAlt"}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <h3 className="mt-6 text-sm text-gray-900">
          <Link to={"/asd"}>
            <span className="absolute inset-0" />
            <p className="font-bold text-xl text-center">
            {callout.name}

            </p>
          </Link>
        </h3>
        <p className="text-base font-semibold text-gray-500">{"Опис категорії: "}{callout.description}</p>
      </div>
    ))

    return (
      <>
        <div className="bg-gray-100">
          <div className=" text-center pt-5">
            <Link
              to="/create-category"
              className=" bg-green-600 px-4 py-2 rounded-md border border-transparent hover:bg-green-500 text-white text-lg font-bold "
            >
              Create category
            </Link>
            <Link
              to="/category-table-test"
              className=" ml-2 bg-green-600 px-4 py-2 rounded-md border border-transparent hover:bg-green-500 text-white text-lg font-bold "
            >
              Table from test
            </Link>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-8">
              <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-3 lg:space-y-0">
                {elements}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default Categories;