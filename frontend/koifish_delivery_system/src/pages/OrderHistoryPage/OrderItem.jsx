import './OrderItem.css';

const OrderItem = ({
  orderId,
  customerName,
  orderAmount,
  orderPrice,
  orderStatus,
  shipTime,
}) => {
  return (
    <div className='order-item-container'>
      <p className='order-id'>Order ID: {orderId}</p>
      <p className='customer-name'>Customer Name: {customerName}</p>
      <p className='order-amount'>Order Amount: {orderAmount}</p>
      <p className='order-price'>Order Price: {orderPrice}</p>
      <p className='order-status'>Order Status: {orderStatus}</p>
      <p className='ship-time'>Ship time: {shipTime}</p>
    </div>
  );
};

export default OrderItem;
