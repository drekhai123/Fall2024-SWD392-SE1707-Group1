/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import "../../css/OrdersDashBoard.css";
import { Dates } from "../../utils/Dates";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const option = [
  "Wait for confirmation",
  "Confirmed",
  "Delivering",
  "Goods received",
  "Canceled",
];

const DashBoardStaffAdmin = () => {
  const [selectDate, setSelectDate] = useState(new Date())
  const [orders, setOrders] = useState([]);
  const [ordersDisplay, setOrdersDisplay] = useState([]);
  const [showDetail, setShowDetail] = useState(null);
  const navigate = useNavigate();
  const goToHomepage = () => {
    navigate('/'); // Đường dẫn của trang homepage
  };

  useEffect(() => {
    fetch();
  }, [orders.status]);

  const fetch = useCallback(() => {
    const storedOrders = JSON.parse(localStorage.getItem("checkout")) || [];
    setOrders(storedOrders);
    setOrdersDisplay(storedOrders);
  }, []);

  const calculateTotal = (products) => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleDetails = (order) => {
    setShowDetail(order);
  };

  const updateRow = (index, value) => {
    const newListOrder = [...orders];
    newListOrder[index].status = value;
    localStorage.setItem("checkout", JSON.stringify(newListOrder));

    setOrders(newListOrder);
  };

  const handleFilterDate = (date) => {
    setSelectDate(date);
    if(date) {
      const selectedDate = new Date(date).toLocaleDateString('en-CA');
      setOrdersDisplay(
        orders?.filter((e) => {
          const createTimeDay = new Date(e.createTime).toLocaleDateString('en-CA');
          return createTimeDay === selectedDate;
        })
      );
    } else {
      setOrdersDisplay(orders)
    }
  };

  const handleViewAll = () => {
    setSelectDate(null);
    setOrdersDisplay(orders);
  };

  const CustomInput = ({ value, onClick }) => (
    <div className="layout-date-picker">    
      <button className="date-picker" onClick={handleViewAll}>
        View all
      </button>
      <button className="date-picker2" onClick={onClick}>
        {value || "Select days"}
      </button>
    </div>
  );
  

  return (
    <div className="checkout-form">
      <div className="container">
        <div className="form-datePicker">
        <button onClick={goToHomepage} className="Back-to-Homepages">
              🏠
            </button>
          <label className="label-total">Sort by date: </label>
          <DatePicker
        selected={selectDate}
        onChange={handleFilterDate}
        todayButton="Today"
        isClearable={true}
        dateFormat={"dd/MM/yyyy"}
        className="date-picker"
        customInput={<CustomInput />}
      />
        </div>
        <h2 className="text-center my-4">List Of Orders</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="label-table">Customer name</th>
              <th className="label-table">Customer phone</th>
              <th className="label-table">Product quantity</th>
              <th className="label-table">Total amount</th>
              <th className="label-table">Status</th>
              <th className="label-table">Create Time</th>
              <th className="label-table">Detail</th>
            </tr>
          </thead>
          <tbody>
            {ordersDisplay?.length > 0 ? (
              ordersDisplay?.map((order, index) => (
                <tr key={index}>
                  <td>{order.customer.nameCustomer}</td>
                  <td>{order.customer.phoneCustomer}</td>
                  <td>{order.product.length}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateRow(index, e.target.value)}
                      className="custom-dropdown"
                    >
                      {option.map((op, idx) => (
                        <option key={idx} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {order?.createTime &&
                      Dates.format(order.createTime, "DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDetails(order)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showDetail && (
        <div className="popup">
          <div className="container-popup">
            <h3 className="title-popup">Order details</h3>

            <div className="customer-info">
              <h4>Customer information</h4>
              <div className="layout-info">
                <div>
                  <p>
                    <strong>Sender name:</strong>{" "}
                    {showDetail?.customer?.nameSender}
                  </p>
                  <p>
                    <strong>Sender phone:</strong>{" "}
                    {showDetail?.customer?.phoneSender}
                  </p>
                  <p>
                    <strong>Sender address:</strong>{" "}
                    {showDetail?.customer?.addressSender}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Customer name:</strong>{" "}
                    {showDetail?.customer?.nameCustomer}
                  </p>
                  <p>
                    <strong>Customer phone:</strong>{" "}
                    {showDetail?.customer?.phoneCustomer}
                  </p>
                  <p>
                    <strong>Customer address:</strong>{" "}
                    {showDetail?.customer?.addressCustomer}
                  </p>
                </div>
              </div>
              <p>
                <strong>Distance:</strong> {showDetail?.customer?.distance} km
              </p>
            </div>

            <div className="product-info">
              <h4>Product</h4>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total price</th>
                  </tr>
                </thead>
                <tbody>
                  {showDetail.product.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price} VND</td>
                      <td>{item.total} VND</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="layout-total">
              <p className="label-total">
                Total: {calculateTotal(showDetail.product) || 0} VND
              </p>
              <p className="label-total">
                Shipping fee: {showDetail?.ship || 0} VND
              </p>
              <p className="label-total">
                VAT (3%): {showDetail?.VAT || 0} VND
              </p>
              <h3 className="total-amount">
                Total Amount: {showDetail?.totalAmount} VND
              </h3>
            </div>

            <div className="layout-btn">
              <span />
              <button
                onClick={() => setShowDetail(null)}
                className="cancel-btn"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardStaffAdmin;
