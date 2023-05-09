import { Button } from '@mui/material'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
    const router = useRouter();

    return (
      <>
        <div className='flex p-3 w-full' style={{justifyContent: 'space-between'}}>
          <Button onClick={() => router.replace(process.env.WEB_URL)} style={{fontWeight: 'bold', color: 'black'}}>Merchant Manager</Button>
          <Button onClick={() => router.push(`${process.env.WEB_URL}/Form/login`)}>Login</Button>
        </div>
      </>
    )
}

export const UserNavbar = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  return (
    <>
      <div className='flex p-3 w-full' style={{justifyContent: 'space-between'}}>
        <Button onClick={() => router.replace(process.env.WEB_URL)} style={{fontWeight: 'bold', color: 'black'}}>Merchant Manager</Button>
        <Button onClick={() => {removeCookie('token',{path: '/'}); router.replace(`${process.env.WEB_URL}`)}}>Logout</Button>
      </div>
    </>
  )
}