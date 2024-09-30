import axios from 'axios'
import React, { useEffect, useState } from 'react'
// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// var customersType = {
//     customerId:{
//         type: String
//     },
//     customerName:{
//         type: String
//     },
//     age:{
//         type: Number
//     },

//     email:{
//         type: String
//     } ,
//     addresses:{
//         type: Array<string>,
//     },
// }
export default function Customerdashboard() {
    const [customers, setCustomer] = useState([]);
    useEffect(() => {
        async function getCustomerData(){
        axios.get('https://localhost:7059/api/CustomersAPI')
        .then(response => response.data)
        .then (data =>setCustomer(data))
        .catch(error => {
          console.error(error)
          alert('Error fetching data')
        })
        };
        getCustomerData()
    }, []);

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Customer Info</TableCell>
          <TableCell align="right">ID</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Age</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Addresses</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((customers) => (
          <TableRow
            key={customers.customerId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {customers.customerName}
            </TableCell>
            <TableCell align="right">{customers.customerId}</TableCell>
            <TableCell align="right">{customers.customerName}</TableCell>
            <TableCell align="right">{customers.age}</TableCell>
            <TableCell align="right">{customers.email}</TableCell>
            <TableCell align="right">{customers.addresses}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
