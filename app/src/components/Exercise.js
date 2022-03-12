import { BsPencilSquare } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import Button from 'react-bootstrap/Button'

function Exercise({ exercise, onEdit, onDelete }) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>
                <Button variant="primary" onClick={() => onEdit(exercise)} ><BsPencilSquare /></Button>
            </td>
            <td>
                <Button variant="danger" onClick={() => onDelete(exercise)} ><MdDeleteOutline /></Button>
            </td>
        </tr>
    )
}

export default Exercise