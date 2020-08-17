import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTask from './EditTask';
import moment from 'moment';
import {
  Grid,
  IconButton,
  Box,
  Input,
  Text,
  Avatar,
  AvatarBadge,
  FormControl,
  Button,
  useToast,
  Icon,
} from '@chakra-ui/core';

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
    let url = '/tasks';
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
    try {
      e.preventDefault();
      let url = '/tasks';
      const res = await axios.post(url, newTask);
      getToast('success', res.data.message);
      setNewTask({
        userId: _id,
        content: '',
        date: '',
      });
      getTask();
    } catch (error) {
      console.log(error);
      let message = 'error al agregar la tarea';
      getToast('warning', message);
    }
  };

  const editTask = (id) => {
    const idTask = tasks.find((task) => task._id === id);
    // const newDate = moment(idTask.date).format('YYYY-MM-DD');
    setTaskEdit(idTask);
    setEstateTask(true);
  };
  const updateTask = async (e) => {
    try {
      e.preventDefault();
      const id = taskEdit._id;
      let url = `/tasks/${id}`;
      const res = await axios.put(url, taskEdit);
      getTask();
      setEstateTask(false);
      getToast('success', res.data.message);
    } catch (error) {
      console.log(error);
      let message = 'error al editar la tarea';
      getToast('warning', message);
    }
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
    try {
      let url = `/tasks/${id}`;
      const res = await axios.delete(url);
      getTask();
      getToast('info', res.data.message);
    } catch (error) {
      console.log(error);
      let message = 'no se pudo eliminar la tarea';
      getToast('error', message);
    }
  };
  const toast = useToast();
  const getToast = (type, message) => {
    toast({
      position: 'top-right',
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Grid
      templateColumns={['1fr', '1fr', '3fr 5fr']}
      gap={1}
      mx={1}
      minWidth='100%'
    >
      <Box backgroundColor='teal.400' borderRadius='lg'>
        <Box
          w='100%'
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          p={3}
          width='full'
        >
          <Box>
            <Text
              display='flex'
              alignItems='center'
              justifyContent='center'
              fontFamily='Poppins'
              fontWeight='bold'
              color='whiteAlpha.900'
              letterSpacing='wider'
              fontSize='lg'
            >
              <Icon
                name='calendar'
                color='whiteAlpha.800'
                fontSize='3xl'
                pr={2}
              />
              CODE_TAREAS
            </Text>
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Text color='whiteAlpha.900' mr={2} fontFamily='Poppins'>
              {name && <span>{name}</span>}
            </Text>
            <Avatar size='sm' name={name} backgroundColor='twitter.600'>
              <AvatarBadge bg='green.500' size='1.25em' borderColor='white' />
            </Avatar>
          </Box>
        </Box>
        <Box backgroundColor='teal.500' p={3}>
          {estateTask ? (
            <EditTask
              taskEdit={taskEdit}
              updateTask={updateTask}
              editInput={editInput}
            />
          ) : (
            <Box>
              <Box as='form' onSubmit={agregarTarea}>
                <FormControl display={['block', 'flex', 'block', 'block']}>
                  <Input
                    mr={[0, 2, 0]}
                    type='text'
                    onChange={handleChange}
                    value={newTask.content}
                    name='content'
                    placeholder='nueva tarea'
                    isRequired
                  />
                  <Input
                    ml={[0, 2, 0]}
                    mt={[2, 0, 2]}
                    type='date'
                    value={newTask.date}
                    onChange={handleChange}
                    name='date'
                    isRequired
                  />
                </FormControl>
                <Button
                  type='submit'
                  width='full'
                  rightIcon='check'
                  variantColor='whatsapp'
                  mt={2}
                >
                  AGREGAR TAREA
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box backgroundColor='gray.500' py={1} borderRadius='lg'>
        {tasks.map((task) => (
          <Grid
            key={task._id}
            templateColumns='3fr 1fr'
            backgroundColor='gray.200'
            m={2}
            p={2}
            borderRadius='lg'
          >
            <Box
              display='flex'
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Text fontFamily='Poppins'>{task.content}</Text>
              <Input
                size='sm'
                type='date'
                width={48}
                textAlign={['left', 'right']}
                variant='flushed'
                defaultValue={moment(task.date).format('YYYY-MM-DD')}
                isReadOnly
              />
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems='center'>
              <IconButton
                onClick={() => editTask(task._id)}
                aria-label='icon'
                icon='edit'
                variantColor='green'
                size='sm'
              />
              <IconButton
                onClick={() => deleteTask(task._id)}
                aria-label='icon'
                icon='delete'
                variantColor='red'
                size='sm'
                ml={3}
              />
            </Box>
          </Grid>
        ))}
      </Box>
    </Grid>
  );
}

export default Task;
