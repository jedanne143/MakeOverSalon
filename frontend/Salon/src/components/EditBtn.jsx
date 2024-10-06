import React from 'react'
import './EditBtn.css'

function EditBtn({handleEdit , data}) {
  return (
    <button className="editBtn" onClick= {() => {handleEdit(data)}}>Edit</button>
  )
}

export default EditBtn