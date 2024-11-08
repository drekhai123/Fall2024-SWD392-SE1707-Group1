import React, { useState, useEffect, useRef } from 'react';
import MapIcon from '@mui/icons-material/Map';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../../css/DeliveryStaffTransport.css'
import { GetTransportByDeliveryStaffId, updateTransportById } from '../api/TransportApi';
import LoadingScreen from '../../utils/LoadingScreen';
import { CheckCircleOutlineOutlined, CloseOutlined} from '@mui/icons-material';
import { confirmDialog, } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { toast } from 'react-toastify';
import { updateOrderStatus, updatePaymentStatus } from '../api/OrdersApi';

export default function TransportPage({ userData, setCurrentOrder }) {
    const [transport, setTransport] = useState();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [selected, setSelected] = useState(false);
    const confirmOrder = useRef(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        if (order !== null) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [order])

    useEffect(() => {
        if (selectedOrder) confirmCheckOut();
    }, [selectedOrder]);

    useEffect(()=>{
        if(transport){
            const allOrdersCompleted = checkAllOrdersCompleted(transport);
            if (allOrdersCompleted) {
                console.log("All orders are either DELIVERED or CANCELED.");
                //TODO
                const data = {
                    "status": "DELIVERED"
                }
                const response = updateTransportById(transport?.transportId, data);
                if (response.status === 200) {
                    console.log("Transport status updated successfully.");
                    toast.success("Transport Status Updated!", { autoClose: 2000 }); // Show toast for 2 seconds
                    setRefreshData(true);
                }
              } else {
                console.log("Some orders are still pending or in progress.");
              }
        }
    },[transport])

    const checkAllOrdersCompleted = (orders) => {
        // Check if every order has a deliveryStatus of "DELIVERED" or "CANCELED"
        return orders.every(order => 
          order.deliveryStatus === "DELIVERED" || order.deliveryStatus === "CANCELED"
        );
      };
      

    useEffect(() => {
        const getTransport = async () => {
            setLoading(true)
            if (userData !== null) {
                const response = await GetTransportByDeliveryStaffId(userData.deliveryStaff.staffId);
                if (response.status === 200) {
                    setTransport(response.data.orders)
                    if (transport === null) {
                        toast.info("There Are No Transport For Today", { autoClose: 2000 }); // Show toast for 2 seconds
                        setTransport([])
                    }
                } else {
                    toast.error("Error Getting transport, Plz refresh the page or Login again!", { autoClose: 2000 }); // Show toast for 2 seconds
                    console.log("Error fetching transport:", response);
                }
            }
            setLoading(false)
        }
        getTransport()
    }, [refreshData]);

    const handleConfirmOrder = async () => {
        //console.log(order)
        setLoading(true)
        const orderstatusData = {
            deliveryStatus: "DELIVERED"
        }
        if (selectedOrder != null) {
            var response = await updateOrderStatus(selectedOrder.orderId, orderstatusData)
            console.log(response)
            if (response.status === 200) {
                if (selectedOrder.paymentStatus === "PENDING") {
                   //console.log(selectedOrder.paymentStatus)
                    const deliverystatusData = {
                        paymentStatus: "PAID"
                    }
                    response = await updatePaymentStatus(selectedOrder.orderId, deliverystatusData)
                    console.log(response)
                }
            }
            setLoading(false)
            return response
        }
    }

    const trackRoute = (currentData) => {
        const start = currentData.senderAddress;
        const des = currentData.recipientAddress;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(des)}&travelmode=driving&dir_action=navigate`;
        window.open(url, '_blank');
    }

    const accept = async () => {
        const response = await handleConfirmOrder()
        //console.log(response)
        if (response !=null) {
            if(response.status === 200)
            confirmOrder.current.show({ severity: 'success', summary: 'Confirmed', detail: 'Order Completed', life: 3000 });
        }
        else {
            confirmOrder.current.show({ severity: 'danger', summary: 'Failed', detail: 'Request Sent Failed', life: 3000 });
        }
        setRefreshData(!refreshData)
    }

    const reject = () => {
        confirmOrder.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Order Not Completed', life: 3000 });
    }

    const confirmCheckOut = () => {
        confirmDialog({
            message: (
                <div>
                    <p>Confirm Delivery Of The Order: {selectedOrder.orderId}</p>
                    <p>On Customer: {selectedOrder.customerId}</p>
                    {selectedOrder.paymentStatus === "PENDING" && (
                        <p>Order Payment: {selectedOrder.totalCost} VND</p>
                    )}
                </div>
            ),
            header: 'Confirm The Order Have Been Delivered?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            rejectClassName: 'p-button-danger',
            acceptClassName: 'p-button-success',
            accept,
            reject
        });
    };

    // Pagingation
    const [first, setFirst] = useState(0); // Track the first row for controlled pagination
    const [rows, setRows] = useState(5); // Number of rows per page
    const onPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    //
    return (
        <>
            <Toast ref={confirmOrder} />
            <div className="transport-card">
                {loading && <LoadingScreen />}
                <DataTable
                    selection={order}
                    onSelectionChange={(e) => {setOrder(e.value);setCurrentOrder(e.value)}}
                    dataKey="orderId"
                    scrollable
                    resizableColumns
                    stripedRows
                    paginator
                    rows={rows}
                    first={first}
                    onPage={onPage}
                    value={transport}
                >
                    <Column
                        frozen
                        alignFrozen='left'
                        field="id"
                        header="Action"
                        body={(rowData) => {
                            return (
                                <>
                                    <Button icon={<MapIcon />} onClick={() => trackRoute(rowData)} className="action_button" label="Track Route" />
                                    <Button
                                        style={{backgroundColor:rowData.deliveryStatus !== "DELIVERED"?"green":"gray"}}
                                        disabled={rowData.deliveryStatus == "DELIVERED"}
                                        icon={rowData.deliveryStatus !== "DELIVERED"?<CheckCircleOutlineOutlined />:<CloseOutlined/>} 
                                        onClick={()=>{ setSelectedOrder(rowData)}} className="check_button" label="Confirm Delivery" />
                                </>
                            );
                        }}>
                    </Column>
                    <Column field="orderId" sortable header="Order Id"></Column>
                    <Column
                        bodyStyle={{ fontSize: "1.2rem" }}
                        field="paymentStatus" sortable header="Payment Status"
                        body={(rowData) => {
                            return (
                                <p
                                    style={{
                                        color: rowData.paymentStatus === "PAID" ? "green" : "red"
                                    }}
                                >{rowData.paymentStatus}</p>
                            )
                        }}
                    ></Column>
                    <Column field="senderAddress" header="From"></Column>
                    <Column field="recipientAddress" header="To"></Column>
                    <Column field="createdAt" sortable header="Date Added"></Column>
                    <Column
                        alignFrozen='right'
                        frozen={selected}
                        selectionMode="single" headerStyle={{ width: '3rem' }}
                        field="orderId" header="Focus Order"
                        style={{ textAlign: 'center' }}
                    >
                    </Column>
                </DataTable>
            </div>
        </>
    );
}
