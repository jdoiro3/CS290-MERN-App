import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState([])
  const [exerciseToDelete, setExerciseToDelete] = useState([])

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <HomePage setExerciseToEdit={setExerciseToEdit} exerciseToDelete={exerciseToDelete} setExerciseToDelete={setExerciseToDelete} />} 
            />
            <Route path="/add-exercise" element={<AddExercisePage />} />
            <Route 
              path="/edit-exercise" 
              element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} 
            />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
