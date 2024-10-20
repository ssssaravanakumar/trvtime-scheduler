'use client';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import { ReactNode } from 'react';

export default function DndWrapper({ children }: { children: ReactNode }) {
  //@ts-expect-error
  return <DragDropContextProvider backend={HTML5Backend}>{children}</DragDropContextProvider>;
}