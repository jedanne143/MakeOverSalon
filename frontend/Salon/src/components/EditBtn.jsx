import React from 'react'
import './EditBtn.css'

function EditBtn(editService , data) {
  return (
    <button className="editBtn" onClick= {() => {editService(data)}}>Edit</button>
  )
}

export default EditBtn