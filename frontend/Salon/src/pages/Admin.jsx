  import React, {useState, useEffect} from 'react'
  import { useNavigate } from 'react-router-dom'
  import './Admin.css'
  import axios from 'axios'
  import EditBtn from '../components/EditBtn';
import CloseBtn from '../components/DeleteBtn';

  //styling for material UI component
  const buttonStyle = {
    color: 'maroon',
    width: '15px',
    margin: '5px',
    backgroundColor: '#DBBFAF',
    height:'18px'
  };

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
      duration:"",
      description: ""
    });

    //update a service
    const [updateService, setUpdateService] = useState({
      _id: null,
      type: "",
      name: "",
      price:"",
      duration:"",
      description: ""
    });

    // Make a request to DB
    const fetchServices = async () => {
      const res = await axios.get("http://localhost:3000/services/view");
      const salon = await res.data;
      setServices(salon);
      console.log(salon);

    };

    useEffect(() => {
      fetchServices();
    }, []);

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
    const handleClose=() => {

    }
    const handleEdit=() => {

    }
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
        <div className="displayContainer" style={{ display: isAuthenticated ? 'flex' : 'none' }}>
          <div className="addContainer">
            <h1 className="adminHeading">Add Services</h1>
            <div className="inputContainer">
              <form className="addForm">
              <label className='labelRow'>Type:
              <select name='serviceType' className="inputDetail" required>
                <option value='body'>Body</option>
                <option value='facial'>Facial</option>
                <option value='hair'>Hair</option>
                <option value='nail'>Nail</option>
              </select>
              </label>
                <label className='labelRow'>Name:
                <input type="text" className="inputDetail" placeholder="*required" required/>
                </label>
                <label className='labelRow'>Price: 
                <input type="number" className="inputDetail" placeholder="*required" required/>
                </label>
                <label className='labelRow'>Duration: 
                <input type="number" className="inputDetail"/>
                </label>
                <label className='labelLeft'>Description:</label>
                <textarea className="serviceDescription" rows='4' > </textarea>
                <button className='addBtn'>Add</button>
              </form>
            </div>


          </div>
          <div className="changeContainer">
            <h1 className="adminHeading">Edit Existing Services</h1>
            {/* Body Services */}
            <div className='bodyContainer'>
              <p className='typeHeading'>Body</p>
            {services
              .filter(service => service.type === 'body')
              .map(body => (                    
                <div key={body._id} className="bodyCard">
                  <div className='bold'>{body.name}</div>
                  <div>Price: Php {body.price}</div>
                  <div>Duration: {body.duration}</div>
                  <div>{body.description}</div>
                  
                  
                </div>
              ))
            }
            </div>
            {/* Facial Services */}
            <div className='facialContainer'>
            <p className='typeHeading'>Facial</p>
            {services
              .filter(service => service.type === 'facial') //facial services only
              .map(facial => (                    
                <div key={facial._id} className="facialCard">
                  <div className='bold'>{facial.name}</div>
                  <div>Price: Php {facial.price}</div>
                  <div>Duration: {facial.duration}</div>
                  <div>Description: {facial.description}</div>
                  <div className="btnContainer">
                    <EditBtn/>
                    <CloseBtn />
                  </div>

                </div>
            ))
            }
            </div>

          </div>
        </div>
      </div>
    )
  }

  export default Admin