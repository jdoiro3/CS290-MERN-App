import Exercise from './Exercise'
import { useState, useEffect } from 'react'

function ExerciseCollection({ onEdit }) {

    const [exercises, setExercises] = useState([])

    async function loadExercises() {
        const resp = await fetch('/exercises')
        const exercises = await resp.json()
        setExercises(exercises)
    }

    async function deleteExercise(exercise) {
        const resp = await fetch(`/exercises/${exercise._id}`, { 
            method: 'DELETE'
            }
        )
        if (resp.status === 204) {
            alert("Successfully Deleted the exercise!")
        } else {
            alert(`Failed to Delete the exercise, status code = ${resp.status}`)
        }
        window.location.reload()
    }

    const onDelete = async (exercise) => {
        deleteExercise(exercise)
        loadExercises()
    }

    useEffect(() => {
        loadExercises()
    }, [])
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Reps</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exrs, i) => <Exercise exercise={exrs} key={i} onEdit={onEdit} onDelete={onDelete} />)}
            </tbody>
        </table>
    );
}

export default ExerciseCollection;