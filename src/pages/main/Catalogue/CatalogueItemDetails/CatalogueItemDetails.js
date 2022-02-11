import React, {useEffect, useState} from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import { database } from '../../../../firebase'
import firebase from 'firebase/app'
import { Link, useHistory } from 'react-router-dom'
// import s from './CatalogueItemDetails.module.css'
import './details.scss'

function CatalogueItemDetails() {
  const history = useHistory()
  const {
    goodiId,
    goodsToCart,
    getCatalogueItemInfo,
    deleteCatalogueItem,
    goodiInfo,
    userInfo,
    currentUser } = useAuth();



  useEffect(() => {
    if (database) {
    getCatalogueItemInfo();
    }
  }, [database])


  const deleteItemHandler = (id) => {
    deleteCatalogueItem(id);
    history.push('/');
  }

  const editItemHandler = (id) => {
    history.push(`/edit/${id}`);
  }



  return (
    <div className="details">
      { goodiInfo &&
      <div className="details__wrap">
        <img className="imagebox" src={goodiInfo.url} alt="Goodi image" />

        <div className="details__info">
          <h3 className="details__name">{goodiInfo.title}</h3>
          <h3 className="details__weight">{goodiInfo.weight} г</h3>
          <h3 className="details__price">{goodiInfo.price} руб</h3>
          <br/>
          <p className="details__about">{goodiInfo.details}</p>

          {userInfo && userInfo.user_role === "admin" ?
              <div>
              <button
                type="button"
                className="details__button"
                onClick={() => deleteItemHandler(goodiId)}>
                X - Удалить товар
              </button>
              <button
                type="button"
                className="details__button"
                onClick={() => editItemHandler(goodiId)}>
                - Отредактировать товар
              </button>
              </div>
              :
              <button
              type="button"
              className="details__button add-to-cart"
              onClick={() => goodsToCart(
                goodiId,
                goodiInfo.title,
                goodiInfo.weight,
                goodiInfo.price,
                goodiInfo.url,
                )}>
              Добавить в корзину
            </button>
          }
        </div>

      </div>}




    </div>
  )
}

export default CatalogueItemDetails
