export type SortProps = {
  fromId: number; //要重新排序的item
  referenceId: number; //目標item
  type: 'before' | 'after'; //放在前面還後面
  fromKanbanId?: number;
  toKanbanId?: number;
};

export enum SortType {
  BEFORE = 'before',
  AFTER = 'after',
}
