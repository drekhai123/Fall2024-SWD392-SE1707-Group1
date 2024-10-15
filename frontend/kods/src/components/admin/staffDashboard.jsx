import React, { useEffect, useState } from 'react'
import { GetAllStaffs } from '../api/StaffApi';
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
    const [staff, setStaff] = useState([]);
    useEffect(() => {
        const getAllStaffs = async()=>{
          var allStaff = await GetAllStaffs();
          setStaff(allStaff);
        };
        getAllStaffs()
    }, []);

  return (
    <div className='container'>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Staff Info</TableCell>
          <TableCell align="right">ID</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Age</TableCell>
          <TableCell align="right">Gender</TableCell>
          <TableCell align="right">Phone Number</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {staff.map((staff) => (
          <TableRow
            key={staff.customerId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {staff.customerName}
            </TableCell>
            <TableCell align="right">{staff.staffId}</TableCell>
            <TableCell align="right">{staff.staffName}</TableCell>
            <TableCell align="right">{staff.age}</TableCell>
            <TableCell align="right">{staff.gender}</TableCell>
            <TableCell align="right">{staff.phoneNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
}
