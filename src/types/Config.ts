import { SortType } from "../constants/SortType";

export type Config = {
  tokenFile: string,
  maximumEntries: number,
  projects: string[],
  excludeProjects: boolean,
  labels: string[],
  excludeLabels: boolean,
  updateInterval: number,
  fade: boolean,
  fadePoint: number,
  fadeMinimumOpacity: number,
  sortType: SortType,
  displayLastUpdate: boolean,
  displayLastUpdateFormat: string,
  maxTitleLength: number,
  wrapEvents: boolean,
  displayTasksWithoutDueDate: boolean,
  displayTasksWithinDays: number,
  displaySubtasks: boolean,
  displayAvatar: boolean,
  showProject: boolean,
  debug: boolean
}
