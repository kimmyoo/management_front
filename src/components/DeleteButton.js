import React from 'react'

const DeleteButton = ({onDelete}) => {
    const handleDelete = () => {
      const confirmDelete = window.confirm('Are you sure you want to delete this student?')
      if (confirmDelete){
        onDelete()
      }
    }
    
    return (
        <button className="button-paper delete" onClick={handleDelete}>Delete Student</button>
    )
}

export default DeleteButton