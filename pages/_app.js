import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import NProgress from 'nprogress';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
  Router.events.on('routeChangeStart',()=>{
    NProgress.start();
  });
  Router.events.on('routeChangeComplete',()=>{
    NProgress.done();
  });
  return (
    <StateContext>
      <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp;
