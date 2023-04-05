import axios from "axios";
import { useEffect, useState } from "react";
import { ICategoryItem } from "../store/type";
import CategoryTable from "../../../common/categoryTable";

const CategoryTableTest =() =>{
    const [list , setList] = useState<ICategoryItem[]>([]);
    useEffect(() => {
      axios.get("http://localhost:8083/api/categories").then(res =>{
        console.log("Server response",res);
        const {data} = res;
        setList(data);
      });
    
    }, [])
    
    return (
        <>
        <CategoryTable list={list}/>
        </>
    );
}
export default CategoryTableTest;