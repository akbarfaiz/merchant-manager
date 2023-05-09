import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { TextField, Button } from '@mui/material';

function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    React.useEffect(() => {
        if (cookies.token) {
            router.replace(`${process.env.WEB_URL}`)
        }
      },[cookies.token])
  
      const LoginForm = async () => {
        let data = {
          email: email,
          password: password
        }
        await axios.post(process.env.API_URL+'/users/login',data).then(function(response) {
          setCookie('token',response.data.data.token,{
            path: '/'
          })
          router.replace(`${process.env.WEB_URL}`)
          console.log(response)
        }).catch(function(error) {
          console.log(error)
        })
      }

    return (
        <>
            <div className='flex flex-col w-full h-screen bg-white text-black' style={{justifyContent: 'center', alignItems: 'center'}}>
                <h1 className='flex m-2' style={{justifyContent: 'center', fontWeight: 'bold', fontSize: 30}}>Login</h1>
                <TextField className='w-1/2 m-5' onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                <TextField className='w-1/2 m-5' onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" type='password' />
                <Button onClick={() => LoginForm()} className='w-1/2' variant="contained" style={{backgroundColor: '#2395FF'}} sx={{marginTop: '20px', marginBottom: '20px'}}>Sign In</Button>
            </div>
        </>
    )
}

export default LoginPage