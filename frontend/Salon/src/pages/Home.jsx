import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="homeContainer">
      <div className="aspectRatio"> 
        <img className="homeImage"src="/homeimage.png" alt='model'/>
      </div>
      <p className='iconHeading' >Head-to-Toe Beauty Services, <span className='strong'>Just for You! </span></p>
      <div className="rowContainer">
        <div className="rowLeft">
          <img className='iconLarge' src='facial.png' />
          <img className='iconLarge' src='hair.png' />
        </div>
        <div className="rowRight">
          <img className='iconLarge' src='nails.png' />
          <img className='iconLarge' src='body.png' />
        </div>
      </div>
    </div>
  )
}

export default Home