import React from 'react'
import { Link } from 'react-router-dom'
import ExerciseCollection from '../components/ExerciseCollection'
import { useNavigate } from 'react-router-dom'

function HomePage({ setExerciseToEdit, exerciseToDelete, setExerciseToDelete }) {

    const navigate = useNavigate()

    const onEdit = async (exerciseToEdit) => {
        setExerciseToEdit(exerciseToEdit)
        navigate("/edit-exercise")
    }

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseCollection onEdit={onEdit}></ExerciseCollection>
            <Link to="/add-exercise">Add an Exercise</Link>
        </>
    );
}

export default HomePage;