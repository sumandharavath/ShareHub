import React, { useState , useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note"
import CreateArea from "./CreateArea";
import axios from "axios";


function App() {
    
      const [notes, setNotes] = useState([]);
    
      useEffect(() => {
        fetchNotes();
      }, []);

      const fetchNotes = async () => {
        try {
          const response = await axios.get("http://localhost:5000/memory");
            setNotes(response.data);
        } catch (err) {
          console.error(err.message);
        }
      };
    

     
  
      const addNote = async (note) => {                   
        try {
          const response = await axios.post('http://localhost:5000/memory', note);
          setNotes([...notes, response.data]); 
        } catch (err) {
          console.error(err.message);
        }
      };
    
      
      const deleteNote = async (id) => {               
        try {
          await axios.delete(`http://localhost:5000/memory/${id}`);
          setNotes(notes.filter((note) => note.id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

  return (
    <div>
      <Header />
      <CreateArea 
      onAdd={addNote} 
      />
      {notes.map((noteItem) => {                   
        return (
          <Note
            key={noteItem.id}          
            id={noteItem.id}
            title={noteItem.title}
            description={noteItem.description}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
