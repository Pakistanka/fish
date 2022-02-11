import React, { useContext, useState, useEffect } from "react"
import firebase from "firebase"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [userInfo, setUserInfo] = useState(null) // Info about current user
  const [loading, setLoading] = useState(true)
  const [goodiId, setGoodiId] = useState()
  const [cart, setCart] = useState([])
  const [goodiInfo, setGoodiInfo] = useState() // set to null 
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalNumber, setTotalNumber] = useState(0)
  const [url, setUrl] = useState(null) // For uploading image 
  

  async function signup(
    email, 
    password, 
    name, 
    phone, 
    ) {
    return firebase 
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // console.log("UUID: " + firebase.auth().currentUser.uid);
        return firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .set({
            firstname: name,
            email: email,
            phone: phone,
            user_role: "user",
            created_at: firebase.firestore.Timestamp.now(),
          })
          .catch((error) => {
            console.log("Error while creating user " + error)
          });
      });
  }

  async function getProfile() {
    return firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        const userData = snapshot.data();
        setUserInfo(userData);
        // console.log(userInfo)
        // console.log('userData===>' + JSON.stringify(userData));
        // console.log(JSON.stringify(firebase.auth().currentUser));
        userData.email = firebase.auth().currentUser.email;
        return userData
      });
  }
  

  // Getting info about catalogue item.
  async function getCatalogueItemInfo() {
    firebase.firestore()
      .collection('goods')
      .doc(goodiId)
      .get()
      .then(Data => {
        const data = Data.data()
        setGoodiInfo(data)
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  // Adding items to CART
  function goodsToCart(id, title, weight, price, url) {
    const setItemToCart = () => {
      setCart([
        ...cart,
        {
          id,
          title,
          weight,
          price,
          url,
          quantity: 1,
        } 
      ])
    }
    if(cart.length > 0){
      let addItem = 0;
      // + Quantity
        cart.forEach(item => {
          if (item.id === id){
            item.quantity = item.quantity + 1
            addItem =+ 1
          }
        })
        let newCart = [...cart];
        setCart(newCart);
      if(addItem < 1){
        setItemToCart()
      }
    } else {
      setItemToCart()
    }
  }


  async function updateCatalogueItem(params){
    console.log('Item updated!');
  }


  // Delete CATALOGUE Item
  async function deleteCatalogueItem(id){
    firebase.firestore()
    .collection("goods")
    .doc(id)
    .delete()
    .catch((err) => {
        console.error(err);
    });
    // console.log('Deleting ' + id)
  }

  // Create new ORDER 
  
  async function createOrder() {
    // e.preventDefault()
    console.log("creating order!")
    let _cart;
    _cart = JSON.parse(JSON.stringify(cart))
    {
      try {
        setLoading(true)
        firebase
          .firestore()
          .collection("orders")
          .add({
            total_price: totalPrice,
            total_weight: totalWeight,
            status: 1,
            cart: _cart,
            created_at: firebase.firestore.Timestamp.now()
          })
        setCart([])
      }
      catch {
        console.log('Failed to create new order')
      }
      setLoading(false)
    }
  }

  


  function addQuantity(id){    
    cart.forEach(item => {
      if (item.id === id){
        item.quantity = item.quantity + 1;
      }
    })
    let newCart = [...cart];
    setCart(newCart);
  } 

  function minusQuantity(id){
    cart.forEach(item => {
      if (item.id === id){
        if (item.quantity < 1) {
          item.quantity = 0;
        }
        else item.quantity = item.quantity - 1;
      }
    })
    let newCart = [...cart];
    setCart(newCart);
  }

  function deleteCartItem(id){
    let newCart = cart.filter(item => {
      return item.id !== id
    })
    setCart(newCart);
  }





  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  async function logout() {
    return auth.signOut()
  }

  async function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  async function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  async function updatePassword(password) {
    return currentUser.updatePassword(password)
  }




  // Calculate total PRICE
  useEffect(() => {
    let tPrice = 0;
    cart.forEach(item => {
      tPrice = tPrice + item.price * item.quantity;
    })
    setTotalPrice(tPrice);
  }, [cart])
  
  // Calculate total WEIGHT
  useEffect(() => {
    let tWeight = 0;
    cart.forEach(item => {
      tWeight = tWeight + item.weight * item.quantity;
    })
    setTotalWeight(tWeight);
  }, [cart])
  
  // Calculate total NUMBER of items
  useEffect(() => {
    let tNumber = 0;
    cart.forEach(item => {
      tNumber = tNumber + item.quantity;
    })
    setTotalNumber(tNumber);
  }, [cart])

    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])
  
  

  

  const value = {
    currentUser,
    userInfo, 
    setUserInfo,
    getProfile,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    // ==
    goodiId, 
    setGoodiId,
    cart, 
    setCart,
    goodiInfo, 
    setGoodiInfo,
    url, 
    setUrl,
    
    // Fire Actions
    goodsToCart,
    getCatalogueItemInfo,
    updateCatalogueItem,
    deleteCatalogueItem,
    createOrder,


    // Local Actions
    addQuantity,
    minusQuantity,
    deleteCartItem,

    // Params
    totalPrice,
    totalWeight,
    totalNumber,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
