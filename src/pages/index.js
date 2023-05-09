import * as React from 'react';
import { Button } from '@mui/material'
import { Navbar, UserNavbar } from '../component/navbar'
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [domLoaded, setDomLoaded] = React.useState(false);

  React.useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      <div className='w-full h-screen bg-white text-black'>
        {cookies.token && domLoaded ? <UserNavbar /> : <Navbar />}
        <div className='flex p-3 h-1/3' style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Button href='Sales/monthly'>Monthly Sales Data</Button>
          <Button href='Sales/product'>Product Sales Data</Button>
          <Button href='Sales/city'>City Sales Data</Button>
        </div>
        {cookies.token && domLoaded && (
          <div className='flex p-3 h-1/3' style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Button href='Form/order'>Create Order</Button>
          </div>
        )}
        
      </div>
    </>
  )
}
