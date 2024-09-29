import '../../css/OrderHistoryPage.css';
import OrderItem from './OrderItem';

const OrderHistoryPage = () => {
  const fakeData = [
    {
      orderId: '734538957343',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '12/10/2025',
      orderStatus: 'Deliveried',
    },
    {
      orderId: '157684956738',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Cancle',
    },
    {
      orderId: '748395647385',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Deliveried',
    },
    {
      orderId: '458496847564',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Deliveried',
    },
    {
      orderId: '564758694657',
      orderDates: '28/09/2024',
      deliveryPrice: 20000,
      dateShipmentArrived: '30/09/2024',
      orderStatus: 'Deliveried',
    },



  ];

  return (
    <div className='order-history-page-container'>
      <p className='order-history-title'>Your Order History</p>
      <div className='list-order-container'>
        {fakeData.map((data) => {
          return (
            <OrderItem
              key={data.orderId}
              orderId={data.orderId}
              orderDates={data.orderDates}
              deliveryPrice={data.deliveryPrice}
              dateShipmentArrived={data.dateShipmentArrived}
              orderStatus={data.orderStatus}

            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
