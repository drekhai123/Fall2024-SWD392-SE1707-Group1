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
    const [products, setProducts] = useState([1, 2, 4]);
    const [transport, setTransport] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const user = sessionStorage.getItem('user');
    console.log(user)
     if(user===null||user.role !== "delivery"){
        alert("You are not authorize for this page")
        navigate("/")
     }

    useEffect(() => {
        const getTransport = async () => {
            setLoading(true)
            const response = await GetTransportByDeliveryStaffId(1);
            if (response.status === 200) {
                setTransport(await response.data)
                console.log(transport)
            } else {
                toast.error("!", { autoClose: 2000 }); // Show toast for 2 seconds
                console.log("Error fetching transport:", response);
            }
            setLoading(false)
        }
        getTransport()
    }, []);

    const trackRoute = (currentData) => {
        const start = "Thành phố Hồ Chí Minh, Việt Nam";
        const des = "Quận 7, Ho Chi Minh City, Việt Nam";
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
                value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
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
