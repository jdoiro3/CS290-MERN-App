import { useState, useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';


function Exercise({ exercise }) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>
                <BsPencilSquare />
            </td>
        </tr>
    )
}

export default Exercise