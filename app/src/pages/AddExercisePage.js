import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function AddExercisePage() {

    const [name, setName] = useState('')
    const [unit, setUnit] = useState('lbs')
    const [date, setDate] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const navigate = useNavigate();

    async function addExercise() {
        const newExercise = { name, unit, date, reps, weight }
        const resp = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(resp.status === 201){
            alert("Successfully added the movie!")
        } else {
            alert(`Failed to add movie, status code = ${resp.status}`)
        }
        navigate("/")
    }

    return (
        <div>
            <h1>Add Exercise</h1>
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
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}