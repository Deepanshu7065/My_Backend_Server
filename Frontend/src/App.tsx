import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import User from "./User/User";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Todo from "./Todo";
import AuthVerifier from "./AuthVerifiee";
import axios from "axios";
import Navbar from "./Layout";
import "./App.css";
import { ThemeProvider } from "styled-components";
import createThemeI from "./createTheme";
import AllModalList from "./AllModalList";
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
import Contact from "./Contact";
import YourTickets from "./Tickets/YourTickets";
import AllTickets from "./Tickets/AllTickets";
import MobileViewAllTickes from "./Tickets/MobileViewAllTickes";
import MobileViewYourTickets from "./Tickets/MobileViewYourTickets";
import React, { lazy, Suspense, useState } from "react";
import Temp from "./Temp";
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, style }) => {
  const [loaded, setLoaded] = useState(false);



  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded ? "fade-in" : "loading"}`}
      style={{
        transition: "opacity 0.5s ease-in-out",
        opacity: loaded ? 1 : 0.5,
        ...style
      }}
      onClick={() => setLoaded(true)}
      onLoad={() => setLoaded(true)}
    />
  );
};


const Dashboard = lazy(() => import("./Dashboard/Dasboard"));
const ShopBats = lazy(() => import("./ShopBats/ShopBats"));
const BatsDetails = lazy(() => import("./ShopBats/BatsDetails"));
const ViewCart = lazy(() => import("./Cart/ViewCart"));
const AuthContainer = lazy(() => import("./Login"));
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

  // const age = [2, 4, 5, 6, 7, 8, 89, 2, 6.6, 6, 9]

  // //  sum in array 
  // // find array in fifth element 
  // let sum = 0
  // let fifthElement;
  // for (let index = 0; index < age.length; index++) {
  //   sum += age[index]
  //   if (index < age[index] ) {
  //     fifthElement = age[index]
  //   }
  // }
  // console.log(sum);
  // console.log(fifthElement);

  return (
    <ThemeProvider theme={createThemeI}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthVerifier />
          <Suspense fallback={
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}>
              <LazyImage
                src="/src/assets/loadinglive.gif"
                alt="Loading..."
                style={{
                  width: "30%",
                  height: "30%",
                }}
              />
            </div>
          }>

            <Routes>
              <Route element={<Navbar />} >
                <Route path="/" element={<Dashboard />} />
                <Route path="/temp" element={<Temp />} />
                <Route path="/shop_bats" element={<ShopBats />} />
                <Route path="/details" element={<BatsDetails />} />
                <Route path="/cart" element={<ViewCart />} />
                <Route path="/repair" element={<RepairUploadBat />} />
                <Route path="/repair_orders" element={<RepairAllOrders />} />
                <Route path="/shop_orders" element={<AllShopOrder />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tickets" element={<YourTickets />} />
                <Route path="/all_tickets" element={<AllTickets />} />
                <Route path="/ticket_all" element={<MobileViewAllTickes />} />
                <Route path="/ticket_your" element={<MobileViewYourTickets />} />
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
                <Route path="/checkouts" element={token ? <PaymentCheckOut /> : <Navigate to="/login" />} />
              </Route>
              <Route path="/login" element={!token ? <AuthContainer /> : <Navigate to="/" />} />
            </Routes>
          </Suspense>
        </Router>
        <AllModalList />
      </QueryClientProvider >
    </ThemeProvider >
  )
}

export default App;
