import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ICategoryItem } from "../../category/store/type";

interface ICategoryTableProps{
list:ICategoryItem[]
}

const CategoryTable:React.FC<ICategoryTableProps> = ({list}) =>{
  const navigat = useNavigate();

  const categoryList = list;
  const itemRow = categoryList.map((prev) => {
    return (
      <tr key={prev.id}>
        <th scope="row">{prev.id}</th>
        <td>{prev.name}</td>
        <td className=" text-center">
          <button
          className=" bg-green-700 hover:bg-green-600 p-1 rounded-md"
          style={{cursor:"pointer"}}
            onClick={() => {
              console.log("Select: ", prev.name);
             // navigat("/category-table-test");
            }}
          >
            Select!
          </button>
          <button
          className=" ml-2 bg-red-600 hover:bg-red-500 p-1 rounded-md"
          style={{cursor:"pointer"}}
            onClick={() => {
              console.log("delete ",prev.id);
              
              axios.delete("http://localhost:8083/api/categories?id="+prev.id);
            }}
          >
            Delete!
          </button>
        </td>
      </tr>
    );
  });
    return(
        <table className="table" style={{width:800}}>
  <thead>
    <tr>
      <th scope="col" style={{width:200}}>ID</th>
      <th scope="col" >Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   {itemRow}
  </tbody>
</table>
    );
}

export default CategoryTable;