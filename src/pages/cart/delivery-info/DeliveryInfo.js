import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

function DeliveryInfo() {
  const history = useHistory()
  const {
      createOrder,
  } = useAuth()

    
  const submit = () => {
    createOrder()
    history.push('/confirm-order')
  }

  return (
    <div>
        <div>ФИО</div>

        <div>Телефон</div>
        <div>Город</div>
        <div>Район</div>
        <div>Улица</div>
        <div>Дома</div>
        <div>Подъезд</div>
        <div>Квартира</div>

        <div>Отметить точку на карте</div>

        <button onClick={()=> submit()}>Готово</button>
    </div>
  )
}

export default DeliveryInfo;
