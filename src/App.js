import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      // fetch("data.json")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    if (searchText) {
      fetch(`http://localhost:5000/notes?name=${searchText}`)
        .then((res) => res.json())
        .then((data) => setNotes(data));
    }
  };

  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard note={note} />
        ))}
      </div>
    </div>
  );
}

export default App;
