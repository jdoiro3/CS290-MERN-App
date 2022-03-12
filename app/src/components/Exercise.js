import { BsPencilSquare } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'

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
            <td>
                <button onClick={() => onDelete(exercise)} ><MdDeleteOutline /></button>
            </td>
        </tr>
    )
}

export default Exercise