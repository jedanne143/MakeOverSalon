import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'
import axios from 'axios'
import EditBtn from '../components/EditBtn';
import DeleteBtn from '../components/DeleteBtn';

//password from .env file
const adminPassword = import.meta.env.VITE_PASSWORD

  function Admin() {
    // state to track user input password
    const [password, setPassword] = useState('');
    //state to track if password matches
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //useNavigate hook for redirection
    const navigate = useNavigate();
    //state to save services
    const [services, setServices] = useState([])
    
    //input for services
    const [createService, setCreateServices] = useState({
      type: "",
      name: "",
      price:"",
      duration: "",
      description: ""
    });
    //toggle for tabs
    const [toggleState , setToggleState] = useState('facial')

    //[CREATE] Add a service to DB
    const addService = async (e) => {
      try{
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/services/add" , createService)
        //update the Services state with new value
        setServices(() => [res.data.service, ...services]);
        // clear the form once services state is updated
        setCreateServices(() => ({
          type: "",
          name: "",
          price:"",
          duration:"",
          description: ""
        }));
        console.log("Successfully added a service")
      } catch(error) {
        console.log(error)
      }
    }

    // [READ]  fetch services data from the db
    const fetchServices = async () => {
      try{
        const res = await axios.get("http://localhost:3000/services/view");
        const servicesDB = await res.data;
        setServices(servicesDB.services);
        console.log('Successfully fetched service data')
      } catch (error){
        console.log(error)
      }
    }
    useEffect(() => {
      fetchServices();
    }, []);

    //update a service
    // const [updateService, setUpdateService] = useState({
    //   _id: null,
    //   type: "",
    //   name: "",
    //   price:"",
    //   duration:"",
    //   description: ""
    // });

    //updatefunc
    const editService = async () => {
      console.log('edit function called')
    } 

    // [DELETE] a service from DB
    const deleteService = async (_id) => {
      try{
        const res = await axios.delete(`http://localhost:3000/services/${_id}`)
        console.log(res);
        //return all services except the deleted one
        const updatedServices = [...services].filter((service) => {
          return service._id !== _id
        })
        setServices(updatedServices);
      } catch (error){
        console.log(error)
      }
    }
      

    const handleLogin = (e) => {
      // Prevent page refresh
      e.preventDefault(); 
      // Check if the entered password matches the adminPassword
      if (password === adminPassword) {
        // Show displayContainer and hide loginContainer
        setIsAuthenticated(true); 
      } else {
        alert('Incorrect password');
        // Redirect to /home if the password is incorrect
        navigate('/home'); 
      }
    };

    return (
      <div className='adminContainer'>
        <div className="login" style={{ display: isAuthenticated ? 'none' : 'flex' }}>
          <h1 className="adminHeading">Hello Admin!</h1>
          <img className="iconLady" src='/iconLady.png' />
          <form className="login" onSubmit={handleLogin}> 
            <label className='labelCol'>Enter password
            <br/>
            <input 
            type="password" 
            className="password"
            value={password}
            onChange={
              //update password state based on input value
              (e) => setPassword(e.target.value)}
              required
            />
            </label>
            <button className='submitBtn'>Submit</button>
          </form>
        </div>
        {/* Conditional rendering after admin is authenticated */}
        <div className="displayContainer" style={{ display: isAuthenticated ? 'flex' : 'none' }}>
          <div className="addContainer">
            <h1 className="adminHeading">Add Services</h1>
            <div className="inputContainer">
              {/* form for adding a service */}
              <form className="addForm" onSubmit={addService}>
                <label className='labelRow'>Type:
                  <select 
                    name='serviceType' 
                    className="inputDetail" 
                    value={createService.type}
                    onChange={(e) => setCreateServices({...createService, type: e.target.value})}
                    required>
                    <option value=''></option>
                    <option value='body'>Body</option>
                    <option value='facial'>Facial</option>
                    <option value='hair'>Hair</option>
                    <option value='nail'>Nail</option>
                  </select>
                </label>
                <label className='labelRow'>Name:
                  <input 
                    type="text" 
                    className="inputDetail" 
                    placeholder="*required" 
                    value={createService.name}
                    onChange={(e) => setCreateServices({...createService, name: e.target.value})}
                    required
                  />
                </label>
                <label className='labelRow'>Price: 
                  <input 
                    type="number" 
                    className="inputDetail" 
                    placeholder="*required"
                    value={createService.price}
                    onChange={(e) => setCreateServices({...createService, price: Number(e.target.value)})}
                    required/>
                </label>
                <label className='labelRow'>Duration: 
                  <input 
                    type="text"
                    className="inputDetail"
                    value={createService.duration}
                    onChange={(e) => setCreateServices({...createService, duration: e.target.value})}
                    />
                </label>
                <div className='labelLeft'>Description:</div>
                <textarea 
                className="serviceDescription" 
                value={createService.description}
                onChange={(e) => setCreateServices({...createService, description: e.target.value})}
                rows='4'
                ></textarea>
                <button type="submit" className='addBtn'>Add</button>
              </form>
            </div>
          </div>

          <div className="changeContainer">
            <h1 className="adminHeading">Edit Existing Services</h1>
    
            <div className='typeContainer'>
              <div className="headingContainer">
                <div 
                  className={toggleState === 'facial' ? "typeHeading activeHeading" : "typeHeading"}
                  onClick = {() => setToggleState('facial')}
                >Facial</div>
                <div 
                  className={toggleState === 'hair' ? "typeHeading activeHeading" : "typeHeading"}
                  onClick = {() => setToggleState('hair')}
                >Hair</div>
                <div 
                  className={toggleState === 'body' ? "typeHeading activeHeading" : "typeHeading"}
                  onClick = {() => setToggleState('body')}
                >Body</div>
                <div 
                  className={toggleState === 'nails' ? "typeHeading activeHeading" : "typeHeading"}
                  onClick = {() => setToggleState('nails')}
                >Nails</div>
              </div>
              <div className='cardContainer'>
                {services
                  .filter(service => service.type === toggleState) 
                  .map(data => (                    
                    <div key={data._id} className="typeCard">
                      <div className='bold'>{data.name}</div>
                      <div>Price: Php {data.price}</div>
                      {/* Conditionally render duration if it exists */}
                      {data.duration && <div>Duration: {data.duration}</div>} 
                      {/* Conditionally render description if it exists */}
                      {data.description && <div>Description: {data.description}</div>}
                      <div className="btnContainer">
                        <EditBtn editService= {editService} data={data}/>
                        <DeleteBtn deleteService={ deleteService} data={data} />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

  export default Admin