import { BsPencilSquare } from 'react-icons/bs'
import { useState } from 'react'

function Exercise({ exercise, onEdit, onDelete }) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>
                <button onClick={() => onEdit(exercise)} ><BsPencilSquare /></button>
            </td>
        </tr>
    )
}

export default Exercise