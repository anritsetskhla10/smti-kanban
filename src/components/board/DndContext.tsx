'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DragDropContextProps } from '@hello-pangea/dnd';

export const DndContext = ({ children, ...props }: DragDropContextProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <DragDropContext {...props}>{children}</DragDropContext>;
};