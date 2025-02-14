import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import User from "./User";
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

  return (
    <ThemeProvider theme={createThemeI}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthVerifier />
          <Routes>
            <Route element={<Navbar />} >
              <Route path="/about" element={<Todo />} />
              <Route path="/services" element={<User />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/shop_bats" element={<ShopBats />} />
              <Route path="/details" element={<BatsDetails />} />
            </Route>
            <Route path="/login" element={<AuthContainer />} />
          </Routes>
        </Router>
        <AllModalList />
      </QueryClientProvider >
    </ThemeProvider>


  );
}

export default App;
