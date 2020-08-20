import React, { useState } from 'react';
import moment from 'moment';
import {
  Grid,
  IconButton,
  Box,
  Select,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/core';

function TaskFilter({ tasks, editTask, deleteTask }) {
  const [input, setInput] = useState('');
  const [selectFilter, setSelectFilter] = useState('');

  const onChangeSelect = (task) => {
    let today = moment();
    let startOfWeek = moment().startOf('week');
    let endOfWeek = moment().endOf('week');
    let startOfNextWeek = moment(endOfWeek).add(1, 'seconds');
    let endOfNextWeek = moment(endOfWeek).add(7, 'days');
    switch (selectFilter) {
      case 'today':
        if (moment(task.date).isSame(today, 'day')) {
          return true;
        }
        return false;
      case 'week':
        if (moment(task.date).isBetween(startOfWeek, endOfWeek)) {
          return true;
        }
        return false;
      case 'nextWeek':
        if (moment(task.date).isBetween(startOfNextWeek, endOfNextWeek)) {
          return true;
        }
        return false;
      case 'complete':
        if (task.is_completed) {
          return true;
        }
        return false;
      case 'noComplete':
        if (!task.is_completed) {
          return true;
        }
        return false;
      default:
        return true;
    }
  };
  const filterTasks = () => {
    let tasksMod = [...tasks];
    let filterTask = tasksMod.filter((task) =>
      task.content.toLowerCase().includes(input.toLowerCase())
    );
    let listFilter = filterTask
      .filter((task) => onChangeSelect(task))
      .map((task, index) => (
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
            {/* <Text fontFamily='Poppins'>{moment(task.date).fromNow()}</Text> */}
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
      ));
    return listFilter;
  };
  return (
    <div>
      <InputGroup mx={2} mt={2} mb={4}>
        <InputLeftElement
          children={<Icon name='search-2' color='gray.400' />}
        />
        <Input
          type='search'
          placeholder='buscar tarea'
          onChange={(e) => setInput(e.target.value)}
          value={input}
          name='search'
          mr={2}
        />
        <Select onChange={(event) => setSelectFilter(event.target.value)}>
          <option value='all'>Todas</option>
          <option value='today'>Hoy</option>
          <option value='week'>De la semana</option>
          <option value='nextWeek'>Proxima semana</option>
          <option value='complete'>Completadas</option>
          <option value='noComplete'>No completadas</option>
        </Select>
      </InputGroup>
      {filterTasks()}
    </div>
  );
}

export default TaskFilter;
