import React from 'react'
import './cart-item.scss'

function CartItem({title, weight, price, quantity, addQuantity, minusQuantity, deleteCartItem}) {
    return (
        <div className="cart-item">
            <button className="delete-button" onClick={deleteCartItem}>X</button>
            <div className="cart__title title-size">{title}</div>
            <div className="cart__weight weight-size">{weight}</div>

            <div className="cart__quantity-wrap">
                <button onClick={addQuantity}>+</button>
                <div className="cart__quantity quantity-size">{quantity}</div>
                <button onClick={minusQuantity}>-</button>
            </div>

            <div className="cart__price price-size"> {price} &#8381;</div>
        </div>
    )
}

export default CartItem
