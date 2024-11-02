/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { QRCodeSVG } from "qrcode.react";
import "../../css/OrderForm.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getJwtToken } from "../api/Url";

export default function OrderForm({ onSuggestionClick, distance }) {
  const navigateToLogin = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [modal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
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
  const [loading, setLoading] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    nameCustomer: "",
    phoneCustomer: "",
    addressCustomer: "",
    distance: 0,
  });

  const token = getJwtToken();
  
  //Hàm fecth API mới
  const getFishProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://kdosdreapiservice.azurewebsites.net/api/FishProfile/Customer/${user?.customer?.customerId}`, {
        headers:{
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



  const getDistancePriceList = useCallback(async () => {
    setLoading(true);
    try {
      const distanceResponse = await axios.get(
        "https://kdosdreapiservice.azurewebsites.net/api/DistancePriceList" , {
          headers:{
            
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

  useEffect(() => {
    getDistancePriceList();
  }, [getDistancePriceList]);

  useEffect(() => {
    if (user !== null) {
      getFishProfile();
    } else {
      alert("Please login to continue...");
      navigateToLogin("/login");
    }
  }, []);

  useEffect(() => {
    if (user?.customer?.customerId) {
      getFishProfile();
    }
  }, [getDistancePriceList]);

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
    var unitPrice = 0;

    // Tìm giá từ khoảng cách tương ứng trong distancePriceList
    const range = distancePriceList.find(
      (item) => distance >= item.minRange && distance <= item.maxRange
    );

    // Nếu tìm thấy, sử dụng giá tương ứng từ API, nếu không tìm thấy thì gán giá trị mặc định
    if (range) {
      unitPrice = range.price; // Gán giá từ range nếu tìm thấy
    }

    const baseFee = distance * parseFloat(unitPrice); // Tính toán baseFee

    if (distance <= 5) {
      return check ? 25000 : 0;
    }

    if (check && estimatedDays === 1) {
      return baseFee + 25000;
    } else if (!check && estimatedDays === 1) {
      return baseFee;
    } else {
      return baseFee + 20000 * estimatedDays;
    }
  };

  const calculateVAT = () => {
    if (estimatedDays === null ) {
    return (estimatedDays === 0);
  }else if (estimatedDays > 0 ) {
      return (estimatedDays === 0); 
  }else if (estimatedDays >= 1.1) {
    return (estimatedDays * 20000);
  }
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
        <p>Feed the fish: ${check ? 'Yes' : 'No'} ${check ? `${(days === 1 ? 25000 : days * 20000)} VND` : ''}</p>
        <p>Total amount: ${getTotalAmount() +
        (calculateVAT()) +
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
      customer: customerInfo,
      status: "Wait for confirmation",
      totalAmount:
        getTotalAmount() +
        (calculateVAT()) +
        parseFloat(calculateShippingFee().toFixed(0)),
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
    window.close();
    navigate("/");  // Quay lại trang trước đó
  };

  // Hàm thêm dòng mới
  const addRow = () => {
    const selectedFishData = data.filter((fish) =>
      selectedFish.includes(fish.fishProfileId)
    );

    setFishOrdersList((prevList) => {
      const newFish = selectedFishData.filter(
        (fish) => !prevList.some((item) => item.fishProfileId === fish.fishProfileId)
      );
      return [...prevList, ...newFish];
    });

    setOpenModal(false);
  };

  // Hàm xóa dòng
  const deleteRow = (index) => {
    const updatedOrders = fishOrdersList?.filter((_, i) => i !== index);
    const updatedOrdersCheckbox = selectedFish?.filter((_, i) => i !== index);
    setFishOrdersList(updatedOrders);
    setSelectedFish(updatedOrdersCheckbox)
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

  const FishTable = ({ data }) => {
    return (
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


            {/* <th className="label-table">Price (VND/Kg)</th> */}
            {/* <th className="label-table">Action</th> */}
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
              {/*<td>
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
                  disabled // Vô hiệu hóa input người dùng (Tạm thi)
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
              </td>*/}
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

                <div class="total-amount">
                  <div>
                    <div title="If the expected delivery time is greater than 100km (2 days) ! The cost of feeding the fish will be automatically calculated at 20,000VND per day"
                      className="layout-checkbox"
                      style={{ marginBottom: '10px' }}
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

                    <div style={{ marginTop: '10px' }}>
                      <div className="fee-line">
                        <span className="fee-label">Shipping fee:</span>
                        <span className="fee-amount">{calculateShippingFee() || 0} VND</span>
                      </div>
                      <div className="fee-line">
                        <span className="fee-label">Feeding Fee:</span>
                        <span className="fee-amount">{calculateVAT() || 0} VND</span>
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
        }}
        >
          Total Amount: {" "}
          {getTotalAmount() + (calculateVAT()) + parseFloat(calculateShippingFee().toFixed(0))} VND</div>
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
                      checked={selectedFish.length === data.length}
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
                    backgroundColor: '#4CAF50',  // màu xanh lá
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
