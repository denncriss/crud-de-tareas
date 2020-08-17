import React from 'react';
import moment from 'moment';
import { Box, Input, FormControl, Button } from '@chakra-ui/core';
function EditTask({ taskEdit, updateTask, editInput }) {
  return (
    <Box>
      <Box as='form' onSubmit={updateTask}>
        <FormControl display={['block', 'flex', 'block', 'block']}>
          <Input
            mr={[0, 2, 0]}
            type='text'
            onChange={editInput}
            name='content'
            value={taskEdit.content}
            isRequired
          />
          <Input
            ml={[0, 2, 0]}
            mt={[2, 0, 2]}
            type='date'
            onChange={editInput}
            name='date'
            value={moment(taskEdit.date).format('YYYY-MM-DD')}
            isRequired
          />
        </FormControl>
        <Button
          type='submit'
          width='full'
          rightIcon='repeat'
          variantColor='twitter'
          mt={2}
        >
          actualizar tarea
        </Button>
      </Box>
    </Box>
  );
}

export default EditTask;

// <div>
//   <p>editar usuario</p>
//   <form onSubmit={updateTask}>
//     <input
//       type='text'
//       onChange={editInput}
//       name='content'
//       value={taskEdit.content}
//     />
//     <input
//       type='date'
//       onChange={editInput}
//       name='date'
//       value={moment(taskEdit.date).format('YYYY-MM-DD')}
//     />
//     <button type='submit'>actualizar tarea</button>
//   </form>
// </div>;
