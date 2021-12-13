import React from 'react';
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
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
  // console.log('drap child props', props);

  return (
    <div {...props} ref={ref}>
      {children}
      {props.provided?.placeholder}
    </div>
  );
});

export type DragProps = Omit<DraggableProps, 'children'> & {
  children: React.ReactNode;
};

export const Drag = ({ children, ...props }: DragProps) => {
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

export const DragChild = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  // console.log('DragChild props', props);
  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
});
