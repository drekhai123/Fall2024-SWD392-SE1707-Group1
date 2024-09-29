import './OrderHistoryPage.css';
import OrderItem from './OrderItem';

const OrderHistoryPage = () => {
  const fakeData = [
    {
      orderId: '734538957343',
      customerName: 'Nguyen Van A',
      orderAmount: 4,
      orderPrice: 200000,
      orderStatus: 'Deliveried',
      shipTime: '28/09/2024',
    },
    {
      orderId: '4738394857',
      customerName: 'Le Thi B',
      orderAmount: 1,
      orderPrice: 50000,
      orderStatus: 'Prepared',
      shipTime: '27/09/2024',
    },
    {
      orderId: '3940597485',
      customerName: 'Tran Thanh C',
      orderAmount: 2,
      orderPrice: 100000,
      orderStatus: 'Shipped',
      shipTime: '26/09/2024',
    },
    {
      orderId: '2059483746',
      customerName: 'Pham Minh D',
      orderAmount: 2,
      orderPrice: 150000,
      orderStatus: 'Shipped',
      shipTime: '25/09/2024',
    },
    {
      orderId: '2948574639',
      customerName: 'Phan Ngoc E',
      orderAmount: 2,
      orderPrice: 100000,
      orderStatus: 'Deliveried',
      shipTime: '24/09/2024',
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
              customerName={data.customerName}
              orderAmount={data.orderAmount}
              orderPrice={data.orderPrice}
              orderStatus={data.orderStatus}
              shipTime={data.shipTime}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
