import React from 'react';

function ResourceList(schedulerData, newEvent ) {
    console.log(schedulerData)
  const DnDResourceItem = schedulerData.resourceDndSource.getDragSource();
  const resources = schedulerData.schedulerData.resources;

  return (
    <ul>
      {resources.map(resource => (
        <DnDResourceItem key={resource.id} resource={resource} newEvent={newEvent} schedulerData={schedulerData} />
      ))}
    </ul>
  );
}

export default ResourceList;