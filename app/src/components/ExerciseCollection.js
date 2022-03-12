import React from 'react';
import Exercise from './Exercise';

function ExerciseCollection({ exercises, onDelete, onEdit, _id }) {
    return (
        <table id={_id}>
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