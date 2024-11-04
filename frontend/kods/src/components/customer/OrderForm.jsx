/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from "react";
import Swal from "sweetalert2";
// import {QRCodeSVG} from "qrcode.react";
import "../../css/OrderForm.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {getJwtToken} from "../api/Url";
import {postOrders} from "../api/OrdersApi";
import {postOrderDetailsByOrderId} from "../api/OrdersApi";

export default function OrderForm({onSuggestionClick, distance}) {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [modal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [showQRCode, setShowQRCode] = useState(null);
  const [check, setCheck] = useState(false)
  const [fishOrdersList, setFishOrdersList] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [markerPositionFrom, setMarkerPositionFrom] = useState(null);
  const [markerPositionTo, setMarkerPositionTo] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [days, setDays] = useState(null);
  const [selectedFish, setSelectedFish] = useState([]);

  const [distancePriceList, setDistancePriceList] = useState([]);
  const [weightPriceList, setWeightPriceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    nameCustomer: "",
    phoneCustomer: "",
    addressCustomer: "",
    EmailCustomer: "",
    distance: 0,
  });

  const token = getJwtToken();

  // Hàm validation
  const [phoneErrors, setPhoneErrors] = useState({
    sender: '',
    customer: ''
  });

  // Hàm validate sđt Việt Nam
  const validateVietnamesePhone = (phone) => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phone);
  };

  // Thêm state cho email error
  const [emailError, setEmailError] = useState('');



  // Thêm hàm validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Hàm fecth API get FishProfile
  const getFishProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://kdosdreapiservice.azurewebsites.net/api/FishProfile/Customer/${user?.customer?.customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.customer?.customerId]); // Chỉ tạo lại khi user.customer.customerId thay đổi


  //Hàm Fetch API DistancePriceList
  const getDistancePriceList = useCallback(async () => {
    setLoading(true);
    try {
      const distanceResponse = await axios.get(
        "https://kdosdreapiservice.azurewebsites.net/api/DistancePriceList", {
        headers: {

          'Authorization': `Bearer ${token}`
        }
      }
      );
      setDistancePriceList(distanceResponse?.data); // Lưu dữ liệu từ API vào state
    } catch (error) {
      console.error("Error fetching distance data:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  //Hàm fetch API getWeightPriceList
  const getWeightPriceList = useCallback(async () => {
    setLoading(true);
    try {
      const weightPriceList = await axios.get(
        "https://kdosdreapiservice.azurewebsites.net/api/WeightPriceList", {
        headers: {

          'Authorization': `Bearer ${token}`
        }
      }
      );
      setWeightPriceList(weightPriceList?.data); // Lưu dữ liệu từ API vào state
    } catch (error) {
      console.error("Error fetching distance data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getDistancePriceList();
    getWeightPriceList()
  }, []);

  useEffect(() => {
    if (user !== null) {
      getFishProfile();
    } else {
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      getFishProfile();
    } else {
      alert("Please login to continue...");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user?.customer?.customerId) {
      getFishProfile();
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
    var unitPrice = 0;

    // Tm giá từ khoảng cách tương ứng trong distancePriceList
    const range = distancePriceList.find(
      (item) => distance >= item.minRange && distance <= item.maxRange
    );

    if (range) {
      unitPrice = range.price;
    }

    return distance * parseFloat(unitPrice); // Chỉ trả về phí shipping cơ bản
  };

  // Rename the function
  const FeedingFee = () => {
    if (!customerInfo?.distance) return 0;

    const estimatedDays = calculateEstimatedDeliveryDays(customerInfo.distance);

    if (customerInfo.distance <= 50) {
      // Nếu kho cách <= 50km và người dùng check box
      return check ? 25000 : 0;
    } else {
      // Nếu khoảng cách > 50km, tự động tính phí theo số ngày
      return estimatedDays * 20000;
    }
  };

  const handleCheckout = () => {
    if (
      !customerInfo.nameCustomer ||
      !customerInfo.phoneCustomer ||
      !customerInfo.addressCustomer ||
      !customerInfo.emailCustomer ||
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

    const userLogin = JSON.parse(sessionStorage.getItem("user"))
    const weightPriceListId = weightPriceList?.find(item =>
      totalWeight >= item.minRange && totalWeight <= item.maxRange
    )?.weightPriceListId;

    const distancePriceListId = distancePriceList?.find(item =>
      customerInfo?.distance >= item.minRange && customerInfo?.distance <= item.maxRange
    )?.distancePriceListId;

    const request = {
      senderName: customerInfo?.nameSender,
      senderAddress: customerInfo?.addressSender,
      senderPhoneNumber: customerInfo?.phoneSender,
      recipientAddress: customerInfo?.addressCustomer,
      recipientName: customerInfo?.nameCustomer,
      recipientPhoneNumber: customerInfo?.phoneCustomer,
      recipientEmail: customerInfo?.emailCustomer,
      paymentMethod: 'BANK_TRANSFER',
      paymentStatus: 'PENDING',
      deliveryStatus: 'PENDING',
      deliveryNote: "deliveryNote demo",
      quantity: fishOrdersList?.length,
      totalWeight: totalWeight,
      distance: Number(customerInfo?.distance),
      totalCost: (getTotalAmount() + (FeedingFee()) + parseFloat(calculateShippingFee().toFixed(0))),
      createdAt: new Date(),
      updatedAt: new Date(),
      distancePriceListId: distancePriceListId,
      weightPriceListId: weightPriceListId || 1,
      customerId: userLogin?.customer?.customerId,
      transportId: 2,
    }

    Swal.fire({
      title: "Confirm information",
      html: `
      <p>Name sender: ${customerInfo.nameSender}</p>
        <p>Phone sender: ${customerInfo.phoneSender}</p>
        <p>Address sender: ${customerInfo.addressSender}</p>

        <p>Name customer: ${customerInfo.nameCustomer}</p>
        <p>Name customer: ${customerInfo.emailCustomer}</p>
        <p>Phone customer: ${customerInfo.phoneCustomer}</p>
        <p>Address customer: ${customerInfo.addressCustomer}</p>
        <p>Feed the fish: ${check ? 'Yes' : 'No'} ${check ? `${formatCurrency(days === 1 ? 25000 : days * 20000)} VND` : ''}</p>
        <p>Total amount: ${formatCurrency(
          getTotalAmount() +
          FeedingFee() +
          parseFloat(calculateShippingFee().toFixed(0))
        )} VND</p>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowQRCode(request);
      }
    });
  };

  useEffect(() => {
    sessionStorage.setItem("fishOrders", JSON.stringify(fishOrders));
  }, [fishOrders]);

  const confirmPay = async (data) => {
    try {
      console.log("Order data being sent:", data);
      const orderResponse = await postOrders(data);
      console.log("Order response received:", orderResponse);

      if (orderResponse) {
        for (const fish of fishOrdersList) {
          const orderDetailsData = {
            fishProfileId: fish.fishProfileId, // Post each fishProfileId individually
            orderId: orderResponse.orderId
          };

          console.log("Order details data being sent:", orderDetailsData);
          const orderDetailsResponse = await postOrderDetailsByOrderId(orderDetailsData);
          console.log("Order details response received:", orderDetailsResponse);
        }

        localStorage.removeItem("fishOrders");
        setFishOrders([]);
        setCustomerInfo({
          nameCustomer: "",
          phoneCustomer: "",
          addressCustomer: "",
          emailCustomer: "",
          distance: 0,
        });
        Swal.fire("Success!", "Order confirmed!", "success");
        setShowQRCode(null);
        navigate("/profile/ViewOrderHistory");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
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
    if (field === "phoneSender" || field === "phoneCustomer") {
      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        return;
      }

      // Validate phone number
      const isValid = validateVietnamesePhone(value);
      setPhoneErrors(prev => ({
        ...prev,
        [field === "phoneSender" ? "sender" : "customer"]:
          value ? (isValid ? '' : 'Please enter a valid Vietnamese phone number') : ''
      }));
    }

    // Thêm validation cho email
    if (field === "emailCustomer") {
      if (!value) {
        setEmailError('Email is required');
      } else if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }

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
    setCustomerInfo({...customerInfo, [field]: value});
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (suggestion.lat && suggestion.lon) {
      if (type === "addressSender") {
        setMarkerPositionFrom([suggestion.lat, suggestion.lon]);
        setCustomerInfo({...customerInfo, addressSender: suggestion?.display_name});
        setFromSuggestions(null);
      } else if ('addressCustomer') {
        setMarkerPositionTo([suggestion.lat, suggestion.lon]);
        setCustomerInfo({...customerInfo, addressCustomer: suggestion?.display_name});
        setToSuggestions(null);
      }
    }
  };

  const handleGoBack = () => {
    window.close();
    navigate("/");
  };


  const [totalWeight, setTotalWeight] = useState(0);

  // Hàm tính totalWeight
  const calculateTotalWeight = (selectedFishList) => {
    return selectedFishList.reduce((total, fish) => total + fish.weight, 0);
  };

  const addRow = () => {
    const selectedFishData = data?.filter((fish) =>
      selectedFish.includes(fish.fishProfileId)
    );

    setFishOrdersList((prevList) => {
      const newFish = selectedFishData.filter(
        (fish) => !prevList.some((item) => item.fishProfileId === fish.fishProfileId)
      );
      const updatedList = [...prevList, ...newFish];
      setTotalWeight(calculateTotalWeight(updatedList));
      return updatedList;
    });

    setOpenModal(false);
  };

  // Cập nhật hàm deleteRow để tính lại totalWeight khi xóa cá
  const deleteRow = (index) => {
    const updatedOrders = fishOrdersList?.filter((_, i) => i !== index);
    const updatedOrdersCheckbox = selectedFish?.filter((_, i) => i !== index);
    setFishOrdersList(updatedOrders);
    setSelectedFish(updatedOrdersCheckbox);
    // Cập nhật lại totalWeight khi xóa cá
    setTotalWeight(calculateTotalWeight(updatedOrders));
  };

  //Hàm của mapping để nguyên (comment cái const ở trên của nó)

  useEffect(() => {
    if (markerPositionFrom && markerPositionTo) {
      onSuggestionClick({form: markerPositionFrom, to: markerPositionTo});
    }
  }, [markerPositionFrom, markerPositionTo])

  // Hàm của Distance
  useEffect(() => {
    setCustomerInfo({...customerInfo, distance: distance});
  }, [distance])

  const handleCheckboxChange = (fishProfileId) => {
    setSelectedFish((prevSelected) =>
      prevSelected.includes(fishProfileId)
        ? prevSelected.filter((id) => id !== fishProfileId) // Bỏ chọn nếu đã chọn trước đó
        : [...prevSelected, fishProfileId] // Thêm vào danh sách nếu chưa chọn
    );
  };

  const handleSelectAll = (isChecked) => {
    setSelectedFish(isChecked ? data.map((fish) => fish.fishProfileId) : []);
  };

  const FishTable = ({data}) => {
    return (
      <>
        <table className="fixed-table">
          <thead>
            <tr>
              <th className="label-table">Index</th>
              <th className="label-table">Name</th>
              <th className="label-table">Type</th>
              <th className="label-table">Weight (kg)</th>
              <th className="label-table">Gender</th>
              <th className="label-table">Note</th>
              <th className="label-table">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((fish, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {fish?.name}
                </td>
                <td>
                  {fish?.koiFish?.fishType}
                </td>
                <td>
                  {fish?.weight}
                </td>
                <td>
                  {fish?.gender}
                </td>
                <td>
                  {fish?.notes}
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
        {data?.length > 0 && (
          <div style={{
            marginTop: '10px',
            textAlign: 'right',
            fontWeight: 'bold'    // Hiển thị totalWeight
          }}>
            Total Weight: {totalWeight.toFixed(2)} kg
          </div>
        )}
      </>
    )
  }

  // Thêm hàm format số tiền
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Thêm state để quản lý payment method
  const [selectedPayment, setSelectedPayment] = useState('CASH');

  return (
    <div className="order-form">
      <div className="con">
        <button onClick={handleGoBack} className="go-back-button">
          ⭠ Previous Page
        </button>

        <div className="content">
          <h2 className="title">Order Form</h2>
          {data ?
            <>
              {loading ? ( // Hiển thị thông báo đang tải
                <p className="Fish-status-loading">Loading fish data...</p>
              ) : data?.length === 0 ? ( // Hiển thị thông báo không có cá
                <p className="Fish-status-empty">There is no fish, you need to add more.</p>
              ) :
                <p className="Fish-status-empty">Ready to choose fish.</p>
              }
            </>
            : ""
          }
          <FishTable data={fishOrdersList} />
          <button onClick={() => setOpenModal(true)} className="add-button">
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
              <div className="phone-input-container">
                <input
                  className={`input-customer ${phoneErrors.sender ? 'error-input' : ''}`}
                  type="text"
                  placeholder="Phone"
                  value={customerInfo.phoneSender || ''}
                  onChange={(e) => handleCustomerChange("phoneSender", e.target.value)}
                />
                {phoneErrors.sender && <span className="error-message">{phoneErrors.sender}</span>}
              </div>
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
              <div className="phone-input-container">
                <input
                  className={`input-customer ${emailError ? 'error-input' : ''}`}
                  type="text"
                  placeholder="Email"
                  value={customerInfo.emailCustomer || ''}
                  onChange={(e) => handleCustomerChange("emailCustomer", e.target.value)}
                />
                {emailError && <span className="error-message-email">{emailError}</span>}
              </div>
              <div className="phone-input-container">
                <input
                  className={`input-customer ${phoneErrors.customer ? 'error-input' : ''}`}
                  type="text"
                  placeholder="Phone"
                  value={customerInfo.phoneCustomer || ''}
                  onChange={(e) => handleCustomerChange("phoneCustomer", e.target.value)}
                />
                {phoneErrors.customer && <span className="error-message">{phoneErrors.customer}</span>}
              </div>

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

              <div style={{marginTop: 10}} className="customer-info">
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

                <div class="total-amount">
                  <div>
                    <div title="If the expected delivery time is greater than 100km (2 days) ! The cost of feeding the fish will be automatically calculated at 20,000VND per day"
                      className="layout-checkbox"
                      style={{marginBottom: '10px'}}
                    >
                      <p>
                        <strong>Estimated delivery date: {deliveryDate} ({estimatedDays} days)</strong>
                      </p>

                      <div title="If the transit is less than 1 day, if you want to feed the fish, the cost will be 25000 VND"
                        className="checkbox-container"
                      >
                        {customerInfo?.distance <= 50 && (
                          <label>
                            <input
                              style={{cursor: 'pointer'}}
                              type="checkbox"
                              checked={check}
                              onChange={(e) => setCheck(e.target.checked)}
                            />
                            If you want to feed the fish ({days === 1 ? 25000 : days * 20000} VND)
                          </label>
                        )}
                      </div>
                    </div>

                    <div style={{marginTop: '10px'}}>
                      <div className="fee-line">
                        <span className="fee-label">Shipping fee:</span>
                        <span className="fee-amount">{formatCurrency(calculateShippingFee() || 0)} VND</span>
                      </div>
                      <div className="fee-line">
                        <span className="fee-label">Feeding Fee:</span>
                        <span className="fee-amount">{formatCurrency(FeedingFee() || 0)} VND</span>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                  }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="total-amount" style={{
          margin: 0,
          fontWeight: 'bold',
          color: 'purple'
        }}>
          Total Amount: {" "}
          {formatCurrency(
            getTotalAmount() +
            FeedingFee() +
            parseFloat(calculateShippingFee().toFixed(0))
          )} VND
        </div>
        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>

        {showQRCode && (
          <div className="popup">
            <div className="container-popup">
              <h3 className="title-popup">Please select payment method!</h3>

              <div className="payment-options">
                <div className="payment-method-card">
                  <img src="/images/ourmemories/cash.png" alt="Cash payment" className="payment-icon" />
                  <div className="radio-container">
                    <input
                      type="radio"
                      id="cash"
                      name="payment"
                      value="CASH"
                      checked={selectedPayment === 'CASH'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                  </div>
                </div>

                <div className="payment-method-card">
                  <img src="/images/ourmemories/vnpay.png" alt="VNPay payment" className="payment-icon" />
                  <div className="radio-container">
                    <input
                      type="radio"
                      id="vnpay"
                      name="payment"
                      value="BANK_TRANSFER"
                      checked={selectedPayment === 'BANK_TRANSFER'}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="layout-btn">
                <button
                  onClick={() => confirmPay({...showQRCode, paymentMethod: selectedPayment})}
                  className="confirm-btn"
                >
                  Confirm payment
                </button>
                <button
                  onClick={() => setShowQRCode(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {modal && (
          <div className="popup">
            <div className="container-popup">
              <h3 className="title-popup">Choose fish</h3>

              <div className="layout-checkbox">
                <div className="fish-item">
                  <label className="label-checkbox-0">
                    <input
                      name="checkbox-all"
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedFish?.length === data?.length}
                    />
                    <div className="layout-select">
                      <span className="label">Name</span>
                      <span className="label">Type</span>
                      <span className="label">Gender</span>
                      <span className="label">Weight</span>
                      <span className="label">Notes</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="layout-checkbox">
                {data?.map((fish) => (
                  <div key={fish.fishProfileId} className="fish-item">
                    <label className="label-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedFish.includes(fish.fishProfileId)}
                        onChange={() => handleCheckboxChange(fish.fishProfileId)}
                      />
                      <div className="layout-select">
                        <span>{fish?.name}</span>
                        <span>{fish?.koiFish?.fishType}</span>
                        <span>{fish?.gender}</span>
                        <span>{fish?.weight}</span>
                        <span>{fish?.notes}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="layout-btn">
                <button onClick={() => addRow()} className="confirm-btn">
                  Confirm
                </button>
                <button
                  onClick={() => navigate('/profile/addfish')}
                  className="confirm-btn"
                  style={{
                    backgroundColor: '#4CAF50',
                    marginLeft: '10px',
                    marginRight: '10px'
                  }}
                >
                  Create Fish Profile
                </button>
                <button onClick={() => setOpenModal(false)} className="cancel-btn">
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
