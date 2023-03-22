import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Registration from "./components/auth/registr";
import CreateCategory from "./components/category/createCategory";
import CategoryTableTest from "./components/category/tableTest";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";
import NotFoundPage from "./components/notFound";
import Product from "./components/product";
import CreateProduct from "./components/product/createProduct";
import EditProductPage from "./components/product/editProduct";
import InfoProductPage from "./components/product/productInfo";

const App =() => {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="category-table-test" element={<CategoryTableTest />} />
          <Route path="products" element={<Product />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/edit/:id" element={<EditProductPage />} />
          <Route path="product/info/:id" element={<InfoProductPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    );
}

export default App;