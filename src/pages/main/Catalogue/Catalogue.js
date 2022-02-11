import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import firebase from 'firebase'
import { database } from '../../../firebase'

import AdminCatalogue from './AdminCatalogue'
import UserCatalogue from './UserCatalogue'
// import CatalogueItem from './CatalogueItem'
// import CatalogueFilters from './catalogue-filters/CatalogueFilters'

import './catalog.scss'

function Catalogue() {
  const history = useHistory();
  const {
    currentUser, // user id
    userInfo,
  } = useAuth();

  const [ goodsList, setGoodsList] = useState([])

  useEffect(() => {
    if (database) {
      firebase.firestore()
        .collection('goods')
        .limit(50)
        .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setGoodsList(data);
      })
    }
  }, [database])

  let catalogue = <UserCatalogue goodsList={goodsList}/>
  if (currentUser && userInfo && userInfo.user_role === "admin"){
    catalogue = <AdminCatalogue goodsList={goodsList}/>
  }

  return (
    <div className="catalog">
     { catalogue }  
    </div>
  )
}

export default Catalogue
