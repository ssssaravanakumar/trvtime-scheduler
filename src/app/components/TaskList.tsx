import React from 'react';

// const TaskList =(schedulerData:any, newEvent:any, taskDndSource:any ) => {
//   console.log(taskDndSource);
//   const DnDTaskItem = taskDndSource.getDragSource();
  
//   const tasks = schedulerData.eventGroups;

//   return (
//     <ul>
//       {tasks?.map((task:any) => (
//         <DnDTaskItem key={task.id} task={task} newEvent={newEvent} schedulerData={schedulerData} />
//       ))}
//     </ul>
//   );
// }
const TaskList = (schedulerData:any, newEvent:any, taskDndSource:any ) => {
  const tasks = schedulerData.schedulerData.eventGroups;
  const DnDTaskItem = schedulerData.taskDndSource.getDragSource();
      return (
      <ul>
        {tasks?.map((task:any) => (
          <DnDTaskItem key={task.id} task={task} newEvent={schedulerData.newEvent} schedulerData={schedulerData.schedulerData} />
        ))}
      </ul>
    );
  }
export default TaskList;