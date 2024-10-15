import React from 'react'
import DeliveryMap from '../../utils/DeliveryMap'
import OrderForm from './OrderForm'

export default function PlaceOrder() {
  return (
    <div className=''
        style={{
            display: 'flex',
            height: '100vh',
        }}
    >
    <OrderForm/>
    <DeliveryMap/>
    </div>
  )
}
