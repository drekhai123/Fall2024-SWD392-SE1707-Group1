/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { QRCodeSVG } from "qrcode.react";
import "../../css/OrderForm.css";
import axios from "axios";
import { CreateOrder } from "../api/OrderApi"
import { GetAllKoiFishes } from "../api/KoiFishApi";
import { useNavigate } from 'react-router-dom';

export default function OrderForm({ onSuggestionClick, distance }) {
  const navigateToLogin = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user")); // Get user info from local storage

  const [showQRCode, setShowQRCode] = useState(false);
  const [koifish, setKoiFish] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(false); // Track error state
  const [check, setCheck] = useState(false)
  const [koifishList, setKoiFishList] = useState([]);
  const [fishOrdersList, setFishOrdersList] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [markerPositionFrom, setMarkerPositionFrom] = useState(null);
  const [markerPositionTo, setMarkerPositionTo] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [days, setDays] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    nameCustomer: "",
    phoneCustomer: "",
    addressCustomer: "",
    distance: 0,
  });

  // Hàm Fetch API để lấy những con cá của customer riêng lẻ
  useEffect(() => {
    const getFishProfile = async () => {
      setLoading(true)
      axios.get(`https://kdosdreapiservice.azurewebsites.net/api/FishProfile/Customer/${user.customer.customerId}`)
        .then(response => {
          setKoiFishList(response.data); // Lưu dữ liệu cá Koi vào state koifishList
          setLoading(false)
        })
        .catch(error => {
          console.error("Error fetching fish data:", error);
        });
    }
    if (user !== null) {
      //getFishProfile();
    } else {
      alert("Please Login To Continue...")
      navigateToLogin("/login")
    }
  }, []);

  useEffect(() => {
    setDays(calculateEstimatedDeliveryDays(customerInfo?.distance))
  }, [customerInfo?.distance]);

  const [fishOrders, setFishOrders] = useState(() => {
    const savedOrders = sessionStorage.getItem("fishOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  function calculateEstimatedDeliveryDays(distance) {
    if (distance === 0) {
      return 0;
    } else if (distance < 50) {
      return 1;
    } else if (distance >= 50 && distance < 100) {
      return 2;
    } else if (distance >= 100 && distance <= 500) {
      return 4;
    } else if (distance > 500 && distance <= 1000) {
      return 7;
    } else {
      return 10;
    }
  }


  const getTotalAmount = () => {
    return fishOrders.reduce((acc, order) => acc + order.total, 0);
  };
  // phí shipping
  const calculateShippingFee = () => {
    const { distance } = customerInfo;
    const estimatedDays = calculateEstimatedDeliveryDays(distance);

    if (distance <= 5) {
      return check ? 25000 : 0;
    }

    const baseFee = Math.ceil((distance - 5) / 5) * 12000;

    if (check && estimatedDays === 1) {
      return baseFee + 25000;
    } else if (!check && estimatedDays === 1) {
      return baseFee
    } else {
      return baseFee + 20000 * estimatedDays;
    }
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
    console.log(user)
    Swal.fire({
      title: "Confirm information",
      html: `
      <p>Name sender: ${customerInfo.nameSender}</p>
        <p>Phone sender: ${customerInfo.phoneSender}</p>
        <p>Address sender: ${customerInfo.addressSender}</p>

        <p>Name customer: ${customerInfo.nameCustomer}</p>
        <p>Phone customer: ${customerInfo.phoneCustomer}</p>
        <p>Address customer: ${customerInfo.addressCustomer}</p>
        <p>Feed the fish: ${check ? 'Yes' : 'No'} ${check ? `${(days === 1 ? 25000 : days * 20000)} VND` : ''}</p>
        <p>Total amount: ${getTotalAmount() +
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
    sessionStorage.setItem("fishOrders", JSON.stringify(fishOrders));
  }, [fishOrders]);
  const confirmPay = () => {
    const request = {
      senderName: customerInfo.nameSender,
      senderAddress: customerInfo.addressSender,
      senderPhoneNumber: customerInfo.phoneSender,
      recipientName: customerInfo.nameCustomer,
      recipientAddress: customerInfo.addressCustomer,
      recipientPhoneNumber: customerInfo.phoneCustomer,
      recipientEmail: user.email || null,
      paymentMethod: "CASH",
      paymentStatus: "PENDING",
      deliveryStatus: "PENDING",
      deliveryNote: check ? "Feed the fish" : 'There are no comment',
      quantity: fishOrders.length,
      totalWeight: fishOrders.reduce((acc, item) => acc + item.weight, 1),
      totalCost:
        getTotalAmount() +
        parseInt(calculateVAT()) +
        parseFloat(calculateShippingFee().toFixed(0)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      weightPriceListId: 1,
      customerId: Number(user.customer.customerId),
      distancePriceListId: 1,
      transportId: 2,
    };
    CreateOrder(request);
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

  const calculateDeliveryDate = (days) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    return currentDate.toLocaleDateString();
  };

  const estimatedDays = customerInfo?.distance
    ? calculateEstimatedDeliveryDays(customerInfo?.distance)
    : 0;

  const deliveryDate = customerInfo?.distance
    ? calculateDeliveryDate(estimatedDays)
    : '--';

  const handleCustomerChange = async (field, value) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(async () => {
        if (value) {
          try {
            const response = await axios.get(
              // `https://api.locationiq.com/v1/autocomplete.php?key=pk.c556e60415cc1a659e686d02e117cf4c&q=${encodeURIComponent(
              `https://api.locationiq.com/v1/autocomplete.php?key=pk.ca07cc332b14654e3183726ab3e3451e&q=${encodeURIComponent(
                value
              )}&countrycodes=VN&format=json`
            );
            // có chỗ country codes này thì lên wikipedia tìm mã code của từng nước rồi add zô, hiện thì hiển thị nhiều nước rối quá nên chỉ set Vn thôi
            if (field === "addressSender") {
              setFromSuggestions(response.data);
            } else if (field === "addressCustomer") {
              setToSuggestions(response.data);
            }
          } catch (error) {
            console.error("Error fetching address suggestions:", error);
          }
        } else {
          if (field === "addressSender") {
            setFromSuggestions([]);
          } else if (field === "addressCustomer") {
            setToSuggestions([]);
          }
        }
      }, 500)
    );
    setCustomerInfo({ ...customerInfo, [field]: value });
  };



  const handleSuggestionClick = (suggestion, type) => {
    if (suggestion.lat && suggestion.lon) {
      if (type === "addressSender") {
        setMarkerPositionFrom([suggestion.lat, suggestion.lon]);
        setCustomerInfo({ ...customerInfo, addressSender: suggestion?.display_name });
        setFromSuggestions(null);
      } else if ('addressCustomer') {
        setMarkerPositionTo([suggestion.lat, suggestion.lon]);
        setCustomerInfo({ ...customerInfo, addressCustomer: suggestion?.display_name });
        setToSuggestions(null);
      }
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);  // Quay lại trang trước đó
  };

  // Hàm updaterow
  const updateRow = (index, field, value) => {
    const updatedOrders = [...fishOrdersList];
    updatedOrders[index][field] = value;
    if (field === "name") {
      const selectedFish = koifishList.find(fish => fish.fishType === value);
      if (selectedFish) {
        updatedOrders[index].quantity = selectedFish.weight; // Cập nhật weight từ API
        updatedOrders[index].price = selectedFish.price;     // Cập nhật price từ API
      }
    }

    setKoiFishList(updatedOrders);
  };

  // Hàm thêm dòng mới
  const addRow = () => {
    setFishOrdersList([...fishOrdersList]);
  };

  // Hàm xóa dòng
  const deleteRow = (index) => {
    const updatedOrders = fishOrdersList.filter((_, i) => i !== index);
    setKoiFishList(updatedOrders);
  };


  //Hàm của mapping để nguyên (comment cái const ở trên của nó)

  useEffect(() => {
    if (markerPositionFrom && markerPositionTo) {
      onSuggestionClick({ form: markerPositionFrom, to: markerPositionTo });
    }
  }, [markerPositionFrom, markerPositionTo])

  // Hàm của Distance (comment cái const ở trên của nó)
  useEffect(() => {
    setCustomerInfo({ ...customerInfo, distance: distance });
  }, [distance])

  const FishTable = () => {
    return (
      <table className="fixed-table">
        <thead>
          <tr>
            <th className="label-table">Index</th>
            <th className="label-table">Name</th>
            <th className="label-table">Weight (kg)</th>
            <th className="label-table">Price (VND/Kg)</th>
            <th className="label-table">Action</th>
          </tr>
        </thead>
        <tbody>
          {koifishList.map((fish, index) => (
            <tr key={fish.fishProfileId}>
              <td>{index + 1}</td>
              <td>
                <select
                  value={fish.name}
                  onChange={(e) => updateRow(index, "name", e.target.value)}
                  className="custom-dropdown"
                >
                  <option value="">Choose fish type</option>
                  {koifish.map((koifish) => (
                    <option
                      key={koifish.koiFishId}
                      value={koifish.fishType}
                    >
                      {koifish.fishType}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={fish.quantity === 1 ? "" : fish.quantity} // Nếu giá trị là 1, thì để trống (Vì cái này tự nhiên lỗi addfish auto 1)
                  min=""
                  onChange={(e) =>
                    updateRow(
                      index,
                      "quantity",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="custom-dropdown"
                  disabled // Vô hiệu hóa input người dùng (Tạm thời)
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={fish.price === 0 ? "" : fish.price} // Nếu giá trị là 0, thì để trống
                  onChange={(e) =>
                    updateRow(index, "price", parseInt(e.target.value) || 0)
                  }
                  className="custom-dropdown"
                  disabled // Vô hiệu hóa input người dùng (Tạm thời)
                />
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
    )
  }

  return (

    <div className="order-form">
      <div className="con">
        <button onClick={handleGoBack} className="go-back-button">
          ⭠ Previous Page
        </button>

        <div className="content">
          <h2 className="title">Order Form</h2>
          {koifishList ?
            <>
              {loading ? ( // Hiển thị thông báo đang tải
                <p className="Fish-status-loading">Loading fish data...</p>
              ) : error ? ( // Hiển thị thông báo lỗi
                <p className="Fish-status-error">There was an error fetching the fish data. Please try again later.</p>
              ) : koifishList.length === 0 ? ( // Hiển thị thông báo không có cá
                <p className="Fish-status-empty">There is no fish, you need to add more.</p>
              ) : <FishTable />
              }
            </>
            : ""
          }
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
              <div className="layout-suggestions">
                <input
                  className="input-customer"
                  type="text"
                  placeholder="Address"
                  value={customerInfo?.addressSender}
                  onChange={(e) =>
                    handleCustomerChange("addressSender", e.target.value)
                  }
                />
                <div>
                  {fromSuggestions?.length > 0 && (
                    <div className="suggestions">
                      {fromSuggestions?.map((suggestion) => (
                        <div
                          key={suggestion.place_id}
                          onClick={() =>
                            handleSuggestionClick(suggestion, "addressSender")
                          }
                          className="suggestion-item"
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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

              <div className="layout-suggestions">
                <input
                  className="input-customer"
                  type="text"
                  placeholder="Address"
                  value={customerInfo?.addressCustomer}
                  onChange={(e) =>
                    handleCustomerChange("addressCustomer", e.target.value)
                  }
                />
                <div>
                  {toSuggestions?.length > 0 && (
                    <div className="suggestions">
                      {toSuggestions?.map((suggestion) => (
                        <div
                          key={suggestion.place_id}
                          onClick={() =>
                            handleSuggestionClick(suggestion, "addressCustomer")
                          }
                          className="suggestion-item"
                        >
                          {suggestion.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: 10 }} className="customer-info">
                <h3 className="label-customer">Distance (km)</h3>
                <input
                  className="input-customer"
                  type="number"
                  disabled
                  value={customerInfo?.distance}
                  placeholder="Distance (km)"
                  min="0"
                  onChange={(e) =>
                    handleCustomerChange(
                      "distance",
                      parseInt(e.target.value) || 0
                    )
                  }
                />


                <div title="If the expected delivery time is greater than 100km (2 days) ! The cost of feeding the fish will be automatically calculated at 20,000VND per day"
                  className="layout-checkbox" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }} >  {/* lười css làm z cho lẹ */}
                  <p>
                    <strong>Estimated delivery date: {deliveryDate} ({estimatedDays} days)</strong>
                  </p>

                  <div title="If the transit is less than 1 day, if you want to feed the fish, the cost will be 25000 VND" className="checkbox-container">
                    {customerInfo?.distance <= 50 && ( // Nếu distance lớn hơn 50 thì checkbox biến mất
                      <label>
                        <input
                          style={{ cursor: 'pointer' }}
                          type="checkbox"
                          checked={check}
                          onChange={(e) => setCheck(e.target.checked)}

                        />
                        If you want to feed the fish ({days === 1 ? 25000 : days * 20000} VND)
                      </label>
                    )}
                  </div>
                </div>

              </div>
            </div>
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
  );
}
