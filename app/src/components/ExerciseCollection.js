import Exercise from './Exercise'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import './ExerciseCollection.css'

function ExerciseCollection({ onEdit }) {

    const [exercises, setExercises] = useState([])

    async function loadExercises() {
        const resp = await fetch('/exercises')
        const exercises = await resp.json()
        setExercises(exercises)
    }

    async function deleteAll() {
        const resp = await fetch("/exercises/deleteAll", { 
            method: 'DELETE'
            }
        )
        if (resp.status === 204) {
            alert("Successfully Deleted all exercises!")
        } else {
            alert(`Failed to delete, status code = ${resp.status}`)
        }
        loadExercises()
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
    }

    const onDelete = async (exercise) => {
        deleteExercise(exercise)
        loadExercises()
    }

    useEffect(() => {
        loadExercises()
    }, [])
    
    return (
        <div>
            <Dropdown className="table-dropdown">
                <Dropdown.Toggle variant="success" id="Dropdown-basic">
                    Actions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/add-exercise">Add Exercise</Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteAll()}>Delete All</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Table className="exercise-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exrs, i) => <Exercise exercise={exrs} key={i} onEdit={onEdit} onDelete={onDelete} />)}
                </tbody>
            </Table>
        </div>
    )
}

export default ExerciseCollection;