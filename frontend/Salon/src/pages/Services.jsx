import React, {useState, useEffect} from 'react'
import './Services.css'
import axios from 'axios'

function Services() {
  const [services, setServices] =useState([])
  //toggle for service types
  const [toggleState , setToggleState] = useState('nails')
  //fetch data from the db
  const fetchServices = async () => {
    try{
      const res = await axios.get("http://localhost:3000/services/view");
      const servicesDB = await res.data;
      setServices(servicesDB.services);
      console.log('Successfully fetched service data')
      console.log(services)
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchServices();
  }, []);

  
  return (
    <div className="servicesContainer">
      <h1 className="mainHeading">Our Services</h1>
      <div className="servicesTypeContainer">
        <div className="headingContainer">
          <div 
              className={toggleState === "nails" ? "typeHeading activeHeading" : "typeHeading"}
              onClick = {() => setToggleState('nails')}
            >
              Nails
            </div>
          <div 
            className={toggleState === "facial" ? "typeHeading activeHeading" : "typeHeading"}
            onClick = {() => setToggleState('facial')}
          >Face</div>
          <div 
            className={toggleState === "hair" ? "typeHeading activeHeading" : "typeHeading"}
            onClick = {() => setToggleState('hair')}
          >Hair</div>
          <div 
            className={toggleState === "body" ? "typeHeading activeHeading" : "typeHeading"}
            onClick = {() => setToggleState('body')}
          >Body</div>

        </div>
        {/* =====NAILS SERVICES====== */}
        <> 
          <div className="conditionalNails" style={{ display: toggleState === 'nails' ? 'flex' : 'none' }}>
            <img className="servicesImage" src='/nailextension.jpg' />
            <img className= 'dividerUpWhite' src='/divider.png'  />
            <div className='subTypeHeading'>BASIC</div>
            <div className="priceOnly">
              {services
                .filter((service) => service.type === toggleState && service.subtype === 'nails_general')
                .map((service) => (
                  <div key={service._id} className="servicesCard">
                    <div className="rowService">
                      <div className='priceOnlyName'>{service.name} </div>
                      <div>Php {service.price}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>
        {/* =====FACIAL SERVICES===== */}
        <> 
          {/* Face Semi-permanent Services */}
          <div className="conditionalFace" style={{ display: toggleState === 'facial' ? 'flex' : 'none' }}>
            <img className= 'dividerUpWhite' src='/divider.png'  />
            <div className='subTypeHeading'>SEMI-PERMANENT MAKEUP</div>
            <div className="priceOnly">
              {services
                .filter((service) => service.type === toggleState && service.subtype === 'semipermanent')
                .map((service) => (
                  <div key={service._id} className="servicesCard">
                    <div className="rowService">
                      <div className='priceOnlyName'>{service.name} </div>
                      <div>Php {service.price}</div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Facial Services */}
            <img className= 'dividerUpWhite' src='/divider.png'/>
            <div className='subTypeHeading' >FACIALS</div>
            <div className='subTypeContainer'>
              <div className="">
                {services
                  .filter((service) => service.type === toggleState && service.subtype === 'general')
                  .map((service) => (
                    <div key={service._id} className="servicesCard">
                      <div className="rowService">
                        <div className="bold">{service.name} </div>
                        <div><span className="normal">	 {service.duration} &nbsp; &#9752; &nbsp;</span> Php {service.price}</div>
                      </div>
                      {service.description && <div className="alignLeft">{service.description}</div>}
                      <img className='subdivider' src='/divider2.png' />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
        {/* =====HAIR SERVICES===== */}
        <>
          <div className="conditionalHair" style={{ display: toggleState === 'hair' ? 'flex' : 'none' }}>

            {/* Hair Basic */}
            <img className= 'dividerUpWhite' src='/divider.png'  />
            <div className='subTypeHeading'>BASIC</div>
            <div className="priceOnly">
              {services
                .filter((service) => service.type === toggleState && service.subtype === 'basic')
                .map((service) => (
                  <div key={service._id} className="servicesCard">
                    <div className="rowService">
                      <div className='priceOnlyName'>{service.name} </div>
                      <div>Php {service.price}</div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Hair Color Services */}
            <img className= 'dividerUpWhite' src='/divider.png'/>
            <div className='subTypeHeading' >HAIR COLOR</div>
            <div className='subTypeContainer'>
              <div className="">
                {services
                  .filter((service) => service.type === toggleState && service.subtype === 'color')
                  .map((service) => (
                    <div key={service._id} className="servicesCard">
                      <div className="rowService">
                        <div className="bold">{service.name} </div>
                        <div>Php {service.price}</div>
                      </div>
                      {service.description && <div className="alignLeft">{service.description}</div>}
                      <img className='subdivider' src='/divider2.png' />
                    </div>
                  ))}
              </div>
            </div>

            {/* Hair Treatment Services */}
            <img className= 'dividerUpWhite' src='/divider.png'/>
            <div className='subTypeHeading' >HAIR TREATMENTS</div>
            <div className='subTypeContainer'>
              <div className="">
                {services
                  .filter((service) => service.type === toggleState && service.subtype === 'treatment')
                  .map((service) => (
                    <div key={service._id} className="servicesCard">
                      <div className="rowService">
                        <div className="bold">{service.name} </div>
                        <div> Php {service.price}</div>
                      </div>
                      {service.description && <div className="alignLeft">{service.description}</div>}
                      <img className='subdivider' src='/divider2.png' />
                    </div>
                  ))}
              </div>
            </div>

 
          </div>
        </>
        {/* =====BODY SERVICES===== */}
        <>
          <div className="conditionalBody" style={{ display: toggleState === 'body' ? 'flex' : 'none' }}>

            {/* General Aesthetic Services */}
            <img className= 'dividerUpWhite' src='/divider.png'  />
            <div className='subTypeHeading'>GENERAL</div>
            <div className="priceOnly">
              {services
                .filter((service) => service.type === toggleState && service.subtype === 'body_aesthetic general')
                .map((service) => (
                  <div key={service._id} className="servicesCard">
                    <div className="rowService">
                      <div className='priceOnlyName'>{service.name} </div>
                      <div>Php {service.price}</div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* MESOLIPO */}
            <img className= 'dividerUpWhite' src='/divider.png'  />
            <div className='subTypeHeading'>MESOLIPO</div>
            <div className="priceOnly">
              {services
                .filter((service) => service.type === toggleState && service.subtype === 'body_aesthetic Mesolipo')
                .map((service) => (
                  <div key={service._id} className="servicesCard">
                    <div className="rowService">
                      <div className='priceOnlyName'>{service.name} </div>
                      <div>Php {service.price}</div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Body Hair Removal */}
            <img className= 'dividerUpWhite' src='/divider.png'  />
            <div className='subTypeHeading'>HAIR REMOVAL</div>
            <div className="priceOnly">
              <div className='underline'>DIODE</div>
              {services
                .filter((service) => service.type === toggleState && service.subtype === 'hair_removal diode')
                .map((service) => (
                  <div key={service._id} className="servicesCard">
                    <div className="rowService">
                      <div className='priceOnlyName'>{service.name} </div>
                      <div>Php {service.price}</div>
                    </div>
                  </div>
                ))
              }
              <img className='smallerDivider' src='/divider2.png' />
              <div className='underline'>IPL</div>
              {services
                .filter((service) => service.type === toggleState && service.subtype === 'hair_removal IPL')
                .map((service) => (
                  <div key={service._id} className="servicesCard">
                    <div className="rowService">
                      <div className='priceOnlyName'>{service.name} </div>
                      <div>Php {service.price}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>

      </div>
    </div>
  )
}



export default Services