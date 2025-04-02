import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useCallback, useState } from 'react';
import { Toaster } from 'sonner'
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userslice';
import Top from './pages/Top';

function App() {
  const dispatch = useDispatch();
  const [accountCartProduct,setaccountCartProduct] = useState(0);
 
  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

    console.log("data-user", dataResponse);
  }, [dispatch]);

  const fetchAccountAddToCartProduct = async() => {
    const dataResponse = await fetch(SummaryApi.accountAddToCartProduct.url,{
      method: SummaryApi.accountAddToCartProduct.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    console.log("dataApi",dataApi)
    setaccountCartProduct(dataApi?.data?.count)
  }

  useEffect(() => {
    //** user details */
    fetchUserDetails();
    //** user details cart product */
    fetchAccountAddToCartProduct();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          accountCartProduct,
          fetchAccountAddToCartProduct
        }}
      >
      <Top/>
      <Header />
        <Toaster richColors position="top-center" />
        <main className="bg-[#E7E7E7] min-h-[calc(100vh-100px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

