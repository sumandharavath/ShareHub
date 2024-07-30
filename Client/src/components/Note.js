import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

function Note(props) {
  function handleClick() {
    console.log("Deleting note with ID:", props.id);
    props.onDelete(props.id);
  }



  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button onClick={handleClick}>              
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;



