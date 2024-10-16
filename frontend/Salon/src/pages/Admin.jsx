import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'
import axios from 'axios'
import EditBtn from '../components/EditBtn';
import DeleteBtn from '../components/DeleteBtn';

//admin credentials from .env file
const adminPassword = import.meta.env.VITE_PASSWORD
const adminUsername = import.meta.env.VITE_USERNAME


  function Admin() {
    //state to track username input
    const [username, setUsername] = useState('');
    //state to track user input password
    const [password, setPassword] = useState('');
    //state to track number of tries
    const [ retry , setRetry] = useState(0);
    //state to display error
    const [isError, setIsError] = useState(false)


    //state to track if password matches
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //useNavigate hook for redirection
    const navigate = useNavigate();
    //state to save services
    const [services, setServices] = useState([])
    
    //input for services
    const [createService, setCreateServices] = useState({
      type: "",
      subtype: "",
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
          subtype: "",
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

    //state to track which  service is being edited and the current input values of the service
    const [editingId, setEditingId] = useState(null);
    const [editedService, setEditedService] = useState({
      type: "",
      subtype: "",
      name: "",
      price: "",
      duration: "",
      description: ""
    });

    //Callback function for EDIT button
    const handleEdit = (service) => {
      setEditingId(service._id); 
      setEditedService({
        type: service.type,
        subtype: service.subtype || '',
        name: service.name,
        price: service.price,
        duration: service.duration || '',
        description: service.description || ''
      });
    };
    // [EDIT] a service in the DB
    const updateService = async (id) => {
      try {
        // Send updated service data to the server
        const res = await axios.put(`http://localhost:3000/services/${id}`, editedService);
        console.log(res.data);
    
        // Update the services state with the modified service
        const updatedServices = services.map(service => 
          service._id === id ? { ...service, ...editedService } : service
        );
        setServices(updatedServices);
        
        // Exit editing mode
        setEditingId(null);
      } catch (error) {
        console.log(error);
      }
    };

    // [DELETE] a service in the DB
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
      if ( username === adminUsername && password === adminPassword ) {
        // Show displayContainer and hide loginContainer
        setIsAuthenticated(true); 
      } else {
        setIsError(true)
        setRetry(retry + 1)
        // Redirect to /home if the password is incorrect twice
        if (retry === 2 ) {
        setRetry(0)
        navigate('/home'); 
        }
      }
    };

    return (
      <div className='adminContainer'>
        <div className='inputContainer' style={{ display: isAuthenticated ? 'none' : 'flex' }}>
          
          <h1 className="loginHeading">Hello Admin!</h1>
        </div>
        <img className= 'dividerUp' src='/divider.png' style={{ display: isAuthenticated ? 'none' : 'flex' }}/>
        <div className="login" style={{ display: isAuthenticated ? 'none' : 'flex' }}>
          <img className="iconLady" src='/iconLady.png' />
          <form className="login" onSubmit={handleLogin}> 
          <label className='labelCol'>Username:
            <br/>
            <input 
            type="text" 
            className="user"
            value={username}
            onChange={
              //update username state based on input value
              (e) => setUsername(e.target.value)}
              required
            />
            </label>
            <label className='labelCol'>Password
            <br/>
            <input 
            type="password" 
            className="user"
            value={password}
            onChange={
              //update password state based on input value
              (e) => setPassword(e.target.value)}
              required
            />
            </label>
            <button className='submitBtn'>Submit</button>
          </form>
          <div style={{ display: isError ? 'flex' : 'none' , color: 'pink'}}>
            Incorrect combination
          </div>
        </div>
        <img className= 'dividerDown' src='/divider.png' style={{ display: isAuthenticated ? 'none' : 'flex' }} />
        {/* Conditional rendering after admin is authenticated */}
        <div className="displayContainer" style={{ display: isAuthenticated ? 'flex' : 'none' }}>
          <div className="addContainer">
            <img className= 'dividerUp' src='/divider.png' /> 
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
                    <option value=''>*Required</option>
                    <option value='body'>Body</option>
                    <option value='facial'>Facial</option>
                    <option value='hair'>Hair</option>
                    <option value='nails'>Nails</option>
                  </select>
                </label>
                <label className='labelRow'>Subtype:
                  <select 
                    name='serviceSubtype' 
                    className="inputDetail" 
                    value={createService.subtype}
                    onChange={(e) => setCreateServices({...createService, subtype: e.target.value})}
                  >
                    <option value=''></option>
                    <option value='treatment'>Hair Treatment</option>
                    <option value='color'>Hair Color</option>
                    <option value='basic'>Hair Basic</option>
                    <option value='hair_removal diode'>Hair Removal DIODE</option>
                    <option value='hair_removal IPL'>Hair Removal IPL</option>
                    <option value='facial_spa general'>Face General</option>
                    <option value='facial_makeup SemiPermanent'>Face Semi Permanent Makeup</option>
                    <option value='body_aesthetic general'>Body General</option>
                    <option value='body_aesthetic Mesolipo'>Body Mesolipo</option>
                    <option value='nails_general'>Nails General</option>
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
                <button type="submit" className='button'>Add</button>
              </form>
            </div>
          </div>

          <div className="changeContainer">
            <img className= 'dividerUp' src='/divider.png' />
            <h1 className="adminHeading">Edit Existing Services</h1>
            <div className='typeContainer'>
              <div className="headingContainer">
                <div 
                  className={toggleState === 'facial' ? "typeHeading activeHeading" : "typeHeading"}
                  onClick = {() => setToggleState('facial')}
                >Face</div>
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
                    {editingId === data._id ? (
                      //will render when editing button is clicked
                      <>
                        <label>Type:
                          <select
                            className="editDetail"
                            value={editedService.type}
                            onChange={(e) => setEditedService({ ...editedService, type: e.target.value })}
                            required
                          >
                            <option value=""></option>
                            <option value="body">Body</option>
                            <option value="facial">Facial</option>
                            <option value="hair">Hair</option>
                            <option value="nails">Nails</option>
                          </select>
                        </label>
                        <label>Subtype:
                          <select 
                            name='serviceSubtype' 
                            className="editDetail" 
                            value={editedService.subtype}
                            onChange={(e) => setEditedService({...editedService, subtype: e.target.value})}
                          >
                            <option value=''></option>
                            <option value='treatment'>Hair Treatment</option>
                            <option value='color'>Hair Color</option>
                            <option value='basic'>Hair Basic</option>
                            <option value='hair_removal diode'>Hair Removal DIODE</option>
                            <option value='hair_removal IPL'>Hair Removal IPL</option>
                            <option value='general'>Face General</option>
                            <option value='semipermanent'>Face Semi Permanent Makeup</option>
                            <option value='body_aesthetic general'>Body General</option>
                            <option value='body_aesthetic Mesolipo'>Body Mesolipo</option>
                            <option value='nails_general'>Nails General</option>
                          </select>
                        </label>
                        <label>Name:
                          <input
                            className="editDetail" 
                            type="text"
                            value={editedService.name}
                            onChange={(e) => setEditedService({ ...editedService, name: e.target.value })}
                          />
                        </label>
                        <label>Price:
                          <input
                            className="editDetail" 
                            type="number"
                            value={editedService.price}
                            onChange={(e) => setEditedService({ ...editedService, price: Number(e.target.value) })}
                          />
                        </label>
                        <label>Duration:
                          <input
                            className="editDetail" 
                            type="text"
                            value={editedService.duration}
                            onChange={(e) => setEditedService({ ...editedService, duration: e.target.value })}
                          />
                        </label>
                        <div>Description:</div>
                        <textarea
                          className="editDescription" 
                          value={editedService.description}
                          onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
                          rows="4"
                        ></textarea>
                        <div className="btnContainer">
                          <button className="button" onClick={() => updateService(data._id)}>Save</button>
                          <button className="button" onClick={() => setEditingId(null)}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                      {/* Will render when not in editing state */}
                        <div>SubType: {data.subtype}</div>
                        <div className='bold'>{data.name}</div>
                        <div>Price: Php {data.price}</div>
                        {data.duration && <div>Duration: {data.duration}</div>}
                        {data.description && <div>Description: {data.description}</div>}
                        <div className="btnContainer">
                          <EditBtn handleEdit={handleEdit} data={data}/>
                          <DeleteBtn deleteService={deleteService} data={data} />
                        </div>
                      </>
                    )}
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