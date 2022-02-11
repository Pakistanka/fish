import React from 'react'
import { Link } from 'react-router-dom'
import Catalogue from './Catalogue/Catalogue'


export default function Landing() {
  return (
    <div className="page">
      <div className="container">
        <Catalogue/>
      </div>
    </div>
  )
}
