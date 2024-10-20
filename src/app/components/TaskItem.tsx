import React from 'react';

const TaskItem = ({ task, isDragging, connectDragSource, connectDragPreview }) => {
  console.log(task);
  const dragContent = <li className='p-3 border-l-4 border-blue-500 bg-blue-100 rounded-md shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg'>{task.state.title}</li>;

  return isDragging ? null : <>{connectDragPreview(connectDragSource(dragContent))}</>;
}

export default TaskItem;