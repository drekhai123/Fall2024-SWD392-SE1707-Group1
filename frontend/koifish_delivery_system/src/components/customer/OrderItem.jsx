import '../../css/OrderItem.css';

const OrderItem = ({
  orderId,
  orderDates,
  deliveryPrice,
  dateShipmentArrived,
  orderStatus,

}) => {
  return (
    <div className='order-item-container'>
      <p className='order-id'>Order ID: {orderId}</p>
      <p className='order-dates'>Order Dates: {orderDates}</p>
      <p className='delivery-price'>Delivery Price: {deliveryPrice}</p>
      <p className='date-arrived'>Date arrived: {dateShipmentArrived}</p>
      <p className='order-status'>Order Status: {orderStatus}</p>
    </div>
  );
};

export default OrderItem;