import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import CartItem from './CartItem'
import './cart-item.scss'


function Cart() {
  const history = useHistory()
  const {
      cart,
      totalWeight,
      totalPrice,
      totalNumber,
      addQuantity,
      minusQuantity,
      deleteCartItem,
  } = useAuth()


  const gotoCatalogue = () => {
    history.push('/')
  }

  const submitOrder = () => {
    history.push('/delivery-info')
  }


    return (
      <div className="cart">
        <h2 className="cart__header">Корзина</h2>
        <div className="cart__itemWrapper">
          <div className="cart-item cart-item--decoration">
          <div className="cart__subtitles title-size">X</div>
            <div className="cart__subtitles title-size">Товар</div>
            <div className="cart__subtitles weight-size">Вес</div>
            <div className="cart__subtitles quantity-size">Количество</div>
            <div className="cart__subtitles price-size">Цена</div>
          </div>

            {
              cart.map(cartItem => (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                title={cartItem.title}
                weight={cartItem.weight}
                price={cartItem.price}
                image_URL={cartItem.image_URL}
                quantity={cartItem.quantity}
                addQuantity={() => addQuantity(cartItem.id)}
                minusQuantity={() => minusQuantity(cartItem.id)}
                deleteCartItem={() => deleteCartItem(cartItem.id)}
              />
              ))
            }
        </div>

        <div className="cart__buttons">
          <div className="cart__total">
            <div>Товаров в корзине: </div>
            <div>{totalNumber} шт</div>
          </div>

          <div className="cart__total">
            <div>Общий вес: </div>
            <div>{totalWeight} г</div>
          </div>
          <div className="cart__total">
            <div>Цена (итого): </div>
            <div>{totalPrice} &#8381;</div>
          </div>

        </div>



        {totalPrice === 0 ?
        <button className="cart__createOrder" onClick={gotoCatalogue}>ДОБАВИТЬ ТОВАР</button> :
        <button className="cart__createOrder" onClick={()=> {submitOrder()}}>ОФОРМИТЬ ЗАКАЗ</button>}
      </div>

    )
}

export default Cart
