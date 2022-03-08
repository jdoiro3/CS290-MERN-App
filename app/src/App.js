import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
//import EditMoviePage from './pages/EditMoviePage';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-exercise" element={<AddExercisePage />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
