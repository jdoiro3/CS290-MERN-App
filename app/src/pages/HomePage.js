import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection';
import { useState, useEffect } from 'react';

function HomePage() {
    const [exercises, setExercises] = useState([]);

    async function loadExercises() {
        const resp = await fetch('/exercises')
        const exercises = await resp.json()
        setExercises(exercises)
    }
        
    useEffect(() => {
        loadExercises();
    }, [])

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseCollection exercises={exercises}></ExerciseCollection>
            <Link to="/add-exercise">Add an Exercise</Link>
        </>
    );
}

export default HomePage;