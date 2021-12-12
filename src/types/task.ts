export interface ITask {
  id: number;
  name: string;
  projectId: number; // 專案
  processorId: number; // 經辦人
  epicId: number; // 任務組
  kanbanId: number;
  typeId: number; // bug or task
  note: string;
}
