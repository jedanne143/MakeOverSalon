import React, {useState, useEffect} from 'react'
import './Services.css'
import axios from 'axios'

function Services() {
  //state to save fetched services
  const [services, setServices] =useState([])
  //toggle for tabs
  const [toggleState , setToggleState] = useState('facial')
  // [READ]  fetch services data from the db
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
      <h1 className="servicesHeading">Our Services</h1>
      <div className="servicesTypeContainer">
        <div className="headingContainer">
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
          <div 
            className={toggleState === "nails" ? "typeHeading activeHeading" : "typeHeading"}
            onClick = {() => setToggleState('nails')}
          >Nails</div>
        </div>
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

      </div>
    </div>
  )
}



                {/* {services
                  .filter(service => service.type === toggleState) 
                  .map(data => (                    
                    <div key={data._id} className="servicesCard">
                      <div className='bold'>{data.name}</div>
                      <div>Php {data.price}</div>
                      {data.duration && <div>{data.duration}</div>} 
                      {data.description && <div>{data.description}</div>}
                    </div>
                  ))
                } */}
    //           </div>
    //         </div>

    // </div>
  

export default Services