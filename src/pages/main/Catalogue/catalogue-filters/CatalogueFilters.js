import React, {useState} from 'react';
import './catalog-filters.scss'
import { gsap } from 'gsap'

function CatalogueFilters(props) {

  const [fish, setFish] = useState(false)
  const [meat, setMeat] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const [salt, setSalt] = useState(false)
  const [lsalt, setLsalt] = useState(false)
  const [seafood, setSeafood] = useState(false)
  const [caviar, setCaviar] = useState(false)
  const [dryfruit, setDryfruit] = useState(false)
  const [delica, setDelica] = useState(false)

  const [hide, setHide] = useState(false);
  const [hideText, setHideText] = useState('Скрыть')

  const handleFish = () => { setFish(!fish);
    props.handleFish();}
  const handleMeat = () => { setMeat(!meat);
    props.handleMeat();}
  const handleSmoke = () => { setSmoke(!smoke)
    props.handleSmoke();}
  const handleSalt = () => { setSalt(!salt)
    props.handleSalt();}
  const handleLSalt = () => { setLsalt(!lsalt)
    props.handleLsalt();}
  const handleSeafood = () => { setSeafood(!seafood)
    props.handleSeafood();}
  const handleCaviar = () => { setCaviar(!caviar)
    props.handleCaviar();}
  const handleDFruits = () => { setDryfruit(!dryfruit)
    props.handleDryfruits();}
  const handleDelica = () => { setDelica(!delica)
    props.handleDelica();}
  const showAllGoods = () => { props.showAllGoods()}
  
  const hideFilter = () => {
    if(!hide){
      gsap.to("#hidefilters", .2, {x: '-67vw', y: '18.4vh'})
      setHideText('Категории')
      setHide(!hide)
    } else if (hide) {
      gsap.to("#hidefilters", .2, {x: 0, y: 0})
      setHideText('Скрыть')
      setHide(!hide)
    }
  }


  return (
  <div className="catalogue-filters">
    {/* <h3 className="catalog__filter">Категории:</h3> */}
    <div id="hidefilters" className="category-grid">

      <div
        onClick={() => hideFilter()}
        className="grid-item hideFilter">{hideText}
      </div>
      <div
        onClick={() => showAllGoods()}
        className="grid-item allGoods">Все товары
      </div>
      <div
        onClick={() => handleFish()}
        className="grid-item fish"
        >Рыба
      </div>
      <div
        onClick={() => handleMeat()}
        className="grid-item meat">Мясо
      </div>
      <div
        onClick={() => handleSmoke()}
        className="grid-item smoke">Копченость
      </div>
      <div
        onClick={() => handleSalt()}
        className="grid-item salt">Соленая
      </div>
      <div
        onClick={() => handleLSalt()}
        className="grid-item light-salt">Слабосоленая
      </div>
      <div
        onClick={() => handleSeafood()}
        className="grid-item seafood">Морепродукты
      </div>
      <div
        onClick={() => handleCaviar()}
        className="grid-item caviar">Икра
      </div>
      <div
        onClick={() => handleDFruits()}
        className="grid-item dry-fruits">Сухофрукты
      </div>
      <div
        onClick={() => handleDelica()}
        className="grid-item delica">Деликатесы
      </div>


    </div>
  </div>
  )
}

export default CatalogueFilters;
