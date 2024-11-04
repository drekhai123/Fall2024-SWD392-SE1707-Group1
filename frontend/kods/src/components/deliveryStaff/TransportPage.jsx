import React, { useState, useEffect } from 'react';
import MapIcon from '@mui/icons-material/Map';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../../css/DeliveryStaffTransport.css'
import { Divider } from 'primereact/divider';
import { GetTransportByDeliveryStaffId } from '../api/TransportApi';
import { toast } from 'react-toastify';
import LoadingScreen from '../../utils/LoadingScreen';
import { useNavigate } from 'react-router-dom';

export default function TransportPage() {
    const [products, setProducts] = useState([1,2,3]); //backup
    const [transport, setTransport] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const userStorage = sessionStorage.getItem('user');
    const userData = JSON.parse(userStorage)
     if(userData===null||userData.role !== "delivery"){
        alert("You are not authorize for this page")
        navigate("/")
     }

    useEffect(() => {
        const getTransport = async () => {
            setLoading(true)
            const response = await GetTransportByDeliveryStaffId(userData.deliveryStaff.staffId);
            console.log(response.data.orders)
            if (response.status === 200) {
                setTransport(response.data.orders)
                if(transport===null){
                    setTransport([])
                }
            } else {
                toast.error("!", { autoClose: 2000 }); // Show toast for 2 seconds
                console.log("Error fetching transport:", response);
            }
            setLoading(false)
        }
        getTransport()
    }, []);

    const trackRoute = (currentData) => {
        const start = currentData.senderAddress;
        const des = currentData.recipientAddress;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(des)}&travelmode=driving&dir_action=navigate`;
        window.open(url, '_blank');
    }

    // Pagingation
    const [first, setFirst] = useState(0); // Track the first row for controlled pagination
    const [rows, setRows] = useState(5); // Number of rows per page
    const onPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    //
    return (
        <div className="card">
            {loading && <LoadingScreen />}
            <DataTable
                paginator
                rows={rows}
                first={first}
                onPage={onPage}
                showGridlines
                stripedRows
                value={transport} tableStyle={{ minWidth: '50rem' }}>
                <Column field="orderId" header="Order Id"></Column>
                <Column field="senderAddress" header="From"></Column>
                <Column field="recipientAddress" header="To"></Column>
                <Column field="createdAt" filter header="Date Added"></Column>
                <Column 
                    field="id"
                    header="Action"
                    body={(rowData) => {
                        return (
                            <Button icon={<MapIcon />} onClick={() => trackRoute(rowData)} className="action_button" label="Track Route" />
                        );
                    }}>
                </Column>
            </DataTable>
        </div>
    );
}
