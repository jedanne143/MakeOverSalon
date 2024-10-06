import React from 'react'
import './DeleteBtn.css'

function DeleteBtn({deleteService , data}) {
  return (
    <button className="deleteBtn" onClick= {() => deleteService(data._id)}>Delete</button>
  )
}

export default DeleteBtn