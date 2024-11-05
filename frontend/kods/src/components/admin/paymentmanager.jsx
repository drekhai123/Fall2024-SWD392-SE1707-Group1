const PaymentReport = () => {
  const paymentColumns = [
    { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId' },
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Created Date', dataIndex: 'createdDate', key: 'createdDate' },
    { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus' },
  ];
};

export default PaymentReport;
