import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function EditExercisePage({ exerciseToEdit }) {

    const [name, setName] = useState(exerciseToEdit.name)
    const [unit, setUnit] = useState(exerciseToEdit.unit)
    const [date, setDate] = useState(exerciseToEdit.date)
    const [reps, setReps] = useState(exerciseToEdit.reps)
    const [weight, setWeight] = useState(exerciseToEdit.weight)
    const navigate = useNavigate();

    async function editExercise() {
        const exercise = { name, unit, date, reps, weight }
        const resp = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(exercise),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(resp)
        if (resp.status === 201) {
            alert("Successfully edited the exercise!")
        } else {
            alert(`Failed to edit the exercise, status code = ${resp.status}`)
        }
        navigate("/")
    }

    return (
        <div>
            <h1>Edit Exercise</h1>
            <input
                type="text"
                placeholder="Bench Press"
                value={name}
                onChange={e => setName(e.target.value)} 
            />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="date"
                placeholder="MM-DD-YYYY"
                value={date}
                onChange={e => setDate(e.target.value)} 
            />
            <input
                type="number"
                placeholder="0"
                value={reps}
                onChange={e => setReps(e.target.value)} 
            />
            <input
                type="number"
                placeholder="0"
                value={weight}
                onChange={e => setWeight(e.target.value)} 
            />
            <button onClick={editExercise}>Save</button>
        </div>
    )
}