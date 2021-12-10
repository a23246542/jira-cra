export interface ITask {
  id: number;
  name: string;
  processerId: number; // 經辦人
  projectId: number; // 專案
  typeId: number; // bug or task
  note: string;
}
