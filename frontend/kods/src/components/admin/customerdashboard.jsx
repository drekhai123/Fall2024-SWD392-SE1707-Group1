import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GetAllCustomers } from '../api/CustomerApi';
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
        const getCustomerData = async()=>{
          var allCustomer = await GetAllCustomers();
          setCustomer(allCustomer);
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
          <TableCell align="right">Gender</TableCell>
          <TableCell align="right">Phone Number</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Address</TableCell>
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
            <TableCell align="right">{customers.gender}</TableCell>
            <TableCell align="right">{customers.phoneNumber}</TableCell>
            <TableCell align="right">{customers.email}</TableCell>
            <TableCell align="right">{customers.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}
