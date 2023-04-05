import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/login";
import Registration from "./components/auth/registr";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";
import NotFoundPage from "./components/notFound";
import Product from "./components/product";
import InfoProductPage from "./components/product/productInfo";
import AdminLayout from "./components/containers/admin";
import AdminCreateCategory from "./components/admin/category/createCategory";
import AdminCreateProductPage from "./components/admin/product/createProduct";
import AdminEditProductPage from "./components/admin/product/editProduct";
import AdminProductsPage from "./components/admin/product";
import AdminHome from "./components/admin/home";

const App =() => {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<Registration />} />
          <Route path="products" element={<Product />} />
          <Route path="product/info/:id" element={<InfoProductPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminHome />} />
          <Route path="categories/create" element={<AdminCreateCategory />} />
          <Route path="products/list" element={<AdminProductsPage />} />
          <Route path="product/create" element={<AdminCreateProductPage />} />
          <Route path="product/edit/:id" element={<AdminEditProductPage />} />
        </Route>
      </Routes>
    );
}

export default App;