import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTask from './EditTask';
import './task.scss';

function Task({ user }) {
  const { name, _id } = user;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    userId: _id,
    content: '',
    date: '',
  });
  const [taskEdit, setTaskEdit] = useState([]);
  const [estateTask, setEstateTask] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    let url = 'https://academlo-todolist.herokuapp.com/tasks';
    const res = await axios.get(url);
    const tasks = res.data.results;
    // const filterTask = tasks.filter((task) => task._id === idUser);
    // setTasks(filterTask)
    setTasks(tasks);
  };

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };
  const agregarTarea = async (e) => {
    e.preventDefault();
    let url = 'https://academlo-todolist.herokuapp.com/tasks';
    const res = await axios.post(url, newTask);
    console.log(res.data);
    getTask();
  };
  //
  //
  //
  const editTask = (id) => {
    const idTask = tasks.find((task) => task._id === id);
    setTaskEdit(idTask);
    setEstateTask(true);
  };
  const editarTarea = async (e) => {
    e.preventDefault();
    const id = taskEdit._id;
    let url = `https://academlo-todolist.herokuapp.com/tasks/${id}`;
    const res = await axios.put(url, taskEdit);
    console.log(res.data);
    getTask();
    setEstateTask(false);
  };
  const editInput = (e) => {
    setTaskEdit({
      ...taskEdit,
      [e.target.name]: e.target.value,
    });
  };
  //
  //
  //
  const deleteTask = async (id) => {
    let url = `https://academlo-todolist.herokuapp.com/tasks/${id}`;
    const res = await axios.delete(url);
    console.log(res);
    getTask();
  };
  return (
    <div>
      <p>tareas: {name}</p>
      {estateTask ? (
        <EditTask
          taskEdit={taskEdit}
          editarTarea={editarTarea}
          editInput={editInput}
        />
      ) : (
        <form onSubmit={agregarTarea}>
          <input type='text' onChange={handleChange} name='content' />
          <input type='date' onChange={handleChange} name='date' />
          <button type='submit'>agregar tarea</button>
        </form>
      )}
      {tasks.map((task) => (
        <div key={task._id}>
          <div>{task.content}</div>
          <p>{task.date}</p>
          <button onClick={() => editTask(task._id)}>edit</button>
          <button onClick={() => deleteTask(task._id)}>borrar</button>
        </div>
      ))}
    </div>
  );
}

export default Task;
