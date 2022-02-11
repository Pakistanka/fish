import React from 'react'
// import s from './CatalogueItem.module.css'
import './catalog.scss'

function CatalogueItem({ title, weight, price, url, in_stock, goodiToCart, goodiDetails }) {

    return (
        <div className="catalog__wrapper"
            style={ in_stock ? {} : {backgroundColor: "rgb(255, 187, 187)"}
            }>
            {/* { in_stock ? '' : <div className='hide'></div>} */}
            <div className="catalog__info" onClick={goodiDetails}>
                <div className="catalog__imgFrame">
                    <img className="catalog__imagebox" src={url} alt="Goodi image"></img>
                </div>
                <div className="catalog__infoFrame">
                    <div className="catalog__name">{title} </div>
                    <div className="catalog__weight">{weight} г</div>
                    <div className="catalog__price">{price} руб</div>
                </div>
            </div>

            <div className="catalog__buttons">
                    {/* <button onClick={goodiDetails}>Подробнее</button> */}
                    <button onClick={goodiToCart} className="add-to-cart">Добавить в корзину</button>
                </div>
        </div>
    )
}

export default CatalogueItem
