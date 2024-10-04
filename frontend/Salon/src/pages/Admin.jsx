  import React, {useState} from 'react'
  import { useNavigate } from 'react-router-dom'
  import './Admin.css'
  //password from .env file
  const adminPassword = import.meta.env.VITE_PASSWORD
  function Admin() {
    // state to track user input password
    const [password, setPassword] = useState('');
    //state to track if password matches
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //useNavigate hook for redirection
    const navigate = useNavigate();

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
        <div className="loginContainer" style={{ display: isAuthenticated ? 'none' : 'flex' }}>
          <h1 className="adminHeading">Hello Admin!</h1>
          <img className="iconLady" src='/iconLady.png' />
          <form onSubmit={handleLogin}> 
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
              <label className='labelRow'>Service Name:
              <input type="text" className="inputDetail" placeholder="*required" />
              </label>
              <label className='labelRow'>Service Price :
              <input type="text" className="inputDetail" placeholder="*required" />
              </label>
              <label className='labelLeft'>Service Description:</label>
              <textarea className="serviceDescription" rows='4' > </textarea>
            </div>
            <button className='addBtn'>Add</button>

          </div>
          <div className="changeContainer">
            <h1 className="adminHeading">Edit Existing Services</h1>
            <div className='eachService'>
              <div className='serviceDetail'>Service Name</div>
              <div className='serviceDetail'>Price</div>
              <div className='serviceDetail'>Description</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default Admin