import React, { useState, useEffect } from 'react';
import MapIcon from '@mui/icons-material/Map';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../../css/DeliveryStaffTransport.css'
import { Divider } from 'primereact/divider';

export default function TransportPage() {
    const [products, setProducts] = useState([1, 2, 4]);

    // useEffect(() => {
    //     ProductService.getProductsMini().then(data => setProducts(data));
    // }, []);

    const trackRoute = (currentData) => {
        const start = "Thành phố Hồ Chí Minh, Việt Nam";
        const des = "Quận 7, Ho Chi Minh City, Việt Nam";
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(des)}&travelmode=driving&dir_action=navigate`;
        window.open(url, '_blank');
    }
    

    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column
                    field="id"
                    header="Action"
                    body={(rowData) => {
                        return (
                                <Button icon={<MapIcon />} onClick={()=>trackRoute(rowData)} className="action_button" label="Track Route" />
                        ); 
                    }}>
                </Column>
            </DataTable>
        </div>
    );
}
