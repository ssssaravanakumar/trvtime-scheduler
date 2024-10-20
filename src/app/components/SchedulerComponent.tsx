'use client';

import React, { useState, useEffect,  useReducer } from 'react';
// import * as antdLocale from 'antd/locale/pt_BR';
import Scheduler, { SchedulerData, ViewTypes, DemoData, } from 'react-big-scheduler';
import moment from 'moment';
import 'react-big-scheduler/lib/css/style.css';
import DnDSource from './DnDSrc';  
import TaskItem from './TaskItem';  
import TaskList from './TaskList';  
import ResourceItem from './ResourceItem';  

interface Resource {
  id: string;
  name: string;
}

interface SchedulerEvent {
  id: number;
  start: string;
  end: string;
  resourceId: string;
  title: string;
  groupId?:number;
  groupName?:string;
}

const resources: Resource[] = [
  { id: 'r1', name: 'Dec 1, 2024' },
  { id: 'r2', name: 'Dec 2, 2024' },
  { id: 'r3', name: 'Dec 3, 2024' },
  { id: 'r4', name: 'Dec 4, 2024' },
  { id: 'r5', name: 'Dec 5, 2024' },
  { id: 'r6', name: 'Dec 6, 2024' },
];

const events: SchedulerEvent[] = [
  {
    id: 1,
    start: '2024-12-01 09:30:00',
    end: '2024-12-01 11:45:00',
    resourceId: 'r1',
    title: 'National Park',
    groupId: 1, 
    groupName: 'Task1'
  },
  {
    id: 2,
    start: '2024-12-01 13:30:00',
    end: '2024-12-01 16:30:00',
    resourceId: 'r2',
    title: 'Giant`s Causeway',
    groupId: 2, 
    groupName: 'Task2'
  },
  {
    id: 3,
    start: '2024-12-01 09:30:00',
    end: '2024-12-01 11:30:00',
    resourceId: 'r5',
    title: 'Jungle lake',
    groupId: 3, 
    groupName: 'Task3'
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      // state.myObject.updateValue(action.newValue);
      return { ...action.newValue }; // Return a new reference (even though object inside is the same)
    default:
      return state;
  }
};

export default function SchedulerComponent() {
  
  
  // return schedulerData;
  const [viewModel, setViewModel] = useState();
  // @ts-expect-error
  const [taskDndSource] = useState(new DnDSource(props => props.task, TaskItem, true, 'task'));
  // @ts-expect-error
  const [resourceDndSource] = useState(new DnDSource(props => props.resource, ResourceItem, true, 'resource'));
  console.log(taskDndSource);
  console.log(resourceDndSource);
  const [viewState] = useState({
    viewType: ViewTypes.Week,
    showAgenda: false,
    isEventPerspective: false,
    events: events, // Store your events here
    resources: resources, // Store your events here
  });
  const schedulerData = new SchedulerData(
    moment('2024-12-01').format('YYYY-MM-DD'),
    0,
    false,
    false,
    {
      dayMaxEvents: 99,
      weekMaxEvents: 9669,
      monthMaxEvents: 9669,
      quarterMaxEvents: 6599,
      yearMaxEvents: 9956,
      customMaxEvents: 9965,
      eventItemPopoverTrigger: 'click',
      schedulerContentHeight: '100%',
      views: [
        { viewName: 'Resource View', viewType: 0, showAgenda: false, isEventPerspective: false },
      ],
    }
  );
  schedulerData.setResources(viewState.resources);
    schedulerData.setEvents(viewState.events);
  const [state, dispatch] = useReducer(reducer, schedulerData);
  useEffect(()=>{
    
    console.log(schedulerData);
    setViewModel(schedulerData);
  },[viewState])
  
  const handleViewChange = (schedulerData: SchedulerData, view:ViewTypes) => {
    console.log('view changed',schedulerData);
    /*
    const start = new Date();
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(DemoData.events);
    console.log(viewModel);
    setViewModel(schedulerData);
    function secondsBetween(date1:any, date2:any) {
      const diff = Math.abs(date1.getTime() - date2.getTime());
      return diff / 1000;
    }
    console.log('Elapsed seconds: ' + secondsBetween(start, new Date()));
    */
    // setViewState(prevState => {
    //   return {
    //     ...prevState,
    //     viewType:view.viewType
    //   }
    // })
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    dispatch({ type: 'update', newValue: schedulerData});
    
  };
  const handleSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData);
  };
  const handleEventClick = (schedulerData: SchedulerData, event: SchedulerEvent) => {
    alert(`You clicked an event: ${event.title}`);
  };
  const handleMoveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    /*if (
      confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      setViewModel(schedulerData);
    }*/
    // setViewModel((prevModel:any)=>{
    //   console.log('moving event');
    //   const schedulerData = prevModel;
    //   schedulerData.moveEvent(event, slotId, slotName, start, end);
    //   return schedulerData
    // })
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    dispatch({ type: 'update', newValue: schedulerData});
  };
  const newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {
      let newFreshId = 0;
      schedulerData.events.forEach(item => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });

      let newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: 'purple',
      };

      if (type === 'resource') {
        
        newEvent = {
          ...newEvent,
          // @ts-ignore
          groupId: slotId,
          groupName: slotName,
          resourceId: item.id,
        };
      } else if (type === 'task') {
        newEvent = {
          ...newEvent,
          // @ts-ignore
          groupId: item.id,
          groupName: item.name,
        };
      }

      schedulerData.addEvent(newEvent);
      dispatch({ type: 'update', newValue: schedulerData});
      // dispatch({ type: 'UPDATE_SCHEDULER', payload: schedulerData });
    }
  };

  const handleEventDrop = (schedulerData: SchedulerData, event: SchedulerEvent, newStart: string, newEnd: string) => {
    const updatedEvents = schedulerData.events.map((e:any) => {
      if (e.id === event.id) {
        return { ...e, start: newStart, end: newEnd };
      }
      return e;
    });
    schedulerData.setEvents(updatedEvents);
    setViewModel(schedulerData);
  };

  return (
    <div className="h-screen flex flex-col">
    <div className="w-3/4">
    {viewModel && (
      <Scheduler
        schedulerData={viewModel}
        // prevClick={handleViewChange}
        // nextClick={handleViewChange}
        // onSelectDate={handleSelectDate}
        onViewChange={handleViewChange}
        // eventItemClick={handleEventClick}
        // onEventDrop={handleEventDrop} // Enable event dragging
        moveEvent={handleMoveEvent}
        newEvent={newEvent}

        dndSources={[taskDndSource, resourceDndSource]}
      />)}
    </div>
    <div className="flex-1 bg-gray-100 p-8">
      {/* <p>{viewModel &&
                (viewModel?.isEventPerspective ? 'Drag a resource from outside and drop to the resource view.' : 'Drag a task from outside and drop to the resource view')}
            </p>*/} 
            {/* <TaskList schedulerData={viewModel} newEvent={newEvent} taskDndSource={taskDndSource} />  */}
            {/* {(viewModel&&resourceDndSource) && (<ResourceList schedulerData={viewModel} newEvent={newEvent} resourceDndSource={resourceDndSource} />)} */}
            {(viewModel&&taskDndSource) && (// @ts-ignore
            <TaskList schedulerData={viewModel}  newEvent={newEvent} taskDndSource={taskDndSource}/> )}
      </div>
      </div>
  );
}
