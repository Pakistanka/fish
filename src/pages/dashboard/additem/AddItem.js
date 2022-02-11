import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase';
import useStorage from '../../../contexts/UseStorage'
import '../editItem/form.scss';
import './style.scss'
import Progress from './Progress'

export default function AddItem() {
  const history = useHistory()
  const {
    url
  } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [goodImg, setGoodImg] = useState(null)
  const [inStock, setInStock] = useState(true)
  const [category, setCategory] = useState([])

  const [fish, setFish] = useState(false)
  const [meat, setMeat] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const [salt, setSalt] = useState(false)
  const [lsalt, setLsalt] = useState(false)
  const [seafood, setSeafood] = useState(false)
  const [caviar, setCaviar] = useState(false)
  const [dryfruit, setDryfruit] = useState(false)
  const [delica, setDelica] = useState(false)




  const titleRef = useRef()
  const weightRef = useRef()
  const priceRef = useRef()
  const positionRef = useRef()
  const detailsRef = useRef()
  const videoRef = useRef()




  async function handleSubmit(e) {
    e.preventDefault()
    // if (phoneRef !== "" && emailRef !== "")
    {
      try {
        setLoading(true)
        firebase
          .firestore()
          .collection("goods")
          .add({
            title: titleRef.current.value,
            weight: weightRef.current.value,
            price: priceRef.current.value,
            category: category,
            position: positionRef.current.value,
            details: detailsRef.current.value,
            video: videoRef.current.value,
            url: url,
            in_stock: inStock,
            created_at: firebase.firestore.Timestamp.now()
          })
        history.push('/')
      }
      catch {
        setError('Failed to create a request')
      }
      setLoading(false)
    }
  }

  // Uploading Image
  const allowedImgTypes = ['image/png', 'image/jpeg'];

  const changeHandler = (e) => {
    let selectedFile = e.target.files[0];

    if(selectedFile && allowedImgTypes.includes(selectedFile.type)){
      setGoodImg(selectedFile)
      setError('')
    } else {
      setGoodImg(null)
      setError('Выберите другой формат изображения (png/jpeg)')
    }
  }



  const addCategory = (newCategory) => {
    let addItem = 0;
    if (category.length > 0){
      category.forEach(item => {
        if(item == newCategory){
          addItem = addItem + 1;
          setCategory(category.filter(item => item !== newCategory));
        }
      })
      if (addItem < 1){
        setCategory(state => [...state, newCategory])
        addItem = addItem - 1;
      }
    } else {
      setCategory(state => [...state, newCategory])
    }
  }

  const handleFish = () => {
    setFish(!fish);
    addCategory("fish");
  }

  const handleMeat = () => {
    setMeat(!meat);
    addCategory("meat");
  }

  const handleSmoke = () => {
    setSmoke(!smoke)
    addCategory("smoke");
  }

  const handleSalt = () => {
    setSalt(!salt)
    addCategory("salt");
  }

  const handleLSalt = () => {
    setLsalt(!lsalt)
    addCategory("lsalt");
  }

  const handleSeaFood = () => {
    setSeafood(!seafood)
    addCategory("seafood");
  }

  const handleCaviar = () => {
    setCaviar(!caviar)
    addCategory("caviar");
  }

  const handleDFruits = () => {
    setDryfruit(!dryfruit)
    addCategory("dryfruit");
  }

  const handleDelica = () => {
    setDelica(!delica)
    addCategory("delica");
  }



  return (
    <div className="page">
      <div className="form wrapper add-item">
        {/* {error && <div>{error}</div>} */}
        <form className="form__form"
          onSubmit={handleSubmit}>

          <label className="form-group add-image">
            Добавить изображение
            <input
                type="file"
                onChange={changeHandler}
                className="form__input visibility-hidden"
              />
              <span>+</span>
          </label>

            {goodImg && <div>{goodImg.name}</div>}
            {goodImg && <Progress file={goodImg} setFile={setGoodImg}/>}
            <div>
              { error && <div>{error}</div>}
            </div>

          <label className="form-group">
            Введите наименование товара
            <input
              type="text"
              placeholder="Наименование"
              name="title"
              ref={titleRef}
              required
            />
          </label>
          <label className="form-group">
            Введите вес товара (в граммах)
            <input
              type="number"
              placeholder="Вес"
              name="weight"
              ref={weightRef}
            />
          </label>
          <label className="form-group">
            Введите цену товара
            <input
              type="number"
              placeholder="Цена"
              name="price"
              ref={priceRef}
            />
          </label>

          <label className="form-group">
            Укажите одну / несколько категорий товара:
            <div className="category-grid">
              <div
                onClick={() => handleFish()}
                style={ fish ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item fish"
                >Рыба
              </div>
              <div
                onClick={() => handleMeat()}
                style={ meat ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item meat">Мясо
              </div>
              <div
                onClick={() => handleSmoke()}
                style={ smoke ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item smoke">Копченость
              </div>
              <div
                onClick={() => handleSalt()}
                style={ salt ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item salt">Соленая
              </div>
              <div
                onClick={() => handleLSalt()}
                style={ lsalt ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item light-salt">Слабосоленая
              </div>
              <div
                onClick={() => handleSeaFood()}
                style={ seafood ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item seafood">Морепродукты
              </div>
              <div
                onClick={() => handleCaviar()}
                style={ caviar ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item caviar">Икра
              </div>
              <div
                onClick={() => handleDFruits()}
                style={ dryfruit ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item dry-fruits">Сухофрукты
              </div>
              <div
                onClick={() => handleDelica()}
                style={ delica ? {backgroundColor: "rgb(113, 216, 110)"} : {}}
                className="grid-item delica">Деликатесы
              </div>
            </div>
          </label>
          <label className="form-group">
            Определите позицию товара
            {/* Замнить на option внизу/вверху*/}
            <input
              type=""
              placeholder="Разместить внизу/вверху списка"
              name="position"
              ref={positionRef}
              required
            />
          </label>

          <label className="form-group">
            Введите описание товара
            <textarea
              type="text"
              rows="9"
              cols="50"
              placeholder="Подробное описание"
              name="order"
              ref={detailsRef}
              required
            />
          </label>

          <label className="form-group">
            Добавить ссылку на видео о товаре
            <input
              type="text"
              placeholder="Ссылка на видео"
              name="video"
              ref={videoRef}
            />
          </label>

          <label className="form-group">
            Есть ли товар в наличие?
            <div className='question'>
              <div className='optionbtn yes' onClick={() => {setInStock(true)}}>Да</div>
              {inStock ? <div className='instock yes'>Товар отображется</div> : <div className='instock no'>Товар скрыт</div>}
              <div className='optionbtn no' onClick={() => {setInStock(false)}}>Нет</div>
            </div>

          </label>

          <button className="add-item__button" type="submit" disabled={loading} value="Добавить товар в каталог" >Добавить товар в каталог</button>
        </form>
      </div>
    </div>
  )
}
