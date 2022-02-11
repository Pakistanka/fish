import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import firebase from 'firebase'
import { database } from '../../../firebase'
import CatalogueItem from './CatalogueItem'
import CatalogueFilters from './catalogue-filters/CatalogueFilters'
import './catalog.scss'

function UserCatalogue({goodsList}) {
    const history = useHistory();
    const {
    setGoodiId,
    goodsToCart,
    currentUser, // user id
    userInfo,
  } = useAuth();

  const [ showList, setShowList ] = useState([])

  let inStockList = goodsList.filter(goodi => {
    return goodi.in_stock === true;
  })

  const showAllGoods = () => {
    setShowList(inStockList)
  }

  useEffect(() => {
    if(inStockList){
      setShowList(inStockList)
    }
  }, [goodsList]);

  const goodiDetailsPage = (id) => {
    setGoodiId(id)
    history.push(`goodi/${id}`);
}

function filterByCategory(category){
  setShowList(inStockList.filter(goodi => {
  return goodi.category.includes(category);
  }))
}

let catalogue = showList.map(goodi => (
  <CatalogueItem
    goodiToCart={() => goodsToCart(
    goodi.id,
    goodi.title,
    goodi.weight,
    goodi.price,
    goodi.url
    )}
    goodiDetails={() => goodiDetailsPage(goodi.id)}
      key={goodi.id}
      title={goodi.title}
      weight={goodi.weight}
      price={goodi.price}
      url={goodi.url}
      in_stock={goodi.in_stock}
  />
))


return (
  <div className="catalog">
    <CatalogueFilters
      handleFish={() => filterByCategory("fish")}
      handleMeat={() => filterByCategory("meat")}
      handleSmoke={() => filterByCategory("smoke")}
      handleSalt={() => filterByCategory("salt")}
      handleLsalt={() => filterByCategory("lsalt")}
      handleSeafood={() => filterByCategory("seafood")}
      handleCaviar={() => filterByCategory("caviar")}
      handleDryfruits={() => filterByCategory("dryfruit")}
      handleDelica={() => filterByCategory("delica")}
      showAllGoods={()=> showAllGoods()}
    />

    <h2 className="catalog__goods-title">Товары</h2>
    <div className="catalog__item-wrap">
      {catalogue ? catalogue : "Loading..."}
    </div>
  </div>
  )
}

export default UserCatalogue;
