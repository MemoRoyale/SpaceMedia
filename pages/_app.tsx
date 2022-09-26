import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import '../styles/globals.css'


const MyApp=  ({ Component, pageProps }: AppProps)=> {

  const [isSSR,setisSSR] = useState(true);


  useEffect(() => {
    setisSSR(false);

  },[]);

  if(isSSR) return null;

  return(
    <GoogleOAuthProvider clientId={`125610453350-u485htf413g3nir51kgv14keb1crl8t7.apps.googleusercontent.com`}>
      
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar />
        <div className='flex gap-6 md:gap-20 '>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  ); 

}

export default MyApp
