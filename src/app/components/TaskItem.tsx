import React from 'react';

const TaskItem = ({ task, isDragging, connectDragSource, connectDragPreview }) => {
  console.log(task);
  const dragContent = <li className='h-[22px] w-[400px] text-[#ffffff] bg-[rgb(128,197,246)] rounded-md flex items-center px-2 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg'>{task.state.title}</li>;

  return isDragging ? null : <>{connectDragPreview(connectDragSource(dragContent))}</>;
}

export default TaskItem;