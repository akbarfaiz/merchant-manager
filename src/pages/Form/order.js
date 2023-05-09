import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { TextField, Button } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import jwtDecode from "jwt-decode";

function OrderPage() {
    const [quantity, setQuantity] = React.useState('');
    const [productNum, setProductNum] = React.useState(1)
    const [product, setProduct] = React.useState({})
    
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const GetProduct = async () => {
        await axios.get(process.env.API_URL+'/product').then(function(response) {
            setProduct(response.data)
          }).catch(function(error) {
            console.log(error)
        })
    }

    React.useEffect(() => {
        GetProduct()
    },[])

    React.useEffect(() => {
        if (product) {
            console.log(product)
        }
    },[product])

    React.useEffect(() => {
        if (!cookies.token) {
            router.replace(`${process.env.WEB_URL}`)
        }
      },[cookies.token])
  
      const OrderForm = async () => {
        let current = new Date()
        let data = {
          date: `${current.getDate()}-${current.getMonth()}-${current.getFullYear()} ${current.getHours() < 10 ? '0'+current.getHours() : current.getHours()}:${current.getHours() < 10 ? '0'+current.getMinutes() : current.getMinutes()}`,
          user_id: jwtDecode(cookies.token).id,
          product_id: productNum,
          quantity: quantity
        }
        await axios.post(process.env.API_URL+'/order/create',data,{
            headers:{
                "Authorization": `Bearer ${cookies.token}`
            }
        }).then(function(response) {
          router.replace(`${process.env.WEB_URL}`)
          console.log(response)
        }).catch(function(error) {
          console.log(error)
        })
      }

    return (
        <>
            <div className='flex flex-col w-full h-screen bg-white text-black' style={{justifyContent: 'center', alignItems: 'center'}}>
                <h1 className='flex m-2' style={{justifyContent: 'center', fontWeight: 'bold', fontSize: 30}}>Order</h1>
                {/*Dropdown*/}
                <div className='w-full flex' style={{justifyContent: 'center'}}>
                    <FormControl className='w-1/2 m-3'>
                        <InputLabel id="demo-simple-select-label">Product</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productNum}
                            label="Month"
                            onChange={(e) => setProductNum(e.target.value)}
                        >
                            {product.data?.map((item,index) => (
                                <MenuItem key={index+1} value={item.id}>{item.product_name}</MenuItem>
                            ))}
                            
                        </Select>
                    </FormControl>
                </div>
                <TextField className='w-1/2 m-5' onChange={(e) => setQuantity(e.target.value)} id="outlined-basic" label="Quantity" variant="outlined" />
                <Button onClick={() => OrderForm()} className='w-1/2' variant="contained" style={{backgroundColor: '#2395FF'}} sx={{marginTop: '20px', marginBottom: '20px'}}>Create Order</Button>
            </div>
        </>
    )
}

export default OrderPage