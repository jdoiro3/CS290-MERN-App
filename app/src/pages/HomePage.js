import React from 'react'
import { Link } from 'react-router-dom'
import ExerciseCollection from '../components/ExerciseCollection'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    async function loadExercises() {
        const resp = await fetch('/exercises')
        const exercises = await resp.json()
        setExercises(exercises)
    }

    useEffect(() => {
        loadExercises();
    }, [])

    const onDelete = async id => {
        // delete exercise
    }

    const onEdit = async (exerciseToEdit) => {
        setExerciseToEdit(exerciseToEdit)
        navigate("/edit-exercise")
    }

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseCollection 
                exercises={exercises} 
                onDelete={onDelete}
                onEdit={onEdit}
            >
            </ExerciseCollection>
            <Link to="/add-exercise">Add an Exercise</Link>
        </>
    );
}

export default HomePage;