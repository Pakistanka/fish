import React, {useState, useRef, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import firebase from 'firebase'
import Progress from '../additem/Progress'
// import s from './EditItem.module.css'
import './form.scss'


function EditItem() {
  const history = useHistory()
  const {
    goodiId,
    goodiInfo,
    url,
    setUrl,
  } = useAuth();

  const allowedImgTypes = ['image/png', 'image/jpeg'];
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



  useEffect(() => {
    setUrl(goodiInfo.url)
    setInStock(goodiInfo.in_stock)

    if (goodiInfo.category){
      goodiInfo.category.forEach(item => {
        if (item === "fish"){ handleFish()}
        if (item === "meat"){ handleMeat()}
        if (item === "smoke"){ handleSmoke()}
        if (item === "salt"){ handleSalt()}
        if (item === "lsalt"){ handleLSalt()}
        if (item === "seafood"){ handleSeaFood()}
        if (item === "dryfruit"){ handleDFruits()}
        if (item === "delica"){ handleDelica()}
      })
    }
  }, [])

    async function handleSubmit(e) {
      e.preventDefault()
      console.log('Updating!')

      firebase
        .firestore()
        .collection("goods")
        .doc(goodiId)
        .update({
          title: titleRef.current.value,
          weight: weightRef.current.value,
          price: priceRef.current.value,
          category: category,
          position: positionRef.current.value,
          details: detailsRef.current.value,
          video: videoRef.current.value,
          url: url,
          in_stock: inStock,
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        history.push('/goodi/:id');
    }

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
        <div className="form">
            <form className="form__form"
            onSubmit={handleSubmit}
            >
          <div className="form__imgFrame">
            <img className="form__imagebox" src={goodiInfo.url} alt="Goodi image"></img>
            <label className="form-group add-image">
            Заменить изображение
            <input
                type="file"
                onChange={changeHandler}
                className="form__input visibility-hidden"
              />
              <span>+</span>
            </label>
          </div>


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
              ref={titleRef}
              required
              defaultValue={goodiInfo.title}
            />
          </label>
          <label className="form-group">
            Введите вес товара (в граммах)
            <input
              type="number"
              placeholder="Вес"
              ref={weightRef}
              defaultValue={goodiInfo.weight}
            />
          </label>
          <label className="form-group">
            Введите цену товара
            <input
              type="number"
              placeholder="Цена"
              ref={priceRef}
              defaultValue={goodiInfo.price}
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
              ref={positionRef}
              required
              defaultValue={goodiInfo.position}
            />
          </label>

          <label className="form-group">
            Введите описание товара
            <textarea
              type="text"
              rows="9"
              cols="50"
              placeholder="Подробное описание"
              ref={detailsRef}
              required
              defaultValue={goodiInfo.details}
            />
          </label>

          <label className="form-group">
            Добавить ссылку на видео о товаре
            <input
              type="text"
              placeholder="Ссылка на видео"
              name="video"
              ref={videoRef}
              defaultValue={goodiInfo.video}
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


          <input type="submit" disabled={loading} className="submitBtn" value="Сохранить изменения" />
        </form>
        </div>
    )
}

export default EditItem
