import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { QRCodeSVG } from "qrcode.react";
import "../../css/OrderForm.css";

export default function OrderForm() {
  const [showQRCode, setShowQRCode] = useState(false);

  const fishNames = [
    "Tancho",
    "Koromo",
    "Aka Matsuba",
    "Kikkokuryu",
    "Hariwake",
    "Platinum",
    "Shusui",
    "Chagoi",
    "Ginrin Kohaku",
    "Doitsu Kohaku",
    "Taisho Sanshoku",
    "Showa Sanshoku",
    "Hi Utsuri",
    "Kin Showa",
    "Ogon",
    "Kujyaku",
    "Kumonryu",
    "Asagi",
    "Ochibashigure",
    "Goshiki",
    "Shiro Utsuri",
    "Kin Kikkokuryu",
    "Yamato Nishiki",
    "Bekko",
  ];

  const [fishOrders, setFishOrders] = useState(() => {
    const savedOrders = localStorage.getItem("fishOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [customerInfo, setCustomerInfo] = useState({
    nameCustomer: "",
    phoneCustomer: "",
    addressCustomer: "",
    distance: 0,
  });

  const [fishData, setFishData] = useState([
    { name: "Fish A", weight: 2, price: 10000, status: "1" },
    { name: "Fish B", weight: 3, price: 15000, status: "1" },
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedFishData = [...fishData];
    updatedFishData[index].status = newStatus;
    setFishData(updatedFishData);
  };

  const addRow = () => {
    setFishOrders([
      ...fishOrders,
      { name: "", quantity: 1, price: 0, total: 0 },
    ]);
  };

  const deleteRow = (index) => {
    const updatedOrders = fishOrders.filter((_, i) => i !== index);
    setFishOrders(updatedOrders);
  };

  const updateRow = (index, field, value) => {
    const updatedOrders = fishOrders.map((order, i) =>
      i === index
        ? {
            ...order,
            [field]: value,
            total:
              (field === "quantity" ? value : order.quantity) *
              (field === "price" ? value : order.price),
          }
        : order
    );
    setFishOrders(updatedOrders);
  };

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
    if (
      !customerInfo.nameCustomer ||
      !customerInfo.phoneCustomer ||
      !customerInfo.addressCustomer ||
      !customerInfo.nameSender ||
      !customerInfo.phoneSender ||
      !customerInfo.addressSender
    ) {
      Swal.fire(
        "Notification",
        "Please enter complete customer/sender information",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Confirm information",
      html: `
      <p>Name sender: ${customerInfo.nameSender}</p>
        <p>Phone sender: ${customerInfo.phoneSender}</p>
        <p>Address sender: ${customerInfo.addressSender}</p>

        <p>Name customer: ${customerInfo.nameCustomer}</p>
        <p>Phone customer: ${customerInfo.phoneCustomer}</p>
        <p>Address customer: ${customerInfo.addressCustomer}</p>
        <p>Total amount: ${
          getTotalAmount() +
          parseInt(calculateVAT()) +
          parseFloat(calculateShippingFee().toFixed(0))
        } VND</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowQRCode(true);
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("fishOrders", JSON.stringify(fishOrders));
  }, [fishOrders]);

  const confirmPay = () => {
    const request = {
      customer: customerInfo,
      status: "Wait for confirmation",
      totalAmount: getTotalAmount() +  parseInt(calculateVAT()) + parseFloat(calculateShippingFee().toFixed(0)),
      ship: calculateShippingFee().toFixed(0),
      VAT: calculateVAT(),
      createTime: new Date(),
      product: fishOrders,
    };
    const storedCheckout = JSON.parse(localStorage.getItem("checkout")) || [];
    const updatedCheckout = [...storedCheckout, request];
    localStorage.setItem("checkout", JSON.stringify(updatedCheckout));

    localStorage.removeItem("fishOrders");
    setFishOrders([]);
    setCustomerInfo({
      nameCustomer: "",
      phoneCustomer: "",
      addressCustomer: "",
      distance: 0,
    });

    Swal.fire("Success!", "Order confirmed!", "success");
    setShowQRCode(false);
  };

  return (
    <div className="order-form">
      <div className="container">
        <div className="content">
          <h2 className="title">Order Form</h2>
          <table className="fixed-table">
            <thead>
              <tr>
                <th className="label-table">Index</th>
                <th className="label-table">Name</th>
                <th className="label-table">Weight (kg)</th>
                <th className="label-table">Price (VND/Kg)</th>
                <th className="label-table">Health Status</th>
                <th className="label-table">Action</th>
              </tr>
            </thead>
            <tbody>
              {fishOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <select
                      value={order.name}
                      onChange={(e) => updateRow(index, "name", e.target.value)}
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
                      min="0"
                      onChange={(e) =>
                        updateRow(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="custom-dropdown"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={order.price}
                      onChange={(e) =>
                        updateRow(index, "price", parseInt(e.target.value) || 0)
                      }
                      className="custom-dropdown"
                    />
                  </td>
                  <td>
                    <select
                      className="custom-dropdown"
                      value={fishData[index]?.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                    >
                      <option value="1">Healthy</option>
                      <option value="2">Healthy Check</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteRow(index)}
                      className="delete-button"
                    >
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

          <div className="layout-customer">
            <div className="sender-info">
              <h3 className="label-customer">Sender Information</h3>
              <input
                require
                className="input-customer"
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  handleCustomerChange("nameSender", e.target.value)
                }
              />
              <input
                className="input-customer"
                type="text"
                placeholder="Phone"
                onChange={(e) =>
                  handleCustomerChange("phoneSender", e.target.value)
                }
              />
              <input
                className="input-customer"
                type="text"
                placeholder="Address"
                onChange={(e) =>
                  handleCustomerChange("addressSender", e.target.value)
                }
              />
            </div>

            <div className="customer-info">
              <h3 className="label-customer">Customer Information</h3>
              <input
                className="input-customer"
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  handleCustomerChange("nameCustomer", e.target.value)
                }
              />
              <input
                className="input-customer"
                type="text"
                placeholder="Phone"
                onChange={(e) =>
                  handleCustomerChange("phoneCustomer", e.target.value)
                }
              />
              <input
                className="input-customer"
                type="text"
                placeholder="Address"
                onChange={(e) =>
                  handleCustomerChange("addressCustomer", e.target.value)
                }
              />
              <input
                className="input-customer"
                type="number"
                placeholder="Distance (km)"
                min="0"
                onChange={(e) =>
                  handleCustomerChange(
                    "distance",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>
          </div>

          <div className="layout-total">
            <p className="label-total">
              Shipping fee: {calculateShippingFee() || 0} VND
            </p>
            <p className="label-total">VAT (3%): {calculateVAT() || 0} VND</p>
            <h3 className="total-amount">
              Total Amount:{" "}
              {getTotalAmount() +
                parseInt(calculateVAT()) +
                parseFloat(calculateShippingFee().toFixed(0))}{" "}
              VND
            </h3>
          </div>

          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>

          {showQRCode && (
            <div className="popup">
              <div className="container-popup">
                <h3 className="title-popup">Please scan the QR code to pay!</h3>
                <div className="layout-popup">
                  <div className="layout-qrcode">
                    <p className="label-qrcode">Payment via VNPAY</p>
                    <QRCodeSVG
                      value="https://your-payment-url-1.com"
                      size={256}
                    />
                  </div>
                  <div className="layout-qrcode">
                    <p className="label-qrcode">Payment via Momo</p>
                    <QRCodeSVG
                      value="https://your-payment-url-2.com"
                      size={256}
                    />
                  </div>
                </div>
                <div className="layout-btn">
                  <button onClick={() => confirmPay()} className="confirm-btn">
                    Confirm payment
                  </button>
                  <button
                    onClick={() => setShowQRCode(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
