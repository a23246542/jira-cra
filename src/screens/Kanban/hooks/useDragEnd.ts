import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/store';
import { DropResult } from 'react-beautiful-dnd';
import {
  reorderKanbanActionAsync,
  selectKanbans,
} from 'redux/entities/kanban.slice';
import {
  reorderTaskActionAsync,
  selectTasks,
} from 'redux/entities/task.slice';
import { TypeId } from 'types/sort';

export const useDragEnd = () => {
  const kanbanList = useSelector(selectKanbans);
  const dispatch = useAppDispatch();
  const taskList = useSelector(selectTasks);

  return useCallback(
    ({ source, destination, type, draggableId }: DropResult) => {
      // console.log(
      //   'source',
      //   source,
      //   'destination',
      //   destination,
      //   'draggableId',
      //   draggableId,
      //   'type',
      //   type,
      // );

      if (!destination) {
        return;
      }

      if (type === TypeId.COLUMN) {
        const fromId = kanbanList?.[source.index]?.id;
        const toId = kanbanList?.[destination.index]?.id;

        if (kanbanList.length === 0) {
          return;
        }

        if (!fromId || !toId || fromId === toId) {
          return;
        }

        const sortType =
          destination.index > source.index ? 'after' : 'before';

        dispatch(
          reorderKanbanActionAsync({
            fromId,
            referenceId: toId,
            type: sortType,
          }),
        );
      }

      if (type === TypeId.ROW) {
        const fromKanbanId = +source.droppableId.split('_')[1];
        const toKanbanId = +destination.droppableId.split('_')[1];

        if (taskList.length === 0) {
          return;
        }

        const fromTask = taskList.filter(
          (task) => task.kanbanId === fromKanbanId,
        )[source.index];
        const toKanbanTasks = taskList.filter(
          (task) => task.kanbanId === toKanbanId,
        );
        const toTask =
          destination.index === toKanbanTasks.length
            ? toKanbanTasks[toKanbanTasks.length - 1]
            : toKanbanTasks[destination.index];
        // console.log(toKanbanId, toKanbanTasks);
        // console.log(fromTask, toTask);

        // const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
        //   destination.index
        // ];
        // console.log('useDragEnd', fromTask, toTask);

        if (fromTask?.id === toTask?.id) {
          return;
        }

        const sortType =
          (fromKanbanId === toKanbanId &&
            destination.index > source.index) ||
          destination.index === toKanbanTasks.length
            ? 'after'
            : 'before';

        if (!fromTask?.id) {
          return;
        }
        dispatch(
          reorderTaskActionAsync({
            fromKanbanId,
            toKanbanId,
            fromId: fromTask?.id,
            referenceId: toTask?.id,
            type: sortType,
          }),
        );
      }
    },
    [kanbanList, taskList, dispatch],
  );
};
