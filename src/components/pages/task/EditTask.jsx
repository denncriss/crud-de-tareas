import React from 'react';

function EditTask({ taskEdit, editarTarea, editInput }) {
  return (
    <div>
      <p>editar usuario</p>
      <form onSubmit={editarTarea}>
        <input
          type='text'
          onChange={editInput}
          name='content'
          value={taskEdit.content}
        />
        <input
          type='date'
          onChange={editInput}
          name='date'
          value={taskEdit.date}
        />
        <button type='submit'>actualizar tarea</button>
      </form>
    </div>
  );
}

export default EditTask;
