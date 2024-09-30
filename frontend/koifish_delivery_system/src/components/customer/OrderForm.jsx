import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { QRCodeSVG } from 'qrcode.react';
import '../../css/OrderForm.css'; 

export default function OrderForm() {
  const [showQRCode, setShowQRCode] = useState(false);

  const fishNames = [
    'Tancho', 'Koromo', 'Aka Matsuba', 'Kikkokuryu', 'Hariwake', 'Platinum', 'Shusui',
    'Chagoi', 'Ginrin Kohaku', 'Doitsu Kohaku', 'Taisho Sanshoku', 'Showa Sanshoku',
    'Hi Utsuri', 'Kin Showa', 'Ogon', 'Kujyaku', 'Kumonryu', 'Asagi', 'Ochibashigure',
    'Goshiki', 'Shiro Utsuri', 'Kin Kikkokuryu', 'Yamato Nishiki', 'Bekko'
  ];

  const [fishOrders, setFishOrders] = useState(() => {
    const savedOrders = localStorage.getItem('fishOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [customerInfo, setCustomerInfo] = useState({
    nameCustomer: '',
    phoneCustomer: '',
    addressCustomer: '',
    distance: 0,
  });

  const [fishData, setFishData] = useState([
    { name: 'Fish A', weight: 2, price: 10000, status: '1' },
    { name: 'Fish B', weight: 3, price: 15000, status: '1' },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedFishData = [...fishData];
    updatedFishData[index].status = newStatus;
    setFishData(updatedFishData);
  };

  const addRow = () => {
    setFishOrders([...fishOrders, { name: '', quantity: 1, price: 0, total: 0 }]);
  };

  const deleteRow = (index) => {
    const updatedOrders = fishOrders.filter((_, i) => i !== index);
    setFishOrders(updatedOrders);
  };

  function updateRow(index, field, value) {
    const updatedOrders = fishOrders.map((order, i) => 
      i === index ? { ...order, [field]: value, total: order.quantity * order.price } : order
    );
    setFishOrders(updatedOrders);
  }

  const handleCustomerChange = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  const getTotalAmount = () => {
    return fishOrders.reduce((acc, order) => acc + order.total, 0);
  };

  const calculateShippingFee = () => {
    const { distance } = customerInfo;
    if (distance <= 5) return 0;
    return Math.ceil((distance - 5) / 5) * 12000;
  };

  const calculateVAT = () => {
    return (getTotalAmount() * 0.03).toFixed(0);
  };

  const handleCheckout = () => {
    if (!customerInfo.nameCustomer || !customerInfo.phoneCustomer || !customerInfo.addressCustomer || !customerInfo.nameSender || !customerInfo.phoneSender || !customerInfo.addressSender) {
      Swal.fire('Notification', 'Please enter complete customer/sender information', 'error');
      return;
    }
<p>Total amount: ${getTotalAmount() + parseInt(calculateVAT()) + calculateShippingFee().toFixed(0)} VND</p>
      Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setShowQRCode(true);
      }
    });
  };

  useEffect(() => {
    const updatedOrders = fishOrders.map(order => ({
      ...order,
      total: order.quantity * order.price,
    }));
    setFishOrders(updatedOrders);
  }, [fishOrders]);

  useEffect(() => {
    localStorage.setItem('fishOrders', JSON.stringify(fishOrders));
  }, [fishOrders]);

  const confirmPay = () => {
    localStorage.removeItem('fishOrders');
    setFishOrders([]);
    setCustomerInfo({
      nameCustomer: '',
      phoneCustomer: '',
      addressCustomer: '',
      distance: 0,
    });

    Swal.fire('Success!', 'Order confirmed!', 'success');
    setShowQRCode(false);
  };

  return (
    <div className="container">
      <div className="content">
        <h2>Order Form</h2>
        <table className="fixed-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Weight (kg)</th>
              <th>Price (VND/Kg)</th>
              <th>Health Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fishOrders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <select
                    value={order.name}
                    onChange={(e) => updateRow(index, 'name', e.target.value)}
                    className="custom-dropdown"
                  >
                    <option value="">Choose fish type</option>
                    {fishNames.map((fishName, idx) => (
                      <option key={idx} value={fishName}>
                        {fishName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={order.quantity}
                    onChange={(e) => updateRow(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="custom-dropdown"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={order.price}
                    onChange={(e) => updateRow(index, 'price', parseInt(e.target.value) || 0)}
                    className="custom-dropdown"
                  />
                </td>
                <td>
                  <select
                    className="custom-dropdown"
                    value={fishData[index]?.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}>
                    <option value="1">Healthy</option>
                    <option value="2">Healthy Check</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => deleteRow(index)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className="add-button">
          Add Fish
        </button>

        <div className="sender-info">
          <h3>Sender Information</h3>
          <input type="text" placeholder="Name" onChange={(e) => handleCustomerChange('nameSender', e.target.value)} />
          <input type="text" placeholder="Phone" onChange={(e) => handleCustomerChange('phoneSender', e.target.value)} />
          <input type="text" placeholder="Address" onChange={(e) => handleCustomerChange('addressSender', e.target.value)} />
        </div>

        <div className="customer-info">
          <h3>Customer Information</h3>
          <input type="text" placeholder="Name" onChange={(e) => handleCustomerChange('nameCustomer', e.target.value)} />
          <input type="text" placeholder="Phone" onChange={(e) => handleCustomerChange('phoneCustomer', e.target.value)} />
          <input type="text" placeholder="Address" onChange={(e) => handleCustomerChange('addressCustomer', e.target.value)} />
          <input type="number" placeholder="Distance (km)" onChange={(e) => handleCustomerChange('distance', parseInt(e.target.value) || 0)} />
        </div>

        <h3>Total Amount: {getTotalAmount() + parseInt(calculateVAT()) + calculateShippingFee().toFixed(0)} VND</h3>

        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>

        {showQRCode && (
          <div>
            <h3>Order QR Code</h3>
            <QRCodeSVG value="Order information here..." />
            <button onClick={confirmPay} className="confirm-button">
              Confirm Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}