import React from 'react'
import './About.css'; 
function About() {
  return (
    <div className='aboutContainer'>
      <div className="storyContainer">
        <h1 className="mainHeading">Our Story</h1>
        <div className='storyContainer'>
          <div className="row maroonbg">
            <img className='imageOwner' src='/ownerImage.jpg'/>
            <div className='col'>
              <img className= 'dividerUpWhite space' src='/divider.png'  />
              <p className="justify sFont">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hello! I’m Grace. In 2014 I took a bold step to open my first salon in the beautiful city of Baguio. Driven by my lifelong passion for the beauty industry, I dedicated myself to providing exceptional services while pursuing various training and certifications to refine my skills. As my reputation grew, so did my business, leading me to open a second salon in Manila, where I proudly offer nearly 100 diverse services, from haircuts and color treatments to skincare and wellness.</p>
              <br />
              <p className="justify sFont">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reflecting on my journey, I feel both humble and grateful for how far I’ve come—from a small salon in Baguio to a thriving enterprise in Manila. I warmly welcome everyone to my salons and encourage each customer to embrace their unique beauty. At <strong>Makeover Beauty Lounge</strong>, we are dedicated to helping you look and feel your best, making every visit a celebration of self-love and transformation. We can’t wait to see you soon!</p>
              <img className= 'dividerDownWhite space' src='/divider.png'  />
            </div>
          </div>
        </div>
      </div>
      <h2 className='mainHeading'>Visit Us</h2>
      <div className="rowInitially">
        <div className='businessLeftCol'>
          <div className='iframeContainer'>
            <iframe
              className='googleMap'
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d965.0869285636699!2d121.0275595849788!3d14.636192890559546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b75118d27c9b%3A0x3cc5206358c8dd87!2sMakeover%20Beauty%20Lounge!5e0!3m2!1sen!2sus!4v1728413393068!5m2!1sen!2sus"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className='businessCol'>
          <h2 className='typeHeading'>Business Hours</h2>
          <div className='rowSpaced'>
            <p className='businessFont'>Sunday</p>
            <p className='businessFont'>10AM to 7PM</p>
          </div>
          <div className='rowSpaced'>
            <p className='businessFont'>Monday</p>
            <p className='businessFont'>10AM to 7PM</p>
          </div>
          <div className='rowSpaced'>
            <p className='businessFont'>Tuesday</p>
            <p className='businessFont'>10AM to 7PM</p>
          </div>
          <div className='rowSpaced'>
            <p className='businessFont'>Wednesday</p>
            <p className='businessFont'>10AM to 7PM</p>
          </div>
          <div className='rowSpaced'>
            <p className='businessFont'>Thursday</p>
            <p className='businessFont'>10AM to 7PM</p>
          </div>
          <div className='rowSpaced'>
            <p className='businessFont'>Friday</p>
            <p className='businessFont'>10AM to 7PM</p>
          </div>
          <div className='rowSpaced'>
            <p className='businessFont'>Saturday</p>
            <p className='businessFont'>10AM to 7PM</p>
          </div>

        </div>
      </div>
      <h2 className="mainHeading">Connect With Us</h2>
      <div className ="iconContainer" >
        <a href='https://www.facebook.com/makeoverqcII' target='_blank'>
          <img className='icon' src='/fb.png' />
        </a>
        <a href='https://www.instagram.com/makeoverqc/' target='_blank'>
          <img className='icon' src='/instagram.png' /> 
        </a>
        <a href='https://www.tiktok.com/@makeoverqcii#:~:text=Choose%20from%20a%20wide%20variety%20of%20stunning%20premade%20nail%20designs' target='_blank'>
          <img className='icon tiktok' src='/tiktok.png' />  
        </a>
      </div>
      <div className="iconContainer">
        <img className='iconSmall' src='/call.png' /> +63 919 001 9630
      </div>
    </div>
  )
}

export default About