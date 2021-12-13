import React from 'react';
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

type DropProps = Omit<DroppableProps, 'children'> & {
  children: React.ReactNode;
};

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            provided,
            ...provided.droppableProps,
            ref: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;

export const DropChild = React.forwardRef<
  HTMLDivElement,
  DropChildProps
>(({ children, ...props }, ref) => {
  console.log('drap child props', props);

  return (
    <div {...props} ref={ref}>
      {children}
      {props.provided?.placeholder}
    </div>
  );
});

export type DrapProps = Omit<DraggableProps, 'children'> & {
  children: React.ReactNode;
};

export const Drag = ({ children, ...props }: DrapProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        }
        return <div />;
      }}
    </Draggable>
  );
};

type DragChildProps = Omit<
  DraggableProvidedDraggableProps,
  'data-rbd-draggable-context-id' | 'data-rbd-draggable-id'
> &
  // & {
  //   children: React.ReactNode;
  // }
  // DraggableProvidedDraggableProps&
  Omit<
    DraggableProvidedDragHandleProps,
    | 'draggable'
    | 'tabIndex'
    | 'role'
    | 'aria-describedby'
    | 'onDragStart'
    | 'data-rbd-drag-handle-draggable-id'
    | 'data-rbd-drag-handle-context-id'
  > &
  React.HTMLAttributes<HTMLDivElement>;

export const DragChild = React.forwardRef<
  HTMLDivElement,
  DragChildProps
>(({ children, ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
});
