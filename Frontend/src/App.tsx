import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import User from "./User/User";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./Todo";
import AuthVerifier from "./AuthVerifiee";
import axios from "axios";
import Navbar from "./Layout";
import Dashboard from "./Dashboard/Dasboard";
import AuthContainer from "./Login";
import "./App.css";
import { ThemeProvider } from "styled-components";
import createThemeI from "./createTheme";
import ShopBats from "./ShopBats/ShopBats";
import BatsDetails from "./ShopBats/BatsDetails";
import AllModalList from "./AllModalList";
import ViewCart from "./Cart/ViewCart";
import AddUser from "./User/AddUser";
import { useSelector } from "react-redux";
import { RootState } from "./Store";
import MobileUserView from "./User/MobileUserView";
import AddBatsForm, { TableRender } from "./ShopBats/AddBatsForm";
import RenderMobileEditBats from "./ShopBats/RenderMobileEdit";
import RepairUploadBat from "./Repair/RepairUploadBat";
import RepairAllOrders from "./Repair/RepairAllOrders";
import OrderList from "./YourOrders/OrderList";
import ViewOrderDetailsMobile from "./YourOrders/ViewOrderDetailsMobile";
import YourRepairsOrders from "./YourOrders/YourRepairsOrders";
import YourOrders from "./YourOrders/YourOrders";
import PaymentCheckOut from "./CheckOutPayment/PaymentCheckOut";
import AllShopOrder from "./ShopsOrder.tsx/AllShopOrder";
import ViewMyOrderDetailsMobile from "./YourOrders/ViewMyOrderDetailsMobile";
import Checkout from "./CheckOutPayment/AddPaymentCheckOut";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 60 * 5000,
      },
    },
  });

  axios.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

  })
  const token = localStorage.getItem("token" as string);
  const { user } = useSelector((state: RootState) => state.CustomerUser)



  return (
    <ThemeProvider theme={createThemeI}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthVerifier />
          <Routes>
            <Route element={<Navbar />} >
              <Route path="/" element={<Dashboard />} />
              <Route path="/shop_bats" element={<ShopBats />} />
              <Route path="/details" element={<BatsDetails />} />
              <Route path="/cart" element={<ViewCart />} />
              <Route path="/repair" element={<RepairUploadBat />} />
              <Route path="/repair_orders" element={<RepairAllOrders />} />
              <Route path="/shop_orders" element={<AllShopOrder />} />
              <Route path="/orders" element={<OrderList />} >
                <Route path="/orders" element={<YourRepairsOrders />} />
                <Route path="/orders/your_orders" element={<YourOrders />} />
              </Route>
              <Route path="/checkouts" element={<Checkout />} />
              <Route path="/view_status" element={<ViewOrderDetailsMobile />} />
              <Route path="/view_my_order" element={<ViewMyOrderDetailsMobile />} />
              {user?.userType === "Admin" && (<>
                <Route path="/add_bat" element={<AddBatsForm />} />
                <Route path="/view_edit_bat" element={<RenderMobileEditBats />} />
                <Route path="/users" element={<User />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/users_view" element={<MobileUserView />} />
                <Route path="all_view_edit_bat" element={<TableRender />} />
              </>)}
              <Route path="/checkout" element={token ? <PaymentCheckOut /> : <Navigate to="/login" />} />
            </Route>
            <Route path="/login" element={!token ? <AuthContainer /> : <Navigate to="/" />} />
          </Routes>
        </Router>
        <AllModalList />
      </QueryClientProvider >
    </ThemeProvider>
  )
}

export default App;
