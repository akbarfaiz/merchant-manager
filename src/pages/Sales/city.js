import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Navbar, UserNavbar } from '../../component/navbar';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCookies } from 'react-cookie';


function CitySalesPage() {
    const [data, setData] = React.useState({})
    const [cityNum, setCityNum] = React.useState(1)
    const [city, setCity] = React.useState({})
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [domLoaded, setDomLoaded] = React.useState(false);

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const GetData = async (city) => {
        await axios.get(process.env.API_URL+'/order/city/'+city).then(function(response) {
            setData(response.data)
          }).catch(function(error) {
            console.log(error)
            setData({})
        })
    }

    const GetCity = async () => {
        await axios.get(process.env.API_URL+'/city').then(function(response) {
            setCity(response.data)
          }).catch(function(error) {
            console.log(error)
        })
    }

    React.useEffect(() => {
        GetCity()
        setDomLoaded(true);
    },[])

    React.useEffect(() => {
        GetData(cityNum)
    },[cityNum])

    React.useEffect(() => {
        if (data) {
            console.log(data)
        }
    },[data])
    
    React.useEffect(() => {
        if (city) {
            console.log(city)
        }
    },[city])

    return(
        <>
            <div className='w-full h-screen bg-white text-black'>
                {cookies.token && domLoaded ? <UserNavbar /> : <Navbar />}
                <h1 className='flex py-5' style={{justifyContent: 'center', fontWeight: 'bold', fontSize: 30}}>City Sales Data</h1>
                {/*Dropdown*/}
                <div className='w-full flex' style={{justifyContent: 'center'}}>
                    <FormControl className='w-1/3 m-3'>
                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cityNum}
                            label="Month"
                            onChange={(e) => setCityNum(e.target.value)}
                        >
                            {city.data?.map((item,index) => (
                                <MenuItem key={index+1} value={item.id}>{item.name}</MenuItem>
                            ))}
                            
                        </Select>
                    </FormControl>
                </div>
                {/*Tabel*/}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">User</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.data?.map((item,index) => (
                            <TableRow
                            key={index + 1}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.product_name}
                                </TableCell>
                                <TableCell align="right">{`${new Date(item.date).getDate()} ${month[new Date(item.date).getMonth()]} ${new Date(item.date).getFullYear()}`}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">{item.price}</TableCell>
                                <TableCell align="right">{item.user_name}</TableCell>
                                <TableCell align="right">{item.city_name}</TableCell>
                                <TableCell align="right">{item.price * item.quantity}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default CitySalesPage