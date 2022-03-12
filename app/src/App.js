import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import React, { useState } from 'react'

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>} />
            <Route path="/add-exercise" element={<AddExercisePage />} />
            <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
